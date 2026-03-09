/**
 * CAPHE Methods Lab - Member Lab Access Control
 * Protects professional-tier labs - requires professional membership
 */

(function() {
  // Supabase configuration
  const SUPABASE_URL = 'https://yyetprjdxwunhtighnrq.supabase.co';
  const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl5ZXRwcmpkeHd1bmh0aWdobnJxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjcwMzk2MDAsImV4cCI6MjA4MjYxNTYwMH0.xWguR4nFUGAflIy3iolYHUZFAY2ec0CGcFG2f8a-TWQ';

  let supabaseClient = null;

  // Get the lab title from the page
  function getLabTitle() {
    const titleEl = document.querySelector('h1');
    if (titleEl) return titleEl.textContent.trim();
    const pageTitle = document.title.split('|')[0].trim();
    return pageTitle || 'This Lab';
  }

  // Update the nav bar to show logged-in state
  function updateNavBar(session, tier) {
    const topBar = document.querySelector('.nav-top-bar .container');
    if (!topBar) return;

    const tierLabel = (tier === 'professional' || tier === 'member') ? 'Professional' : 'Community';
    topBar.innerHTML = `
      <span style="color: rgba(255,255,255,0.8);">${tierLabel} Member</span>
      <a href="/settings">Settings</a>
      <a href="#" id="logout-link">Log Out</a>
    `;

    // Set up logout handler
    const logoutLink = document.getElementById('logout-link');
    if (logoutLink) {
      logoutLink.addEventListener('click', async (e) => {
        e.preventDefault();
        if (supabaseClient) {
          await supabaseClient.auth.signOut();
        }
        window.location.href = '/login';
      });
    }
  }

  // Create the access gate overlay for non-professional members
  function createMemberGate(isLoggedIn) {
    const labTitle = getLabTitle();
    const currentPath = window.location.pathname;

    const overlay = document.createElement('div');
    overlay.id = 'member-access-gate';

    // Different messaging for logged-in community members vs not logged in
    const gateContent = isLoggedIn ? `
      <span class="tier-badge">Professional Content</span>
      <h2 id="gate-title">${labTitle}</h2>
      <p class="subtitle" id="gate-description">
        This lab is available to Professional Members only.
      </p>
      <p class="value-prop">
        <strong>Professional membership includes:</strong><br>
        Advanced methodology labs &bull; Peer review sessions &bull; Working groups
      </p>
      <div class="cta-buttons">
        <a href="/membership/professional" class="btn-create">
          Apply for Professional Membership
        </a>
      </div>
      <a href="/methods-lab/" class="back-link">&larr; Browse available labs</a>
    ` : `
      <span class="tier-badge">Professional Content</span>
      <h2 id="gate-title">${labTitle}</h2>
      <p class="subtitle" id="gate-description">
        Sign in with a Professional Member account to access this lab.
      </p>
      <p class="value-prop">
        <strong>Professional membership includes:</strong><br>
        Advanced methodology labs &bull; Peer review sessions &bull; Working groups
      </p>
      <div class="cta-buttons">
        <a href="/login?redirect=${encodeURIComponent(currentPath)}" class="btn-create">
          Sign In
        </a>
        <a href="/membership/professional" class="btn-signin">Apply for Membership</a>
      </div>
      <a href="/methods-lab/" class="back-link">&larr; Browse public labs</a>
    `;

    overlay.innerHTML = `
      <style>
        /* Lock scrolling when gate is shown */
        html.member-access-locked, html.member-access-locked body {
          overflow: hidden !important;
          height: 100% !important;
        }

        #member-access-gate {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            to bottom,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0) 25%,
            rgba(255, 255, 255, 0.85) 35%,
            rgba(255, 255, 255, 0.98) 45%,
            rgba(255, 255, 255, 1) 55%
          );
          z-index: 10000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding-top: 15vh;
          font-family: 'Segoe UI', 'Helvetica Neue', Arial, sans-serif;
        }

        #member-access-gate .gate-content {
          text-align: center;
          max-width: 520px;
          padding: 2.5rem 2rem;
          background: white;
          border-radius: 16px;
          box-shadow: 0 -10px 60px rgba(0, 65, 165, 0.15), 0 4px 20px rgba(0,0,0,0.08);
          border: 1px solid #E0E0E0;
          margin: 0 1rem;
        }

        #member-access-gate .tier-badge {
          display: inline-block;
          background: linear-gradient(135deg, #0D9488 0%, #047857 100%);
          color: white;
          padding: 0.35rem 1rem;
          border-radius: 100px;
          font-size: 0.7rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 1rem;
        }

        #member-access-gate h2 {
          font-family: Georgia, 'Times New Roman', serif;
          color: #003080;
          margin-bottom: 0.5rem;
          font-size: 1.35rem;
          line-height: 1.3;
        }

        #member-access-gate .subtitle {
          color: #424242;
          font-size: 0.95rem;
          margin-bottom: 1.25rem;
          line-height: 1.5;
        }

        #member-access-gate .value-prop {
          margin-bottom: 1.5rem;
          font-size: 0.875rem;
          color: #424242;
          line-height: 1.6;
        }

        #member-access-gate .value-prop strong {
          color: #003080;
        }

        #member-access-gate .cta-buttons {
          display: flex;
          gap: 0.75rem;
          justify-content: center;
          flex-wrap: wrap;
          margin-bottom: 1rem;
        }

        #member-access-gate .btn-create {
          display: inline-block;
          background: linear-gradient(135deg, #0D9488 0%, #047857 100%);
          color: white;
          padding: 0.875rem 1.75rem;
          border-radius: 8px;
          text-decoration: none;
          font-weight: 600;
          font-size: 0.95rem;
          transition: all 0.2s;
          box-shadow: 0 2px 8px rgba(13, 148, 136, 0.25);
        }

        #member-access-gate .btn-create:hover {
          background: linear-gradient(135deg, #047857 0%, #065f46 100%);
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(13, 148, 136, 0.3);
        }

        #member-access-gate .btn-signin {
          display: inline-block;
          background: white;
          color: #0D9488;
          padding: 0.875rem 1.5rem;
          border-radius: 8px;
          text-decoration: none;
          font-weight: 500;
          font-size: 0.95rem;
          border: 1.5px solid #0D9488;
          transition: all 0.2s;
        }

        #member-access-gate .btn-signin:hover {
          background: #f0fdf4;
        }

        #member-access-gate .back-link {
          color: #666;
          font-size: 0.875rem;
          text-decoration: none;
        }

        #member-access-gate .back-link:hover {
          color: #0D9488;
          text-decoration: underline;
        }

        @media (max-width: 600px) {
          #member-access-gate {
            height: 80%;
            padding-bottom: 2rem;
          }
          #member-access-gate .gate-content {
            padding: 1.75rem 1.25rem;
          }
          #member-access-gate h2 {
            font-size: 1.2rem;
          }
          #member-access-gate .cta-buttons {
            flex-direction: column;
          }
          #member-access-gate .btn-create,
          #member-access-gate .btn-signin {
            width: 100%;
            text-align: center;
          }
        }
      </style>
      <div class="gate-content" role="dialog" aria-modal="true" aria-labelledby="gate-title" aria-describedby="gate-description">
        ${gateContent}
      </div>
    `;
    return overlay;
  }

  // Show the gate
  function showGate(isLoggedIn) {
    document.documentElement.classList.add('member-access-locked');
    document.body.appendChild(createMemberGate(isLoggedIn));
  }

  // Wait for Supabase to be available (max 3 seconds)
  function waitForSupabase(maxWait = 3000) {
    return new Promise((resolve) => {
      if (window.supabase) {
        resolve(true);
        return;
      }

      const startTime = Date.now();
      const checkInterval = setInterval(() => {
        if (window.supabase) {
          clearInterval(checkInterval);
          resolve(true);
        } else if (Date.now() - startTime > maxWait) {
          clearInterval(checkInterval);
          resolve(false);
        }
      }, 50);
    });
  }

  // Check authentication and membership tier on page load
  async function checkMemberLabAccess() {
    console.log('[Member Lab] Starting access check...');

    // Wait for Supabase to be available
    const supabaseAvailable = await waitForSupabase();

    if (!supabaseAvailable) {
      console.log('[Member Lab] Supabase not available after waiting, showing gate');
      showGate(false);
      return;
    }

    try {
      console.log('[Member Lab] Creating Supabase client...');
      supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

      console.log('[Member Lab] Getting session...');
      const { data: { session }, error: sessionError } = await supabaseClient.auth.getSession();

      if (sessionError) {
        console.error('[Member Lab] Session error:', sessionError);
        showGate(false);
        return;
      }

      console.log('[Member Lab] Session exists:', !!session);

      if (!session) {
        console.log('[Member Lab] No session, showing login gate');
        showGate(false);
        return;
      }

      // User is logged in
      console.log('[Member Lab] User email:', session.user?.email);
      console.log('[Member Lab] User metadata:', session.user?.user_metadata);

      // Check tier
      const rawTier = session.user.user_metadata?.membership_tier || 'community';
      // Accept both 'professional' and legacy 'member' values
      const isProfessional = (rawTier === 'professional' || rawTier === 'member');

      console.log('[Member Lab] Raw tier:', rawTier, '| Is professional:', isProfessional);

      // Update nav bar to show logged-in state
      updateNavBar(session, rawTier);

      if (!isProfessional) {
        console.log('[Member Lab] Community member, showing upgrade gate');
        showGate(true);
        return;
      }

      // Professional member - allow full access
      console.log('[Member Lab] ACCESS GRANTED for professional member');

    } catch (error) {
      console.error('[Member Lab] Auth check failed:', error);
      showGate(false);
    }
  }

  // Run check when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', checkMemberLabAccess);
  } else {
    checkMemberLabAccess();
  }
})();
