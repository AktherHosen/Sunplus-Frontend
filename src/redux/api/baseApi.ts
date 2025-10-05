import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `http://localhost:5000/api/v1/category`,
  }),
  tagTypes: ["categories"],
  endpoints: (builder) => ({
    addCategory: builder.mutation({
      query: (formData: FormData) => ({
        url: "/create-category",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["categories"],
    }),

    getAllCategories: builder.query({
      query: () => ({
        url: "/",
      }),
      providesTags: ["categories"],
    }),

    getCategoryBySlug: builder.query({
      query: (slug: string) => ({
        url: `/${slug}`,
      }),
      providesTags: ["categories"],
    }),

    updateCategory: builder.mutation({
      query: ({ slug, formData }: { slug: string; formData: FormData }) => ({
        url: `/update-category/${slug}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["categories"],
    }),

    deleteCategory: builder.mutation({
      query: (id: string) => ({
        url: `/delete-category/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["categories"],
    }),
  }),
});

export const {
  useAddCategoryMutation,
  useGetAllCategoriesQuery,
  useGetCategoryBySlugQuery,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = baseApi;
