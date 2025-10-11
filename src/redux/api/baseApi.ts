import type { IProduct } from "@/types/product";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://api.sunplusbd.com/api/v1" }),
  tagTypes: ["products", "categories"],
  endpoints: (builder) => ({
    // -------------------- Categories --------------------
    getAllCategories: builder.query({
      query: () => "/category", // matches GET /categories
      providesTags: ["categories"],
    }),

    getCategoryBySlug: builder.query({
      query: (slug: string) => `/category/${slug}`, // matches GET /category/:slug
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

    // -------------------- Products --------------------
    getAllProducts: builder.query<IProduct[], void>({
      query: () => "/product", // matches GET /product
      providesTags: ["products"],
    }),

    getProductById: builder.query<IProduct, string>({
      query: (id) => `/product/${id}`,
      providesTags: ["products"],
    }),

    getProductsBySubcategorySlug: builder.query<IProduct[], string>({
      query: (slug) => `/product/${slug}`,
      providesTags: ["products"],
    }),

    getProductsByCategoryAndSubcategory: builder.query<
      IProduct[],
      { categorySlug: string; subSlug: string; productSlug: string }
    >({
      query: ({ categorySlug, subSlug, productSlug }) =>
        `/product/${categorySlug}/${subSlug}/${productSlug}`, // GET /product/:categorySlug/:subSlug
      providesTags: ["products"],
    }),

    addProduct: builder.mutation<IProduct, FormData>({
      query: (formData) => ({
        url: "/product/create",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["products"],
    }),

    updateProduct: builder.mutation<
      IProduct,
      { slug: string; formData: FormData }
    >({
      query: ({ slug, formData }) => ({
        url: `/product/update/${slug}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["products"],
    }),

    deleteProduct: builder.mutation<void, string>({
      query: (id) => ({
        url: `/product/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["products"],
    }),
  }),
});

export const {
  // Categories
  useGetAllCategoriesQuery,
  useGetCategoryBySlugQuery,
  useAddCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  // Products
  useGetAllProductsQuery,
  useGetProductByIdQuery,
  useGetProductsBySubcategorySlugQuery,
  useGetProductsByCategoryAndSubcategoryQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = baseApi;
