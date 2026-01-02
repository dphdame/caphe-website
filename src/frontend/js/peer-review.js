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

  // Meeting dates are now hardcoded in HTML (last Wednesday of each month)

  // Set up form submission
  const form = document.getElementById('peer-review-form');
  if (form) {
    form.addEventListener('submit', handleSubmitRequest);
  }

  // Load user's existing requests
  await loadMyRequests();
});

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
