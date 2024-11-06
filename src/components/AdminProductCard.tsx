import { Product } from "../services/adminProductService";

// interface for the props of the component
interface AdminProductCardProps {
  product: Product;
  onClick: () => void;
}

export default function AdminProductCard({
  product,
  onClick,
}: AdminProductCardProps) {
  return (
    <div
      onClick={onClick}
      className="relative rounded-2xl shadow-lg overflow-hidden max-w-xs h-72 bg-cover bg-center border-4 border-transparent hover:border-custom-dark transition duration-300 ease-in-out transform hover:scale-105 bounce-in"
      style={{ backgroundImage: `url(${product.images[0]})` }}
    >
      {/* Overlay to darken background for better text visibility */}
      <div className="absolute inset-0 bg-black opacity-30"></div>

      {/* Product info */}
      <div className="relative p-4 text-white flex flex-col justify-between h-full">
        <div>
          <h3 className="text-lg font-bold">{product.name}</h3>
        </div>

        <div>
          <p className="text-lg font-semibold">${product.price.toFixed(2)}</p>
          <p className="text-xs opacity-70">Stock: {product.stockQuantity}</p>
        </div>
      </div>
    </div>
  );
}
