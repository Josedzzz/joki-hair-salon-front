import { ProductCart } from "../services/clientCartService";

interface UserCartCardProps {
  productCart: ProductCart;
  onClick: () => void;
}

export default function UserCartCard({
  productCart,
  onClick,
}: UserCartCardProps) {
  return (
    <div className="bg-custom-platinum rounded-2xl shadow-lg overflow-hidden max-w-xs border-4 border-transparent hover:border-custom-dark transition duration-300 ease-in-out transform hover:scale-105">
      <div className="relative p-4 text-white flex flex-col justify-between h-full">
        <div>
          <h3 className="text-lg font-bold">{productCart.productName}</h3>
          <p className="text-lg font-semibold">${productCart.brandName}</p>
        </div>

        <div>
          <p className="text-lg font-semibold">${productCart.totalPrice}</p>
          <p className="text-xs opacity-70">
            Quantity: {productCart.selectQty}
          </p>
        </div>

        <button
          onClick={onClick}
          className="w-50px text-custom-dark font-bold p-2 border-4 border-custom-dark rounded-xl hover:bg-custom-dark hover:text-custom-white transition duration-300 ease-in-out transform hover:scale-105"
        >
          <i className="fa-solid fa-trash"></i>
        </button>
      </div>
    </div>
  );
}
