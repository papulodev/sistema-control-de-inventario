import Swal from 'sweetalert2';
import { supabase } from './supabase.config';

export const addCategory = async (p) => {
	const { error } = await supabase.rpc('insertcategory', p);
	if (error) {
		Swal.fire({
			icon: 'error',
			title: 'Oops...',
			text: error.message,
			footer: '<a href="">Agregue una nueva descripcion</a>',
		});
	}
};

export const getCategories = async (p) => {
	const { data } = await supabase
		.from('categories')
		.select()
		.eq('company_id', p.company_id)
		.order('id', { ascending: true });
	return data;
};

export const deleteCategory = async (p) => {
	const { error } = await supabase.from('categories').delete().eq('id', p.id);
	if (error) {
		alert('Error al eliminar', error.message);
	}
};

export const editCategory = async (p) => {
	const { error } = await supabase.from('categories').update(p).eq('id', p.id);
	if (error) {
		alert('Error al editar Categorias', error.message);
	}
};

export const searchCategories = async (p) => {
	const { data } = await supabase
		.from('categories')
		.select()
		.eq('company_id', p.company_id)
		.ilike('description', '%' + p.description + '%');
	return data;
};
