import { supabase } from './supabase.config';

export const getCompany = async (p) => {
	const { error, data } = await supabase
		.from('asign_company')
		.select(`company(id, name, symbol_currency)`)
		.eq('user_id', p.user_id)
		.maybeSingle();

	if (data) {
		return data;
	} else {
		console.error('Error fetching company data:', error);
		return null;
	}
};

export const getAmountUsersPerCompany = async (p) => {
	console.log('Fetching amount of users for company:', p);
	const { data, error } = await supabase.rpc('count_users_per_company', {
		company_id_param: p.company_id,
	});

	console.log('Response from count_users_per_company:', data);

	if (data) {
		return data;
	} else {
		console.error('Error counting users per company:', error);
		return null;
	}
};
