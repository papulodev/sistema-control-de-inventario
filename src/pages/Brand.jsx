import { useState } from 'react';
import styled from 'styled-components';
import { VarableIcon } from '../styles/variables';
import ButtonFilter from '../components/shared/ButtonFilter';
import { useBrandStore } from '../store/BrandStore';
import SearchInput from '../components/shared/SearchInput';
import Header from '../components/Header';
import AddBrand from '../components/forms/AddBrand';
import TableBrand from '../components/tables/TableBrand';
import { useUserStore } from '../store/UserStore';
import { useCompanyStore } from '../store/CompanyStore';
import { useQuery } from '@tanstack/react-query';
import UnlockPage from '../components/shared/UnlockPage';
import SpinnerLoader from '../components/shared/SpinnerLoader';

const PERMIT_INCLUDES = 'Marca de productos';

function Brand() {
	const [state, setState] = useState(false);
	const [dataSelect, setDataSelect] = useState([]);
	const [action, setAction] = useState('');
	const [openRegister, setOpenRegister] = useState(false);

	const addRegister = () => {
		setOpenRegister(!openRegister);
		setAction('Nuevo');
		setDataSelect([]);
	};

	const { setSearch } = useBrandStore();

	const { dataPermits } = useUserStore();
	const permitState = dataPermits.some((object) =>
		object.modules.name.includes(PERMIT_INCLUDES)
	);

	const { showBrands, dataBrand, searchingBrand, search } = useBrandStore();
	const { dataCompany } = useCompanyStore();
	const { isLoading, error } = useQuery({
		queryKey: ['show brand', { company_id: dataCompany?.id }],
		queryFn: () => showBrands({ company_id: dataCompany?.id }),
		enabled: dataCompany?.id != null,
	});

	if (permitState == false) {
		return <UnlockPage />;
	}
	if (isLoading) {
		return <SpinnerLoader />;
	}
	if (error) {
		return <span>Error...</span>;
	}

	return (
		<Container>
			{openRegister && (
				<AddBrand
					dataSelect={dataSelect}
					action={action}
					onClose={() => setOpenRegister(!openRegister)}
				/>
			)}

			<header className="header">
				<Header
					stateConfig={{ state: state, setState: () => setState(!state) }}
				/>
			</header>
			<section className="area1">
				<ContentFiltro>
					<Title>Marcas</Title>
					<ButtonFilter
						onClick={addRegister}
						bgColor="#f6f3f3"
						textColor="#353535"
						icon={<VarableIcon.agregar />}
					/>
				</ContentFiltro>
			</section>
			<section className="area2">
				<SearchInput setSearch={setSearch} />
			</section>
			<section className="main">
				<TableBrand
					data={dataBrand}
					setOpenRegister={setOpenRegister}
					setDataSelect={setDataSelect}
					setAction={setAction}
				/>
			</section>
		</Container>
	);
}

const Container = styled.div`
	min-height: 100vh;
	width: 100%;
	background-color: ${(props) => props.theme.bgtotal};
	color: ${({ theme }) => theme.text};
	display: grid;
	padding: 15px;
	grid-template:
		'header' 100px
		'area1' 100px
		'area2' 100px
		'main' auto;

	.header {
		grid-area: header;
		/* background-color: rgba(103, 93, 241, 0.14); */
		display: flex;
		align-items: center;
	}

	.area1 {
		grid-area: area1;
		/* background-color: rgba(229, 67, 26, 0.14); */
		display: flex;
		align-items: center;
	}

	.area2 {
		grid-area: area2;
		/* background-color: rgba(77, 237, 106, 0.14); */
		display: flex;
		align-items: center;
		justify-content: start;
	}

	.main {
		grid-area: main;
		/* background-color: rgba(179, 46, 241, 0.14); */
	}
`;

const Title = styled.span`
	font-weight: 700;
	font-size: 30px;
`;

const ContentFiltro = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: start;
	width: 100%;
	gap: 15px;
`;

export default Brand;
