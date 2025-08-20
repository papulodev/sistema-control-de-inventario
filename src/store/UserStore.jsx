import { create } from 'zustand';
import { supabase } from '../supabase/supabase.config';
import {
	addUser,
	getUsers,
	getPermits,
	getAllUsers,
	addAsigns,
	addPermits,
	deleteUser,
	editUser,
	deletePermits,
	searchUsers,
	getModules,
} from '../supabase/UsersCrud';
import { DataModulesConfiguration } from '../utils/staticData';

export const useUserStore = create((set, get) => ({
	dataModules: [],
	addUserAdmin: async (p) => {
		const { data, error } = await supabase.auth.signUp({
			email: p.email,
			password: p.password,
		});

		if (error) return;
		const datauser = await addUser({
			id_auth: data.user.id,
			register_date: new Date(),
			type_user: 'admin',
		});
		return datauser;
	},
	id_user: 0,
	showUsers: async () => {
		const response = await getUsers();
		set({ id_user: response.id });
		return response;
	},
	search: '',
	setSearch: (p) => {
		set({ search: p });
	},
	dataUsers: [],
	userItemSelect: [],
	params: {},
	showAllUser: async (p) => {
		const response = await getAllUsers(p);
		set({ params: p });
		set({ dataUsers: response });
		set({ userItemSelect: response[0] });
		return response;
	},
	setUsers: (p) => {
		set({ userItemSelect: p });
	},
	insertUser: async (paramAuth, p, datacheckpermits) => {
		console.log(paramAuth, p, datacheckpermits);
		const { data, error } = await supabase.auth.signUp({
			email: paramAuth.email,
			password: paramAuth.password,
		});
		if (error) {
			return null;
		}
		const dataUserNew = await addUser({
			name: p.name,
			email: p.email,
			nro_doc: p.nro_doc,
			phone_number: p.phone_number,
			address: p.address,
			register_date: new Date(),
			state: 'active',
			type_user: p.type_user,
			id_auth: data.user.id,
			type_doc: p.type_doc,
		});
		await addAsigns({
			company_id: p.company_id,
			user_id: dataUserNew.id,
		});

		datacheckpermits.forEach(async (item) => {
			if (item.check) {
				let permitsparam = {
					user_id: dataUserNew.id,
					module_id: item.id,
				};
				await addPermits(permitsparam);
			}
		});
		await supabase.auth.signOut();
	},
	deletingUser: async (p) => {
		await deleteUser(p);
		const { showUsers } = get();
		const { params } = get();
		set(showUsers(params));
	},
	editingUser: async (p, datacheckpermits, _company_id_param) => {
		await editUser(p);
		await deletePermits({ user_id: p.id });
		datacheckpermits.forEach(async (item) => {
			if (item.check) {
				let permitsparam = {
					user_id: p.id,
					module_id: item.id,
				};
				await addPermits(permitsparam);
			}
		});

		const { showAllUser } = get();
		set(showAllUser({ _company_id: _company_id_param }));
	},
	searchUser: async (p) => {
		const response = await searchUsers(p);
		set({ dataUsers: response });
		return response;
	},
	showModules: async () => {
		const response = await getModules();
		set({ dataModules: response });
		return response;
	},
	dataPermits: [],
	dataPermitsEdit: [],
	showPermits: async (p) => {
		const response = await getPermits(p);
		set({ dataPermits: response });
		let allDocs = [];
		DataModulesConfiguration.map((element) => {
			const statePermit = response.some((object) =>
				object.modules.name.includes(element.title)
			);

			if (statePermit) {
				allDocs.push({
					...element,
					state: true,
				});
			} else {
				allDocs.push({
					...element,
					state: false,
				});
			}
		});
		DataModulesConfiguration.splice(0, DataModulesConfiguration.length);
		DataModulesConfiguration.push(...allDocs);
	},
	showPermitsEdit: async (p) => {
		const response = await getPermits(p);
		set({ dataPermitsEdit: response });
		return response;
	},
}));
