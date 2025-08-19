import { VarableIcon } from '../styles/variables';

import { AiOutlineHome, AiOutlineSetting } from 'react-icons/ai';

export const DesplegableUser = [
	{
		text: 'Mi perfil',
		icono: <VarableIcon.iconoUser />,
		tipo: 'miperfil',
	},
	{
		text: 'Configuracion',
		icono: <VarableIcon.iconoSettings />,
		tipo: 'configuracion',
	},
	{
		text: 'Cerrar sesión',
		icono: <VarableIcon.iconoCerrarSesion />,
		tipo: 'cerrarsesion',
	},
];

//data SIDEBAR
export const LinksArray = [
	{
		label: 'Home',
		icon: <AiOutlineHome />,
		to: '/',
	},
	{
		label: 'Kardex',
		icon: <VarableIcon.iconocategorias />,
		to: '/kardex',
	},
	{
		label: 'Reportes',
		icon: <VarableIcon.iconoreportes />,
		to: '/reports',
	},
];
export const SecondarylinksArray = [
	{
		label: 'Configuración',
		icon: <AiOutlineSetting />,
		to: '/configuration',
	},
];
//temas
export const TemasData = [
	{
		icono: '🌞',
		descripcion: 'light',
	},
	{
		icono: '🌚',
		descripcion: 'dark',
	},
];

//data configuracion
export const DataModulesConfiguration = [
	{
		title: 'Productos',
		subtitle: 'registra tus productos',
		icono: 'https://i.ibb.co/85zJ6yG/caja-del-paquete.png',
		link: '/configuration/products',
	},
	{
		title: 'Personal',
		subtitle: 'ten el control de tu personal',
		icono: 'https://i.ibb.co/5vgZ0fX/hombre.png',
		link: '/configuration/users',
	},

	{
		title: 'Tu empresa',
		subtitle: 'configura tus opciones básicas',
		icono: 'https://i.ibb.co/x7mHPgm/administracion-de-empresas.png',
		link: '/configuration/company',
	},
	{
		title: 'Categoria de productos',
		subtitle: 'asigna categorias a tus productos',
		icono: 'https://i.ibb.co/VYbMRLZ/categoria.png',
		link: '/configuration/categories',
	},
	{
		title: 'Marca de productos',
		subtitle: 'gestiona tus marcas',
		icono: 'https://i.ibb.co/1qsbCRb/piensa-fuera-de-la-caja.png',
		link: '/configuration/brands',
	},
];
//tipo usuario
export const TypeUserData = [
	{
		description: 'empleado',
		icon: '🪖',
	},
	{
		description: 'administrador',
		icon: '👑',
	},
];
//tipodoc
export const TypeDocData = [
	{
		description: 'Dni',
		icon: '🪖',
	},
	{
		description: 'Libreta electoral',
		icon: '👑',
	},
	{
		description: 'Otros',
		icon: '👑',
	},
];
