/**
 * CAPHE Methods Lab - Access Control
 * Protects community-tier labs from unauthenticated access
 */

(function() {
  // Supabase configuration
  const SUPABASE_URL = 'https://yyetprjdxwunhtighnrq.supabase.co';
  const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl5ZXRwcmpkeHd1bmh0aWdobnJxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjcwMzk2MDAsImV4cCI6MjA4MjYxNTYwMH0.xWguR4nFUGAflIy3iolYHUZFAY2ec0CGcFG2f8a-TWQ';

  // Create locked overlay HTML
  function createLockedOverlay() {
    const overlay = document.createElement('div');
    overlay.id = 'access-locked-overlay';
    overlay.innerHTML = `
      <style>
        #access-locked-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(255, 255, 255, 0.98);
          z-index: 10000;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Segoe UI', 'Helvetica Neue', Arial, sans-serif;
        }
        #access-locked-overlay .locked-content {
          text-align: center;
          max-width: 480px;
          padding: 3rem 2rem;
          background: white;
          border-radius: 12px;
          box-shadow: 0 10px 40px rgba(0, 65, 165, 0.15);
          border: 1px solid #E0E0E0;
        }
        #access-locked-overlay .lock-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
          color: #0041A5;
        }
        #access-locked-overlay h2 {
          font-family: Georgia, 'Times New Roman', serif;
          color: #003080;
          margin-bottom: 0.75rem;
          font-size: 1.5rem;
        }
        #access-locked-overlay p {
          color: #424242;
          margin-bottom: 1.5rem;
          line-height: 1.6;
        }
        #access-locked-overlay .btn-login {
          display: inline-block;
          background: #0041A5;
          color: white;
          padding: 0.875rem 2rem;
          border-radius: 6px;
          text-decoration: none;
          font-weight: 600;
          font-size: 1rem;
          transition: background 0.2s;
          margin-right: 0.5rem;
        }
        #access-locked-overlay .btn-login:hover {
          background: #003080;
        }
        #access-locked-overlay .btn-back {
          display: inline-block;
          color: #0041A5;
          padding: 0.875rem 1.5rem;
          text-decoration: none;
          font-weight: 500;
          font-size: 0.9375rem;
        }
        #access-locked-overlay .btn-back:hover {
          text-decoration: underline;
        }
        #access-locked-overlay .tier-badge {
          display: inline-block;
          background: #1565C0;
          color: white;
          padding: 0.25rem 0.75rem;
          border-radius: 100px;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 1rem;
        }
      </style>
      <div class="locked-content">
        <div class="lock-icon">&#128274;</div>
        <span class="tier-badge">Community Member Content</span>
        <h2>Sign In Required</h2>
        <p>
          This lab is available to CAPHE community members and above.
          Sign in to access this content, or explore our
          <a href="/methods-lab/">public labs</a>.
        </p>
        <div>
          <a href="/login.html?redirect=${encodeURIComponent(window.location.pathname)}" class="btn-login">Sign In</a>
          <a href="/methods-lab/" class="btn-back">Back to Labs</a>
        </div>
      </div>
    `;
    return overlay;
  }

  // Check authentication on page load
  async function checkLabAccess() {
    // Wait for Supabase to be available
    if (!window.supabase) {
      // If Supabase isn't loaded, show locked state
      document.body.appendChild(createLockedOverlay());
      return;
    }

    try {
      const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
      const { data: { session } } = await supabaseClient.auth.getSession();

      if (!session) {
        // User is not logged in - show locked overlay
        document.body.appendChild(createLockedOverlay());
      }
      // If session exists, user is authenticated - allow access
    } catch (error) {
      console.error('Auth check failed:', error);
      // On error, default to locked state for security
      document.body.appendChild(createLockedOverlay());
    }
  }

  // Run check when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', checkLabAccess);
  } else {
    checkLabAccess();
  }
})();
