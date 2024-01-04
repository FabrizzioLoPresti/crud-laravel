import { ProductoType } from '../../types/types';
import ProductCard from './product-card';
// import { useGetProductsQuery } from '../../api/apiSlice';
import { useGetProductsQuery } from '../../store/api/productsApiSlice';

const ProductList = () => {
  const { data, isLoading, isError, error } = useGetProductsQuery();
  if (isLoading) return <div>Loading...</div>;
  if (isError) {
    if ('status' in error) {
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

  const { data: productos } = data ? data : { data: [] };

  return (
    <>
      {productos.map((producto: ProductoType) => (
        <ProductCard key={producto.id} producto={producto} />
      ))}
    </>
  );
};

export default ProductList;
