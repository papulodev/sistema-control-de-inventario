import { create } from 'zustand';
import {
	addCategory,
	deleteCategory,
	editCategory,
	getCategories,
	searchCategories,
} from '../supabase/CategoriesCrud';

export const useCategoriesStore = create((set, get) => ({
	search: '',
	setSearch: (p) => {
		set({ search: p });
	},
	dataCategories: [],
	categoryItemSelect: [],
	params: {},
	showCategories: async (p) => {
		const response = await getCategories(p);
		set({ params: p });
		set({ dataCategories: response });
		set({ categoryItemSelect: response[0] });
		return response;
	},
	selectCategories: (p) => {
		set({ categoryItemSelect: p });
	},
	insertCategory: async (p) => {
		await addCategory(p);
		const { showCategories } = get();
		const { params } = get();
		set(showCategories(params));
	},
	deletingCategory: async (p) => {
		await deleteCategory(p);
		const { showCategories } = get();
		const { params } = get();
		set(showCategories(params));
	},
	editingCategory: async (p) => {
		await editCategory(p);
		const { showCategories } = get();
		const { params } = get();
		set(showCategories(params));
	},
	searchCategory: async (p) => {
		const response = await searchCategories(p);
		set({ dataCategories: response });
	},
}));
