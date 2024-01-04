import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ProductoType, CategoriaType, ApiResponseType } from '../../types/types';

export const productsApi = createApi({
    reducerPath: "productsApi",
    baseQuery: fetchBaseQuery({
      baseUrl: import.meta.env.VITE_API_URL,
    }),
    tagTypes: ['Productos', 'Categorias'],
    endpoints:(builder) => ({
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
    })
})

export const { useGetProductsQuery, useGetProductQuery, useGetCategoriesQuery, useCreateProductMutation, useUpdateProductMutation, useDeleteProductMutation } = productsApi;