import { useParams } from 'react-router-dom';
import ProductForm from '../../components/products/product-form';
import { useGetProductQuery } from '../../store/api/productsApiSlice';

const EditPage = () => {
  const { id } = useParams();
  const { data, isLoading, isError, error } = useGetProductQuery(Number(id));

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

  const { data: producto } = data ?? {};

  return (
    <section className="max-w-4xl mx-auto flex items-center">
      <ProductForm productEdit={producto} />
    </section>
  );
};

export default EditPage;
