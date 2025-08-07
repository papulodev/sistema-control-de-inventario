import { useCategoriesStore } from '../../store/CategoryStore';
import Swal from 'sweetalert2';
import ContentTableActions from './ContentTableActions';
import styled from 'styled-components';
import { VarableIcon } from '../../styles/variables';
import Pagination from './Pagination';
import {
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from '@tanstack/react-table';
import { FaArrowsAltV } from 'react-icons/fa';

function TableCategories({ data, setOpenRegister, setDataSelect, setAction }) {
	const { deletingCategory } = useCategoriesStore();

	const handleEdit = (data) => {
		if (data.description === 'General') {
			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: 'Esta registro no se permite modificar ya que es valor por defecto.',
			});
			return;
		}
		setOpenRegister(true);
		setDataSelect(data);
		setAction('Editar');
	};
	const handleDelete = (p) => {
		if (p.description === 'General') {
			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: 'Este registro no se permite eliminar ya que es valor por defecto.',
			});
			return;
		}
		Swal.fire({
			title: '¿Estás seguro(a)(e)?',
			text: 'Una vez eliminado, ¡no podrá recuperar este registro!',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Si, eliminar',
		}).then(async (result) => {
			if (result.isConfirmed) {
				await deletingCategory({ id: p.id });
			}
		});
	};

	const columns = [
		{
			accessorKey: 'description',
			header: 'Descripcion',
			cell: (info) => (
				<div data-title="Descripcion" className="ContentCell">
					{info.getValue()}
				</div>
			),
		},
		{
			accessorKey: 'color',
			header: 'Color',
			cell: (info) => (
				<div data-title="Color" className="ContentCell">
					<Colorcontent $color={info.getValue()} $alto="25px" $ancho="25px" />
				</div>
			),
		},
		{
			accessorKey: 'actions',
			header: 'Acciones',
			enableSorting: false,
			cell: (info) => (
				<div className="ContentCell">
					<ContentTableActions
						handleEdit={() => handleEdit(info.row.original)}
						handleDelete={() => handleDelete(info.row.original)}
					/>
				</div>
			),
		},
	];

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
	});

	return (
		<Container>
			<table className="responsive-table">
				<thead>
					{table.getHeaderGroups().map((headerGroup) => (
						<tr key={headerGroup.id}>
							{headerGroup.headers.map((header) => (
								<th key={header.id}>
									{header.column.columnDef.header}
									{header.column.getCanSort() && (
										<span
											style={{ cursor: 'pointer' }}
											onClick={header.column.getToggleSortingHandler()}>
											<FaArrowsAltV />
										</span>
									)}
									{
										{
											asc: ' 🔼',
											desc: ' 🔽',
										}[header.column.getIsSorted()]
									}
								</th>
							))}
						</tr>
					))}
				</thead>
				<tbody>
					{table.getRowModel().rows.map((item) => (
						<tr key={item.id}>
							{item.getVisibleCells().map((cell) => (
								<td key={cell.id}>
									{flexRender(cell.column.columnDef.cell, cell.getContext())}
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
			<Pagination
				table={table}
				toStart={() => table.setPageIndex(0)}
				page={table.getState().pagination.pageIndex + 1}
				max={table.getPageCount()}
			/>
		</Container>
	);
}

const Container = styled.div`
	position: relative;

	margin: 5% 3%;
	@media (min-width: ${VarableIcon.bpbart}) {
		margin: 2%;
	}
	@media (min-width: ${VarableIcon.bphomer}) {
		margin: 2em auto;
		/* max-width: ${VarableIcon.bphomer}; */
	}
	.responsive-table {
		width: 100%;
		margin-bottom: 1.5em;
		border-spacing: 0;
		@media (min-width: ${VarableIcon.bpbart}) {
			font-size: 0.9em;
		}
		@media (min-width: ${VarableIcon.bpmarge}) {
			font-size: 1em;
		}
		thead {
			position: absolute;

			padding: 0;
			border: 0;
			height: 1px;
			width: 1px;
			overflow: hidden;
			@media (min-width: ${VarableIcon.bpbart}) {
				position: relative;
				height: auto;
				width: auto;
				overflow: auto;
			}
			th {
				border-bottom: 2px solid rgba(115, 115, 115, 0.32);
				font-weight: normal;
				text-align: center;
				color: ${({ theme }) => theme.text};
				&:first-of-type {
					text-align: center;
				}
			}
		}
		tbody,
		tr,
		th,
		td {
			display: block;
			padding: 0;
			text-align: left;
			white-space: normal;
		}
		tr {
			@media (min-width: ${VarableIcon.bpbart}) {
				display: table-row;
			}
		}

		th,
		td {
			padding: 0.5em;
			vertical-align: middle;
			@media (min-width: ${VarableIcon.bplisa}) {
				padding: 0.75em 0.5em;
			}
			@media (min-width: ${VarableIcon.bpbart}) {
				display: table-cell;
				padding: 0.5em;
			}
			@media (min-width: ${VarableIcon.bpmarge}) {
				padding: 0.75em 0.5em;
			}
			@media (min-width: ${VarableIcon.bphomer}) {
				padding: 0.75em;
			}
		}
		tbody {
			@media (min-width: ${VarableIcon.bpbart}) {
				display: table-row-group;
			}
			tr {
				margin-bottom: 1em;
				@media (min-width: ${VarableIcon.bpbart}) {
					display: table-row;
					border-width: 1px;
				}
				&:last-of-type {
					margin-bottom: 0;
				}
				&:nth-of-type(even) {
					@media (min-width: ${VarableIcon.bpbart}) {
						background-color: rgba(78, 78, 78, 0.12);
					}
				}
			}
			th[scope='row'] {
				@media (min-width: ${VarableIcon.bplisa}) {
					border-bottom: 1px solid rgba(161, 161, 161, 0.32);
				}
				@media (min-width: ${VarableIcon.bpbart}) {
					background-color: transparent;
					text-align: center;
					color: ${({ theme }) => theme.text};
				}
			}
			.ContentCell {
				text-align: right;
				display: flex;
				justify-content: space-between;
				align-items: center;
				height: 50px;

				border-bottom: 1px solid rgba(161, 161, 161, 0.32);
				@media (min-width: ${VarableIcon.bpbart}) {
					justify-content: center;
					border-bottom: none;
				}
			}
			td {
				text-align: right;
				@media (min-width: ${VarableIcon.bpbart}) {
					border-bottom: 1px solid rgba(161, 161, 161, 0.32);
					text-align: center;
				}
			}
			td[data-title]:before {
				content: attr(data-title);
				float: left;
				font-size: 0.8em;
				@media (min-width: ${VarableIcon.bplisa}) {
					font-size: 0.9em;
				}
				@media (min-width: ${VarableIcon.bpbart}) {
					content: none;
				}
			}
		}
	}
`;

const Colorcontent = styled.div`
	justify-content: center;
	min-height: ${(props) => props.$alto};
	width: ${(props) => props.$ancho};
	display: flex;
	background-color: ${(props) => props.$color};
	border-radius: 50%;
	text-align: center;
`;

export default TableCategories;
