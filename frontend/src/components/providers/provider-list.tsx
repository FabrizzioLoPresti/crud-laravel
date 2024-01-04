// import { useGetProvidersQuery } from '../../api/apiSlice';
import { useGetProvidersQuery } from '../../store/api/providersApiSplice';
import ProviderCard from './provider-card';

const ProvidersList = () => {
  const { data, isLoading, isError, error } = useGetProvidersQuery();

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

  const { data: providers } = data ? data : { data: [] };

  return (
    <>
      {providers.map((provider) => (
        <div key={provider.id}>
          <ProviderCard provider={provider} />
        </div>
      ))}
    </>
  );
};

export default ProvidersList;
