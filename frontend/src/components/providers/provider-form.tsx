import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { ProviderType } from '../../types/types';
import {
  useCreateProviderMutation,
  useUpdateProviderMutation,
} from '../../store/api/providersApiSplice';

type Props = {
  providerEdit?: ProviderType;
};

type Inputs = {
  nombre: string;
  telefono: string;
  email: string;
  calle: string;
  numero: number;
  barrio: string;
  ciudad: string;
  provincia: string;
  estado: boolean;
};

const ProviderForm = ({ providerEdit }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const navigate = useNavigate();
  const [createProvider] = useCreateProviderMutation();
  const [updateProvider] = useUpdateProviderMutation();

  const onSubmit = handleSubmit(async (data) => {
    const providerData = {
      nombre: data.nombre,
      telefono: data.telefono,
      email: data.email,
      direccion: {
        calle: data.calle,
        numero: data.numero,
        barrio: data.barrio,
        ciudad: data.ciudad,
        provincia: data.provincia,
      },
    };

    try {
      const res = providerEdit
        ? await updateProvider({
            id: providerEdit.id,
            ...providerData,
          }).unwrap()
        : await createProvider(providerData).unwrap();

      console.log(res);
    } catch (err) {
      console.log(err);
    }

    console.log(providerData);

    navigate('/');
  });

  return (
    <form
      onSubmit={onSubmit}
      className="mx-auto w-1/2 flex flex-col gap-y-4 [&>div]:flex [&>div]:flex-col [&>div]:gap-y-2 bg-slate-200 rounded-md py-2 px-4"
    >
      <div>
        <label htmlFor="nombre">Nombre</label>
        <input
          type="text"
          id="nombre"
          className="border border-slate-600"
          defaultValue={providerEdit?.nombre}
          {...register('nombre', {
            required: {
              value: true,
              message: 'El nombre es requerido',
            },
          })}
        />
        {errors.nombre && (
          <span className="text-red-500 text-sm">{errors.nombre.message}</span>
        )}
      </div>

      <div>
        <label htmlFor="telefono">Telefono</label>
        <input
          type="text"
          id="telefono"
          className="border border-slate-600"
          defaultValue={providerEdit?.telefono}
          {...register('telefono', {
            required: {
              value: true,
              message: 'El telefono es requerido',
            },
          })}
        />
        {errors.telefono && (
          <span className="text-red-500 text-sm">
            {errors.telefono.message}
          </span>
        )}
      </div>

      <div>
        <label htmlFor="email">Email</label>
        <input
          type="text"
          id="email"
          className="border border-slate-600"
          defaultValue={providerEdit?.email}
          {...register('email', {
            required: {
              value: true,
              message: 'El email es requerido',
            },
          })}
        />
        {errors.email && (
          <span className="text-red-500 text-sm">{errors.email.message}</span>
        )}
      </div>

      <div>
        <label htmlFor="calle">Calle</label>
        <input
          type="text"
          id="calle"
          className="border border-slate-600"
          defaultValue={providerEdit?.direccion.calle}
          {...register('calle', {
            required: {
              value: true,
              message: 'La calle es requerida',
            },
          })}
        />
        {errors.calle && (
          <span className="text-red-500 text-sm">{errors.calle.message}</span>
        )}
      </div>

      <div>
        <label htmlFor="numero">Numero</label>
        <input
          type="number"
          id="numero"
          className="border border-slate-600"
          defaultValue={providerEdit?.direccion.numero}
          {...register('numero', {
            required: {
              value: true,
              message: 'El numero es requerido',
            },
          })}
        />
        {errors.numero && (
          <span className="text-red-500 text-sm">{errors.numero.message}</span>
        )}
      </div>

      <div>
        <label htmlFor="barrio">Barrio</label>
        <input
          type="text"
          id="barrio"
          className="border border-slate-600"
          defaultValue={providerEdit?.direccion.barrio}
          {...register('barrio', {
            required: {
              value: true,
              message: 'El barrio es requerido',
            },
          })}
        />
        {errors.barrio && (
          <span className="text-red-500 text-sm">{errors.barrio.message}</span>
        )}
      </div>

      <div>
        <label htmlFor="ciudad">Ciudad</label>
        <input
          type="text"
          id="ciudad"
          className="border border-slate-600"
          defaultValue={providerEdit?.direccion.ciudad}
          {...register('ciudad', {
            required: {
              value: true,
              message: 'La ciudad es requerida',
            },
          })}
        />
        {errors.ciudad && (
          <span className="text-red-500 text-sm">{errors.ciudad.message}</span>
        )}
      </div>

      <div>
        <label htmlFor="provincia">Provincia</label>
        <input
          type="text"
          id="provincia"
          className="border border-slate-600"
          defaultValue={providerEdit?.direccion.provincia}
          {...register('provincia', {
            required: {
              value: true,
              message: 'La provincia es requerida',
            },
          })}
        />
        {errors.provincia && (
          <span className="text-red-500 text-sm">
            {errors.provincia.message}
          </span>
        )}
      </div>

      <button className="bg-slate-600 text-white py-2">
        {providerEdit ? 'Guardar Cambios' : 'Crear Proveedor'}
      </button>
    </form>
  );
};

export default ProviderForm;
