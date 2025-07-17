import { create } from 'zustand'
import { CountUsersPerCompany, ShowCompany } from '../supabase/CompanyCrud'

export const useCompanyStore = create((set, get) => ({
  usersConter: 0,
  dataCompany: [],
  showCompany: async (p) => {
    const response = await ShowCompany(p);
    set({ dataCompany: response.company });
    return response.company;
  },
  countUsersPerCompany: async (p) => {
    const response = await CountUsersPerCompany(p);
    set({ usersConter: response });
    return response;
  }
})) 