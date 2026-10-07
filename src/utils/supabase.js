import { createClient } from "@supabase/supabase-js";

/* Browser client for the dashboard only (publishable key; row level security decides what it can read). */
const url = import.meta.env.VITE_SUPABASE_URL;
const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

export const supabase = url && key ? createClient(url, key) : null;
