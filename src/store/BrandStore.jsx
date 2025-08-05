import { create } from 'zustand';
import {
	addBrand,
	deleteBrand,
	editBrand,
	getBrands,
	searchBrand,
} from '../supabase/BrandCrud';

export const useBrandStore = create((set, get) => ({
	search: '',
	setSearch: (p) => {
		set({ search: p });
	},
	dataBrand: [],
	brandItemSelect: [],
	params: {},
	showBrands: async (p) => {
		const response = await getBrands(p);
		set({ params: p });
		set({ dataBrand: response });
		set({ brandItemSelect: response[0] });
		return response;
	},
	selectBrand: (p) => {
		set({ brandItemSelect: p });
	},
	insertBrand: async (p) => {
		await addBrand(p);
		const { showBrands } = get();
		const { params } = get();
		set(showBrands(params));
	},
	deletingBrand: async (p) => {
		await deleteBrand(p);
		const { showBrands } = get();
		const { params } = get();
		set(showBrands(params));
	},
	editingBrand: async (p) => {
		await editBrand(p);
		const { showBrands } = get();
		const { params } = get();
		set(showBrands(params));
	},
	searchingBrand: async (p) => {
		const response = await searchBrand(p);
		set({ dataBrand: response });
	},
}));
