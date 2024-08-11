import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://cxouybqycymcippafxum.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN4b3V5YnF5Y3ltY2lwcGFmeHVtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjMzNjA4MTYsImV4cCI6MjAzODkzNjgxNn0.J-anbyBPf3DoCuzpG3SbAfpDgmfWrDckb79uPNz7bwE"

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
