import { createClient } from "@supabase/supabase-js";

const supabase = createClient("https://bqktkajdreerenedeapl.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJxa3RrYWpkcmVlcmVuZWRlYXBsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDc1MjYxMTksImV4cCI6MjAyMzEwMjExOX0.rwizcUaldZJiof8boU3cZjwgDErYXd51WYtpiVIc27Q");

export { supabase }