import { useState } from 'react';
import logo from '../assets/inventarioslogo.png';
import cart from '../assets/carrito.svg';
import { useAuthStore } from '../store/AuthStore';
import { Device } from '../styles/breackpoints';
import { Link, useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { VarableIcon } from '../styles/variables';
import ButtonSave from '../components/shared/ButtonSave';
import { MdOutlineInfo } from 'react-icons/md';
import styled from 'styled-components';
import FormInput from '../components/forms/FormInput';
import FooterLogin from '../components/forms/FooterLogin';
import AddAdmin from '../components/forms/AddAdmin';

function Login() {
	const { signInWithEmail } = useAuthStore();
	const [state, setState] = useState(false);
	const [initialState, setInitialState] = useState(false);
	const navigate = useNavigate();

	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm();

	async function handleSignIn(data) {
		const response = await signInWithEmail({
			email: data.email,
			password: data.password,
		});

		if (response) {
			navigate('/');
		} else {
			setInitialState(true);
		}
	}

	return (
		<Container>
			<div className="contentLogo">
				<img src={logo} />
				<span>Papulo Inventario</span>
			</div>
			<div className="bannerLeft">
				<img src={cart} />
			</div>

			<section className="contentCard">
				<div className="card">
					{state && (
						<AddAdmin
							setState={() => setState(!state)}
							setInitialState={setInitialState}
						/>
					)}

					<Title>Papulo Inventario</Title>
					<span className="help">
						{' '}
						Puedes crear una cuenta nueva ó <br></br>solicitar a tu empleador
						una. <MdOutlineInfo />
					</span>
					<p className="phrase">Controla tu inventario.</p>
					<form onSubmit={handleSubmit(handleSignIn)}>
						<FormInput
							icon={<VarableIcon.iconoemail />}
							register={register}
							name="email"
							label="Email"
							type="email"
							placeholder="eg: ejemplo@email.com"
							error={errors.email?.type}
						/>

						<FormInput
							icon={<VarableIcon.iconopass />}
							register={register}
							name="password"
							label="Contraseña"
							type="password"
							placeholder="contraseña"
							error={errors.password?.type}
						/>

						{initialState && (
							<TextInitialState>Datos incorrectos</TextInitialState>
						)}

						<ContainerButton>
							<ButtonSave title="Iniciar" bgColor="#fc6b32" />
							<Link to="/register" className="linkRegister">
								Crear cuenta
							</Link>
						</ContainerButton>
					</form>
				</div>
				<FooterLogin />
			</section>
		</Container>
	);
}

const Container = styled.div`
	background-size: cover;
	height: 100vh;
	display: grid;
	grid-template-columns: 1fr;
	align-items: center;
	justify-content: center;
	text-align: center;
	background-color: #262626;

	@media ${Device.tablet} {
		grid-template-columns: 1fr 2fr;
	}

	.contentLogo {
		position: absolute;
		top: 15px;
		font-weight: 700;
		display: flex;
		left: 15px;
		align-items: center;
		color: #fff;

		img {
			width: 50px;
		}
	}

	.cuadros {
		transition: cubic-bezier(0.4, 0, 0.2, 1) 0.6s;
		position: absolute;
		height: 100%;
		width: 100%;
		bottom: 0;
		transition: 0.6s;
	}

	.bannerLeft {
		background-color: #fc6b32;
		height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		img {
			width: 80%;
		}
	}

	.contentCard {
		grid-column: 2;
		background-color: #ffffff;
		background-size: cover;
		z-index: 100;
		position: relative;
		gap: 30px;
		display: flex;
		padding: 20px;
		box-shadow: 8px 5px 18px 3px rgba(0, 0, 0, 0.35);
		justify-content: center;
		width: auto;
		height: 100%;
		width: 100%;
		align-items: center;
		flex-direction: column;
		justify-content: space-between;

		.card {
			padding-top: 80px;
			width: 100%;
			@media ${Device.laptop} {
				width: 50%;
			}
		}

		.version {
			color: #727272;
			text-align: start;
		}

		.contentImg {
			width: 100%;
			display: flex;
			justify-content: center;

			img {
				width: 40%;
				animation: flotar 1.5s ease-in-out infinite alternate;
			}
		}

		.phrase {
			color: #fc6c32;
			font-size: 1.5rem;
			font-weight: 700;
			margin-bottom: 30px;
		}

		.help {
			position: absolute;
			top: 15px;
			right: 15px;
			color: #8d8d8d;
			font-size: 15px;
			font-weight: 500;
		}

		&:hover {
			.contentsvg {
				top: -100px;
				opacity: 1;
			}
			.cuadros {
				transform: rotate(37deg) rotateX(5deg) rotateY(12deg) rotate(3deg)
					skew(2deg) skewY(1deg) scaleX(1.2) scaleY(1.2);
				color: red;
			}
		}
	}

	@keyframes flotar {
		0% {
			transform: translate(0, 0px);
		}
		50% {
			transform: translate(0, 15px);
		}
		100% {
			transform: translate(0, -0px);
		}
	}

	.linkRegister {
		background: ${(props) => props.$bgcolor};
		padding: 0.6em 1.3em;
		font-weight: 900;
		font-size: 18px;
		border: 3px solid black;
		border-radius: 0.4em;
		box-shadow: 0.1em 0.1em #000;
		transition: 0.2s;
		white-space: 1px;
		color: #000;
		cursor: pointer;
		text-decoration: none;
		color: #000;

		&:hover {
			transform: translate(-0.05em, -0.05em);
			box-shadow: 0.15em 0.15em #000;
		}

		&:active {
			transform: translate(0.05em, 0.05em);
			box-shadow: 0.05em 0.05em #000;
		}
	}
`;
const Title = styled.span`
	font-size: 3rem;
	font-weight: 700;
`;
const ContainerButton = styled.div`
	margin-top: 15px;
	display: flex;
	justify-content: space-between;
`;
const TextInitialState = styled.p`
	color: #fc7575;
`;

export default Login;
