import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read SQL file
const sqlFilePath = path.join(__dirname, 'setup-database.sql');
const sql = fs.readFileSync(sqlFilePath, 'utf8');

// Get environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const databaseUrl = process.env.DATABASE_URL;

if (!supabaseUrl || !supabaseKey || !databaseUrl) {
  console.error('Missing required environment variables');
  process.exit(1);
}

// Create Supabase client
const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  },
  db: {
    schema: 'public'
  }
});

async function setupDatabase() {
  try {
    // Test connection first
    const { data, error } = await supabase.from('profiles').select('*').limit(1);
    if (error) {
      throw error;
    }
    console.log('Successfully connected to Supabase');

    // Execute SQL
    const { error: sqlError } = await supabase.rpc('exec_sql', { sql });
    if (sqlError) {
      throw sqlError;
    }
    console.log('Database setup completed successfully');
  } catch (error) {
    console.error('Error setting up database:', error);
    process.exit(1);
  }
}

setupDatabase(); 