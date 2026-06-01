import { createClient } from "@supabase/supabase-js";

const getSavedCredential = (key: string): string => {
  if (typeof window !== "undefined" && window.localStorage) {
    const saved = window.localStorage.getItem(key);
    if (saved && saved.trim()) return saved.trim();
  }
  return "";
};

const supabaseUrl = (getSavedCredential("VITE_SUPABASE_URL") || (((import.meta as any).env?.VITE_SUPABASE_URL) || "")).trim();
const supabaseAnonKey = (getSavedCredential("VITE_SUPABASE_ANON_KEY") || (((import.meta as any).env?.VITE_SUPABASE_ANON_KEY) || "")).trim();

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey && supabaseUrl !== "YOUR_SUPABASE_URL_HERE");

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: false,
      },
    })
  : null;
