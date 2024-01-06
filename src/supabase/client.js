import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://apqbojnvlakjpkzelzro.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFwcWJvam52bGFranBremVsenJvIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTU4NTUwMzYsImV4cCI6MjAxMTQzMTAzNn0.nvKCCpiUwgdE5gKQY20m98DtnIQREnIEmuRx4uGDMmo'
export const supabase = createClient(supabaseUrl, supabaseKey)