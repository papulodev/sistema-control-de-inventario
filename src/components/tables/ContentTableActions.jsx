import styled from 'styled-components';
import TableAction from './TableAction';
import { VarableIcon } from '../../styles/variables';

function ContentTableActions({ handleEdit, handleDelete }) {
	return (
		<Container>
			<TableAction
				onClick={handleEdit}
				fontSize="18px"
				color="#7d7d7d"
				icon={<VarableIcon.iconeditarTabla />}
			/>
			<TableAction
				onClick={handleDelete}
				fontSize="18px"
				color="#f76e8e"
				icon={<VarableIcon.iconeliminarTabla />}
			/>
		</Container>
	);
}

const Container = styled.div`
	display: flex;
	gap: 10px;
	justify-content: center;
	flex-wrap: wrap;

	@media (max-width: 48em) {
		justify-content: end;
	}
`;

export default ContentTableActions;
