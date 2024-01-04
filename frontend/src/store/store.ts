import { configureStore } from "@reduxjs/toolkit";
import { productsApi } from "./api/productsApiSlice";
import { providersApi } from "./api/providersApiSplice";
import { productsProvidersApiSlice } from "./api/productsProvidersApiSlice";

export const store = configureStore({
    reducer: {
        // Add the generated reducer as a specific top-level slice
        [productsApi.reducerPath]: productsApi.reducer,
        [providersApi.reducerPath]: providersApi.reducer,
        [productsProvidersApiSlice.reducerPath]: productsProvidersApiSlice.reducer,
    },
    // Adding the api middleware enables caching, invalidation, polling,
    // and other useful features of `rtk-query`.
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(productsApi.middleware).concat(providersApi.middleware).concat(productsProvidersApiSlice.middleware),
})