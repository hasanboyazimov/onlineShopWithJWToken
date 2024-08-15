import { useEffect } from "react";
import Card from "./Card";

import { useDispatch, useSelector } from "react-redux";
import { getData } from "../features/productSlice";

function ProductsList() {
  const dispatch = useDispatch();
  const { allProducts, isLoading } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(getData());
  }, []);

  if (isLoading) {
    return (
      <div className="text-[40px] h-full max-w-[800px] w-full font-bold">
        <div
          className="flex items-center justify-center h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
          role="status"
        >
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Loading...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[800px]">
      <h1 className="text-[40px] font-bold mb-8">Products </h1>
      <div className="flex justify-between flex-wrap">
        {allProducts &&
          allProducts.map((product) => {
            return <div>{product.title}</div>
          })}
      </div>
    </div>
  );
}

export default ProductsList;
