import { useEffect, useState } from "react";

//action
import { decrementOrder, incrementOrder } from "../features/productSlice";

// dispatch
import { useDispatch } from "react-redux";

function Card({ product }) {
  const dispatch = useDispatch();
  const [addButtons, setAddButtons] = useState(false);
  useEffect(() => {
    if (product.amount == 0) {
      setAddButtons(false);
    }
  }, [product.amount]);
  return (
    <div className="lg:w-[250px] md:w-[220px] w-[200px]  mb-10">
      <div className="flex flex-col  items-center relative">
        <div
          className={`${addButtons && `border-2 rounded-lg border-[#0fc76b]`}`}
        >
          <img
            className="rounded-lg transition-all ease-in-out duration-200 "
            src={product.image}
            alt={product.name}
          />
        </div>
        {!addButtons && (
          <button
            className="w-[160px] flex items-center bg-white px-[28px] py-[12px] rounded-full border border-[#0fc76b] absolute -bottom-6 "
            onClick={() => {
              setAddButtons(true);
              dispatch(incrementOrder(product.id));
            }}
          >
            Add to cart
          </button>
        )}
        {addButtons && (
          <div className="w-[160px] flex justify-between items-center bg-[#0fc76b] text-white px-[12px] py-[12px] rounded-full border border-[#0fc76b] absolute -bottom-6 ">
            <button
              className="pr-4"
              onClick={() => dispatch(decrementOrder(product.id))}
            >
              -
            </button>
            <span>{product.amount}</span>
            <button
              className="pl-4"
              onClick={() => dispatch(incrementOrder(product.id))}
            >
              +
            </button>
          </div>
        )}
      </div>
      <div className="mt-[38px]">
        <p className="text-[#87635A] text-xs">{product.category}</p>
        <h3 className="font-semibold">{product.name}</h3>
        <p className="text-[#0fc76b] font-semibold">${product.price}</p>
      </div>
    </div>
  );
}

export default Card;
