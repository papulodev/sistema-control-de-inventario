import { FaSearch } from 'react-icons/fa';
import styled from 'styled-components';

function SearchInput({ setSearch }) {
	const handleChangeSearch = (event) => {
		setSearch(event.target.value);
	};

	return (
		<Container>
			<article className="content">
				<FaSearch className="icono" />
				<input onChange={handleChangeSearch} placeholder="...buscar"></input>
			</article>
		</Container>
	);
}

const Container = styled.div`
	background-color: ${(props) => props.theme.bg};
	border-radius: 10px;
	height: 60px;
	align-items: center;
	display: flex;
	color: ${(props) => props.theme.text};
	border: 1px solid #414244;
	.content {
		padding: 15px;
		gap: 10px;
		display: flex;
		align-items: center;
		position: relative;
		width: 100%;
		.icono {
			font-size: 18px;
		}
		input {
			font-size: 18px;
			width: 100%;
			outline: none;
			background: none;
			border: 0;
			color: ${(props) => props.theme.text};
		}
	}
`;

export default SearchInput;
