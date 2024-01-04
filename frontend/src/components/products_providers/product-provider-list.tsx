import { useState } from 'react';
import ProductProviderTable from './product-provider-table';
// import { useGetProductsQuery } from '../../api/apiSlice';
import { useGetProductsQuery } from '../../store/api/productsApiSlice';

const ProductProviderList = () => {
  const [idProduct, setIdProduct] = useState(1);
  const { data } = useGetProductsQuery();
  const { data: productos } = data ? data : { data: [] };
  return (
    <>
      <select
        name="products"
        id="products"
        onChange={(e) => setIdProduct(Number(e.target.value))}
        className="border border-gray-300 rounded-md shadow-sm p-2 w-1/4"
      >
        {productos.map((producto) => (
          <option key={producto.id} value={producto.id}>
            {producto.nombre}
          </option>
        ))}
      </select>
      <ProductProviderTable idProduct={idProduct} />
    </>
  );
};

export default ProductProviderList;
