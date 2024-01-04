import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { ProductoType } from '../../types/types';
import {
  useGetCategoriesQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
} from '../../store/api/productsApiSlice';

type Props = {
  productEdit?: ProductoType;
};

type Inputs = {
  nombre: string;
  descripcion: string;
  precio_lista: number;
  stock: number;
  categoria: number;
};

const ProductForm = ({ productEdit }: Props) => {
  const { data, isLoading } = useGetCategoriesQuery();
  const [createProduct] = useCreateProductMutation();
  const [updateProduct] = useUpdateProductMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const navigate = useNavigate();

  if (isLoading) return <div>Loading...</div>;
  const { data: categorias } = data ? data : { data: [] };

  const onSubmit = handleSubmit(async (data) => {
    const productData = {
      nombre: data.nombre,
      descripcion: data.descripcion,
      precio_lista: data.precio_lista,
      stock: data.stock,
      categoria_id: Number(data.categoria),
    };

    try {
      const res = productEdit
        ? await updateProduct({ id: productEdit.id, ...productData }).unwrap()
        : await createProduct(productData).unwrap();

      console.log(res);
    } catch (err) {
      console.log(err);
    }

    navigate('/');
  });

  return (
    <form
      onSubmit={onSubmit}
      className="mx-auto w-1/2 flex flex-col gap-y-4 [&>div]:flex [&>div]:flex-col [&>div]:gap-y-2 bg-slate-200 rounded-md py-2 px-4"
    >
      <div>
        <label htmlFor="nombre">Nombre</label>
        <input
          type="text"
          id="nombre"
          className="border border-slate-600"
          defaultValue={productEdit?.nombre}
          {...register('nombre', {
            required: {
              value: true,
              message: 'El nombre es requerido',
            },
          })}
        />
        {errors.nombre && (
          <span className="text-red-500 text-sm">{errors.nombre.message}</span>
        )}
      </div>

      <div>
        <label htmlFor="descripcion">Descripción</label>
        <textarea
          id="descripcion"
          className="border border-slate-600 resize-none"
          rows={5}
          defaultValue={productEdit?.descripcion}
          {...register('descripcion', {
            required: {
              value: true,
              message: 'La descripción es requerida',
            },
          })}
        />
        {errors.descripcion && (
          <span className="text-red-500 text-sm">
            {errors.descripcion.message}
          </span>
        )}
      </div>

      <div>
        <label htmlFor="precio_lista">Precio de lista</label>
        <input
          type="number"
          id="precio_lista"
          className="border border-slate-600"
          step="any"
          pattern="[0-9,.]+"
          defaultValue={productEdit?.precio_lista}
          {...register('precio_lista', {
            required: {
              value: true,
              message: 'El precio es requerido',
            },
            min: {
              value: 1,
              message: 'El precio debe ser mayor a 0',
            },
          })}
        />
        {errors.precio_lista && (
          <span className="text-red-500 text-sm">
            {errors.precio_lista.message}
          </span>
        )}
      </div>

      {/* Agregar campo de stock */}
      <div>
        <label htmlFor="stock">Stock</label>
        <input
          type="number"
          id="stock"
          className="border border-slate-600"
          defaultValue={productEdit?.stock}
          {...register('stock', {
            required: {
              value: true,
              message: 'El stock es requerido',
            },
            min: {
              value: 1,
              message: 'El stock debe ser mayor a 0',
            },
          })}
        />
        {errors.stock && (
          <span className="text-red-500 text-sm">{errors.stock.message}</span>
        )}
      </div>

      <div>
        <label htmlFor="categoria">Categoria</label>
        <select
          id="categoria"
          className="border border-slate-600"
          defaultValue={productEdit?.categoria?.id}
          {...register('categoria', {
            required: {
              value: true,
              message: 'La categoria es requerida',
            },
          })}
        >
          {categorias?.map((categoria) => (
            <option key={categoria.id} value={categoria.id}>
              {categoria.nombre}
            </option>
          ))}
        </select>
        {errors.categoria && (
          <span className="text-red-500 text-sm">
            {errors.categoria.message}
          </span>
        )}
      </div>

      <button className="bg-slate-600 text-white py-2">
        {productEdit ? 'Guardar Cambios' : 'Crear Producto'}
      </button>
    </form>
  );
};

export default ProductForm;
