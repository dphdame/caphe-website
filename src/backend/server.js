const express = require('express');
const path = require('path');
const nodemailer = require('nodemailer');
const Brevo = require('@getbrevo/brevo');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON and form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname, '../../public')));
app.use('/src', express.static(path.join(__dirname, '../../src')));
app.use('/assets', express.static(path.join(__dirname, '../../assets')));
app.use('/data', express.static(path.join(__dirname, '../../data')));

// Email configuration (Nodemailer for contact form)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'info@caphegroup.org',
    pass: process.env.EMAIL_PASS
  }
});

// =============================================
// BREVO EMAIL LIST INTEGRATION
// =============================================

let brevoContactsApi = null;
let brevoListIds = {
  general: null,   // General listserv (public updates)
  members: null,   // Members-only communications
  events: null     // Event registrants
};

if (process.env.BREVO_API_KEY) {
  const brevoApiInstance = new Brevo.ContactsApi();
  brevoApiInstance.setApiKey(Brevo.ContactsApiApiKeys.apiKey, process.env.BREVO_API_KEY);
  brevoContactsApi = brevoApiInstance;
  brevoListIds.general = parseInt(process.env.BREVO_LIST_ID) || 9;
  brevoListIds.members = parseInt(process.env.BREVO_MEMBERS_LIST_ID) || 13;
  brevoListIds.events = parseInt(process.env.BREVO_EVENTS_LIST_ID) || 14;
  console.log('Brevo API initialized with lists:', brevoListIds);
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
    EVENT_DATE: contactData.eventDate || ''
  };
  createContact.updateEnabled = true;

  return brevoContactsApi.createContact(createContact);
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

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const mailOptions = {
    from: process.env.EMAIL_USER || 'info@caphegroup.org',
    to: 'info@caphegroup.org',
    subject: `[CAPHE Website] ${subject}`,
    text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
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
  };

  try {
    await transporter.sendMail(mailOptions);
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
// SUPABASE AUTH (for member area)
// =============================================

const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
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

// =============================================
// SERVE HTML PAGES
// =============================================

// Catch-all: serve index.html for client-side routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/index.html'));
});

app.listen(PORT, () => {
  console.log(`CAPHE website running on port ${PORT}`);
});
