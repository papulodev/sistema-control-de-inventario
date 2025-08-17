import { create } from 'zustand';
import {
	addProduct,
	deleteProduct,
	editProduct,
	getProducts,
	searchProducts,
} from '../supabase/ProductCrud';

export const useProductsStore = create((set, get) => ({
	search: '',
	setSearch: (p) => {
		set({ search: p });
	},
	dataProducts: [],
	productsItemSelect: [],
	params: {},
	showProducts: async (p) => {
		const response = await getProducts(p);
		set({ params: p });
		set({ dataProducts: response });
		set({ productsItemSelect: response[0] });
		return response;
	},
	selectProducts: (p) => {
		set({ productsItemSelect: p });
	},
	insertProduct: async (p) => {
		await addProduct(p);
		const { showProducts } = get();
		const { params } = get();
		set(showProducts(params));
	},
	deletingProduct: async (p) => {
		await deleteProduct(p);
		const { showProducts } = get();
		const { params } = get();
		set(showProducts(params));
	},
	editingProduct: async (p) => {
		await editProduct(p);
		const { showProducts } = get();
		const { params } = get();
		set(showProducts(params));
	},
	searchProduct: async (p) => {
		const response = await searchProducts(p);
		set({ dataProducts: response });
	},
}));
