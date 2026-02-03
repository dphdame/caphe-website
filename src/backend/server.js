const express = require('express');
const path = require('path');
const Brevo = require('@getbrevo/brevo');
const { createClient } = require('@supabase/supabase-js');
const { generateCountyReport, generateFilename } = require('./pdf-generator');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON and form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// HTTPS and www canonicalization (fixes duplicate URL issue in GSC)
// Priority order: 1) Force HTTPS, 2) Force www
app.use((req, res, next) => {
  const host = req.get('host');
  const proto = req.get('x-forwarded-proto') || req.protocol;

  // Build canonical URL
  let canonicalHost = 'www.caphegroup.org';
  let canonicalProto = 'https';

  // Check if redirect needed
  const needsHttpsRedirect = proto === 'http';
  const needsWwwRedirect = host === 'caphegroup.org';

  if (needsHttpsRedirect || needsWwwRedirect) {
    return res.redirect(301, `${canonicalProto}://${canonicalHost}${req.originalUrl}`);
  }

  next();
});

// Clean URL handling: redirect .html to extensionless, serve extensionless
const fs = require('fs');
const publicDir = path.join(__dirname, '../../public');

app.use((req, res, next) => {
  const urlPath = req.path;

  // Skip API routes and static assets
  if (urlPath.startsWith('/api/') ||
      urlPath.startsWith('/src/') ||
      urlPath.startsWith('/assets/') ||
      urlPath.startsWith('/data/') ||
      urlPath.match(/\.(css|js|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|eot|webp|json|xml|txt)$/i)) {
    return next();
  }

  // Redirect /home to / (legacy URL getting search impressions)
  if (urlPath === '/home' || urlPath === '/home/') {
    return res.redirect(301, '/');
  }

  // Redirect .html URLs to clean URLs (301 for SEO)
  if (urlPath.endsWith('.html')) {
    const cleanUrl = urlPath.slice(0, -5); // Remove .html
    const redirectTo = cleanUrl === '/index' ? '/' : cleanUrl;
    return res.redirect(301, redirectTo + (req.url.includes('?') ? '?' + req.url.split('?')[1] : ''));
  }

  // Redirect trailing slashes to non-trailing (except root)
  if (urlPath.length > 1 && urlPath.endsWith('/')) {
    const cleanUrl = urlPath.slice(0, -1); // Remove trailing slash
    return res.redirect(301, cleanUrl + (req.url.includes('?') ? '?' + req.url.split('?')[1] : ''));
  }

  // Redirect broken lab URLs (e.g., /selection-into-treatment -> /methods-lab/selection-into-treatment)
  // This handles old bookmarks, cached links, and incorrectly shared URLs
  const labSlugs = [
    'before-after-trap', 'budget-impact', 'cea-uncertain-effects', 'chw-health-outcomes',
    'classifying-causal-mechanisms', 'collider-bias', 'comparator-choice', 'comparing-two-programs',
    'confounding-assessment-checklist', 'control-groups-not-enough', 'correlation-causation-interactive',
    'cost-effectiveness-ratio', 'counterfactual-basics', 'decision-thresholds', 'food-insecurity-diabetes',
    'geographic-variables', 'identical-data-opposite-policies', 'measurement-error-claims',
    'measuring-health-common-unit', 'medicaid-expansion', 'observational-to-experimental',
    'p-hacking-multiple-testing', 'parallel-trends-power', 'regression-tables-confounding',
    'reverse-causation-feedback', 'selection-into-treatment', 'sensitivity-analysis-cea',
    'study-design-ladder', 'threat-confounding-selection', 'threat-history-events',
    'threat-history-maturation', 'threat-history-solutions', 'threat-maturation-solutions',
    'threat-maturation-trends', 'threat-measurement-instrumentation', 'threat-regression-to-mean',
    'why-it-works-isnt-enough'
  ];
  const pathWithoutSlash = urlPath.replace(/\/$/, '');
  const slug = pathWithoutSlash.slice(1); // Remove leading /
  if (labSlugs.includes(slug)) {
    return res.redirect(301, `/methods-lab/${slug}`);
  }

  // Handle paths where both file.html and file/ directory exist (e.g., /membership)
  // Explicitly serve the .html file to prevent express.static directory confusion
  if (urlPath.length > 1 && !urlPath.includes('.')) {
    const htmlFilePath = path.join(publicDir, urlPath + '.html');
    if (fs.existsSync(htmlFilePath)) {
      return res.sendFile(htmlFilePath);
    }

    // Also check for directories with index.html (e.g., /methods-lab/parallel-trends-power)
    const indexFilePath = path.join(publicDir, urlPath, 'index.html');
    if (fs.existsSync(indexFilePath)) {
      return res.sendFile(indexFilePath);
    }
  }

  next();
});

// Serve static files with .html extension resolution
app.use(express.static(publicDir, {
  extensions: ['html', 'htm']
}));
app.use('/src', express.static(path.join(__dirname, '../../src')));
app.use('/assets', express.static(path.join(__dirname, '../../assets')));
app.use('/data', express.static(path.join(__dirname, '../../data')));

// =============================================
// BREVO EMAIL INTEGRATION
// =============================================

let brevoContactsApi = null;
let brevoEmailApi = null;
let brevoListIds = {
  general: null,      // General listserv (public updates)
  members: null,      // Members-only communications
  events: null,       // Event registrants
  applications: null  // Membership applications (pending review)
};

if (process.env.BREVO_API_KEY) {
  // Contacts API (for list management)
  const brevoApiInstance = new Brevo.ContactsApi();
  brevoApiInstance.setApiKey(Brevo.ContactsApiApiKeys.apiKey, process.env.BREVO_API_KEY);
  brevoContactsApi = brevoApiInstance;

  // Transactional Email API (for sending emails)
  const brevoTransactionalApi = new Brevo.TransactionalEmailsApi();
  brevoTransactionalApi.setApiKey(Brevo.TransactionalEmailsApiApiKeys.apiKey, process.env.BREVO_API_KEY);
  brevoEmailApi = brevoTransactionalApi;

  brevoListIds.general = parseInt(process.env.BREVO_LIST_ID) || 9;
  brevoListIds.members = parseInt(process.env.BREVO_MEMBERS_LIST_ID) || 13;
  brevoListIds.events = parseInt(process.env.BREVO_EVENTS_LIST_ID) || 14;
  brevoListIds.applications = parseInt(process.env.BREVO_APPLICATIONS_LIST_ID) || 15;
  console.log('Brevo API initialized with lists:', brevoListIds);
}

// Helper function to send email via Brevo
// 'to' can be a string (single email) or array of emails
// 'attachments' is optional array of { content: Buffer, name: string }
async function sendEmail({ to, subject, html, replyTo, attachments }) {
  if (!brevoEmailApi) {
    console.error('Brevo email API not configured');
    return;
  }

  const sendSmtpEmail = new Brevo.SendSmtpEmail();
  sendSmtpEmail.sender = { name: 'CAPHE', email: 'info@caphegroup.org' };

  // Support single email string or array of emails
  if (Array.isArray(to)) {
    sendSmtpEmail.to = to.map(email => ({ email }));
  } else {
    sendSmtpEmail.to = [{ email: to }];
  }

  sendSmtpEmail.subject = subject;
  sendSmtpEmail.htmlContent = html;
  if (replyTo) {
    sendSmtpEmail.replyTo = { email: replyTo };
  }

  // Add attachments if provided
  if (attachments && attachments.length > 0) {
    sendSmtpEmail.attachment = attachments.map(att => ({
      content: att.content.toString('base64'),
      name: att.name
    }));
  }

  return brevoEmailApi.sendTransacEmail(sendSmtpEmail);
}

// Helper function to subscribe to a Brevo list
async function subscribeToBrevoList(listId, contactData) {
  const createContact = new Brevo.CreateContact();
  createContact.email = contactData.email;
  createContact.listIds = [listId];
  createContact.attributes = {
    FIRSTNAME: contactData.firstName || '',
    LASTNAME: contactData.lastName || '',
    ORGANIZATION: contactData.organization || '',
    EVENT_NAME: contactData.eventName || '',
    EVENT_DATE: contactData.eventDate || '',
    DEGREE: contactData.degree || '',
    DEGREE_FIELD: contactData.degreeField || '',
    INSTITUTION: contactData.institution || '',
    CURRENT_ROLE: contactData.currentRole || '',
    ECONOMICS_WORK: contactData.economicsWork || '',
    PROFILE_URL: contactData.profileUrl || '',
    DEGREE_ATTESTATION: contactData.degreeAttestation || ''
  };
  createContact.updateEnabled = true;

  return brevoContactsApi.createContact(createContact);
}

// Helper function to get contacts from a Brevo list
async function getBrevoListContacts(listId) {
  try {
    // Use direct API call for more reliable results
    const response = await fetch(
      `https://api.brevo.com/v3/contacts/lists/${listId}/contacts?limit=500&offset=0`,
      {
        method: 'GET',
        headers: {
          'api-key': process.env.BREVO_API_KEY,
          'Accept': 'application/json'
        }
      }
    );

    if (!response.ok) {
      if (response.status === 404) {
        return [];
      }
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Brevo API error: ${response.status}`);
    }

    const data = await response.json();
    return data.contacts || [];
  } catch (error) {
    console.error('Brevo getContactsFromList error:', error.message);
    throw error;
  }
}

// Helper function to remove contact from a list
async function removeFromBrevoList(email, listId) {
  const updateContact = new Brevo.UpdateContact();
  updateContact.unlinkListIds = [listId];
  return brevoContactsApi.updateContact(encodeURIComponent(email), updateContact);
}

// Helper function to move contact between lists
async function moveBrevoContact(email, fromListId, toListId) {
  const updateContact = new Brevo.UpdateContact();
  updateContact.unlinkListIds = [fromListId];
  updateContact.listIds = [toListId];
  return brevoContactsApi.updateContact(encodeURIComponent(email), updateContact);
}

// Subscribe to general listserv (public updates)
app.post('/api/listserv/subscribe', async (req, res) => {
  const { email, firstName, lastName, organization } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  if (!brevoContactsApi) {
    return res.status(500).json({ error: 'Email list service not configured' });
  }

  try {
    await subscribeToBrevoList(brevoListIds.general, { email, firstName, lastName, organization });

    res.json({
      success: true,
      message: 'Successfully subscribed to CAPHE updates'
    });
  } catch (error) {
    console.error('Brevo subscription error:', error);

    if (error.response?.body?.code === 'duplicate_parameter') {
      return res.json({
        success: true,
        message: 'You are already subscribed to CAPHE updates'
      });
    }

    res.status(500).json({
      error: 'Failed to subscribe',
      details: error.message
    });
  }
});

// Add member to members list (called when member account is created)
app.post('/api/members/subscribe', verifyUser, async (req, res) => {
  const { email, firstName, lastName, organization } = req.body;

  if (!brevoContactsApi) {
    return res.status(500).json({ error: 'Email list service not configured' });
  }

  try {
    await subscribeToBrevoList(brevoListIds.members, {
      email: email || req.user.email,
      firstName,
      lastName,
      organization
    });

    res.json({
      success: true,
      message: 'Added to members list'
    });
  } catch (error) {
    console.error('Brevo member subscription error:', error);

    if (error.response?.body?.code === 'duplicate_parameter') {
      return res.json({ success: true, message: 'Already on members list' });
    }

    res.status(500).json({ error: 'Failed to add to members list' });
  }
});

// Register for an event (webinar, workshop, etc.)
app.post('/api/events/register', async (req, res) => {
  const { email, firstName, lastName, organization, eventName, eventDate } = req.body;

  if (!email || !eventName) {
    return res.status(400).json({ error: 'Email and event name are required' });
  }

  if (!brevoContactsApi) {
    return res.status(500).json({ error: 'Email list service not configured' });
  }

  try {
    await subscribeToBrevoList(brevoListIds.events, {
      email,
      firstName,
      lastName,
      organization,
      eventName,
      eventDate
    });

    res.json({
      success: true,
      message: `Successfully registered for ${eventName}`
    });
  } catch (error) {
    console.error('Brevo event registration error:', error);

    if (error.response?.body?.code === 'duplicate_parameter') {
      return res.json({
        success: true,
        message: `You are already registered for ${eventName}`
      });
    }

    res.status(500).json({
      error: 'Failed to register for event',
      details: error.message
    });
  }
});

// =============================================
// MEMBERSHIP APPLICATION SYSTEM
// =============================================

// Submit membership application
app.post('/api/membership/apply', async (req, res) => {
  const {
    email, firstName, lastName, password,
    economicsWork, profileUrl, degreeAttestation, linkedinId, organization
  } = req.body;

  // Validation - LinkedIn users don't need profileUrl or economicsWork
  const isLinkedInUser = !!linkedinId;

  if (isLinkedInUser) {
    if (!email || !firstName || !lastName || !password) {
      return res.status(400).json({
        error: 'Please complete all required fields'
      });
    }
  } else {
    if (!email || !firstName || !lastName || !password || !economicsWork || !profileUrl) {
      return res.status(400).json({
        error: 'Please complete all required fields'
      });
    }
  }

  if (password.length < 8) {
    return res.status(400).json({
      error: 'Password must be at least 8 characters'
    });
  }

  if (!degreeAttestation) {
    return res.status(400).json({
      error: 'Please confirm you hold a master\'s/doctoral degree in economics'
    });
  }

  if (!brevoContactsApi) {
    return res.status(500).json({ error: 'Application service not configured' });
  }

  try {
    // Step 1: Create Supabase user with community tier
    let userCreated = false;
    let userAlreadyExists = false;

    if (supabaseAdmin) {
      const { data: userData, error: createError } = await supabaseAdmin.auth.admin.createUser({
        email: email,
        password: password,
        email_confirm: true, // Auto-confirm since they're applying
        user_metadata: {
          full_name: `${firstName} ${lastName}`.trim(),
          membership_tier: 'community',
          application_pending: true
        }
      });

      if (createError) {
        if (createError.message.includes('already been registered')) {
          userAlreadyExists = true;
          console.log('User already exists, will update application status');
        } else {
          console.error('Supabase user creation error:', createError);
          throw createError;
        }
      } else {
        userCreated = true;
      }
    }

    // Step 2: Store application in database
    if (supabaseAdmin) {
      const { error: dbError } = await supabaseAdmin
        .from('membership_applications')
        .upsert({
          email,
          first_name: firstName,
          last_name: lastName,
          profile_url: isLinkedInUser ? 'LinkedIn verified' : profileUrl,
          economics_work: economicsWork || (isLinkedInUser ? 'Applied via LinkedIn' : null),
          degree_attestation: degreeAttestation,
          decision: 'pending',
          applied_at: new Date().toISOString()
        }, { onConflict: 'email' });

      if (dbError) {
        console.error('Database insert error:', dbError);
        // Don't silently fail - throw so the user knows something went wrong
        throw new Error('Failed to save application. Please try again or contact info@caphegroup.org');
      }
    }

    // Step 3: Store application in Brevo applications list (backup)
    await subscribeToBrevoList(brevoListIds.applications, {
      email,
      firstName,
      lastName,
      economicsWork,
      profileUrl,
      degreeAttestation: degreeAttestation ? 'Yes' : 'No'
    });

    // Also add to general listserv for community updates
    try {
      await subscribeToBrevoList(brevoListIds.general, {
        email,
        firstName,
        lastName,
        organization
      });
    } catch (listErr) {
      console.error('Failed to add to general list:', listErr);
    }

    // Step 3: Send notification email to all admins
    try {
      const adminEmails = (process.env.ADMIN_EMAIL || 'info@caphegroup.org')
        .split(',')
        .map(e => e.trim())
        .filter(e => e);
      await sendEmail({
        to: adminEmails,
        subject: '[CAPHE] New Membership Application',
        html: `
          <h3>New Membership Application</h3>
          <p><strong>Name:</strong> ${firstName} ${lastName}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Organization:</strong> ${organization || 'Not provided'}</p>
          <p><strong>Economics Work:</strong> ${economicsWork || 'Not provided'}</p>
          <p><strong>Professional Profile:</strong> <a href="${profileUrl}">${profileUrl}</a></p>
          <p><strong>Degree Attestation:</strong> ${degreeAttestation ? 'Confirmed master\'s/doctoral in economics' : 'Not confirmed'}</p>
          <hr>
          <p><strong>Account Status:</strong> ${userCreated ? 'Community account created' : userAlreadyExists ? 'Account already exists' : 'Account not created'}</p>
          <p><a href="https://www.caphegroup.org/admin.html">Review application in Admin Panel</a></p>
        `
      });
    } catch (emailErr) {
      console.error('Failed to send admin notification:', emailErr);
    }

    // Step 4: Send confirmation email to applicant (with community access info)
    try {
      await sendEmail({
        to: email,
        subject: 'CAPHE Membership Application Received - You Have Community Access!',
        html: `
          <h2>Thank you for applying to CAPHE!</h2>
          <p>Dear ${firstName},</p>
          <p>We've received your application for Professional Membership in the California Association of Public Health Economists.</p>

          <h3>Your Community Access is Ready</h3>
          <p>While we review your professional membership application, you already have Community Member access! Check your email for a separate message to set up your password.</p>
          <p>With your Community Member account, you can:</p>
          <ul>
            <li>Access community-level Methods Lab tutorials</li>
            <li>Attend public webinars</li>
            <li>Receive white paper and resource announcements</li>
            <li>Get monthly event updates</li>
          </ul>

          <h3>What Happens Next</h3>
          <p>Our team will review your professional membership application within 5 business days. Once approved, your account will be upgraded to Professional Member status, giving you access to:</p>
          <ul>
            <li>Peer Review Sessions</li>
            <li>Working Groups</li>
            <li>Member-only webinars and labs</li>
            <li>Full webinar archive</li>
          </ul>

          <p>If you haven't heard from us after 5 business days, please <a href="https://www.caphegroup.org/contact.html">contact us</a>.</p>

          <p>Best regards,<br>The CAPHE Team</p>
          <hr style="margin-top: 30px; border: none; border-top: 1px solid #ddd;">
          <p style="font-size: 12px; color: #666;">California Association of Public Health Economists<br>
          <a href="https://www.caphegroup.org">www.caphegroup.org</a></p>
        `
      });
    } catch (emailErr) {
      console.error('Failed to send applicant confirmation:', emailErr);
    }

    res.json({
      success: true,
      message: userCreated
        ? 'Application submitted! Check your email to set up your community account password while we review your professional membership application.'
        : userAlreadyExists
          ? 'Application submitted! You already have an account - log in to access your community benefits while we review your professional membership application.'
          : 'Application submitted successfully. We will review your application and be in touch soon.'
    });
  } catch (error) {
    console.error('Membership application error:', error);

    if (error.response?.body?.code === 'duplicate_parameter') {
      return res.json({
        success: true,
        message: 'Your application is already on file. We will be in touch soon.'
      });
    }

    res.status(500).json({
      error: 'Failed to submit application',
      details: error.message
    });
  }
});

// Get application status for a user (for dashboard display)
app.get('/api/membership/application-status', async (req, res) => {
  const email = req.query.email;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  if (!supabaseAdmin) {
    return res.status(500).json({ error: 'Database not configured' });
  }

  try {
    const { data, error } = await supabaseAdmin
      .from('membership_applications')
      .select('decision')
      .eq('email', email)
      .single();

    if (error || !data) {
      return res.json({ status: 'none' });
    }

    return res.json({ status: data.decision });
  } catch (error) {
    console.error('Error checking application status:', error);
    return res.json({ status: 'none' });
  }
});

// =============================================
// COMMUNITY MEMBERSHIP (AFFILIATE TIER)
// =============================================

// Create a Supabase admin client for user management
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
let supabaseAdmin = null;
if (supabaseUrl && supabaseServiceKey) {
  supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });
  console.log('Supabase admin client initialized');
}

// Community membership signup (creates community-tier account)
app.post('/api/membership/community', async (req, res) => {
  const { name, email, organization } = req.body;

  if (!email || !name) {
    return res.status(400).json({ error: 'Name and email are required' });
  }

  // Generate temporary password (user will reset via email)
  const tempPassword = require('crypto').randomBytes(16).toString('hex');

  try {
    // Create Supabase user with community tier
    if (supabaseAdmin) {
      const { data: userData, error: createError } = await supabaseAdmin.auth.admin.createUser({
        email: email,
        password: tempPassword,
        email_confirm: false, // Will send confirmation email
        user_metadata: {
          full_name: name,
          membership_tier: 'community'
        }
      });

      if (createError) {
        // If user already exists, that's okay
        if (!createError.message.includes('already been registered')) {
          console.error('Supabase user creation error:', createError);
          throw createError;
        }
      }

      // Send password reset email so user can set their own password
      if (userData?.user) {
        await supabaseAdmin.auth.admin.generateLink({
          type: 'recovery',
          email: email
        });
      }
    }

    // Also add to Brevo general listserv
    if (brevoContactsApi) {
      const nameParts = name.split(' ');
      await subscribeToBrevoList(brevoListIds.general, {
        email,
        firstName: nameParts[0] || '',
        lastName: nameParts.slice(1).join(' ') || '',
        organization: organization || ''
      });
    }

    // Send welcome email
    try {
      await sendEmail({
        to: email,
        subject: 'Welcome to CAPHE Community!',
        html: `
          <h2>Welcome to CAPHE!</h2>
          <p>Dear ${name.split(' ')[0]},</p>
          <p>Thank you for joining the CAPHE community! You now have access to:</p>
          <ul>
            <li>Community-level Methods Lab tutorials</li>
            <li>Public webinar invitations</li>
            <li>White paper and resource announcements</li>
            <li>Monthly event updates</li>
          </ul>
          <p>Check your inbox for a separate email to set up your account password and log in.</p>
          <p>Explore our <a href="https://www.caphegroup.org/methods-lab/">Methods Lab</a> to start learning health economics methods!</p>
          <p>Best regards,<br>The CAPHE Team</p>
          <hr style="margin-top: 30px; border: none; border-top: 1px solid #ddd;">
          <p style="font-size: 12px; color: #666;">California Association of Public Health Economists<br>
          <a href="https://www.caphegroup.org">www.caphegroup.org</a></p>
        `
      });
    } catch (emailErr) {
      console.error('Failed to send community welcome email:', emailErr);
    }

    res.json({
      success: true,
      message: 'Welcome to CAPHE! Check your email to set up your account.'
    });
  } catch (error) {
    console.error('Community signup error:', error);

    if (error.message?.includes('already been registered')) {
      return res.json({
        success: true,
        message: 'You already have an account. Please log in or reset your password.'
      });
    }

    res.status(500).json({
      error: 'Failed to create account',
      details: error.message
    });
  }
});

// Admin middleware - check if user is admin
async function verifyAdmin(req, res, next) {
  if (!supabase) {
    return res.status(500).json({ error: 'Authentication not configured' });
  }

  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  const token = authHeader.split(' ')[1];
  const { data: { user }, error } = await supabase.auth.getUser(token);

  if (error || !user) {
    return res.status(401).json({ error: 'Invalid authentication' });
  }

  // Check if user is admin (supports comma-separated list of emails)
  const adminEmails = (process.env.ADMIN_EMAIL || '')
    .split(',')
    .map(email => email.trim().toLowerCase())
    .filter(email => email);

  if (adminEmails.length === 0 || !adminEmails.includes(user.email.toLowerCase())) {
    return res.status(403).json({ error: 'Admin access required' });
  }

  req.user = user;
  next();
}

// Get pending applications (admin only)
app.get('/api/admin/applications', verifyAdmin, async (req, res) => {
  if (!supabaseAdmin) {
    return res.status(500).json({ error: 'Service not configured' });
  }

  try {
    // Get pending applications from database
    const { data: applications, error } = await supabaseAdmin
      .from('membership_applications')
      .select('*')
      .eq('decision', 'pending')
      .order('applied_at', { ascending: false });

    if (error) {
      throw error;
    }

    // Format for frontend compatibility
    const formattedApplications = (applications || []).map(app => ({
      email: app.email,
      attributes: {
        FIRSTNAME: app.first_name,
        LASTNAME: app.last_name,
        PROFILE_URL: app.profile_url,
        ECONOMICS_WORK: app.economics_work,
        DEGREE_ATTESTATION: app.degree_attestation ? 'Yes' : 'No'
      },
      createdAt: app.applied_at
    }));

    res.json({ success: true, applications: formattedApplications });
  } catch (error) {
    console.error('Error fetching applications:', error);
    res.status(500).json({ error: 'Failed to fetch applications' });
  }
});

// Approve application (admin only)
app.post('/api/admin/approve', verifyAdmin, async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  if (!supabaseAdmin) {
    return res.status(500).json({ error: 'Service not configured' });
  }

  try {
    // Get applicant info from database
    const { data: application, error: fetchError } = await supabaseAdmin
      .from('membership_applications')
      .select('*')
      .eq('email', email)
      .single();

    if (fetchError || !application) {
      console.error('Application not found:', fetchError);
      return res.status(404).json({ error: 'Application not found' });
    }

    const firstName = application.first_name || '';
    const lastName = application.last_name || '';

    // Find existing user and upgrade their tier from community to professional
    const { data: { users } } = await supabaseAdmin.auth.admin.listUsers();
    const existingUser = users?.find(u => u.email === email);

    if (existingUser) {
      // User exists - upgrade their tier
      await supabaseAdmin.auth.admin.updateUserById(existingUser.id, {
        user_metadata: {
          ...existingUser.user_metadata,
          membership_tier: 'professional',
          application_pending: false
        }
      });
      console.log(`Upgraded ${email} from community to professional`);
    } else {
      // User doesn't exist (shouldn't happen with new flow) - create with professional tier
      const tempPassword = require('crypto').randomBytes(16).toString('hex');
      const { error: createError } = await supabaseAdmin.auth.admin.createUser({
        email: email,
        password: tempPassword,
        email_confirm: false,
        user_metadata: {
          full_name: `${firstName} ${lastName}`.trim(),
          membership_tier: 'professional'
        }
      });

      if (createError && !createError.message.includes('already been registered')) {
        throw createError;
      }

      // Send password reset email for new user
      await supabaseAdmin.auth.admin.generateLink({
        type: 'recovery',
        email: email
      });
    }

    // Record decision in database
    if (supabaseAdmin) {
      const { error: dbError } = await supabaseAdmin
        .from('membership_applications')
        .update({
          decision: 'approved',
          decided_at: new Date().toISOString(),
          decided_by: req.user?.email || 'admin'
        })
        .eq('email', email);

      if (dbError) {
        console.error('Database update error:', dbError);
      }
    }

    // Move from applications list to members list in Brevo (optional - don't fail if Brevo not configured)
    try {
      if (brevoContactsApi) {
        await moveBrevoContact(email, brevoListIds.applications, brevoListIds.members);
      }
    } catch (brevoErr) {
      console.log('Brevo sync skipped or failed (non-critical):', brevoErr.message);
    }

    // Send approval email
    try {
      await sendEmail({
        to: email,
        subject: 'CAPHE Professional Membership Approved!',
        html: `
          <p>Dear ${firstName || 'Member'},</p>
          <p>Great news! Your application for Professional Membership with the California Association of Public Health Economists has been approved. Log in with your existing credentials to access:</p>
          <ul>
            <li>Peer Review Sessions - present your work and get feedback</li>
            <li>Working Groups - collaborate on research projects</li>
            <li>Webinars and Methods Labs for professional members</li>
          </ul>
          <p>We also host monthly meetings on the last Wednesday of each month from 11 am to 12 pm. You will find a "Join Call" button on your member landing page to access these sessions.</p>
          <p>If you have questions about getting connected to the working groups or anything else, feel free to reach out. We're happy to set up a time to chat and help you get started.</p>
          <p>We look forward to collaborating with you!</p>
          <p>Best regards,<br>CAPHE Team</p>
        `
      });
    } catch (emailErr) {
      console.error('Failed to send approval email:', emailErr);
    }

    res.json({
      success: true,
      message: existingUser
        ? `Approved ${email}. Account upgraded to Professional Member.`
        : `Approved ${email}. Account created and invite sent.`
    });
  } catch (error) {
    console.error('Error approving application:', error);
    res.status(500).json({
      error: 'Failed to approve application',
      details: error.message
    });
  }
});

// Reject application (admin only)
app.post('/api/admin/reject', verifyAdmin, async (req, res) => {
  const { email, reason } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  if (!brevoContactsApi) {
    return res.status(500).json({ error: 'Service not configured' });
  }

  try {
    // Get applicant info
    const contactInfo = await brevoContactsApi.getContactInfo(encodeURIComponent(email));
    const firstName = contactInfo.attributes?.FIRSTNAME || '';

    // Record decision in database
    if (supabaseAdmin) {
      const { error: dbError } = await supabaseAdmin
        .from('membership_applications')
        .update({
          decision: 'declined',
          decided_at: new Date().toISOString(),
          decided_by: req.user?.email || 'admin'
        })
        .eq('email', email);

      if (dbError) {
        console.error('Database update error:', dbError);
      }
    }

    // Remove from applications list in Brevo
    await removeFromBrevoList(email, brevoListIds.applications);

    // Send polite decline email
    try {
      await sendEmail({
        to: email,
        subject: 'CAPHE Membership Application Update',
        html: `
          <p>Dear ${firstName || 'Applicant'},</p>
          <p>Thank you for your interest in CAPHE. After reviewing your application, we've determined that our community membership, rather than professional membership, is the best fit at this time.</p>
          <p>CAPHE professional membership is specifically designed for economists with graduate-level training in econometrics and causal inference methods.</p>
          <p>Community membership gives you access to our listserv, public events, and resources. You're also welcome to reapply in the future if your qualifications change.</p>
          <p>If you think we missed something, feel free to reply with more info about your background. We're also happy to chat if you'd like to talk it through.</p>
          <p>Best regards,<br>CAPHE Team</p>
        `
      });
    } catch (emailErr) {
      console.error('Failed to send rejection email:', emailErr);
    }

    res.json({
      success: true,
      message: `Application from ${email} has been declined.`
    });
  } catch (error) {
    console.error('Error rejecting application:', error);
    res.status(500).json({
      error: 'Failed to process rejection',
      details: error.message
    });
  }
});

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    await sendEmail({
      to: 'info@caphegroup.org',
      subject: `[CAPHE Website] ${subject}`,
      html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>From:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <hr>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
      replyTo: email
    });
    res.json({ success: true, message: 'Message sent successfully' });
  } catch (error) {
    console.error('Email error:', error);
    res.status(500).json({ error: 'Failed to send message', details: error.message });
  }
});

// =============================================
// ROI CALCULATOR API
// =============================================

// Load county data for ROI calculations
let countyData = null;
const loadCountyData = () => {
  try {
    const fs = require('fs');
    const dataPath = path.join(__dirname, '../../data/california_counties.json');
    if (fs.existsSync(dataPath)) {
      countyData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
      console.log(`Loaded data for ${Object.keys(countyData).length} counties`);
    }
  } catch (error) {
    console.error('Error loading county data:', error);
  }
};
loadCountyData();

// Search counties (fuzzy match)
app.get('/api/counties/search', (req, res) => {
  const { q } = req.query;

  if (!q || q.length < 2) {
    return res.json({ counties: [] });
  }

  if (!countyData) {
    return res.status(500).json({ error: 'County data not loaded' });
  }

  const searchTerm = q.toLowerCase();
  const matches = Object.keys(countyData)
    .filter(county => county.toLowerCase().includes(searchTerm))
    .slice(0, 10)
    .map(county => ({
      name: county,
      state: countyData[county].state || 'CA',
      population: countyData[county].population
    }));

  res.json({ counties: matches });
});

// Get ROI estimate for a specific county
app.get('/api/counties/:countyName/roi', (req, res) => {
  const { countyName } = req.params;
  const { investmentAmount } = req.query;

  if (!countyData) {
    return res.status(500).json({ error: 'County data not loaded' });
  }

  // Find county (case-insensitive)
  const countyKey = Object.keys(countyData).find(
    c => c.toLowerCase() === countyName.toLowerCase()
  );

  if (!countyKey) {
    return res.status(404).json({ error: 'County not found' });
  }

  const county = countyData[countyKey];
  const investment = parseFloat(investmentAmount) || 1000000; // Default $1M

  // Brown (2016) coefficient: -9.16 deaths per 100,000 per $10 per capita
  // Converted: -0.916 deaths per 100,000 per $1 per capita
  const COEFFICIENT = -9.16; // deaths per 100,000 per $10 per capita
  const VSL = 10000000; // Value of Statistical Life ($10M)

  const perCapitaInvestment = investment / county.population;
  const perCapitaUnits = perCapitaInvestment / 10; // Convert to $10 units

  // Calculate lives saved
  const mortalityReduction = Math.abs(COEFFICIENT * perCapitaUnits);
  const livesSaved = (mortalityReduction / 100000) * county.population;

  // Calculate economic value
  const economicValue = livesSaved * VSL;
  const roi = ((economicValue - investment) / investment) * 100;
  const benefitCostRatio = economicValue / investment;

  res.json({
    county: countyKey,
    state: county.state || 'CA',
    population: county.population,
    investment: investment,
    perCapitaInvestment: perCapitaInvestment,
    results: {
      livesSavedPerYear: parseFloat(livesSaved.toFixed(2)),
      mortalityReductionPer100k: parseFloat(mortalityReduction.toFixed(2)),
      economicValue: parseFloat(economicValue.toFixed(0)),
      roi: parseFloat(roi.toFixed(1)),
      benefitCostRatio: parseFloat(benefitCostRatio.toFixed(1)),
      costPerLifeSaved: parseFloat((investment / livesSaved).toFixed(0))
    },
    methodology: {
      source: 'Brown (2016)',
      coefficient: COEFFICIENT,
      coefficientUnit: 'deaths per 100,000 per $10 per capita',
      vsl: VSL,
      note: 'Based on Lewbel IV estimation using California county panel data 2003-2023'
    }
  });
});

// =============================================
// LHA CALCULATOR SUBMISSIONS
// =============================================

// Store for LHA submissions (in production, use database)
const lhaSubmissions = [];

// Submit LHA spending data
app.post('/api/lha/submit', async (req, res) => {
  const {
    county,
    fiscal_year,
    name,
    title,
    email,
    communicable_disease,
    chronic_disease,
    environmental_health,
    maternal_child,
    other_programs,
    total_expenditure,
    data_source,
    confidence,
    research_consent
  } = req.body;

  // Validation
  if (!county || !fiscal_year || !name || !email) {
    return res.status(400).json({ error: 'Missing required fields: county, fiscal_year, name, email' });
  }

  if (!total_expenditure || total_expenditure <= 0) {
    return res.status(400).json({ error: 'Total expenditure must be greater than zero' });
  }

  // Check for existing submission for this county-year
  const existingIndex = lhaSubmissions.findIndex(
    s => s.county === county && s.fiscal_year === fiscal_year
  );

  const submission = {
    id: `lha-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    county,
    fiscal_year,
    submitter_name: name,
    submitter_title: title,
    submitter_email: email,
    communicable_disease: communicable_disease || 0,
    chronic_disease: chronic_disease || 0,
    environmental_health: environmental_health || 0,
    maternal_child: maternal_child || 0,
    other_programs: other_programs || 0,
    total_expenditure,
    data_source: data_source || 'unknown',
    confidence: confidence || 3,
    research_consent: research_consent || false,
    consent_timestamp: research_consent ? new Date().toISOString() : null,
    submitted_at: new Date().toISOString(),
    verified: email.endsWith('.gov') || email.endsWith('.ca.gov'),
    verification_notes: email.endsWith('.gov') ? 'Auto-verified: .gov email' : null
  };

  // Replace or add submission
  if (existingIndex >= 0) {
    // Notify about existing submission
    console.log(`Updating existing submission for ${county} FY${fiscal_year}`);
    lhaSubmissions[existingIndex] = submission;
  } else {
    lhaSubmissions.push(submission);
  }

  // Log submission (in production, save to database)
  console.log('LHA Submission:', {
    county,
    fiscal_year,
    total: total_expenditure,
    research_consent,
    verified: submission.verified
  });

  // Generate PDF report and send confirmation email
  try {
    const population = countyData[county]?.population || 500000;
    const perCapita = total_expenditure / population;
    // Coefficient: 9.16 deaths per 100,000 per $10 per capita (matching ROI calculator)
    const perCapitaUnits = perCapita / 10; // Convert to $10 units
    const livesSaved = (Math.abs(9.16) * perCapitaUnits / 100000) * population;
    const socialValue = livesSaved * 13600000;
    const bcr = socialValue / total_expenditure;

    // Prepare submission data for PDF generation
    const pdfSubmissionData = {
      county,
      fiscal_year,
      total_expenditure,
      communicable_disease: communicable_disease || 0,
      chronic_disease: chronic_disease || 0,
      environmental_health: environmental_health || 0,
      maternal_child: maternal_child || 0,
      other_programs: other_programs || 0,
      data_source: data_source || 'self-reported'
    };

    // Generate PDF report
    let pdfBuffer = null;
    let pdfFilename = null;
    try {
      pdfBuffer = await generateCountyReport(pdfSubmissionData, population);
      pdfFilename = generateFilename(county, fiscal_year);
      console.log(`Generated PDF report: ${pdfFilename} (${(pdfBuffer.length / 1024).toFixed(1)} KB)`);
    } catch (pdfError) {
      console.error('Failed to generate PDF report:', pdfError);
      // Continue without PDF if generation fails
    }

    const emailHtml = `
      <h2>Public Health ROI Analysis: ${county} County (FY ${fiscal_year})</h2>

      <p>Thank you for your submission, ${name}.</p>

      ${pdfBuffer ? '<p><strong>Your detailed PDF report is attached to this email.</strong></p>' : ''}

      <h3>Key Results</h3>
      <ul>
        <li><strong>Total Public Health Expenditure:</strong> $${total_expenditure.toLocaleString()}</li>
        <li><strong>Per Capita Spending:</strong> $${perCapita.toFixed(2)}</li>
        <li><strong>Estimated Lives Saved:</strong> ${livesSaved.toFixed(1)}</li>
        <li><strong>Benefit-Cost Ratio:</strong> ${bcr.toFixed(0)}:1</li>
        <li><strong>Social Value (VSL):</strong> $${(socialValue / 1e6).toFixed(1)} million</li>
      </ul>

      <h3>Spending Breakdown</h3>
      <ul>
        <li>Communicable Disease Control: $${(communicable_disease || 0).toLocaleString()}</li>
        <li>Chronic Disease Prevention: $${(chronic_disease || 0).toLocaleString()}</li>
        <li>Environmental Health: $${(environmental_health || 0).toLocaleString()}</li>
        <li>Maternal/Child Health: $${(maternal_child || 0).toLocaleString()}</li>
        <li>Other Programs: $${(other_programs || 0).toLocaleString()}</li>
      </ul>

      <h3>Methodology</h3>
      <p>Estimates based on Lewbel IV analysis of California county public health spending (2003-2023).
      Each $1 per capita spending reduces mortality by 9.16 deaths per 100,000.
      Social value calculated using HHS Value of Statistical Life ($13.6 million).</p>

      <p><strong>Citation:</strong> Cholette, V., Patton, D., &amp; Zaragoza-Gonzalez, M. (2026). "The Causal Effect of Public Health Infrastructure Spending on Mortality:
      Evidence from California Counties." SSRN Working Paper.</p>

      ${research_consent ? '<p><em>Thank you for consenting to include your data in our research on California public health spending patterns.</em></p>' : ''}

      <hr>
      <p style="color: #666; font-size: 12px;">
        California Association of Public Health Economists (CAPHE)<br>
        <a href="https://www.caphegroup.org">www.caphegroup.org</a>
      </p>
    `;

    // Send email with PDF attachment if available
    const emailOptions = {
      to: email,
      subject: `Public Health ROI Analysis: ${county} County (FY ${fiscal_year})`,
      html: emailHtml
    };

    if (pdfBuffer && pdfFilename) {
      emailOptions.attachments = [{
        content: pdfBuffer,
        name: pdfFilename
      }];
    }

    await sendEmail(emailOptions);
  } catch (emailError) {
    console.error('Failed to send confirmation email:', emailError);
    // Don't fail the request if email fails
  }

  res.json({
    success: true,
    message: 'Submission received',
    submission_id: submission.id,
    research_consent: submission.research_consent,
    verified: submission.verified
  });
});

// Get LHA submissions (admin only - add auth in production)
app.get('/api/lha/submissions', (req, res) => {
  // In production, add authentication check here
  const { research_only, verified_only } = req.query;

  let results = [...lhaSubmissions];

  if (research_only === 'true') {
    results = results.filter(s => s.research_consent);
  }

  if (verified_only === 'true') {
    results = results.filter(s => s.verified);
  }

  res.json({
    count: results.length,
    submissions: results
  });
});

// =============================================
// LINKEDIN OAUTH (for membership applications)
// =============================================

const LINKEDIN_CLIENT_ID = process.env.LINKEDIN_CLIENT_ID;
const LINKEDIN_CLIENT_SECRET = process.env.LINKEDIN_CLIENT_SECRET;
const LINKEDIN_REDIRECT_URI = 'https://www.caphegroup.org/api/auth/linkedin/callback';

// Initiate LinkedIn OAuth
app.get('/api/auth/linkedin', (req, res) => {
  if (!LINKEDIN_CLIENT_ID) {
    return res.status(500).json({ error: 'LinkedIn OAuth not configured' });
  }

  const state = Buffer.from(Math.random().toString()).toString('base64').slice(0, 16);

  const authUrl = new URL('https://www.linkedin.com/oauth/v2/authorization');
  authUrl.searchParams.set('response_type', 'code');
  authUrl.searchParams.set('client_id', LINKEDIN_CLIENT_ID);
  authUrl.searchParams.set('redirect_uri', LINKEDIN_REDIRECT_URI);
  authUrl.searchParams.set('state', state);
  authUrl.searchParams.set('scope', 'openid profile email');

  res.redirect(authUrl.toString());
});

// LinkedIn OAuth callback
app.get('/api/auth/linkedin/callback', async (req, res) => {
  const { code, error, error_description } = req.query;

  if (error) {
    console.error('LinkedIn OAuth error:', error, error_description);
    return res.redirect('/membership.html?error=' + encodeURIComponent(error_description || error));
  }

  if (!code) {
    return res.redirect('/membership.html?error=No authorization code received');
  }

  try {
    // Exchange code for access token
    const tokenResponse = await fetch('https://www.linkedin.com/oauth/v2/accessToken', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code: code,
        client_id: LINKEDIN_CLIENT_ID,
        client_secret: LINKEDIN_CLIENT_SECRET,
        redirect_uri: LINKEDIN_REDIRECT_URI,
      }).toString(),
    });

    if (!tokenResponse.ok) {
      const errorData = await tokenResponse.text();
      console.error('Token exchange failed:', errorData);
      throw new Error('Failed to exchange authorization code');
    }

    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;

    // Fetch user profile using OpenID Connect userinfo endpoint
    const profileResponse = await fetch('https://api.linkedin.com/v2/userinfo', {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    if (!profileResponse.ok) {
      const errorData = await profileResponse.text();
      console.error('Profile fetch failed:', errorData);
      throw new Error('Failed to fetch LinkedIn profile');
    }

    const profile = await profileResponse.json();

    // Build profile data to pass to the membership form
    const profileData = {
      firstName: profile.given_name || '',
      lastName: profile.family_name || '',
      email: profile.email || '',
      picture: profile.picture || '',
      linkedinId: profile.sub || ''
    };

    // Redirect to membership page with profile data in URL params
    const params = new URLSearchParams();
    params.set('linkedin', 'true');
    params.set('firstName', profileData.firstName);
    params.set('lastName', profileData.lastName);
    params.set('email', profileData.email);
    params.set('linkedinId', profileData.linkedinId);
    if (profileData.picture) params.set('picture', profileData.picture);

    res.redirect('/membership/professional.html?' + params.toString());

  } catch (error) {
    console.error('LinkedIn OAuth callback error:', error);
    res.redirect('/membership.html?error=' + encodeURIComponent(error.message));
  }
});

// =============================================
// GOOGLE OAUTH (for login)
// =============================================

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const GOOGLE_REDIRECT_URI = process.env.NODE_ENV === 'production'
  ? 'https://www.caphegroup.org/api/auth/google/callback'
  : 'http://localhost:3000/api/auth/google/callback';

// Initiate Google OAuth
app.get('/api/auth/google', (req, res) => {
  if (!GOOGLE_CLIENT_ID) {
    return res.status(500).json({ error: 'Google OAuth not configured' });
  }

  const state = Buffer.from(Math.random().toString()).toString('base64').slice(0, 16);

  const authUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth');
  authUrl.searchParams.set('client_id', GOOGLE_CLIENT_ID);
  authUrl.searchParams.set('redirect_uri', GOOGLE_REDIRECT_URI);
  authUrl.searchParams.set('response_type', 'code');
  authUrl.searchParams.set('scope', 'openid email profile');
  authUrl.searchParams.set('state', state);
  authUrl.searchParams.set('access_type', 'offline');
  authUrl.searchParams.set('prompt', 'consent');

  res.redirect(authUrl.toString());
});

// Google OAuth callback
app.get('/api/auth/google/callback', async (req, res) => {
  const { code, error } = req.query;

  if (error) {
    console.error('Google OAuth error:', error);
    return res.redirect('/login.html?error=' + encodeURIComponent(error));
  }

  if (!code) {
    return res.redirect('/login.html?error=No authorization code received');
  }

  try {
    // Exchange code for access token
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        code: code,
        client_id: GOOGLE_CLIENT_ID,
        client_secret: GOOGLE_CLIENT_SECRET,
        redirect_uri: GOOGLE_REDIRECT_URI,
        grant_type: 'authorization_code',
      }).toString(),
    });

    if (!tokenResponse.ok) {
      const errorData = await tokenResponse.text();
      console.error('Google token exchange failed:', errorData);
      throw new Error('Failed to exchange authorization code');
    }

    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;

    // Fetch user profile
    const profileResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    if (!profileResponse.ok) {
      throw new Error('Failed to fetch Google profile');
    }

    const profile = await profileResponse.json();

    // Find or create Supabase user
    if (!supabaseAdmin) {
      throw new Error('User management not configured');
    }

    // Check if user exists
    const { data: { users } } = await supabaseAdmin.auth.admin.listUsers();
    let existingUser = users?.find(u => u.email === profile.email);

    if (!existingUser) {
      // Create new user with community tier
      const tempPassword = require('crypto').randomBytes(16).toString('hex');
      const { data: newUser, error: createError } = await supabaseAdmin.auth.admin.createUser({
        email: profile.email,
        password: tempPassword,
        email_confirm: true, // Auto-confirm since Google verified email
        user_metadata: {
          full_name: profile.name || `${profile.given_name || ''} ${profile.family_name || ''}`.trim(),
          membership_tier: 'community',
          avatar_url: profile.picture
        }
      });

      if (createError) {
        throw createError;
      }

      existingUser = newUser.user;

      // Add to Brevo general listserv
      if (brevoContactsApi) {
        try {
          await subscribeToBrevoList(brevoListIds.general, {
            email: profile.email,
            firstName: profile.given_name || '',
            lastName: profile.family_name || ''
          });
        } catch (brevoErr) {
          console.error('Brevo subscription error:', brevoErr);
        }
      }
    }

    // Generate a magic link to sign the user in directly
    const { data: linkData, error: linkError } = await supabaseAdmin.auth.admin.generateLink({
      type: 'magiclink',
      email: profile.email,
      options: {
        redirectTo: 'https://www.caphegroup.org/dashboard.html'
      }
    });

    if (linkError) {
      console.error('Failed to generate login link:', linkError);
      throw linkError;
    }

    // Redirect to the magic link URL (this logs them in directly)
    // Extract the token from the action_link and redirect to our auth handler
    const actionLink = linkData.properties?.action_link;
    if (actionLink) {
      // The action_link goes through Supabase, let's extract tokens and handle locally
      const url = new URL(actionLink);
      const token = url.searchParams.get('token');
      const type = url.searchParams.get('type');

      // Redirect to our frontend auth handler with the token
      res.redirect(`/auth-callback.html?token=${token}&type=${type}&next=/dashboard.html`);
    } else {
      // Fallback: redirect to login with email prefilled
      res.redirect('/login.html?oauth=google&email=' + encodeURIComponent(profile.email));
    }

  } catch (error) {
    console.error('Google OAuth callback error:', error);
    res.redirect('/login.html?error=' + encodeURIComponent(error.message));
  }
});

// =============================================
// LINKEDIN OAUTH (for login - separate from membership)
// =============================================

const LINKEDIN_LOGIN_REDIRECT_URI = process.env.NODE_ENV === 'production'
  ? 'https://www.caphegroup.org/api/auth/linkedin/login/callback'
  : 'http://localhost:3000/api/auth/linkedin/login/callback';

// Initiate LinkedIn OAuth for login
app.get('/api/auth/linkedin/login', (req, res) => {
  if (!LINKEDIN_CLIENT_ID) {
    return res.status(500).json({ error: 'LinkedIn OAuth not configured' });
  }

  const state = Buffer.from(Math.random().toString()).toString('base64').slice(0, 16);

  const authUrl = new URL('https://www.linkedin.com/oauth/v2/authorization');
  authUrl.searchParams.set('response_type', 'code');
  authUrl.searchParams.set('client_id', LINKEDIN_CLIENT_ID);
  authUrl.searchParams.set('redirect_uri', LINKEDIN_LOGIN_REDIRECT_URI);
  authUrl.searchParams.set('state', state);
  authUrl.searchParams.set('scope', 'openid profile email');

  res.redirect(authUrl.toString());
});

// LinkedIn OAuth callback for login
app.get('/api/auth/linkedin/login/callback', async (req, res) => {
  const { code, error, error_description } = req.query;

  if (error) {
    console.error('LinkedIn login OAuth error:', error, error_description);
    return res.redirect('/login.html?error=' + encodeURIComponent(error_description || error));
  }

  if (!code) {
    return res.redirect('/login.html?error=No authorization code received');
  }

  try {
    // Exchange code for access token
    const tokenResponse = await fetch('https://www.linkedin.com/oauth/v2/accessToken', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code: code,
        client_id: LINKEDIN_CLIENT_ID,
        client_secret: LINKEDIN_CLIENT_SECRET,
        redirect_uri: LINKEDIN_LOGIN_REDIRECT_URI,
      }).toString(),
    });

    if (!tokenResponse.ok) {
      const errorData = await tokenResponse.text();
      console.error('LinkedIn token exchange failed:', errorData);
      throw new Error('Failed to exchange authorization code');
    }

    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;

    // Fetch user profile
    const profileResponse = await fetch('https://api.linkedin.com/v2/userinfo', {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    if (!profileResponse.ok) {
      throw new Error('Failed to fetch LinkedIn profile');
    }

    const profile = await profileResponse.json();

    // Find or create Supabase user
    if (!supabaseAdmin) {
      throw new Error('User management not configured');
    }

    // Check if user exists
    const { data: { users } } = await supabaseAdmin.auth.admin.listUsers();
    let existingUser = users?.find(u => u.email === profile.email);

    if (!existingUser) {
      // Create new user with community tier
      const tempPassword = require('crypto').randomBytes(16).toString('hex');
      const { data: newUser, error: createError } = await supabaseAdmin.auth.admin.createUser({
        email: profile.email,
        password: tempPassword,
        email_confirm: true, // Auto-confirm since LinkedIn verified email
        user_metadata: {
          full_name: `${profile.given_name || ''} ${profile.family_name || ''}`.trim(),
          membership_tier: 'community',
          avatar_url: profile.picture
        }
      });

      if (createError) {
        throw createError;
      }

      existingUser = newUser.user;

      // Add to Brevo general listserv
      if (brevoContactsApi) {
        try {
          await subscribeToBrevoList(brevoListIds.general, {
            email: profile.email,
            firstName: profile.given_name || '',
            lastName: profile.family_name || ''
          });
        } catch (brevoErr) {
          console.error('Brevo subscription error:', brevoErr);
        }
      }
    }

    // Generate a magic link to sign the user in directly
    const { data: linkData, error: linkError } = await supabaseAdmin.auth.admin.generateLink({
      type: 'magiclink',
      email: profile.email,
      options: {
        redirectTo: 'https://www.caphegroup.org/dashboard.html'
      }
    });

    if (linkError) {
      console.error('Failed to generate login link:', linkError);
      throw linkError;
    }

    // Redirect to the magic link URL (this logs them in directly)
    const actionLink = linkData.properties?.action_link;
    if (actionLink) {
      const url = new URL(actionLink);
      const token = url.searchParams.get('token');
      const type = url.searchParams.get('type');

      // Redirect to our frontend auth handler with the token
      res.redirect(`/auth-callback.html?token=${token}&type=${type}&next=/dashboard.html`);
    } else {
      // Fallback: redirect to login with email prefilled
      res.redirect('/login.html?oauth=linkedin&email=' + encodeURIComponent(profile.email));
    }

  } catch (error) {
    console.error('LinkedIn login callback error:', error);
    res.redirect('/login.html?error=' + encodeURIComponent(error.message));
  }
});

// =============================================
// SUPABASE AUTH (for member area)
// =============================================

const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

let supabase = null;
if (supabaseUrl && supabaseAnonKey) {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
  console.log('Supabase client initialized');
}

// Verify user token middleware
async function verifyUser(req, res, next) {
  if (!supabase) {
    return res.status(500).json({ error: 'Authentication not configured' });
  }

  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  const token = authHeader.split(' ')[1];
  const { data: { user }, error } = await supabase.auth.getUser(token);

  if (error || !user) {
    return res.status(401).json({ error: 'Invalid authentication' });
  }

  req.user = user;
  next();
}

// Protected route example
app.get('/api/member/profile', verifyUser, (req, res) => {
  res.json({
    success: true,
    user: {
      id: req.user.id,
      email: req.user.email
    }
  });
});

// Get user auth status and tier (for Methods Lab access control)
app.get('/api/auth/status', async (req, res) => {
  if (!supabase) {
    return res.json({ authenticated: false, tier: null });
  }

  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.json({ authenticated: false, tier: null });
  }

  try {
    const token = authHeader.split(' ')[1];
    const { data: { user }, error } = await supabase.auth.getUser(token);

    if (error || !user) {
      return res.json({ authenticated: false, tier: null });
    }

    // Get tier from user metadata or profile
    const tier = user.user_metadata?.membership_tier || 'community';

    res.json({
      authenticated: true,
      tier: tier,
      email: user.email
    });
  } catch (error) {
    console.error('Auth status check error:', error);
    res.json({ authenticated: false, tier: null });
  }
});

// =============================================
// SERVE HTML PAGES
// =============================================

// Catch-all: return 404 for unknown routes (prevents soft 404s for SEO)
app.get('*', (req, res) => {
  res.status(404).sendFile(path.join(__dirname, '../../public/404.html'));
});

app.listen(PORT, () => {
  console.log(`CAPHE website running on port ${PORT}`);
});
