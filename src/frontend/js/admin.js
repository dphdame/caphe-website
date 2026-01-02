// Admin page functionality
let currentSession = null;

document.addEventListener('DOMContentLoaded', async () => {
  const container = document.getElementById('applications-container');

  try {
    // Check if user is authenticated and admin
    currentSession = await checkSession();
    console.log('Session check result:', currentSession);

    if (!currentSession) {
      console.log('No session, redirecting to login...');
      window.location.href = '/login.html?redirect=/admin.html';
      return;
    }

    console.log('Session found, loading applications...');
    // Load applications
    await loadApplications();
  } catch (error) {
    console.error('Admin page error:', error);
    container.innerHTML = `
      <div class="error-state">
        <strong>Authentication Error</strong><br>
        ${error.message}<br><br>
        <a href="/login.html?redirect=/admin.html">Go to Login</a>
      </div>
    `;
  }
});

async function loadApplications() {
  const container = document.getElementById('applications-container');

  try {
    const response = await fetch('/api/admin/applications', {
      headers: {
        'Authorization': `Bearer ${currentSession.access_token}`
      }
    });

    if (response.status === 403) {
      container.innerHTML = `
        <div class="error-state">
          <strong>Access Denied</strong><br>
          You don't have admin privileges to view this page.
        </div>
      `;
      return;
    }

    if (!response.ok) {
      throw new Error('Failed to load applications');
    }

    const data = await response.json();
    const applications = data.applications || [];

    if (applications.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon">📭</div>
          <h3>No Pending Applications</h3>
          <p>All membership applications have been reviewed.</p>
        </div>
      `;
      return;
    }

    container.innerHTML = applications.map(app => createApplicationCard(app)).join('');

    // Add event listeners for approve/reject buttons
    container.querySelectorAll('.btn-approve').forEach(btn => {
      btn.addEventListener('click', () => handleApprove(btn.dataset.email));
    });

    container.querySelectorAll('.btn-reject').forEach(btn => {
      btn.addEventListener('click', () => handleReject(btn.dataset.email));
    });

  } catch (error) {
    console.error('Error loading applications:', error);
    container.innerHTML = `
      <div class="error-state">
        <strong>Error Loading Applications</strong><br>
        ${error.message}
      </div>
    `;
  }
}

function createApplicationCard(app) {
  const attrs = app.attributes || {};
  const name = `${attrs.FIRSTNAME || ''} ${attrs.LASTNAME || ''}`.trim() || 'Unknown';
  const email = app.email;
  const economicsWork = attrs.ECONOMICS_WORK || 'Not provided';
  const profileUrl = attrs.PROFILE_URL || attrs.LINKEDIN || '';
  const degreeAttestation = attrs.DEGREE_ATTESTATION === 'true' || attrs.DEGREE_ATTESTATION === 'Yes' || attrs.DEGREE_ATTESTATION === true;

  // Format date if available
  let dateStr = '';
  if (app.createdAt) {
    const date = new Date(app.createdAt);
    dateStr = date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

  return `
    <div class="application-card" id="app-${encodeURIComponent(email)}">
      <div class="application-header">
        <div>
          <h3 class="applicant-name">${escapeHtml(name)}</h3>
          <div class="applicant-email">${escapeHtml(email)}</div>
        </div>
        ${dateStr ? `<div class="application-date">Applied: ${dateStr}</div>` : ''}
      </div>

      <div class="application-details">
        <div class="detail-item">
          <div class="detail-label">Profile</div>
          <div class="detail-value">
            ${profileUrl ? `<a href="${escapeHtml(profileUrl)}" target="_blank" rel="noopener" class="profile-link">View Profile →</a>` : 'Not provided'}
          </div>
        </div>
        <div class="detail-item">
          <div class="detail-label">Economics Degree</div>
          <div class="detail-value">${degreeAttestation ? '✓ Confirmed' : '✗ Not confirmed'}</div>
        </div>
        <div class="detail-item economics-work">
          <div class="detail-label">Economics Work & Interests</div>
          <div class="detail-value">${escapeHtml(economicsWork)}</div>
        </div>
      </div>

      <div class="application-actions">
        <button class="btn btn-approve" data-email="${escapeHtml(email)}">
          ✓ Approve & Send Invite
        </button>
        <button class="btn btn-reject" data-email="${escapeHtml(email)}">
          ✗ Decline
        </button>
        <span class="action-status" id="status-${encodeURIComponent(email)}"></span>
      </div>
    </div>
  `;
}

async function handleApprove(email) {
  const statusEl = document.getElementById(`status-${encodeURIComponent(email)}`);
  const cardEl = document.getElementById(`app-${encodeURIComponent(email)}`);

  // Disable buttons
  const buttons = cardEl.querySelectorAll('button');
  buttons.forEach(btn => btn.disabled = true);

  statusEl.textContent = 'Processing...';
  statusEl.className = 'action-status';

  try {
    const response = await fetch('/api/admin/approve', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${currentSession.access_token}`
      },
      body: JSON.stringify({ email })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Failed to approve application');
    }

    statusEl.textContent = '✓ Approved! Invite sent.';
    statusEl.className = 'action-status success';

    // Remove card after delay
    setTimeout(() => {
      cardEl.style.opacity = '0';
      cardEl.style.transform = 'translateX(20px)';
      cardEl.style.transition = 'all 0.3s ease';
      setTimeout(() => {
        cardEl.remove();
        checkEmptyState();
      }, 300);
    }, 1500);

  } catch (error) {
    console.error('Error approving application:', error);
    statusEl.textContent = `Error: ${error.message}`;
    statusEl.className = 'action-status error';
    buttons.forEach(btn => btn.disabled = false);
  }
}

async function handleReject(email) {
  if (!confirm('Are you sure you want to decline this application? This will remove them from the applications list.')) {
    return;
  }

  const statusEl = document.getElementById(`status-${encodeURIComponent(email)}`);
  const cardEl = document.getElementById(`app-${encodeURIComponent(email)}`);

  // Disable buttons
  const buttons = cardEl.querySelectorAll('button');
  buttons.forEach(btn => btn.disabled = true);

  statusEl.textContent = 'Processing...';
  statusEl.className = 'action-status';

  try {
    const response = await fetch('/api/admin/reject', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${currentSession.access_token}`
      },
      body: JSON.stringify({ email })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Failed to reject application');
    }

    statusEl.textContent = '✓ Application declined.';
    statusEl.className = 'action-status success';

    // Remove card after delay
    setTimeout(() => {
      cardEl.style.opacity = '0';
      cardEl.style.transform = 'translateX(-20px)';
      cardEl.style.transition = 'all 0.3s ease';
      setTimeout(() => {
        cardEl.remove();
        checkEmptyState();
      }, 300);
    }, 1500);

  } catch (error) {
    console.error('Error rejecting application:', error);
    statusEl.textContent = `Error: ${error.message}`;
    statusEl.className = 'action-status error';
    buttons.forEach(btn => btn.disabled = false);
  }
}

function checkEmptyState() {
  const container = document.getElementById('applications-container');
  const cards = container.querySelectorAll('.application-card');

  if (cards.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">📭</div>
        <h3>No Pending Applications</h3>
        <p>All membership applications have been reviewed.</p>
      </div>
    `;
  }
}

function escapeHtml(text) {
  if (!text) return '';
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}
