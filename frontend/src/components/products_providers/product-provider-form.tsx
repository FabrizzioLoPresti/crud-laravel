import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { ProductoProveedorType } from '../../types/types';
import { useGetProductsQuery } from '../../store/api/productsApiSlice';
import { useGetProvidersQuery } from '../../store/api/providersApiSplice';
import {
  useCreateProductProviderMutation,
  useUpdateProductProviderMutation,
} from '../../store/api/productsProvidersApiSlice';

type Props = {
  productProviderEdit?: ProductoProveedorType;
};

type Inputs = {
  producto: number;
  proveedor: number;
  precio: number;
};

interface ErrorResponse {
  data: {
    message: string;
  };
}

const ProductProviderForm = ({ productProviderEdit }: Props) => {
  const [error, setError] = useState<string>('');
  const { data: products } = useGetProductsQuery();
  const { data: providers } = useGetProvidersQuery();
  const [createProductProvider] = useCreateProductProviderMutation();
  const [updateProductProvider] = useUpdateProductProviderMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (data) => {
    const productProviderData: ProductoProveedorType = {
      producto_id: data.producto,
      proveedor_id: data.proveedor,
      precio: data.precio,
    };

    try {
      const res = productProviderEdit
        ? await updateProductProvider({
            id: productProviderEdit.id,
            ...productProviderData,
          }).unwrap()
        : await createProductProvider(productProviderData).unwrap();

      console.log(res);
      navigate('/');
    } catch (err) {
      setError((err as ErrorResponse).data.message);
    }
  });

  return (
    <form
      onSubmit={onSubmit}
      className="mx-auto w-1/2 flex flex-col gap-y-4 [&>div]:flex [&>div]:flex-col [&>div]:gap-y-2 bg-slate-200 rounded-md py-2 px-4"
    >
      <div>
        <label htmlFor="producto">Producto</label>
        <select
          id="producto"
          {...register('producto', {
            required: {
              value: true,
              message: 'El producto es requerido',
            },
          })}
          className="border border-gray-300 rounded-md shadow-sm p-2 w-full"
          defaultValue={productProviderEdit?.producto_id}
          disabled={!!productProviderEdit}
        >
          {products?.data.map((product) => (
            <option key={product.id} value={product.id}>
              {product.id} - {product.nombre}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="proveedor">Proveedor</label>
        <select
          id="proveedor"
          {...register('proveedor', {
            required: {
              value: true,
              message: 'El proveedor es requerido',
            },
          })}
          className="border border-gray-300 rounded-md shadow-sm p-2 w-full"
          defaultValue={productProviderEdit?.proveedor_id}
          disabled={!!productProviderEdit}
        >
          {providers?.data.map((provider) => (
            <option key={provider.id} value={provider.id}>
              {provider.id} - {provider.nombre}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="precio">Precio</label>
        <input
          type="number"
          id="precio"
          min={0}
          {...register('precio', {
            required: {
              value: true,
              message: 'El precio es requerido',
            },
            min: {
              value: 0,
              message: 'El precio debe ser mayor a 0',
            },
          })}
          className="border border-gray-300 rounded-md shadow-sm p-2 w-full"
          defaultValue={productProviderEdit?.precio}
        />
        {errors.precio && (
          <span className="text-red-500 text-sm">{errors.precio.message}</span>
        )}
      </div>

      <button className="bg-slate-600 text-white py-2">
        {productProviderEdit ? 'Guardar Cambios' : 'Crear Producto'}
      </button>
      {
        <span className="text-red-500 text-sm">
          {error ? error : errors.precio?.message}
        </span>
      }
    </form>
  );
};

export default ProductProviderForm;
