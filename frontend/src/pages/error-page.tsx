import { useRouteError } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div
      id="error-page"
      className="min-h-screen h-full flex flex-col gap-y-6 items-center justify-center"
    >
      <h1 className="text-3xl font-bold">Oops!</h1>
      <p className="text-xl text-red-600">
        Sorry, an unexpected error has occurred.
      </p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
      <Link to="/" className="bg-slate-600 px-4 py-2 text-white text-center">
        Go back to home
      </Link>
    </div>
  );
}
