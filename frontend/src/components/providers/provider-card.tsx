import { Link } from 'react-router-dom';
import { ProviderType } from '../../types/types';

interface Props {
  provider: ProviderType;
}

const ProviderCard = ({ provider }: Props) => {
  return (
    <article className="flex flex-col gap-y-2 justify-between p-4 bg-slate-200 rounded-md">
      <div>
        <h2 className="font-bold text-3xl">{provider.nombre}</h2>
        <p>
          <span className="font-bold">Tel:</span> {provider.telefono}
        </p>
        <p>
          <span className="font-bold">Email:</span> {provider.email}
        </p>
      </div>
      <p>
        <span className="font-bold">Direccion:</span> {provider.direccion.calle}{' '}
        {provider.direccion.numero} - {provider.direccion.barrio},{' '}
        {provider.direccion.ciudad}, {provider.direccion.provincia}
      </p>
      <p>
        <span className="font-bold">Estado:</span>{' '}
        {provider.estado ? 'Activo' : 'Inactivo'}
      </p>

      <Link
        to={`/providers/${provider.id}`}
        className="bg-slate-600 px-4 py-2 text-white text-center"
      >
        Ver más
      </Link>
    </article>
  );
};

export default ProviderCard;
