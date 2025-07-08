import { create } from "zustand";
import { supabase } from "../supabase/supabase.config";
import { addUser } from "../supabase/UsersCrud";

export const useUserStore = create((set, get) => ({
  addUserAdmin: async (params) => {
    const { data, error } = await supabase.auth.signUp({
      email: params.email,
      password: params.password,
    })
    console.log("data dek registro de user auth", data)

    if (error) return;
    const datauser = await addUser({
      id_auth: data.user.id,
      register_date: new Date(),
      type_user: "admin",
    });
    return datauser;
  },
}));