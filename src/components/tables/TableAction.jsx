import styled from 'styled-components';

function TableAction({ onClick, color, fontSize, icon }) {
	return (
		<Container onClick={onClick} $color={color} $fontSize={fontSize}>
			{icon}
		</Container>
	);
}

const Container = styled.span`
	color: ${(props) => props.$color};
	font-size: ${(props) => props.$fontSize};
	cursor: pointer;
`;

export default TableAction;
