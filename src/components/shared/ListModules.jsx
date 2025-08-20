import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useUserStore } from '../../store/UserStore';

function ListModules({ checkboxs, setCheckboxs, action }) {
	const { dataModules, dataPermitsEdit } = useUserStore();
	const [isChecked, setIsChecked] = useState(true);

	useEffect(() => {
		if (action == 'Editar') {
			let allDocs = [];
			dataModules.map((element) => {
				const statePermits = dataPermitsEdit?.some((object) =>
					object.modules.name.includes(element.name)
				);
				if (statePermits) {
					allDocs.push({ ...element, check: true });
				} else {
					allDocs.push({ ...element, check: false });
				}
			});
			setCheckboxs(allDocs);
		} else {
			setCheckboxs(dataModules);
		}
	}, [dataPermitsEdit]);

	const handleCheckbox = (id) => {
		setCheckboxs((prev) => {
			return prev?.map((item) => {
				if (item.id === id) {
					return { ...item, check: !item.check };
				} else {
					return { ...item };
				}
			});
		});
	};

	const handleChangeSelect = (e) => {
		let check = e.target.checked;
		setIsChecked(check);
	};

	return (
		<Container>
			{checkboxs?.map((item, index) => {
				return (
					<div
						className="content"
						key={index}
						onClick={() => handleCheckbox(item.id)}>
						<input
							checked={item.check}
							className="checkbox"
							type="checkbox"
							onChange={(e) => handleChangeSelect(e)}
						/>
						<span>{item.name}</span>
					</div>
				);
			})}
		</Container>
	);
}

const Container = styled.div`
	display: flex;
	flex-direction: column;
	border: 2px dashed #414244;
	border-radius: 15px;
	padding: 20px;
	gap: 15px;

	.content {
		display: flex;
		gap: 20px;
	}

	.checkbox {
		appearance: none;
		overflow: hidden;
		min-width: 30px;
		aspect-ratio: 1/1;
		border-radius: 30% 70% 70% 30%/30% 30% 70% 70%;
		border: 2px solid rgb(255, 102, 0);
		position: relative;
		transition: all 0.2s ease-in-out;

		&::before {
			position: absolute;
			inset: 0;
			content: '';
			font-size: 35px;
			transition: all 0.2s ease-in-out;
		}

		&:checked {
			border: 2px solid rgb(255, 212, 59);
			background: linear-gradient(
				135deg,
				rgb(255, 212, 59) 0%,
				rgb(255, 102, 0) 100%
			);
			box-shadow: -5px -5px 30px rgba(255, 212, 59, 1),
				5px 5px 30px rgba(255, 102, 0, 1);

			&::before {
				background: linear-gradient(
					135deg,
					rgb(255, 212, 59) 0%,
					rgb(255, 102, 0) 100%
				);
			}
		}
	}
`;

export default ListModules;
