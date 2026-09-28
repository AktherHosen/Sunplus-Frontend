import type { IOrder } from "@/types/order";
import type {
  IProduct,
  ProductResponse,
  SubcategoryProductsResponse,
} from "@/types/product";
import type { IUser } from "@/types/user";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = import.meta.env.VITE_API_URL;

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/api/v1`,
    credentials: "include",
  }),

  tagTypes: ["products", "categories", "orders", "auth", "users", "banners"],
  endpoints: (builder) => ({
    // -------------------- Categories --------------------
    getAllCategories: builder.query({
      query: (searchTerm?: string) => searchTerm ? `/category?searchTerm=${searchTerm}` : "/category",
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

    reorderCategories: builder.mutation({
      query: (updates: { id: string; order: number }[]) => ({
        url: "/category/reorder",
        method: "PATCH",
        body: { updates },
      }),
      invalidatesTags: ["categories"],
    }),

    getAllSubCategories: builder.query({
      query: (searchTerm?: string) => searchTerm ? `/category/sub-categories?searchTerm=${searchTerm}` : "/category/sub-categories",
      providesTags: ["categories"],
    }),

    // -------------------- Products --------------------
    getAllProducts: builder.query<
      {
        statusCode: number;
        success: boolean;
        message: string;
        data: IProduct[];
      },
      string | void
    >({
      query: (searchTerm) => searchTerm ? `/product?searchTerm=${searchTerm}` : "/product",
      providesTags: ["products"],
    }),

    getProductById: builder.query<IProduct, string>({
      query: (id) => `/product/${id}`,
      providesTags: ["products"],
    }),

    getProductsBySubcategorySlug: builder.query<
      SubcategoryProductsResponse,
      string
    >({
      query: (slug) => `/product/${slug}`,
      providesTags: ["products"],
    }),

    getProductsByCategoryAndSubcategory: builder.query<
      ProductResponse,
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

    reorderProducts: builder.mutation({
      query: (updates: { id: string; order: number }[]) => ({
        url: "/product/reorder",
        method: "PATCH",
        body: { updates },
      }),
      invalidatesTags: ["products"],
    }),

    // -------------------- Orders --------------------
    // ✅ Create Order
    createOrder: builder.mutation<IOrder, Partial<IOrder>>({
      query: (data) => ({
        url: "/order/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["orders"],
    }),

    // ✅ Get all Orders
    getAllOrders: builder.query<
      { statusCode: number; success: boolean; message: string; data: IOrder[] },
      void
    >({
      query: () => "/order",
      providesTags: ["orders"],
    }),

    // ✅ Get single Order
    getOrderById: builder.query<IOrder, string>({
      query: (id) => `/order/${id}`,
      providesTags: ["orders"],
    }),

    // ✅ Update Order Status
    updateOrderStatus: builder.mutation<IOrder, { id: string; status: string }>(
      {
        query: ({ id, status }) => ({
          url: `/order/${id}/status`,
          method: "PATCH",
          body: { status },
        }),
        invalidatesTags: ["orders"],
      }
    ),

    // ✅ Delete Order
    deleteOrder: builder.mutation<void, string>({
      query: (id) => ({
        url: `/order/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["orders"],
    }),

    // ✅ Get all Orders
    getAllUsers: builder.query({
      query: () => "/user/all-users",
      providesTags: ["users"],
    }),
    addUser: builder.mutation<IUser, Partial<IUser>>({
      query: (userData) => ({
        url: "/user/register",
        method: "POST",
        body: userData,
      }),
      invalidatesTags: ["users"],
    }),
    deleteUser: builder.mutation<void, string>({
      query: (id) => ({
        url: `/user/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["users"],
    }),

    getMyProfile: builder.query<IUser, void>({
      query: () => "/user/profile",
      providesTags: ["users"],
    }),
    updateUser: builder.mutation<
      IUser,
      { id: string; payload: Partial<IUser> }
    >({
      query: ({ id, payload }) => ({
        url: `/user/${id}`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["users"],
    }),

    // -------------------- Banners --------------------
    getAllBanners: builder.query({
      query: () => "/banner",
      providesTags: ["banners"],
    }),
    addBanner: builder.mutation({
      query: (formData: FormData) => ({
        url: "/banner/create",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["banners"],
    }),
    deleteBanner: builder.mutation({
      query: (id: string) => ({
        url: `/banner/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["banners"],
    }),
    reorderBanners: builder.mutation({
      query: (updates: { id: string; order: number }[]) => ({
        url: "/banner/reorder",
        method: "PATCH",
        body: { updates },
      }),
      invalidatesTags: ["banners"],
    }),

    // In your baseApi.ts (or wherever the hook is defined)
    getStatistics: builder.query<
      {
        success: boolean;
        data: {
          totalProducts: number;
          totalCategories: number;
          orders: {
            total: number;
            pending: number;
            completed: number;
            cancelled: number;
          };
        };
      },
      void
    >({
      query: () => "/dashboard",
      providesTags: ["products", "categories", "orders"],
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
  useGetAllSubCategoriesQuery,
  useReorderCategoriesMutation,

  // Products
  useGetAllProductsQuery,
  useGetProductByIdQuery,
  useGetProductsBySubcategorySlugQuery,
  useGetProductsByCategoryAndSubcategoryQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useReorderProductsMutation,

  // Orders
  useCreateOrderMutation,
  useGetAllOrdersQuery,
  useGetOrderByIdQuery,
  useUpdateOrderStatusMutation,
  useDeleteOrderMutation,

  // Users
  useGetAllUsersQuery,
  useAddUserMutation,
  useDeleteUserMutation,
  useGetMyProfileQuery,
  useUpdateUserMutation,

  useGetStatisticsQuery,

  // Banners
  useGetAllBannersQuery,
  useAddBannerMutation,
  useDeleteBannerMutation,
  useReorderBannersMutation,
} = baseApi;
