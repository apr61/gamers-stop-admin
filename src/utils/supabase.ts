import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supbaseSecretKey = import.meta.env.VITE_SUPABASE_SECRET_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);
const supabaseAdmin = createClient(supabaseUrl, supbaseSecretKey, {
	auth: {
		autoRefreshToken: false,
		persistSession: false,
	},
});
const adminAuthClient = supabaseAdmin.auth.admin;
export default { supabase, adminAuthClient };
