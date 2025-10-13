import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = import.meta.env.VITE_API_URL;

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}/api/v1` }),
  tagTypes: ["products", "categories"],
  endpoints: () => ({}), 
});
