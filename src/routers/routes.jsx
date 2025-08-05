import { Route, Routes } from 'react-router';
import Home from '../pages/Home';
import Login from '../pages/Login';
import ProtectedRoute from '../utils/ProtectedRoute';
import { useUserAuth } from '../hooks/useUserAuth';
import Register from '../pages/Register';
import { useQuery } from '@tanstack/react-query';
import { useUserStore } from '../store/UserStore';
import ErrorMessagge from '../components/shared/ErrorMessagge';
import SpinnerLoader from '../components/shared/SpinnerLoader';
import { useCompanyStore } from '../store/CompanyStore';
import Configuration from '../pages/Configuration';
import Brand from '../pages/Brand';

function AppRoutes() {
	const user = useUserAuth();
	const { showUsers, id_user, showPermits } = useUserStore();
	const { showCompany } = useCompanyStore();
	const {
		data: dataUsers,
		isLoading,
		error,
	} = useQuery({
		queryKey: ['show users'],
		queryFn: showUsers,
	});

	const { data: dataCompany } = useQuery({
		queryKey: ['show company'],
		queryFn: () => showCompany({ user_id: id_user }),
		enabled: !!dataUsers,
	});

	const { data: dataPermits } = useQuery({
		queryKey: ['show permits'],
		queryFn: () => showPermits({ user_id: id_user }),
		enabled: !!dataUsers,
	});

	if (isLoading) {
		return <SpinnerLoader />;
	}

	if (error) {
		return <ErrorMessagge message={error.message} />;
	}

	return (
		<Routes>
			<Route path="/login" element={<Login />} />
			<Route path="/register" element={<Register />} />
			<Route element={<ProtectedRoute user={user} redirectTo={'/login'} />}>
				<Route path="/" element={<Home />} />
				<Route path="/configuration" element={<Configuration />} />
				<Route path="/configuration/brands" element={<Brand />} />
			</Route>
		</Routes>
	);
}

export default AppRoutes;
