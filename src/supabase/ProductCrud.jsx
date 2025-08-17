import Swal from 'sweetalert2';
import { supabase } from './supabase.config';

export const addProduct = async (p) => {
	const { error } = await supabase.rpc('insertproducts', p);
	if (error) {
		Swal.fire({
			icon: 'error',
			title: 'Oops...',
			text: error.message,
			footer: '<a href="">Agregue una nueva descripcion</a>',
		});
	}
};

export const getProducts = async (p) => {
	const { data } = await supabase.rpc('showproducts', p);
	return data;
};

export const deleteProduct = async (p) => {
	const { error } = await supabase.from('products').delete().eq('id', p.id);
	if (error) {
		alert('Error al eliminar', error.message);
	}
};

export const editProduct = async (p) => {
	const { error } = await supabase.from('products').update(p).eq('id', p.id);
	if (error) {
		alert('Error al editar Productos', error.message);
	}
};

export const searchProducts = async (p) => {
	const { data } = await supabase.rpc('searchproducts', p);
	return data;
};
