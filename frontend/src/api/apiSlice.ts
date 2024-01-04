import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  ApiResponseType,
  ProductoType,
  CategoriaType,
  ProviderType,
  ProductoProveedorType
} from '../types/types';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
  }),
  tagTypes: ['Productos', 'Proveedores', 'ProductosProveedores'],
  endpoints: (builder) => ({
    getProducts: builder.query<ApiResponseType<ProductoType[]>, void>({
      query: () => '/productos',
      providesTags: ['Productos'],
    }),

    getProduct: builder.query<ApiResponseType<ProductoType>, number>({
      query: (id) => `/productos/${id}`,
    }),

    getCategories: builder.query<ApiResponseType<CategoriaType[]>, void>({
      query: () => '/categorias',
    }),

    createProduct: builder.mutation<
      ApiResponseType<ProductoType>,
      ProductoType
    >({
      query: (body) => ({
        url: '/productos',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Productos'],
    }),

    updateProduct: builder.mutation<
      ApiResponseType<ProductoType>,
      ProductoType
    >({
      query: (body) => ({
        url: `/productos/${body.id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Productos'],
    }),

    deleteProduct: builder.mutation<ApiResponseType<ProductoType>, number>({
      query: (id) => ({
        url: `/productos/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Productos'],
    }),

    getProviders: builder.query<ApiResponseType<ProviderType[]>, void>({
      query: () => '/proveedores',
      providesTags: ['Proveedores'],
    }),

    getProvider: builder.query<ApiResponseType<ProviderType>, number>({
      query: (id) => `/proveedores/${id}`,
    }),

    createProvider: builder.mutation<
      ApiResponseType<ProviderType>,
      ProviderType
    >({
      query: (body) => ({
        url: '/proveedores',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Proveedores'],
    }),

    updateProvider: builder.mutation<
      ApiResponseType<ProviderType>,
      ProviderType
    >({
      query: (body) => ({
        url: `/proveedores/${body.id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Proveedores'],
    }),

    deleteProvider: builder.mutation<ApiResponseType<ProviderType>, number>({
      query: (id) => ({
        url: `/proveedores/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Proveedores'],
    }),

    getProductProviders: builder.query<
      ApiResponseType<ProductoProveedorType[]>,
      number
    >({
      query: (id) => `/productos/${id}/proveedores`,
      providesTags: ['ProductosProveedores'],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductQuery,
  useGetCategoriesQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetProvidersQuery,
  useGetProviderQuery,
  useCreateProviderMutation,
  useUpdateProviderMutation,
  useDeleteProviderMutation,
  useGetProductProvidersQuery,
} = apiSlice;
