import styled from 'styled-components';
import { Device } from '../../styles/breackpoints';
import ButtonSave from '../shared/ButtonSave';
import ListGeneric from '../shared/ListGeneric';
import { VarableIcon } from '../../styles/variables';
import FormInput from './FormInput';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import { useUserStore } from '../../store/UserStore';
import { useCompanyStore } from '../../store/CompanyStore';
import Selector from '../shared/Selector';
import { TypeDocData, TypeUserData } from '../../utils/staticData';
import ListModules from '../shared/ListModules';

function AddUser({ dataSelect, action, onClose }) {
	const [checkboxs, setCheckboxs] = useState([]);
	const [typeDoc, setTypeDoc] = useState({ icon: '', description: 'otros' });
	const [typeUser, setTypeUser] = useState({
		icon: '',
		description: 'empleado',
	});

	const { insertUser, showPermitsEdit, editingUser } = useUserStore();
	const { dataCompany } = useCompanyStore();
	const [stateTypeDoc, setStateTypeDoc] = useState(false);
	const [stateTypeUser, setStateTypeUser] = useState(false);

	const { isLoading } = useQuery({
		queryKey: ['show permits edit', { user_id: dataSelect.id }],
		queryFn: () => showPermitsEdit({ user_id: dataSelect.id }),
	});

	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm();

	async function handleSubmitUser(data) {
		if (action === 'Editar') {
			const p = {
				id: dataSelect.id,
				name: data.name,
				nro_doc: data.nro_doc,
				phone_number: data.phone_number,
				address: data.address,
				type_user: typeUser.description,
				type_doc: typeDoc.description,
			};
			await editingUser(p, checkboxs, dataCompany.id);
			onClose();
		} else {
			const p = {
				name: data.name,
				email: data.email,
				nro_doc: data.nro_doc,
				phone_number: data.phone_number,
				address: data.address,
				type_user: typeUser.description,
				type_doc: typeDoc.description,
				company_id: dataCompany.id,
			};
			const paramsAuth = {
				email: data.email,
				password: data.password,
			};
			await insertUser(paramsAuth, p, checkboxs);
			onClose();
		}
	}

	useEffect(() => {
		if (action === 'Editar') {
			setTypeDoc({ icon: '', description: dataSelect.type_doc });
			setTypeUser({ icon: '', description: dataSelect.type_user });
		}
	}, []);

	if (isLoading) {
		return <span>cargando...</span>;
	}

	return (
		<Container>
			<div className="sub-contenedor">
				<div className="headers">
					<section>
						<h1>
							{action == 'Editar'
								? 'Editar usuarios'
								: 'Registrar nuevo usuario'}
						</h1>
					</section>

					<section>
						<span onClick={onClose}>x</span>
					</section>
				</div>

				<form className="formulario" onSubmit={handleSubmit(handleSubmitUser)}>
					<section className="seccion1">
						{action != 'Editar' ? (
							<article>
								<FormInput
									icon={<VarableIcon.icononombre />}
									register={register}
									name="email"
									label="Email"
									type="text"
									placeholder="Ingrese su email"
									error={errors.email?.type}
									defaultValue={dataSelect.email}
									disabled={action === 'Editar'}
								/>
							</article>
						) : (
							<span className="form__field disabled">{dataSelect.correo}</span>
						)}

						{action != 'Editar' ? (
							<article>
								<FormInput
									icon={<VarableIcon.icononombre />}
									register={register}
									name="password"
									label="Contraseña"
									type="password"
									placeholder=""
									error={errors.password?.type}
									defaultValue={dataSelect.password}
								/>
							</article>
						) : null}

						<article>
							<FormInput
								icon={<VarableIcon.icononombre />}
								register={register}
								name="name"
								label="Nombre"
								type="text"
								placeholder="Escriba el nombre"
								error={errors.name?.type}
								defaultValue={dataSelect.name}
							/>
						</article>
						<ContainerSelector>
							<label>Tipo doc: </label>
							<Selector
								color="#fc6027"
								onClick={() => setStateTypeDoc(!stateTypeDoc)}
								text1="🎴"
								text2={typeDoc.description}
							/>
							{stateTypeDoc && (
								<ListGeneric
									data={TypeDocData}
									setState={() => setStateTypeDoc(!stateTypeDoc)}
									onClick={(p) => setTypeDoc(p)}
									bottom="-260px"
									scroll="scroll"
								/>
							)}
						</ContainerSelector>
						<article>
							<FormInput
								icon={<VarableIcon.iconostock />}
								register={register}
								name="nro_doc"
								label="Nro. doc"
								type="number"
								placeholder="Numero de documento"
								error={errors.nro_doc?.type}
								defaultValue={dataSelect.nro_doc}
							/>
						</article>
						<article>
							<FormInput
								icon={<VarableIcon.iconostockminimo />}
								register={register}
								name="phone_number"
								label="Teléfono"
								type="text"
								placeholder="Escriba el teléfono"
								error={errors.phone_number?.type}
								defaultValue={dataSelect.phone_number}
							/>
						</article>
						<article>
							<FormInput
								icon={<VarableIcon.iconocodigobarras />}
								register={register}
								name="address"
								label="Dirección"
								type="text"
								placeholder="Escriba la dirección"
								error={errors.address?.type}
								defaultValue={dataSelect.address}
							/>
						</article>
					</section>
					<section className="seccion2">
						<ContainerSelector>
							<label>Tipo: </label>
							<Selector
								color="#fc6027"
								onClick={() => setStateTypeUser(!stateTypeUser)}
								text1="👷‍♂️"
								text2={typeUser.description}
							/>
							{stateTypeUser && (
								<ListGeneric
									data={TypeUserData}
									setState={() => setStateTypeUser(!stateTypeUser)}
									onClick={(p) => setTypeUser(p)}
									bottom="-150px"
									scroll="scroll"
								/>
							)}
						</ContainerSelector>
						PERMISOS:🔑
						<ListModules
							action={action}
							checkboxs={checkboxs}
							setCheckboxs={setCheckboxs}
						/>
					</section>
					<div className="btnguardarContent">
						<ButtonSave
							icon={<VarableIcon.iconoguardar />}
							title="Guardar"
							bgColor="#ef552b"
						/>
					</div>
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

	.form__field {
		font-family: inherit;
		width: 100%;
		border: none;
		border-bottom: 2px solid #9b9b9b;
		outline: 0;
		font-size: 17px;
		color: ${(props) => props.theme.text};
		padding: 7px 0;
		background: transparent;
		transition: border-color 0.2s;

		&.disabled {
			color: #696969;
			background: #2d2d2d;
			border-radius: 8px;
			margin-top: 8px;
			border-bottom: 1px dashed #656565;
			padding: 8px;
		}
	}

	.sub-contenedor {
		width: 100%;
		height: 90vh;
		max-width: 90%;
		border-radius: 20px;
		background: ${({ theme }) => theme.bgtotal};
		box-shadow: -10px 15px 30px rgba(10, 9, 9, 0.4);
		padding: 13px 36px 20px 36px;
		z-index: 100;
		overflow-y: auto;
		overflow-x: hidden;

		&::-webkit-scrollbar {
			width: 6px;
			border-radius: 10px;
		}

		&::-webkit-scrollbar-thumb {
			background-color: #484848;
			border-radius: 10px;
		}

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
			display: grid;
			grid-template-columns: 1fr;
			gap: 15px;

			@media ${Device.tablet} {
				grid-template-columns: repeat(2, 1fr);
			}

			section {
				gap: 20px;
				display: flex;
				flex-direction: column;
			}

			.btnguardarContent {
				display: flex;
				justify-content: end;
				grid-column: 1;
				@media ${Device.tablet} {
					grid-column: 2;
				}
			}
		}
	}
`;

const ContainerSelector = styled.div`
	display: flex;
	gap: 10px;
	align-items: center;
	position: relative;
`;

export default AddUser;
