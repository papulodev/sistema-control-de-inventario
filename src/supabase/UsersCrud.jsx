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

// export const getUsers = async (p) => {
//   const { error, data } = await supabase.rpc("mostrarpersonal", p);
//   if (data) {
//     return data;
//   }
// };

export async function getPermits(p) {
	console.log('getPermits', p);
	const { data, error } = await supabase
		.from('permits')
		.select(`id, user_id, module_id, modules(name)`)
		.eq('user_id', p.user_id);

	return data;
}
