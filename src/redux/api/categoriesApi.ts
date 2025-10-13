import { baseApi } from "./baseApi";

export const categoriesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCategories: builder.query({
      query: () => "/category",
      providesTags: ["categories"],
    }),
    getCategoryBySlug: builder.query({
      query: (slug: string) => `/category/${slug}`,
      providesTags: ["categories"],
    }),
    addCategory: builder.mutation({
      query: (formData: FormData) => ({
        url: "/category/create-category",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["categories"],
    }),
    updateCategory: builder.mutation({
      query: ({ slug, formData }: { slug: string; formData: FormData }) => ({
        url: `/category/update-category/${slug}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["categories"],
    }),
    deleteCategory: builder.mutation({
      query: (id: string) => ({
        url: `/category/delete-category/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["categories"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetAllCategoriesQuery,
  useGetCategoryBySlugQuery,
  useAddCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoriesApi;
