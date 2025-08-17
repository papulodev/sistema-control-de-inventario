import styled from 'styled-components';
import { VarableIcon } from '../../styles/variables';

function ButtonClose({ onClick }) {
	return <Container onClick={onClick}>{<VarableIcon.iconocerrar />}</Container>;
}

const Container = styled.div`
	cursor: pointer;
	font-size: 25px;
	transition: all 0.2s;
	&:hover {
		color: ${VarableIcon.colorselector};
	}
`;

export default ButtonClose;
