import styled from 'styled-components';
import { Device } from '../../styles/breackpoints';
import ButtonSave from '../shared/ButtonSave';
import { VarableIcon } from '../../styles/variables';
import ButtonFilter from '../shared/ButtonFilter';
import { useProductsStore } from '../../store/ProductStore';
import { useCompanyStore } from '../../store/CompanyStore';
import { useBrandStore } from '../../store/BrandStore';
import { useCategoriesStore } from '../../store/CategoryStore';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import AddBrand from './AddBrand';
import AddCategories from './AddCategories';
import { ConvertCapitalize } from '../../utils/ConvertCapitalize';
import FormInput from './FormInput';
import ListGeneric from '../shared/ListGeneric';
import Selector from '../shared/Selector';

function AddProduct({ onClose, dataSelect, action }) {
	const { insertProduct, editingProduct } = useProductsStore();
	const { dataCompany } = useCompanyStore();
	const { brandItemSelect, dataBrand, selectBrand } = useBrandStore();
	const { categoryItemSelect, dataCategories, selectCategories } =
		useCategoriesStore();

	const [stateBrand, setStateBrand] = useState(false);
	const [stateCategory, setStateCategory] = useState(false);
	const [openAddBrand, setOpenAddBrand] = useState(false);
	const [openAddCategory, setOpenAddCategory] = useState(false);
	const [subAction, setAction] = useState('');

	const handleAddNewBrand = () => {
		setOpenAddBrand(!openAddBrand);
		setAction('Nuevo');
	};
	const handleAddNewCategory = () => {
		setOpenAddCategory(!openAddCategory);
		setAction('Nuevo');
	};

	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm();

	async function insertar(data) {
		if (action === 'Editar') {
			const p = {
				id: dataSelect.id,
				description: ConvertCapitalize(data.description),
				brand_id: brandItemSelect.id,
				stock: parseFloat(data.stock),
				stock_min: parseFloat(data.stock_min),
				bar_code: parseFloat(data.bar_code),
				internal_code: data.internal_code,
				sale_price: parseFloat(data.sale_price),
				purchase_price: parseFloat(data.purchase_price),
				category_id: categoryItemSelect.id,
				company_id: dataCompany.id,
			};
			await editingProduct(p);
			onClose();
		} else {
			const p = {
				_description: ConvertCapitalize(data.description),
				_brand_id: brandItemSelect.id,
				_stock: parseFloat(data.stock),
				_stock_min: parseFloat(data.internal_code),
				_bar_code: parseFloat(data.bar_code),
				_internal_code: data.internal_code,
				_sale_price: parseFloat(data.sale_price),
				_purchase_price: parseFloat(data.purchase_price),
				_category_id: categoryItemSelect.id,
				_company_id: dataCompany.id,
			};
			await insertProduct(p);
			onClose();
		}
	}

	useEffect(() => {
		if (action === 'Editar') {
			selectBrand({ id: dataSelect.brand_id, description: dataSelect.brand });
			selectCategories({
				id: dataSelect.category_id,
				description: dataSelect.category,
			});
		}
	}, []);

	return (
		<Container>
			<div className="sub-contenedor">
				<div className="headers">
					<section>
						<h1>
							{action == 'Editar'
								? 'Editar productos'
								: 'Registrar nuevo producto'}
						</h1>
					</section>

					<section>
						<span onClick={onClose}>x</span>
					</section>
				</div>

				<form className="formulario" onSubmit={handleSubmit(insertar)}>
					<section className="seccion1">
						<article>
							<FormInput
								icon={<VarableIcon.icononombre />}
								register={register}
								name="description"
								label="Descripción"
								type="text"
								placeholder="Escriba la descripción"
								error={errors.description?.type}
								defaultValue={dataSelect.description}
							/>
						</article>
						<ContainerSelector>
							<label>Marca: </label>
							<Selector
								onClick={() => setStateBrand(!stateBrand)}
								state={stateBrand}
								color="#fc6027"
								text1="🍿"
								text2={brandItemSelect?.description}
							/>
							{stateBrand && (
								<ListGeneric
									data={dataBrand}
									setState={() => setStateBrand(!stateBrand)}
									onClick={selectBrand}
									scroll="scroll"
									bottom="-260px"
								/>
							)}
							<ButtonFilter
								bgColor="#f6f3f3"
								textColor="#353535"
								icon={<VarableIcon.agregar />}
								onClick={handleAddNewBrand}
							/>
						</ContainerSelector>
						<article>
							<FormInput
								icon={<VarableIcon.iconostock />}
								register={register}
								name="stock"
								label="Stock"
								type="number"
								placeholder="Escriba el stock"
								error={errors.stock?.type}
								defaultValue={dataSelect.stock}
							/>
						</article>
						<article>
							<FormInput
								icon={<VarableIcon.iconostockminimo />}
								register={register}
								name="stock_min"
								label="Stock mínimo"
								type="number"
								placeholder="Escriba el stock mínimo"
								error={errors.stock_min?.type}
								defaultValue={dataSelect.stock_min}
							/>
						</article>
						<ContainerSelector>
							<label>Categoria: </label>
							<Selector
								color="#fc6027"
								state={stateCategory}
								onClick={() => setStateCategory(!stateCategory)}
								text1="🍿"
								text2={categoryItemSelect?.description}
							/>
							<ButtonFilter
								bgColor="#f6f3f3"
								onClick={handleAddNewCategory}
								textColor="#353535"
								icon={<VarableIcon.agregar />}
							/>
							{stateCategory && (
								<ListGeneric
									data={dataCategories}
									setState={() => setStateCategory(!stateCategory)}
									onClick={selectCategories}
									bottom="-260px"
									scroll="scroll"
								/>
							)}
						</ContainerSelector>
					</section>
					<section className="seccion2">
						<article>
							<FormInput
								icon={<VarableIcon.iconocodigobarras />}
								register={register}
								name="bar_code"
								label="Código de barras"
								type="text"
								placeholder="Escriba el código de barras"
								error={errors.bar_code?.type}
								defaultValue={dataSelect.bar_code}
							/>
						</article>
						<article>
							<FormInput
								icon={<VarableIcon.iconocodigointerno />}
								register={register}
								name="internal_code"
								label="Código interno"
								type="text"
								placeholder="Escriba el código interno"
								error={errors.internal_code?.type}
								defaultValue={dataSelect.internal_code}
							/>
						</article>
						<article>
							<FormInput
								icon={<VarableIcon.iconoprecioventa />}
								register={register}
								name="sale_price"
								label="Precio de venta"
								type="number"
								placeholder="Escriba el precio de venta"
								error={errors.sale_price?.type}
								defaultValue={dataSelect.sale_price}
							/>
						</article>
						<article>
							<FormInput
								icon={<VarableIcon.iconopreciocompra />}
								register={register}
								name="purchase_price"
								label="Precio de compra"
								type="number"
								placeholder="Escriba el precio de compra"
								error={errors.purchase_price?.type}
								defaultValue={dataSelect.purchase_price}
							/>
						</article>
					</section>
					<div className="btnguardarContent">
						<ButtonSave
							icon={<VarableIcon.iconoguardar />}
							title="Guardar"
							bgColor="#ef552b"
						/>
					</div>
				</form>
				{openAddBrand && (
					<AddBrand
						onClose={() => setOpenAddBrand(!openAddBrand)}
						dataSelect={dataSelect}
						action={subAction}
					/>
				)}
				{openAddCategory && (
					<AddCategories
						onClose={() => setOpenAddCategory(!openAddCategory)}
						dataSelect={dataSelect}
						action={subAction}
					/>
				)}
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
		width: 100%;
		max-width: 90%;
		border-radius: 20px;
		background: ${({ theme }) => theme.bgtotal};
		box-shadow: -10px 15px 30px rgba(10, 9, 9, 0.4);
		padding: 13px 36px 20px 36px;
		z-index: 100;
		height: 90vh;
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

export default AddProduct;
