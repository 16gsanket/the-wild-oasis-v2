
import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://bomynzoqkyczeungswxx.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJvbXluem9xa3ljemV1bmdzd3h4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjk3NTg2MjYsImV4cCI6MjA0NTMzNDYyNn0.6PA5pqNuMJRmjife2UaI23wBBZwB5ZGFlSXMYVxoiyE'
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;