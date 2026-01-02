/**
 * CAPHE Website - Dashboard Logic
 * Handles member dashboard functionality
 */

// Admin emails - users with these emails will see admin panel
const ADMIN_EMAILS = [
  'info@caphegroup.org',
  'victoriaeperez@gmail.com'
];

document.addEventListener('DOMContentLoaded', async () => {
  // Check if user is authenticated
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

  // Load member profile and check admin status
  await loadMemberProfile();

  // Load dashboard data
  await loadDashboardData();
});

// Check if user is authenticated for dashboard
async function checkDashboardAuth() {
  if (!initSupabase()) {
    window.location.href = '/login.html';
    return false;
  }

  const { data: { session } } = await supabaseClient.auth.getSession();

  if (!session) {
    window.location.href = '/login.html';
    return false;
  }

  return true;
}

// Load member profile
async function loadMemberProfile() {
  try {
    const { data: { user } } = await supabaseClient.auth.getUser();

    if (user) {
      // Try to get profile from profiles table
      const { data: profile } = await supabaseClient
        .from('profiles')
        .select('full_name, organization')
        .eq('id', user.id)
        .single();

      const memberNameEl = document.getElementById('member-name');
      if (memberNameEl) {
        // Extract first name only
        let firstName = '';
        if (profile && profile.full_name) {
          firstName = profile.full_name.split(' ')[0];
        } else if (user.user_metadata?.full_name) {
          firstName = user.user_metadata.full_name.split(' ')[0];
        } else {
          firstName = user.email.split('@')[0];
        }
        memberNameEl.textContent = firstName;
      }

      // Check if user is admin and show admin action
      if (ADMIN_EMAILS.includes(user.email.toLowerCase())) {
        const adminAction = document.getElementById('admin-action');
        if (adminAction) {
          adminAction.style.display = '';
        }
      }
    }
  } catch (error) {
    console.log('Profile not loaded:', error.message);
  }
}

// Load dashboard data (recordings, peer reviews, documents)
async function loadDashboardData() {
  // This will be populated with real data once tables are created
  // For now, using placeholder content in HTML

  try {
    // Load recent recordings count
    const { count: recordingsCount } = await supabaseClient
      .from('recordings')
      .select('*', { count: 'exact', head: true });

    // Load user's peer review requests
    const { data: { user } } = await supabaseClient.auth.getUser();
    if (user) {
      const { data: peerReviews } = await supabaseClient
        .from('peer_review_requests')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(3);

      // Update activity list if we have peer review data
      if (peerReviews && peerReviews.length > 0) {
        updateActivityWithPeerReviews(peerReviews);
      }
    }

    // Load documents awaiting feedback
    const { data: documents } = await supabaseClient
      .from('documents')
      .select('*')
      .eq('feedback_enabled', true)
      .order('created_at', { ascending: false })
      .limit(3);

    if (documents && documents.length > 0) {
      updateActivityWithDocuments(documents);
    }

  } catch (error) {
    // Tables may not exist yet - that's okay
    console.log('Dashboard data not fully loaded:', error.message);
  }
}

// Update activity list with peer review requests
function updateActivityWithPeerReviews(peerReviews) {
  // Implementation for when we have real data
}

// Update activity list with documents
function updateActivityWithDocuments(documents) {
  // Implementation for when we have real data
}
