/**
 * Sync Brevo Applications to Supabase
 *
 * This script fetches all contacts from Brevo's applications list (list 15)
 * and ensures they exist in the Supabase membership_applications table.
 *
 * Run with:
 *   export $(grep -v '^#' .env.local | xargs) && node scripts/sync-brevo-applications.js
 */

const { createClient } = require('@supabase/supabase-js');

const BREVO_API_KEY = process.env.BREVO_API_KEY;
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const BREVO_APPLICATIONS_LIST_ID = process.env.BREVO_APPLICATIONS_LIST_ID || 15;

if (!BREVO_API_KEY || !SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  console.error('Missing required environment variables:');
  if (!BREVO_API_KEY) console.error('  - BREVO_API_KEY');
  if (!SUPABASE_URL) console.error('  - SUPABASE_URL');
  if (!SUPABASE_SERVICE_KEY) console.error('  - SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

async function getBrevoContacts() {
  console.log(`Fetching contacts from Brevo list ${BREVO_APPLICATIONS_LIST_ID}...`);

  const response = await fetch(
    `https://api.brevo.com/v3/contacts/lists/${BREVO_APPLICATIONS_LIST_ID}/contacts?limit=500&offset=0`,
    {
      method: 'GET',
      headers: {
        'api-key': BREVO_API_KEY,
        'Accept': 'application/json'
      }
    }
  );

  if (!response.ok) {
    throw new Error(`Brevo API error: ${response.status}`);
  }

  const data = await response.json();
  return data.contacts || [];
}

async function getExistingApplications() {
  console.log('Fetching existing applications from Supabase...');

  const { data, error } = await supabase
    .from('membership_applications')
    .select('email');

  if (error) {
    throw new Error(`Supabase error: ${error.message}`);
  }

  return new Set(data.map(row => row.email.toLowerCase()));
}

async function insertApplication(contact) {
  const attrs = contact.attributes || {};

  const application = {
    email: contact.email,
    first_name: attrs.FIRSTNAME || null,
    last_name: attrs.LASTNAME || null,
    economics_work: attrs.ECONOMICS_WORK || null,
    profile_url: attrs.PROFILE_URL || null,
    degree_attestation: attrs.DEGREE_ATTESTATION === 'Yes' || attrs.DEGREE_ATTESTATION === 'true',
    decision: 'pending',
    applied_at: contact.createdAt || new Date().toISOString()
  };

  const { error } = await supabase
    .from('membership_applications')
    .insert(application);

  if (error) {
    console.error(`  ❌ Failed to insert ${contact.email}: ${error.message}`);
    return false;
  }

  console.log(`  ✅ Added: ${contact.email} (${attrs.FIRSTNAME} ${attrs.LASTNAME})`);
  return true;
}

async function main() {
  console.log('=== Brevo to Supabase Application Sync ===\n');

  try {
    // Get contacts from Brevo
    const brevoContacts = await getBrevoContacts();
    console.log(`Found ${brevoContacts.length} contacts in Brevo applications list\n`);

    if (brevoContacts.length === 0) {
      console.log('No contacts to sync.');
      return;
    }

    // Get existing applications from Supabase
    const existingEmails = await getExistingApplications();
    console.log(`Found ${existingEmails.size} existing applications in Supabase\n`);

    // Find missing applications
    const missingContacts = brevoContacts.filter(
      contact => !existingEmails.has(contact.email.toLowerCase())
    );

    console.log(`${missingContacts.length} applications need to be synced:\n`);

    if (missingContacts.length === 0) {
      console.log('All applications are already synced!');
      return;
    }

    // Insert missing applications
    let successCount = 0;
    let failCount = 0;

    for (const contact of missingContacts) {
      const success = await insertApplication(contact);
      if (success) {
        successCount++;
      } else {
        failCount++;
      }
    }

    console.log('\n=== Sync Complete ===');
    console.log(`✅ Successfully added: ${successCount}`);
    if (failCount > 0) {
      console.log(`❌ Failed: ${failCount}`);
    }

  } catch (error) {
    console.error('Sync failed:', error.message);
    process.exit(1);
  }
}

main();
