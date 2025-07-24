import { create } from 'zustand';
import { getAmountUsersPerCompany, getCompany } from '../supabase/CompanyCrud';

export const useCompanyStore = create((set, get) => ({
	amountUsers: 0,
	dataCompany: [],
	showCompany: async (p) => {
		const response = await getCompany(p);
		set({ dataCompany: response.company });
		return response.company;
	},
	amountUsersPerCompany: async (p) => {
		const response = await getAmountUsersPerCompany(p);
		set({ amountUsers: response });
		return response;
	},
}));
