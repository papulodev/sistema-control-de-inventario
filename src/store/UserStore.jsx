import { create } from "zustand";
import { supabase } from "../supabase/supabase.config";
import { addUser, getUsers, getPermits } from "../supabase/UsersCrud";
import { DataModulesConfiguration } from "../utils/staticData";

export const useUserStore = create((set, get) => ({
  addUserAdmin: async (p) => {
    const { data, error } = await supabase.auth.signUp({
      email: p.email,
      password: p.password,
    })

    if (error) return;
    const datauser = await addUser({
      id_auth: data.user.id,
      register_date: new Date(),
      type_user: "admin",
    });
    return datauser;
  },
  id_user: 0,
  showUsers: async () => {
    const response = await getUsers();
    set({ id_user: response.id });
    return response;
  },
  dataPermits: [],
  dataPermitsEdit: [],
  showPermits: async (p) => {
    const response = await getPermits(p);
    set({ dataPermits: response });
    let allDocs = [];
    DataModulesConfiguration.map((element) => {
      const statePermit = response.some((object) => object.modules.title.incluedes(element.title));

      if (statePermit) {
        allDocs.push({
          ...element,
          state: true,
        });
      } else {
        allDocs.push({
          ...element,
          state: false,
        });
      }
    })
    DataModulesConfiguration.splice(0, DataModulesConfiguration.length);
    DataModulesConfiguration.push(...allDocs);
  },
  showPermitsEdit: async (p) => {
    const response = await getPermits(p);
    set({ dataPermitsEdit: response });
    return response;
  },
}));