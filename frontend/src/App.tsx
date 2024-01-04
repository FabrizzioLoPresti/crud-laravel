import ProductList from './components/products/product-list';
import ProvidersList from './components/providers/provider-list';
import ProductProviderList from './components/products_providers/product-provider-list';

function App() {
  return (
    <main className="max-w-7xl mx-auto">
      <h1 className="font-bold text-3xl mb-4">Productos</h1>
      <div className="grid grid-cols-3 gap-8">
        <ProductList />
      </div>
      <h1 className="font-bold text-3xl my-4">Proveedores</h1>
      <div className="grid grid-cols-3 gap-8">
        <ProvidersList />
      </div>
      <h1 className="font-bold text-3xl my-4">Productos - Proveedores</h1>
      <div className="mb-12">
        <ProductProviderList />
      </div>
    </main>
  );
}

export default App;
