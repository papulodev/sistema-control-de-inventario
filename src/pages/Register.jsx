import styled from 'styled-components';
import logo from '../assets/inventarioslogo.png';
import cart from '../assets/carrito.svg';
import FormInput from '../components/forms/FormInput';
import { MdAlternateEmail } from 'react-icons/md';
import { useUserStore } from '../store/UserStore';
import { Link, useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { RiLockPasswordLine } from 'react-icons/ri';
import ButtonSave from '../components/shared/ButtonSave';
import { VarableIcon } from '../styles/variables';
import { Device } from '../styles/breackpoints';

function Register() {
  const { addUserAdmin } = useUserStore();

  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const mutation = useMutation({
    mutationFn: async (data) => {
      const params = {
        email: data.email,
        password: data.password,
        type_user: "admin"
      };
      const dt = await addUserAdmin(params);
      if (dt) {
        navigate("/");
      } else {
        console.error("Error al registrar el usuario");
      }
    },
  });
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
        <div className='card'>
          <div className="headers">
            <h1>Registrar usuario</h1>
          </div>

          <form onSubmit={handleSubmit(mutation.mutateAsync)}>
            <FormInput
              icon={<MdAlternateEmail />}
              register={register}
              name="email"
              label="Correo"
              type="email"
              placeholder="eg: ejemplo@email.com"
              error={errors.correo?.type}
            />
            <FormInput
              icon={<RiLockPasswordLine />}
              register={register}
              name="password"
              label="Contraseña"
              type="password"
              placeholder="contraseña"
              error={errors.password?.type}
            />

            <ContainerButton>
              <ButtonSave
                icon={<VarableIcon.iconoguardar />}
                title="Guardar"
                bgColor="#ff7556"
              />

              <Link to={-1} className='linkLogin'>
                Cancelar
              </Link>
            </ContainerButton>
          </form>
        </div>
      </section>
    </Container>
  );
}

const Container = styled.div`
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
  
    .contentImg {
      width: 100%;
      display: flex;
      justify-content: center;

      img {
        width: 40%;
        animation: flotar 1.5s ease-in-out infinite alternate;
      }
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

const ContainerButton = styled.div`
  margin-top: 15px;
  display: flex;
  justify-content: space-between;

  .linkLogin {
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
    text-decoration:none;
    color: #000;
      
    &:hover{
      transform: translate(-0.05em, -0.05em);
      box-shadow: 0.15em 0.15em #000;
    }

    &:active{
      transform: translate(0.05em, 0.05em);
      box-shadow: 0.05em 0.05em #000;
    }
  }
`;

export default Register