// import { useParams } from "react-router";

// const BASE_URL = "http://localhost:5001";

// export default function ProductDetailsPage() {
//   const { slug } = useParams();
//   const { data, isLoading, isError } = usegetProductByIdQuery(slug!);

//   if (isLoading) return <p className="p-4">Loading product details...</p>;
//   if (isError)
//     return <p className="p-4 text-red-500">Failed to load product details.</p>;

//   const product = data?.data; // support both shapes

//   if (!product) {
//     return <p className="p-4 text-gray-500">Product not found.</p>;
//   }

//   return (
//     <div className="p-6 max-w-4xl mx-auto">
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {/* Image */}
//         <div>
//           <img
//             src={
//               product.image
//                 ? `${BASE_URL}${product.image}`
//                 : "https://via.placeholder.com/600x400"
//             }
//             alt={product.name}
//             className="w-full rounded-xl shadow-md"
//           />
//         </div>

//         {/* Details */}
//         <div>
//           <h1 className="text-3xl font-bold mb-3">{product.name}</h1>
//           <p className="text-gray-500 mb-2">
//             Category: {product.category_id?.name}
//           </p>
//           <p className="text-gray-500 mb-2">
//             Subcategory: {product.subcategories?.name}
//           </p>
//           <p className="text-2xl font-semibold text-green-600 mb-4">
//             ৳ {product.price}
//           </p>
//           <p className="text-gray-700 leading-relaxed">
//             {product.description || "No description available."}
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }
