// import { useGetProductProvidersQuery } from '../../api/apiSlice';
import {
  useGetProductProvidersQuery,
  useDeleteProductProviderMutation,
} from '../../store/api/productsProvidersApiSlice';

type Props = {
  idProduct: number;
};

const ProductProviderTable = ({ idProduct }: Props) => {
  const { data, isLoading, isError, error } =
    useGetProductProvidersQuery(idProduct);
  const [deleteProductProvider] = useDeleteProductProviderMutation();

  if (isLoading) return <div>Loading...</div>;
  if (isError) {
    if ('status' in error) {
      const errMsg =
        (error.data as { message: string })?.message ||
        JSON.stringify(error.data);

      return (
        <div>
          <div>{errMsg}</div>
        </div>
      );
    }
  }

  const { data: productProviders } = data ? data : { data: [] };

  const handleDelete = async (idProducto: number, idProveedor: number) => {
    const alert = window.confirm(
      '¿Estás seguro de que quieres eliminar este producto con su proveedor?',
    );

    if (alert) {
      await deleteProductProvider({
        producto_id: idProducto,
        proveedor_id: idProveedor,
      });
    }
  };

  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Producto
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Proveedor
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Precio
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Acciones
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {productProviders.map((productProvider) => (
          <tr key={productProvider.id}>
            <td className="px-6 py-4 whitespace-nowrap">
              {productProvider.producto?.nombre}
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              {productProvider.proveedor?.nombre}
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              ${productProvider.precio}
            </td>
            <td className="px-6 py-4 whitespace-nowrap space-x-4">
              <a
                href={`/products/${productProvider.producto_id}/providers/${productProvider.proveedor_id}/edit`}
                className="text-indigo-600 hover:text-indigo-900"
              >
                Editar
              </a>
              <button
                className="text-red-600 hover:text-red-900"
                onClick={() =>
                  handleDelete(
                    productProvider.producto_id,
                    productProvider.proveedor_id,
                  )
                }
              >
                Eliminar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProductProviderTable;
