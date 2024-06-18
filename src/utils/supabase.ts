import { SupabaseClientOptions, createClient } from "@supabase/supabase-js";
import { Database } from "../types/supabase";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const client = createClient<Database>(supabaseUrl, supabaseKey);

const supabase = () => client;
export default supabase;
