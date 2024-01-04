import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <header className=" bg-slate-400 sticky top-0">
      <nav className="max-w-7xl mx-auto flex flex-row justify-between items-center py-4">
        <Link to={'/'}>Home</Link>

        <div className="flex flex-row gap-x-2">
          <Link to={'/products/create'}>New Product</Link>
          <Link to={'/providers/create'}>New Provider</Link>
          <Link to={'/products/providers/create'}>New Product-Provider</Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
