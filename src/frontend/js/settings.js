/**
 * CAPHE Website - Settings Page Logic
 */

document.addEventListener('DOMContentLoaded', async () => {
  // Check authentication
  if (!await checkSettingsAuth()) {
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

  // Load current profile data
  await loadProfileData();

  // Set up form submissions
  const profileForm = document.getElementById('profile-form');
  if (profileForm) {
    profileForm.addEventListener('submit', handleProfileUpdate);
  }

  const passwordForm = document.getElementById('password-form');
  if (passwordForm) {
    passwordForm.addEventListener('submit', handlePasswordChange);
  }

  const emailForm = document.getElementById('email-form');
  if (emailForm) {
    emailForm.addEventListener('submit', handleEmailChange);
  }
});

// Check if user is authenticated
async function checkSettingsAuth() {
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

// Load current profile data
async function loadProfileData() {
  try {
    const { data: { user } } = await supabaseClient.auth.getUser();

    if (user) {
      // Populate email field
      const emailInput = document.getElementById('new-email');
      if (emailInput) {
        emailInput.value = user.email;
      }

      // Display membership tier
      const tierEl = document.getElementById('membership-tier');
      if (tierEl) {
        const tier = user.user_metadata?.membership_tier || 'community';
        const tierLabels = {
          'member': 'Professional Member',
          'affiliate': 'Community Member',
          'community': 'Community Member'
        };
        tierEl.textContent = tierLabels[tier] || tier;
        tierEl.className = `badge badge-${tier === 'member' ? 'primary' : 'secondary'}`;
      }

      // Try to get profile from profiles table
      const { data: profile } = await supabaseClient
        .from('profiles')
        .select('full_name, organization, county')
        .eq('id', user.id)
        .single();

      // Populate form fields
      const fullNameInput = document.getElementById('full-name');
      const organizationInput = document.getElementById('organization');
      const countyInput = document.getElementById('county');

      if (fullNameInput) {
        fullNameInput.value = profile?.full_name || user.user_metadata?.full_name || '';
      }
      if (organizationInput) {
        organizationInput.value = profile?.organization || '';
      }
      if (countyInput) {
        countyInput.value = profile?.county || '';
      }
    }
  } catch (error) {
    console.log('Profile data not loaded:', error.message);
  }
}

// Handle profile update
async function handleProfileUpdate(e) {
  e.preventDefault();

  const form = e.target;
  const statusDiv = document.getElementById('profile-status');
  const submitBtn = document.getElementById('save-profile-btn');

  const fullName = form.full_name.value.trim();
  const organization = form.organization.value.trim();
  const county = form.county.value.trim();

  submitBtn.disabled = true;
  submitBtn.textContent = 'Saving...';

  try {
    const { data: { user } } = await supabaseClient.auth.getUser();

    // Update profiles table
    const { error: profileError } = await supabaseClient
      .from('profiles')
      .upsert({
        id: user.id,
        full_name: fullName,
        organization: organization,
        county: county,
        updated_at: new Date().toISOString()
      });

    if (profileError) throw profileError;

    // Also update user metadata
    const { error: metaError } = await supabaseClient.auth.updateUser({
      data: { full_name: fullName }
    });

    if (metaError) throw metaError;

    statusDiv.innerHTML = '<p class="text-success">Profile updated successfully!</p>';
    statusDiv.classList.remove('hidden');

    // Hide success message after 3 seconds
    setTimeout(() => {
      statusDiv.classList.add('hidden');
    }, 3000);

  } catch (error) {
    statusDiv.innerHTML = `<p class="text-error">${error.message}</p>`;
    statusDiv.classList.remove('hidden');
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = 'Save Changes';
  }
}

// Handle password change
async function handlePasswordChange(e) {
  e.preventDefault();

  const form = e.target;
  const statusDiv = document.getElementById('password-status');
  const submitBtn = document.getElementById('change-password-btn');

  const newPassword = form.new_password.value;
  const confirmPassword = form.confirm_password.value;

  // Validate passwords match
  if (newPassword !== confirmPassword) {
    statusDiv.innerHTML = '<p class="text-error">Passwords do not match.</p>';
    statusDiv.classList.remove('hidden');
    return;
  }

  // Validate password length
  if (newPassword.length < 8) {
    statusDiv.innerHTML = '<p class="text-error">Password must be at least 8 characters.</p>';
    statusDiv.classList.remove('hidden');
    return;
  }

  submitBtn.disabled = true;
  submitBtn.textContent = 'Updating...';

  try {
    const { error } = await supabaseClient.auth.updateUser({
      password: newPassword
    });

    if (error) throw error;

    statusDiv.innerHTML = '<p class="text-success">Password updated successfully!</p>';
    statusDiv.classList.remove('hidden');

    // Clear form
    form.reset();

    // Hide success message after 3 seconds
    setTimeout(() => {
      statusDiv.classList.add('hidden');
    }, 3000);

  } catch (error) {
    statusDiv.innerHTML = `<p class="text-error">${error.message}</p>`;
    statusDiv.classList.remove('hidden');
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = 'Update Password';
  }
}

// Handle email change
async function handleEmailChange(e) {
  e.preventDefault();

  const form = e.target;
  const statusDiv = document.getElementById('email-status');
  const submitBtn = document.getElementById('change-email-btn');

  const newEmail = form.new_email.value.trim();

  // Get current email to check if it changed
  const { data: { user } } = await supabaseClient.auth.getUser();
  if (user && user.email === newEmail) {
    statusDiv.innerHTML = '<p class="text-muted">This is already your current email address.</p>';
    statusDiv.classList.remove('hidden');
    return;
  }

  submitBtn.disabled = true;
  submitBtn.textContent = 'Updating...';

  try {
    const { error } = await supabaseClient.auth.updateUser({
      email: newEmail
    });

    if (error) throw error;

    statusDiv.innerHTML = `
      <p class="text-success">
        Verification email sent to <strong>${newEmail}</strong>.<br>
        Please click the link in that email to confirm the change.
      </p>
    `;
    statusDiv.classList.remove('hidden');

  } catch (error) {
    statusDiv.innerHTML = `<p class="text-error">${error.message}</p>`;
    statusDiv.classList.remove('hidden');
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = 'Update Email';
  }
}
