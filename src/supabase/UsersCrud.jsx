import Swal from 'sweetalert2';
import { supabase } from './supabase.config';

export const addUser = async (p) => {
	const { data, error } = await supabase
		.from('users')
		.insert(p)
		.select()
		.maybeSingle();
	if (error) {
		Swal.fire({
			icon: 'error',
			title: 'Oops...',
			text: 'Error al insertar usuario ' + error.message,
		});
	}
	if (data) return data;
};

export const getUsers = async () => {
	let idAuthSupabase = '';
	const {
		data: { session },
	} = await supabase.auth.getSession();
	if (session != null) {
		const { user } = session;
		idAuthSupabase = user.id;
	}

	const { data } = await supabase
		.from('users')
		.select()
		.eq('id_auth', idAuthSupabase)
		.maybeSingle();

	if (data) {
		return data;
	}
};

export const getAllUsers = async (p) => {
	const { error, data } = await supabase.rpc('showpersonal', p);
	if (data) {
		return data;
	}
};

export const deleteUser = async (p) => {
	const { error } = await supabase.from('users').delete().eq('id', p.id);
	if (error) {
		alert('Error al eliminar', error.message);
	}
};

export const editUser = async (p) => {
	const { error } = await supabase.from('users').update(p).eq('id', p.id);
	if (error) {
		alert('Error al editar Usuarios', error.message);
	}
};

export const searchUsers = async (p) => {
	const { data } = await supabase.rpc('searchpersonal', p);
	return data;
};

export const addAsigns = async (p) => {
	const { error } = await supabase.from('asign_company').insert(p);
	if (error) {
		Swal.fire({
			icon: 'error',
			title: 'Oops...',
			text: 'Error al insertar usuario ' + error.message,
		});
	}
};

export const addPermits = async (p) => {
	console.log('info de addPermits:\n', p);
	const { error } = await supabase.from('permits').insert(p);

	if (error) {
		Swal.fire({
			icon: 'error',
			title: 'Oops...',
			text: 'Error al insertar permisos ' + error.message,
			footer: '<a href="">error</a>',
		});
	}
};

export const getPermits = async (p) => {
	const { data } = await supabase
		.from('permits')
		.select(`id, user_id, module_id, modules(name)`)
		.eq('user_id', p.user_id);
	return data;
};

export const deletePermits = async (p) => {
	const { error } = await supabase
		.from('permits')
		.delete()
		.eq('user_id', p.user_id);
	if (error) {
		alert('Error al eliminar', error);
	}
};

export const getModules = async () => {
	const { data } = await supabase.from('modules').select();
	return data;
};
