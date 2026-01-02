/**
 * CAPHE Website - Peer Review Page Logic
 */

document.addEventListener('DOMContentLoaded', async () => {
  // Check authentication
  if (!await checkDashboardAuth()) {
    return;
  }

  // Set up logout link
  const logoutLink = document.getElementById('logout-link');
  if (logoutLink) {
    logoutLink.addEventListener('click', async (e) => {
      e.preventDefault();
      await logout();
    });
  }

  // Check if user is a professional member
  const isProfessional = await checkProfessionalMember();
  if (!isProfessional) {
    showProfessionalOnlyMessage();
    return;
  }

  // Meeting dates are now hardcoded in HTML (last Wednesday of each month)

  // Set up form submission
  const form = document.getElementById('peer-review-form');
  if (form) {
    form.addEventListener('submit', handleSubmitRequest);
  }

  // Load user's existing requests
  await loadMyRequests();
});

// Check if user is a professional member
async function checkProfessionalMember() {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return false;

    const membershipTier = user.user_metadata?.membership_tier;
    return membershipTier === 'member';
  } catch (error) {
    console.error('Error checking membership:', error);
    return false;
  }
}

// Show message for non-professional members
function showProfessionalOnlyMessage() {
  const formContainer = document.querySelector('.peer-review-form-container');
  if (formContainer) {
    formContainer.innerHTML = `
      <div class="card" style="text-align: center; padding: var(--space-2xl);">
        <img src="/assets/images/icons/icon-present.png" alt="" style="width: 64px; height: 64px; margin-bottom: var(--space-lg); opacity: 0.5;">
        <h2 style="margin-bottom: var(--space-md);">Professional Members Only</h2>
        <p class="text-muted" style="max-width: 400px; margin: 0 auto var(--space-lg);">
          Peer Review Sessions are available to Professional Members. Upgrade your membership to present your research and receive feedback from fellow health economists.
        </p>
        <a href="/membership/professional.html" class="btn btn-primary">Apply for Professional Membership</a>
      </div>
    `;
  }

  // Also update the sidebar
  const infoContainer = document.querySelector('.peer-review-info');
  if (infoContainer) {
    infoContainer.innerHTML = `
      <div class="card">
        <h3>Professional Member Benefits</h3>
        <ul style="list-style: disc; padding-left: var(--space-lg); margin-top: var(--space-md);">
          <li>Present work-in-progress at monthly peer review sessions</li>
          <li>Receive constructive feedback from fellow economists</li>
          <li>Access to member-only webinar recordings</li>
          <li>Priority registration for workshops</li>
        </ul>
      </div>
    `;
  }
}

// Check if user is authenticated
async function checkDashboardAuth() {
  if (!initSupabase()) {
    window.location.href = '/login.html';
    return false;
  }

  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    window.location.href = '/login.html';
    return false;
  }

  return true;
}

// Handle form submission
async function handleSubmitRequest(e) {
  e.preventDefault();

  const form = e.target;
  const statusDiv = document.getElementById('form-status');
  const submitBtn = form.querySelector('button[type="submit"]');

  const meetingDate = form.meeting_date.value;
  const meetingDate2 = form.meeting_date_2.value;
  const slotsRequested = parseInt(form.slots_requested.value);
  const topic = form.topic.value;
  const description = form.description.value;

  submitBtn.disabled = true;
  submitBtn.textContent = 'Submitting...';

  try {
    const { data: { user } } = await supabase.auth.getUser();

    const { error } = await supabase
      .from('peer_review_requests')
      .insert({
        user_id: user.id,
        meeting_date: meetingDate,
        meeting_date_2: meetingDate2,
        slots_requested: slotsRequested,
        topic: topic,
        description: description,
        status: 'pending'
      });

    if (error) throw error;

    statusDiv.innerHTML = '<p style="color: var(--color-success);">Request submitted! You\'ll receive confirmation within 3 business days.</p>';
    statusDiv.classList.remove('hidden');
    form.reset();

    // Reload requests list
    await loadMyRequests();

  } catch (error) {
    statusDiv.innerHTML = `<p style="color: var(--color-error);">${error.message}</p>`;
    statusDiv.classList.remove('hidden');
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = 'Submit Request';
  }
}

// Load user's peer review requests
async function loadMyRequests() {
  const container = document.getElementById('my-requests');
  if (!container) return;

  try {
    const { data: { user } } = await supabase.auth.getUser();

    const { data: requests, error } = await supabase
      .from('peer_review_requests')
      .select('*')
      .eq('user_id', user.id)
      .order('meeting_date', { ascending: true });

    if (error) throw error;

    if (requests && requests.length > 0) {
      container.innerHTML = requests.map(req => `
        <div class="request-item ${req.status}">
          <div class="request-date">
            ${new Date(req.meeting_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
          </div>
          <div class="request-details">
            <strong>${req.topic}</strong>
            <span class="request-status status-${req.status}">${req.status}</span>
          </div>
        </div>
      `).join('');
    } else {
      container.innerHTML = '<p class="text-muted">No pending requests</p>';
    }
  } catch (error) {
    console.log('Requests not loaded:', error.message);
    container.innerHTML = '<p class="text-muted">No pending requests</p>';
  }
}
