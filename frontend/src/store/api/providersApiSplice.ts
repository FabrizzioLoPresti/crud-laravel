import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ApiResponseType, ProviderType } from '../../types/types';

export const providersApi = createApi({
    reducerPath: "providersApi",
    baseQuery: fetchBaseQuery({
      baseUrl: import.meta.env.VITE_API_URL,
    }),
    tagTypes: ['Proveedores'],
    endpoints:(builder) => ({
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
    })
})

export const { useGetProvidersQuery, useGetProviderQuery, useCreateProviderMutation, useUpdateProviderMutation, useDeleteProviderMutation } = providersApi;