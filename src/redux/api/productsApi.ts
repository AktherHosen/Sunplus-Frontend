import type { IProduct } from "@/types/product";
import { baseApi } from "./baseApi";

export const productsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query<IProduct[], void>({
      query: () => "/product",
      providesTags: ["products"],
    }),
    getProductById: builder.query<IProduct, string>({
      query: (id) => `/product/${id}`,
      providesTags: ["products"],
    }),
    getProductsBySubcategorySlug: builder.query<IProduct[], string>({
      query: (slug) => `/product/subcategory/${slug}`, // explicit route
      providesTags: ["products"],
    }),
    getProductsByCategoryAndSubcategory: builder.query<
      IProduct[],
      { categorySlug: string; subSlug: string; productSlug: string }
    >({
      query: ({ categorySlug, subSlug, productSlug }) =>
        `/product/${categorySlug}/${subSlug}/${productSlug}`,
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
    updateProduct: builder.mutation<IProduct, { slug: string; formData: FormData }>({
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
  overrideExisting: false,
});

export const {
  useGetAllProductsQuery,
  useGetProductByIdQuery,
  useGetProductsBySubcategorySlugQuery,
  useGetProductsByCategoryAndSubcategoryQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productsApi;
