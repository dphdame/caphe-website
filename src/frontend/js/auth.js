/**
 * CAPHE Website - Authentication
 * Uses Supabase for member authentication
 */

// Supabase configuration loaded from /api/config.js (Origin-gated)
let SUPABASE_URL = (window.CAPHE_CONFIG && window.CAPHE_CONFIG.supabaseUrl) || '';
let SUPABASE_ANON_KEY = (window.CAPHE_CONFIG && window.CAPHE_CONFIG.supabaseAnonKey) || '';

let supabaseClient = null;

// Lazy-load /api/config.js if not yet present, then populate the keys
async function ensureConfigLoaded() {
  if (window.CAPHE_CONFIG) {
    SUPABASE_URL = window.CAPHE_CONFIG.supabaseUrl || '';
    SUPABASE_ANON_KEY = window.CAPHE_CONFIG.supabaseAnonKey || '';
    return;
  }
  await new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.src = '/api/config.js';
    s.onload = resolve;
    s.onerror = () => reject(new Error('Failed to load /api/config.js'));
    document.head.appendChild(s);
  }).catch((e) => console.error('CAPHE config load failed:', e));
  SUPABASE_URL = (window.CAPHE_CONFIG && window.CAPHE_CONFIG.supabaseUrl) || '';
  SUPABASE_ANON_KEY = (window.CAPHE_CONFIG && window.CAPHE_CONFIG.supabaseAnonKey) || '';
}

// Initialize Supabase client
async function initSupabase() {
  await ensureConfigLoaded();
  if (SUPABASE_URL && SUPABASE_ANON_KEY && window.supabase) {
    supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    return true;
  }
  return false;
}

document.addEventListener('DOMContentLoaded', () => {
  console.log('Auth.js loaded');
  console.log('window.supabase available:', !!window.supabase);

  const loginForm = document.getElementById('login-form');
  const forgotPassword = document.getElementById('forgot-password');

  if (loginForm) {
    console.log('Login form found, attaching handler');
    loginForm.addEventListener('submit', handleLogin);
  }

  if (forgotPassword) {
    forgotPassword.addEventListener('click', handleForgotPassword);
  }

  // Check if already logged in
  checkAuth();
});

// Check authentication status
async function checkAuth() {
  if (!initSupabase()) {
    console.log('Supabase not configured - member area disabled');
    return;
  }

  const { data: { session } } = await supabaseClient.auth.getSession();

  if (session) {
    // User is logged in - redirect to intended destination or dashboard
    if (window.location.pathname === '/login') {
      const params = new URLSearchParams(window.location.search);
      const redirect = params.get('redirect');
      // Only allow redirects to same-origin paths starting with /
      if (redirect && redirect.startsWith('/') && !redirect.startsWith('//')) {
        window.location.href = redirect;
      } else {
        window.location.href = '/dashboard';
      }
    }
  }
}

// Handle login
async function handleLogin(e) {
  e.preventDefault();
  console.log('handleLogin called');

  const form = e.target;
  const statusDiv = document.getElementById('login-status');
  const submitBtn = form.querySelector('button[type="submit"]');

  const email = form.email.value;
  const password = form.password.value;
  console.log('Attempting login for:', email);

  // Check if Supabase is configured
  if (!initSupabase()) {
    console.log('Supabase init failed');
    statusDiv.innerHTML = '<p style="color: var(--color-warning);">Member login is not yet configured. Please contact us to join.</p>';
    statusDiv.classList.remove('hidden');
    return;
  }

  console.log('Supabase initialized, calling signInWithPassword...');
  submitBtn.disabled = true;
  submitBtn.textContent = 'Signing in...';

  try {
    const { data, error } = await supabaseClient.auth.signInWithPassword({
      email,
      password
    });

    console.log('Supabase response - data:', data, 'error:', error);

    if (error) throw error;

    // Success - redirect to intended destination or dashboard
    console.log('Login successful, redirecting...');
    const params = new URLSearchParams(window.location.search);
    const redirect = params.get('redirect');
    // Only allow redirects to same-origin paths starting with /
    if (redirect && redirect.startsWith('/') && !redirect.startsWith('//')) {
      window.location.href = redirect;
    } else {
      window.location.href = '/dashboard';
    }
  } catch (error) {
    console.error('Login error:', error);
    let msg = error.message;
    if (msg === 'Failed to fetch' || msg.includes('fetch failed') || msg.includes('NetworkError')) {
      msg = 'Login service is temporarily unavailable. Please try again in a few minutes or contact info@caphegroup.org if the issue persists.';
    }
    statusDiv.innerHTML = `<p style="color: var(--color-error);">${msg}</p>`;
    statusDiv.classList.remove('hidden');
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = 'Sign In';
  }
}

// Handle forgot password
async function handleForgotPassword(e) {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const statusDiv = document.getElementById('login-status');

  if (!email) {
    statusDiv.innerHTML = '<p style="color: var(--color-warning);">Please enter your email address first.</p>';
    statusDiv.classList.remove('hidden');
    return;
  }

  if (!initSupabase()) {
    statusDiv.innerHTML = '<p style="color: var(--color-warning);">Password reset is not configured. Please contact us.</p>';
    statusDiv.classList.remove('hidden');
    return;
  }

  try {
    const { error } = await supabaseClient.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin + '/reset-password'
    });

    if (error) throw error;

    statusDiv.innerHTML = '<p style="color: var(--color-success);">Password reset email sent! Check your inbox.</p>';
    statusDiv.classList.remove('hidden');
  } catch (error) {
    statusDiv.innerHTML = `<p style="color: var(--color-error);">${error.message}</p>`;
    statusDiv.classList.remove('hidden');
  }
}

// Logout function (for use on dashboard)
async function logout() {
  try {
    // Ensure Supabase is initialized
    if (!supabaseClient) {
      initSupabase();
    }
    if (supabaseClient) {
      await supabaseClient.auth.signOut();
    }
  } catch (error) {
    console.error('Logout error:', error);
  }
  // Always redirect to login
  window.location.href = '/login';
}

// Check session for protected pages (used by admin.js, dashboard.js)
async function checkSession() {
  if (!initSupabase()) {
    console.log('Supabase not configured');
    return null;
  }

  const { data: { session } } = await supabaseClient.auth.getSession();
  return session;
}
