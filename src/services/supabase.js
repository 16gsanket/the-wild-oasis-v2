
import { createClient } from '@supabase/supabase-js'
export const supabaseUrl = 'https://ktpkqmnxhwwjbpfitlwr.supabase.co' // Replace with your new Supabase project URL
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt0cGtxbW54aHd3amJwZml0bHdyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE0OTQ5MzQsImV4cCI6MjA3NzA3MDkzNH0.rf8JDEmBP3U-Jd5Khj3hAV0Hk6sDcq5tnFnBFqAEWRE' // Replace with your new project's anon key
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;