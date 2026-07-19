console.log("APP CARGADA");
const supabaseUrl =
"https://drxvkseiacmrzedbzysc.supabase.co";
const supabaseKey =
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRyeHZrc2VpYWNtcnplZGJ6eXNjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ0Mzk3NjIsImV4cCI6MjEwMDAxNTc2Mn0.j3KDqYF6Q-hED46CQlDvMa4yByOrqkT0nnFy3glrwBE";
const supabaseClient = window.supabase.createClient(
    supabaseUrl,
    supabaseKey
);

console.log(window.supabase);
console.log(supabase);
