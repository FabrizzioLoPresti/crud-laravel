import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  useGetProviderQuery,
  useDeleteProviderMutation,
} from '../../store/api/providersApiSplice';

const ProviderPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, isError, error } = useGetProviderQuery(Number(id));
  const [deleteProvider] = useDeleteProviderMutation();

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

  const { data: provider } = data ?? {};

  const handleDelete = async (id: number) => {
    try {
      const res = await deleteProvider(id).unwrap();
      console.log(res);
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section className="max-w-7xl mx-auto">
      <h1 className="font-bold text-3xl">{provider?.nombre}</h1>
      <p>
        <span className="font-bold">Tel:</span> {provider?.telefono}
      </p>
      <p>
        <span className="font-bold">Email:</span> {provider?.email}
      </p>
      <p>
        <span className="font-bold">Direccion:</span>{' '}
        {provider?.direccion.calle} {provider?.direccion.numero} -{' '}
        {provider?.direccion.barrio}, {provider?.direccion.ciudad},{' '}
        {provider?.direccion.provincia}
      </p>
      <p>
        <span className="font-bold">Estado:</span>{' '}
        {provider?.estado ? 'Activo' : 'Inactivo'}
      </p>
      <div className="flex flex-row gap-x-4">
        <Link
          to={`/providers/${provider?.id}/edit`}
          className="bg-slate-600 px-4 py-2 text-white text-center"
        >
          Editar
        </Link>
        <button
          className="bg-slate-600 px-4 py-2 text-white text-center"
          onClick={() => handleDelete(provider?.id as number)}
        >
          Eliminar
        </button>
      </div>
    </section>
  );
};

export default ProviderPage;
