/**
 * CAPHE Methods Lab - Access Control
 * Protects community-tier labs from unauthenticated access
 * Uses preview-with-gate pattern for better UX
 */

(function() {
  // Supabase configuration
  const SUPABASE_URL = 'https://yyetprjdxwunhtighnrq.supabase.co';
  const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl5ZXRwcmpkeHd1bmh0aWdobnJxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjcwMzk2MDAsImV4cCI6MjA4MjYxNTYwMH0.xWguR4nFUGAflIy3iolYHUZFAY2ec0CGcFG2f8a-TWQ';

  // Get the lab title from the page
  function getLabTitle() {
    const titleEl = document.querySelector('h1');
    if (titleEl) return titleEl.textContent.trim();
    const pageTitle = document.title.split('|')[0].trim();
    return pageTitle || 'This Lab';
  }

  // Create the preview gate overlay
  function createPreviewGate() {
    const labTitle = getLabTitle();
    const currentPath = window.location.pathname;

    const overlay = document.createElement('div');
    overlay.id = 'access-preview-gate';
    overlay.innerHTML = `
      <style>
        /* Lock scrolling when gate is shown */
        html.access-locked, html.access-locked body {
          overflow: hidden !important;
          height: 100% !important;
        }

        #access-preview-gate {
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

        #access-preview-gate .gate-content {
          text-align: center;
          max-width: 520px;
          padding: 2.5rem 2rem;
          background: white;
          border-radius: 16px;
          box-shadow: 0 -10px 60px rgba(0, 65, 165, 0.15), 0 4px 20px rgba(0,0,0,0.08);
          border: 1px solid #E0E0E0;
          margin: 0 1rem;
        }

        #access-preview-gate .tier-badge {
          display: inline-block;
          background: linear-gradient(135deg, #1565C0 0%, #0D47A1 100%);
          color: white;
          padding: 0.35rem 1rem;
          border-radius: 100px;
          font-size: 0.7rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 1rem;
        }

        #access-preview-gate h2 {
          font-family: Georgia, 'Times New Roman', serif;
          color: #003080;
          margin-bottom: 0.5rem;
          font-size: 1.35rem;
          line-height: 1.3;
        }

        #access-preview-gate .subtitle {
          color: #424242;
          font-size: 0.95rem;
          margin-bottom: 1.25rem;
          line-height: 1.5;
        }

        #access-preview-gate .value-prop {
          margin-bottom: 1.5rem;
          font-size: 0.875rem;
          color: #424242;
          line-height: 1.6;
        }

        #access-preview-gate .value-prop strong {
          color: #003080;
        }

        #access-preview-gate .cta-buttons {
          display: flex;
          gap: 0.75rem;
          justify-content: center;
          flex-wrap: wrap;
          margin-bottom: 1rem;
        }

        #access-preview-gate .btn-create {
          display: inline-block;
          background: linear-gradient(135deg, #0041A5 0%, #003080 100%);
          color: white;
          padding: 0.875rem 1.75rem;
          border-radius: 8px;
          text-decoration: none;
          font-weight: 600;
          font-size: 0.95rem;
          transition: all 0.2s;
          box-shadow: 0 2px 8px rgba(0, 65, 165, 0.25);
        }

        #access-preview-gate .btn-create:hover {
          background: linear-gradient(135deg, #003080 0%, #002060 100%);
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(0, 65, 165, 0.3);
        }

        #access-preview-gate .btn-signin {
          display: inline-block;
          background: white;
          color: #0041A5;
          padding: 0.875rem 1.5rem;
          border-radius: 8px;
          text-decoration: none;
          font-weight: 500;
          font-size: 0.95rem;
          border: 1.5px solid #0041A5;
          transition: all 0.2s;
        }

        #access-preview-gate .btn-signin:hover {
          background: #f0f4ff;
        }

        #access-preview-gate .back-link {
          color: #666;
          font-size: 0.875rem;
          text-decoration: none;
        }

        #access-preview-gate .back-link:hover {
          color: #0041A5;
          text-decoration: underline;
        }

        @media (max-width: 600px) {
          #access-preview-gate {
            height: 80%;
            padding-bottom: 2rem;
          }
          #access-preview-gate .gate-content {
            padding: 1.75rem 1.25rem;
          }
          #access-preview-gate h2 {
            font-size: 1.2rem;
          }
          #access-preview-gate .cta-buttons {
            flex-direction: column;
          }
          #access-preview-gate .btn-create,
          #access-preview-gate .btn-signin {
            width: 100%;
            text-align: center;
          }
        }
      </style>
      <div class="gate-content" role="dialog" aria-modal="true" aria-labelledby="gate-title" aria-describedby="gate-description">
        <span class="tier-badge">Community Content</span>
        <h2 id="gate-title">Access: ${labTitle}</h2>
        <p class="subtitle" id="gate-description">
          Create an account to continue this lab and explore our full methods library.
        </p>
        <p class="value-prop">
          <strong>Community membership includes:</strong><br>
          Interactive methodology labs &bull; California case studies &bull; Webinar recordings
        </p>
        <div class="cta-buttons">
          <a href="/membership.html?redirect=${encodeURIComponent(currentPath)}" class="btn-create">
            Create Account
          </a>
          <a href="/login.html?redirect=${encodeURIComponent(currentPath)}" class="btn-signin">Sign In</a>
        </div>
        <a href="/methods-lab/" class="back-link">← Browse public labs instead</a>
      </div>
    `;
    return overlay;
  }

  // Check authentication on page load
  async function checkLabAccess() {
    // Wait for Supabase to be available
    if (!window.supabase) {
      // If Supabase isn't loaded, show gate and lock scrolling
      document.documentElement.classList.add('access-locked');
      document.body.appendChild(createPreviewGate());
      return;
    }

    try {
      const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
      const { data: { session } } = await supabaseClient.auth.getSession();

      if (!session) {
        // User is not logged in - show preview gate and lock scrolling
        document.documentElement.classList.add('access-locked');
        document.body.appendChild(createPreviewGate());
      }
      // If session exists, user is authenticated - allow full access
    } catch (error) {
      console.error('Auth check failed:', error);
      // On error, default to gated state for security
      document.documentElement.classList.add('access-locked');
      document.body.appendChild(createPreviewGate());
    }
  }

  // Run check when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', checkLabAccess);
  } else {
    checkLabAccess();
  }
})();
