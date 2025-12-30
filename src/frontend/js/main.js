/**
 * CAPHE Website - Main JavaScript
 */

// Mobile navigation toggle
document.addEventListener('DOMContentLoaded', () => {
  const mobileToggle = document.querySelector('.nav-mobile-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }

  // Contact form handling
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', handleContactSubmit);
  }

  // Listserv form handling
  const listservForm = document.getElementById('listserv-form');
  if (listservForm) {
    listservForm.addEventListener('submit', handleListservSubmit);
  }
});

// Contact form submission
async function handleContactSubmit(e) {
  e.preventDefault();

  const form = e.target;
  const statusDiv = document.getElementById('form-status');
  const submitBtn = form.querySelector('button[type="submit"]');

  // Get form data
  const formData = {
    name: form.name.value,
    email: form.email.value,
    subject: form.subject.value,
    message: form.message.value
  };

  // Disable button
  submitBtn.disabled = true;
  submitBtn.textContent = 'Sending...';

  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    const result = await response.json();

    if (response.ok) {
      statusDiv.innerHTML = '<p style="color: var(--color-success);">Message sent successfully! We\'ll get back to you soon.</p>';
      statusDiv.classList.remove('hidden');
      form.reset();
    } else {
      throw new Error(result.error || 'Failed to send message');
    }
  } catch (error) {
    statusDiv.innerHTML = `<p style="color: var(--color-error);">Error: ${error.message}</p>`;
    statusDiv.classList.remove('hidden');
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = 'Send Message';
  }
}

// Listserv form submission
async function handleListservSubmit(e) {
  e.preventDefault();

  const form = e.target;
  const statusDiv = document.getElementById('listserv-status');
  const submitBtn = form.querySelector('button[type="submit"]');

  // Get form data
  const formData = {
    email: document.getElementById('listserv-email').value,
    firstName: document.getElementById('listserv-firstName').value,
    lastName: document.getElementById('listserv-lastName').value,
    organization: document.getElementById('listserv-organization').value
  };

  // Disable button
  submitBtn.disabled = true;
  submitBtn.textContent = 'Subscribing...';

  try {
    const response = await fetch('/api/listserv/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    const result = await response.json();

    if (response.ok && result.success) {
      statusDiv.innerHTML = `<p style="color: var(--color-success);">${result.message}</p>`;
      statusDiv.classList.remove('hidden');
      form.reset();
    } else {
      throw new Error(result.error || 'Failed to subscribe');
    }
  } catch (error) {
    statusDiv.innerHTML = `<p style="color: var(--color-error);">Error: ${error.message}</p>`;
    statusDiv.classList.remove('hidden');
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = 'Subscribe to Updates';
  }
}

// Utility: Format currency
function formatCurrency(value) {
  if (value >= 1e9) {
    return '$' + (value / 1e9).toFixed(1) + 'B';
  } else if (value >= 1e6) {
    return '$' + (value / 1e6).toFixed(1) + 'M';
  } else if (value >= 1e3) {
    return '$' + (value / 1e3).toFixed(0) + 'K';
  }
  return '$' + value.toLocaleString();
}

// Utility: Format number with commas
function formatNumber(value) {
  return value.toLocaleString();
}
