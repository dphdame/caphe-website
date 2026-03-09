/**
 * CAPHE Website - Recordings Page Logic
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

  // Set up filter tabs
  setupFilterTabs();

  // Load recordings
  await loadRecordings();
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

// Set up filter tab clicks
function setupFilterTabs() {
  const tabs = document.querySelectorAll('.filter-tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const filter = tab.dataset.filter;
      filterRecordings(filter);
    });
  });
}

// Load recordings from database
async function loadRecordings() {
  try {
    const { data: recordings, error } = await supabase
      .from('recordings')
      .select('*')
      .order('date', { ascending: false });

    if (error) throw error;

    if (recordings && recordings.length > 0) {
      renderRecordings(recordings);
    }
  } catch (error) {
    console.log('Recordings not loaded:', error.message);
  }
}

// Render recordings grid
function renderRecordings(recordings) {
  const grid = document.getElementById('recordings-grid');
  if (!grid) return;

  grid.innerHTML = recordings.map(rec => `
    <div class="card recording-card" data-category="${rec.category || 'webinar'}">
      <div class="recording-thumbnail">
        <img src="https://img.youtube.com/vi/${getYouTubeId(rec.video_url)}/hqdefault.jpg" alt="${rec.title}">
        <div class="play-overlay">&#9658;</div>
      </div>
      <div class="recording-info">
        <span class="recording-category">${rec.category || 'Webinar'}</span>
        <h3 class="recording-title">${rec.title}</h3>
        <p class="recording-description">${rec.description || ''}</p>
        <div class="recording-meta">
          ${rec.date ? new Date(rec.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : ''}
        </div>
        <a href="#" class="btn btn-outline-dark mt-md" onclick="openRecording('${rec.video_url}', '${rec.title.replace(/'/g, "\\'")}'); return false;">Watch Recording</a>
      </div>
    </div>
  `).join('');
}

// Extract YouTube video ID from URL
function getYouTubeId(url) {
  if (!url) return '';
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\s]+)/);
  return match ? match[1] : '';
}

// Filter recordings by category
function filterRecordings(category) {
  const cards = document.querySelectorAll('.recording-card');
  cards.forEach(card => {
    if (category === 'all' || card.dataset.category === category) {
      card.style.display = '';
    } else {
      card.style.display = 'none';
    }
  });
}

// Open recording in modal or new tab
function openRecording(videoUrl, title) {
  const youtubeId = getYouTubeId(videoUrl);
  if (youtubeId) {
    // Open in a simple modal
    const modal = document.createElement('div');
    modal.className = 'video-modal';
    modal.innerHTML = `
      <div class="video-modal-overlay" onclick="this.parentElement.remove()"></div>
      <div class="video-modal-content">
        <button class="video-modal-close" onclick="this.parentElement.parentElement.remove()">&times;</button>
        <h3>${title}</h3>
        <div class="video-embed">
          <iframe src="https://www.youtube.com/embed/${youtubeId}?autoplay=1" frameborder="0" allowfullscreen allow="autoplay"></iframe>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
  }
}
