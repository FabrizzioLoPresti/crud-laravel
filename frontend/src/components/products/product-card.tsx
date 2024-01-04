import { Link } from 'react-router-dom';
import { ProductoType } from '../../types/types';

type Props = {
  producto: ProductoType;
};

const ProductCard = ({ producto }: Props) => {
  return (
    <article className="flex flex-col gap-y-2 justify-between p-4 bg-slate-200 rounded-md">
      <div>
        <h2 className="font-bold text-3xl">{producto.nombre}</h2>
        <p>{producto.descripcion}</p>
      </div>
      <p>
        <span className="font-bold">Categoria:</span>{' '}
        {producto.categoria?.nombre}
      </p>
      <p>
        <span className="font-bold">Stock:</span> {producto.stock}
      </p>
      <p className="font-bold">${producto.precio_lista}</p>

      <Link
        to={`/products/${producto.id}`}
        className="bg-slate-600 px-4 py-2 text-white text-center"
      >
        Ver más
      </Link>
    </article>
  );
};

export default ProductCard;
