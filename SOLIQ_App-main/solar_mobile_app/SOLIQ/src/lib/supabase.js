import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL || 'https://rabralcpsaldfpsjbewd.supabase.co';
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYnJhbGNwc2FsZGZwc2piZXdkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQzMjM0NTEsImV4cCI6MjA4OTg5OTQ1MX0.mAZlk0ChiXtR3riKsn5axXvUnEDB0T7AKnIhguC0uJc';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
