/**
 * CAPHE Website - Documents Page Logic
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

  // Load documents
  await loadDocuments();
});

// Check if user is authenticated
async function checkDashboardAuth() {
  if (!initSupabase()) {
    window.location.href = '/login';
    return false;
  }

  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    window.location.href = '/login';
    return false;
  }

  return true;
}

// Load documents from database
async function loadDocuments() {
  const container = document.getElementById('documents-list');
  if (!container) return;

  try {
    const { data: documents, error } = await supabase
      .from('documents')
      .select('*')
      .eq('feedback_enabled', true)
      .order('created_at', { ascending: false });

    if (error) throw error;

    if (documents && documents.length > 0) {
      renderDocuments(documents);
    }
  } catch (error) {
    console.log('Documents not loaded:', error.message);
  }
}

// Render documents grid
function renderDocuments(documents) {
  const container = document.getElementById('documents-list');
  if (!container) return;

  container.innerHTML = documents.map(doc => `
    <div class="card document-card">
      <div class="document-icon">
        ${getDocumentIcon(doc.document_url)}
      </div>
      <div class="document-info">
        <h3 class="document-title">${doc.title}</h3>
        <p class="document-description">${doc.description || ''}</p>
        <div class="document-meta">
          Posted ${new Date(doc.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
        </div>
        <div class="document-actions mt-md">
          <a href="${doc.document_url}" target="_blank" class="btn btn-outline-dark">View Document</a>
          <button class="btn btn-primary" onclick="showFeedbackForm('${doc.id}', '${doc.title.replace(/'/g, "\\'")}')">Submit Feedback</button>
        </div>
      </div>
    </div>
  `).join('');
}

// Get appropriate icon based on document URL
function getDocumentIcon(url) {
  if (url.includes('docs.google.com')) {
    return '<span style="font-size: var(--font-size-3xl);">📝</span>';
  } else if (url.endsWith('.pdf')) {
    return '<span style="font-size: var(--font-size-3xl);">📄</span>';
  } else {
    return '<span style="font-size: var(--font-size-3xl);">📋</span>';
  }
}

// Show feedback form modal
function showFeedbackForm(documentId, title) {
  const modal = document.createElement('div');
  modal.className = 'feedback-modal';
  modal.innerHTML = `
    <div class="feedback-modal-overlay" onclick="this.parentElement.remove()"></div>
    <div class="feedback-modal-content">
      <button class="feedback-modal-close" onclick="this.parentElement.parentElement.remove()">&times;</button>
      <h3>Feedback for: ${title}</h3>
      <form id="feedback-form" onsubmit="submitFeedback(event, '${documentId}')">
        <div class="form-group">
          <label class="form-label" for="feedback-text">Your Feedback</label>
          <textarea id="feedback-text" name="feedback" class="form-input" rows="6" required
                    placeholder="Share your thoughts, suggestions, or questions about this document..."></textarea>
        </div>
        <div class="form-actions">
          <button type="button" class="btn btn-outline-dark" onclick="this.closest('.feedback-modal').remove()">Cancel</button>
          <button type="submit" class="btn btn-primary">Submit Feedback</button>
        </div>
        <div id="feedback-status" class="mt-lg text-center hidden"></div>
      </form>
    </div>
  `;
  document.body.appendChild(modal);
}

// Submit feedback
async function submitFeedback(e, documentId) {
  e.preventDefault();

  const form = e.target;
  const statusDiv = document.getElementById('feedback-status');
  const submitBtn = form.querySelector('button[type="submit"]');
  const feedback = form.feedback.value;

  submitBtn.disabled = true;
  submitBtn.textContent = 'Submitting...';

  try {
    const { data: { user } } = await supabase.auth.getUser();

    const { error } = await supabase
      .from('document_feedback')
      .insert({
        document_id: documentId,
        user_id: user.id,
        feedback: feedback
      });

    if (error) throw error;

    statusDiv.innerHTML = '<p style="color: var(--color-success);">Thank you! Your feedback has been submitted.</p>';
    statusDiv.classList.remove('hidden');

    // Close modal after delay
    setTimeout(() => {
      document.querySelector('.feedback-modal').remove();
    }, 2000);

  } catch (error) {
    statusDiv.innerHTML = `<p style="color: var(--color-error);">${error.message}</p>`;
    statusDiv.classList.remove('hidden');
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = 'Submit Feedback';
  }
}
