import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ApiResponseType, ProductoProveedorType } from '../../types/types';

export const productsProvidersApiSlice = createApi({
  reducerPath: 'productsProvidersApiSlice',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
  }),
  tagTypes: ['ProductosProveedores'],
  endpoints: (builder) => ({
    getProductProviders: builder.query<
      ApiResponseType<ProductoProveedorType[]>,
      number
    >({
      query: (id) => `/productos/${id}/proveedores`,
      providesTags: ['ProductosProveedores'],
    }),

    getOneProductProvider: builder.query<
      ApiResponseType<ProductoProveedorType>,
      Partial<ProductoProveedorType>
    >({
      query: (body) => ({
        url: `/productos/${body.producto_id}/proveedores/${body.proveedor_id}`,
      }),
      providesTags: ['ProductosProveedores'],
    }),

    createProductProvider: builder.mutation<
      ApiResponseType<ProductoProveedorType>,
      Partial<ProductoProveedorType>
    >({
      query: (body) => ({
        url: `/productos/${body.producto_id}/proveedores`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['ProductosProveedores'],
    }),

    updateProductProvider: builder.mutation<
      ApiResponseType<ProductoProveedorType>,
      Partial<ProductoProveedorType>
    >({
      query: (body) => ({
        url: `/productos/${body.producto_id}/proveedores/${body.proveedor_id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['ProductosProveedores'],
    }),

    deleteProductProvider: builder.mutation<
      ApiResponseType<ProductoProveedorType>,
      Partial<ProductoProveedorType>
    >({
      query: (body) => ({
        url: `/productos/${body.producto_id}/proveedores/${body.proveedor_id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['ProductosProveedores'],
    }),
  }),
});

export const { useGetProductProvidersQuery, useGetOneProductProviderQuery, useCreateProductProviderMutation, useUpdateProductProviderMutation, useDeleteProductProviderMutation } = productsProvidersApiSlice;
