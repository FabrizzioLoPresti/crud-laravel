import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  useGetProductQuery,
  useDeleteProductMutation,
} from '../../store/api/productsApiSlice';

const ProductPage = () => {
  const { id } = useParams();
  const { data, isLoading, isError, error } = useGetProductQuery(Number(id));
  const [deleteProduct] = useDeleteProductMutation();
  const navigate = useNavigate();

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

  const handleDelete = async (id: number) => {
    try {
      const res = await deleteProduct(id).unwrap();
      console.log(res);
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section className="max-w-7xl mx-auto">
      <h1 className="font-bold text-3xl">{producto?.nombre}</h1>
      <p>{producto?.descripcion}</p>
      <p>
        <span className="font-bold">Stock:</span> {producto?.stock}
      </p>
      <p>
        <span className="font-bold">Categoria:</span>{' '}
        {producto?.categoria?.nombre}
      </p>
      <p className="font-bold">${producto?.precio_lista}</p>
      <div className="flex flex-row gap-x-4">
        <Link
          to={`/products/${producto?.id}/edit`}
          className="bg-slate-600 px-4 py-2 text-white text-center"
        >
          Editar
        </Link>
        <button
          className="bg-slate-600 px-4 py-2 text-white text-center"
          onClick={() => handleDelete(producto?.id as number)}
        >
          Eliminar
        </button>
      </div>
    </section>
  );
};

export default ProductPage;
