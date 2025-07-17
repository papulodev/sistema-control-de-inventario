import { supabase } from './supabase.config'

export const ShowCompany = async (p) => {
  const { error, data } = await supabase.from("assign_company").select(`company(id, name, symbol_currency)`).eq("user_id", p.user_id).maybeSingle();

  if (data) {
    return data;
  } else {
    console.error("Error fetching company data:", error);
    return null;
  }
};

export const CountUsersPerCompany = async (p) => {
  const { data, error } = await supabase.rpc("count_users_per_company", { company_id: p.company_id });

  if (data) {
    return data;
  } else {
    console.error("Error counting users per company:", error);
    return null;
  }
}