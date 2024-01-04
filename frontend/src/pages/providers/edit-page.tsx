import { useParams } from 'react-router-dom';
import ProviderForm from '../../components/providers/provider-form';
import { useGetProviderQuery } from '../../store/api/providersApiSplice';

const EditPage = () => {
  const { id } = useParams();
  const { data, isLoading, isError, error } = useGetProviderQuery(Number(id));

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

  return (
    <section className="max-w-4xl mx-auto flex items-center">
      <ProviderForm providerEdit={provider} />
    </section>
  );
};

export default EditPage;
