/**
 * Script to create an admin user in Supabase Auth
 * 
 * Usage: node scripts/create-admin.js <email> <password> <name>
 * 
 * Example: node scripts/create-admin.js admin@supremeanimation.com "SecurePass123" "Admin User"
 */

require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICEROLE_KEY;

if (!supabaseUrl || !supabaseServiceRoleKey) {
  console.error('❌ Error: Missing SUPABASE_URL or SUPABASE_SERVICEROLE_KEY in .env file');
  process.exit(1);
}

const [,, email, password, name] = process.argv;

if (!email || !password || !name) {
  console.error('❌ Error: Missing required arguments');
  console.log('\nUsage: node scripts/create-admin.js <email> <password> <name>');
  console.log('Example: node scripts/create-admin.js admin@supremeanimation.com "SecurePass123" "Admin User"');
  process.exit(1);
}

if (password.length < 8) {
  console.error('❌ Error: Password must be at least 8 characters long');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function createAdmin() {
  try {
    console.log('🔄 Creating admin user...');
    console.log(`   Email: ${email}`);
    console.log(`   Name: ${name}`);

    // Create user with admin service role
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true, // Auto-confirm email
      user_metadata: {
        name: name,
        role: 'admin'
      }
    });

    if (error) {
      console.error('❌ Error creating user:', error.message);
      process.exit(1);
    }

    if (data.user) {
      console.log('\n✅ Admin user created successfully!');
      console.log(`   User ID: ${data.user.id}`);
      console.log(`   Email: ${data.user.email}`);
      console.log(`   Name: ${data.user.user_metadata?.name}`);
      console.log('\n📝 You can now login with these credentials at /manage');
    } else {
      console.error('❌ Error: User creation returned no data');
      process.exit(1);
    }
  } catch (error) {
    console.error('❌ Unexpected error:', error.message);
    process.exit(1);
  }
}

createAdmin();

