
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ndqfhehntwpnmznafvsq.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5kcWZoZWhudHdwbm16bmFmdnNxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU2MjAzMjIsImV4cCI6MjA4MTE5NjMyMn0.rNpKNhVDKQSS3DAioO-5_WiJZnOobuptxFvn96zyAXs';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
