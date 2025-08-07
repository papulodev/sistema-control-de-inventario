import styled from 'styled-components';
import { VarableIcon } from '../../styles/variables';
import ButtonSave from '../shared/ButtonSave';
import FormInput from './FormInput';
import { useEffect, useState } from 'react';
import { ConvertCapitalize } from '../../utils/ConvertCapitalize';
import { useForm } from 'react-hook-form';
import { useCompanyStore } from '../../store/CompanyStore';
import { useCategoriesStore } from '../../store/CategoryStore';
import { CirclePicker } from 'react-color';

const COLOR_DEFAULT = '#F44336';

function AddCategories({ action, dataSelect, onClose }) {
	const [currentColor, setColor] = useState(COLOR_DEFAULT);
	const { insertCategory, editingCategory } = useCategoriesStore();
	const { dataCompany } = useCompanyStore();
	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm();

	const selectColor = (color) => {
		setColor(color.hex);
	};

	async function handleSubmitCategory(data) {
		if (action === 'Editar') {
			const p = {
				id: dataSelect.id,
				descripcion: ConvertCapitalize(data.name),
				color: currentColor,
			};
			await editingCategory(p);
			onClose();
		} else {
			const p = {
				_description: ConvertCapitalize(data.name),
				_company_id: dataCompany.id,
				_color: currentColor,
			};
			await insertCategory(p);
			onClose();
		}
	}

	useEffect(() => {
		if (action === 'Editar') {
			setColor(dataSelect.color);
		}
	}, []);
	return (
		<Container>
			<div className="sub-contenedor">
				<div className="headers">
					<section>
						<h1>
							{action == 'Editar'
								? 'Editar categorias'
								: 'Registrar nueva categoria'}
						</h1>
					</section>

					<section>
						<span onClick={onClose}>x</span>
					</section>
				</div>

				<form
					className="formulario"
					onSubmit={handleSubmit(handleSubmitCategory)}>
					<section>
						<article>
							<FormInput
								icon={<VarableIcon.iconomarca />}
								register={register}
								name="name"
								label="Marca"
								type="text"
								placeholder="Nombre de la marca"
								error={errors.name?.type}
								defaultValue={dataSelect.descripcion}
							/>
						</article>
						<article className="colorContainer">
							<CirclePicker onChange={selectColor} color={currentColor} />
						</article>

						<div className="btnguardarContent">
							<ButtonSave
								icon={<VarableIcon.iconoguardar />}
								title="Guardar"
								bgColor="#ef552b"
							/>
						</div>
					</section>
				</form>
			</div>
		</Container>
	);
}

const Container = styled.div`
	transition: 0.5s;
	top: 0;
	left: 0;
	position: fixed;
	background-color: rgba(10, 9, 9, 0.5);
	display: flex;
	width: 100%;
	min-height: 100vh;
	align-items: center;
	justify-content: center;
	z-index: 1000;

	.sub-contenedor {
		width: 500px;
		max-width: 85%;
		border-radius: 20px;
		background: ${({ theme }) => theme.bgtotal};
		box-shadow: -10px 15px 30px rgba(10, 9, 9, 0.4);
		padding: 13px 36px 20px 36px;
		z-index: 100;

		.headers {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 20px;

			h1 {
				font-size: 20px;
				font-weight: 500;
			}
			span {
				font-size: 20px;
				cursor: pointer;
			}
		}

		.formulario {
			section {
				gap: 20px;
				display: flex;
				flex-direction: column;
				.colorContainer {
					.colorPickerContent {
						padding-top: 15px;
						min-height: 50px;
					}
				}
			}
		}
	}
`;

const ContentTitle = styled.div`
	display: flex;
	justify-content: start;
	align-items: center;
	gap: 20px;
	svg {
		font-size: 25px;
	}
	input {
		border: none;
		outline: none;
		background: transparent;
		padding: 2px;
		width: 40px;
		font-size: 28px;
	}
`;

const ContainerEmojiPicker = styled.div`
	position: absolute;
	display: flex;
	justify-content: center;
	align-items: center;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
`;

export default AddCategories;
