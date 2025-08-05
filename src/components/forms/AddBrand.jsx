import styled from 'styled-components';
import { useCompanyStore } from '../../store/CompanyStore';
import { useForm } from 'react-hook-form';
import ButtonSave from '../shared/ButtonSave';
import { VarableIcon } from '../../styles/variables';
// import { useEffect } from 'react';
import { useBrandStore } from '../../store/BrandStore';
import { ConvertCapitalize } from '../../utils/ConvertCapitalize';
import FormInput from './FormInput';

function AddBrand({ onClose, dataSelect, action }) {
	const { insertBrand, editingBrand } = useBrandStore();
	const { dataCompany } = useCompanyStore();
	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm();

	async function handleSubmitBrand(data) {
		if (action === 'Editar') {
			const p = {
				id: dataSelect.id,
				description: ConvertCapitalize(data.brand),
			};
			await editingBrand(p);
			onClose();
		} else {
			const p = {
				_company_id: dataCompany.id,
				_description: ConvertCapitalize(data.brand),
			};
			await insertBrand(p);
			onClose();
		}
	}

	return (
		<Container>
			<div className="sub-contenedor">
				<div className="headers">
					<section>
						<h1>
							{action == 'Editar' ? 'Editar marca' : 'Registrar nueva marca'}
						</h1>
					</section>

					<section>
						<button onClick={onClose}>x</button>
					</section>
				</div>

				<form className="formulario" onSubmit={handleSubmit(handleSubmitBrand)}>
					<section>
						<article>
							<FormInput
								icon={<VarableIcon.iconomarca />}
								register={register}
								name="brand"
								label="Marca"
								type="text"
								placeholder="eg: ejemplo@email.com"
								error={errors.brand?.type}
								defaultValue={dataSelect.descripcion}
							/>
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
			button {
				font-size: 20px;
				cursor: pointer;
				background: none;
				border: none;
				color: ${({ theme }) => theme.text};
				transition: color 0.3s ease-in-out;
				&:hover {
					color: ${({ theme }) => theme.primary};
				}
				&:focus {
					outline: none;
				}
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

export default AddBrand;
