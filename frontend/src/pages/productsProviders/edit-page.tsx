import { useParams } from 'react-router-dom';
import ProductProviderForm from '../../components/products_providers/product-provider-form';
import { useGetOneProductProviderQuery } from '../../store/api/productsProvidersApiSlice';

const EditPage = () => {
  const { idProduct, idProvider } = useParams();
  const { data, isLoading, isError, error } = useGetOneProductProviderQuery({
    producto_id: Number(idProduct),
    proveedor_id: Number(idProvider),
  });

  if (isLoading) return <div>Loading...</div>;

  if (isError) {
    if ('status' in error) {
      // you can access all properties of `FetchBaseQueryError` here
      const errMsg =
        'error' in error ? error.error : JSON.stringify(error.data);

      return (
        <div>
          <div>An error has occurred:</div>
          <div>{errMsg}</div>
        </div>
      );
    }
  }

  const { data: productoProveedor } = data ?? {};

  return (
    <section className="max-w-4xl mx-auto flex items-center">
      <ProductProviderForm productProviderEdit={productoProveedor} />
    </section>
  );
};

export default EditPage;
