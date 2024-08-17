import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteOrder } from "../features/productSlice";

function Cart() {
  const { ordered, orderTotal, totalPrice } = useSelector(
    (state) => state.orders
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    dispatch(deleteOrder(id));
  };

  const handleConfirmOrder = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="w-full flex justify-center items-center">
      <div className="bg-white  max-w-[384px] w-full rounded-md p-10">
        <h1 className="font-bold text-[28px]">
          Your Cart ({orderTotal})
        </h1>
        {orderTotal > 0 ? (
          <div className="flex flex-col gap-4">
            {ordered.map((order, index) => (
              <div
                key={index}
                className="flex justify-between mb-[1px] border-black items-center"
              >
                <div className="">
                  <span className="font-semibold">{order.name}</span>
                  <div className="gap-10">
                    <span className="font-semibold">
                      {order.amount}x
                    </span>
                    <span>@ ${order.price}</span>
                    <span className="pl-5 font-[500]">
                      ${order.price * order.amount}
                    </span>
                  </div>
                </div>
                <div className="text-lg font-semibold">
                  <button
                    onClick={() => handleDelete(order.id)}
                    className="border p-2 text-[#AD8A85] rounded-full border-[#AD8A85]"
                  >
                    delate
                  </button>
                </div>
              </div>
            ))}
            <div className="flex justify-between items-center font-bold text-[28px]">
              <span>Order Total</span>
              <span>${totalPrice}</span>
            </div>
            <button
              className="flex justify-center text-white rounded-full p-4 bg-[#0fc76b]"
              onClick={handleConfirmOrder}
            >
              Confirm Order
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-center flex-col">
            <img
              src="./assets/images/illustration-empty-cart.svg"
              alt="Empty cart illustration"
            />
            <p className="text-[#87635A] text-sm">
              Your added items will appear here
            </p>
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white  rounded-md p-6 max-w-lg w-full">
            <h2 className="text-3xl font-bold mb-4">Order Confirmed</h2>
            <span>We hope you enjoy your food!</span>
            <ul className="">
              {ordered.map((order, index) => (
                <li
                  key={index}
                  className="flex bg-[#FCF8F6] p-5 justify-between items-center"
                >
                  <span>
                    {order.name} ({order.amount}x)
                  </span>
                  <span>${order.price * order.amount}</span>
                </li>
              ))}
            </ul>
            <div className="flex justify-between items-center bg-[#FCF8F6] p-5 text-xl mb-8">
              <span>Order Total</span>
              <span>${totalPrice}</span>
            </div>
            <button
              className="bg-[#0fc76b] text-white  p-4 flex justify-center w-full rounded-full"
              onClick={closeModal}
            >
              Start New Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
