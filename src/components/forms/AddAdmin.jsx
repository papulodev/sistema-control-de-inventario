import styled from 'styled-components';
import { useUserStore } from '../../store/UserStore';
import { useNavigate } from 'react-router';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { VarableIcon } from '../../styles/variables';
import ButtonSave from '../shared/ButtonSave';

function AddAdmin({ setState, setInitialState }) {
	const { addUserAdmin } = useUserStore();

	const navigate = useNavigate();
	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm();

	const mutation = useMutation({
		mutationFn: async (data) => {
			const p = {
				email: data.email,
				password: data.password,
			};
			const dt = await addUserAdmin(p);
			if (dt) {
				navigate('/');
			} else {
				setInitialState(false);
			}
		},
	});

	return (
		<Container>
			<ContentClose>
				<span onClick={setState}>x</span>
			</ContentClose>
			<section className="subcontainer">
				<div className="headers">
					<section>
						<h1>Registrar usuario</h1>
					</section>
				</div>

				<form
					className="formulario"
					onSubmit={handleSubmit(mutation.mutateAsync)}>
					<section>
						<article>
							<FormInput
								icon={<MdAlternateEmail />}
								register={{
									...register('email', {
										required: true,
										pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/i,
									}),
								}}
								name="email"
								label="Email"
								type="email"
								placeholder="eg: ejemplo@email.com"
								error={errors.email?.type}
							/>
						</article>
						<article>
							<FormInput
								icon={<RiLockPasswordLine />}
								register={register}
								name="password"
								label="Contraseña"
								type="password"
								placeholder="Ingrese su contraseña"
								error={errors.password?.type}
							/>
						</article>
						<div className="btnguardarContent">
							<ButtonSave
								icon={<VarableIcon.iconoguardar />}
								title="Guardar"
								bgColor="#ff7556"
							/>
						</div>
					</section>
				</form>
			</section>
		</Container>
	);
}

const Container = styled.div`
	position: absolute;
	height: 100%;
	width: 100%;
	top: 0;
	left: 0;
	border-radius: 20px;
	background: #fff;
	box-shadow: -10px 15px 30px rgba(10, 9, 9, 0.4);
	padding: 13px 36px 20px 36px;
	z-index: 100;
	display: flex;
	align-items: center;

	.subcontainer {
		width: 100%;
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
`;

const ContentClose = styled.div`
	position: absolute;
	top: 0;
	right: 0;
	font-size: 33px;
	margin: 30px;
	cursor: pointer;
`;

export default AddAdmin;
