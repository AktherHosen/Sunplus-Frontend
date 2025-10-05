import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `http://localhost:5000/api/v1/category`,
  }),
  tagTypes: ["categories"],
  endpoints: (builder) => ({
    // Add category
    addCategory: builder.mutation({
      query: (formData: FormData) => ({
        url: "/create-category",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["categories"],
    }),

    // Get all categories
    getAllCategories: builder.query({
      query: () => ({
        url: "/",
      }),
      providesTags: ["categories"],
    }),

    // Update category
    updateCategory: builder.mutation({
      query: ({ id, formData }: { id: string; formData: FormData }) => ({
        url: `/update-category/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["categories"],
    }),

    // Delete category
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
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = baseApi;
