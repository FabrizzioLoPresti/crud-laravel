import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
// import { ApiProvider } from '@reduxjs/toolkit/query/react';
// import { apiSlice } from './api/apiSlice.ts';
import Layout from './components/layout.tsx';
import App from './App.tsx';
import ErrorPage from './pages/error-page.tsx';
import CreatePageProduct from './pages/products/create-page.tsx';
import ProductPage from './pages/products/product-page.tsx';
import EditPageProduct from './pages/products/edit-page.tsx';
import ProviderPage from './pages/providers/provider-page.tsx';
import CreatePageProvider from './pages/providers/create-page.tsx';
import EditPageProvider from './pages/providers/edit-page.tsx';
import CreatePageProductProvider from './pages/productsProviders/create-page.tsx';
import EditPageProductProvider from './pages/productsProviders/edit-page.tsx';

import { store } from './store/store.ts';
import { Provider } from 'react-redux';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <App />,
        errorElement: <ErrorPage />,
      },
      {
        path: '/products/create',
        element: <CreatePageProduct />,
        errorElement: <ErrorPage />,
      },
      {
        path: '/products/:id',
        element: <ProductPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: '/products/:id/edit',
        element: <EditPageProduct />,
        errorElement: <ErrorPage />,
      },
      {
        path: '/providers/create',
        element: <CreatePageProvider />,
        errorElement: <ErrorPage />,
      },
      {
        path: '/providers/:id',
        element: <ProviderPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: '/providers/:id/edit',
        element: <EditPageProvider />,
        errorElement: <ErrorPage />,
      },
      {
        path: '/products/providers/create',
        element: <CreatePageProductProvider />,
        errorElement: <ErrorPage />,
      },
      {
        path: '/products/:idProduct/providers/:idProvider/edit',
        element: <EditPageProductProvider />,
        errorElement: <ErrorPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
);
