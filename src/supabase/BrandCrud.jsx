import Swal from 'sweetalert2';
import { supabase } from './supabase.config';

export const addBrand = async (p) => {
	const { error } = await supabase.rpc('insertbrand', p);
	if (error) {
		Swal.fire({
			icon: 'error',
			title: 'Oops...',
			text: error.message,
			footer: '<a href="">Agregue una nueva descripcion</a>',
		});
	}
};

export const getBrands = async (p) => {
	const { data } = await supabase
		.from('brands')
		.select()
		.eq('company_id', p.company_id)
		.order('id', { ascending: true });
	return data;
};

export const deleteBrand = async (p) => {
	const { error } = await supabase.from('brands').delete().eq('id', p.id);
	if (error) {
		alert('Error al eliminar', error.message);
	}
};

export const editBrand = async (p) => {
	const { error } = await supabase.from('brands').update(p).eq('id', p.id);
	if (error) {
		alert('Error al editar marca', error.message);
	}
};

export const searchBrand = async (p) => {
	const { data } = await supabase
		.from('brands')
		.select()
		.eq('company_id', p.company_id)
		.ilike('description', '%' + p.description + '%');
	return data;
};
