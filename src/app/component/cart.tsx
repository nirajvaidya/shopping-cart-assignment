"use client";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToItem,
  decrementItem,
  incrementItem,
} from "../store/slices/cartSlice";

export default function Cart() {
  const { products, cartItems, currency } = useSelector(
    (state: any) => state?.cart
  );

  const dispatch = useDispatch();

  const getPrice = (price: number) => {
    return `${currency}${price.toFixed(2)}`;
  };

  const handleIncrement = (productId: any) => {
    dispatch(incrementItem(productId));
  };

  const handleDecrement = (productId: any) => {
    dispatch(decrementItem(productId));
  };

  const handleAddToCart = (product: any) => {
    dispatch(addToItem(product));
  };
  const isProductAddedIntoCart = (productId: number) => {
    const obj = cartItems.find(
      (item: { productId: number }) => item?.productId === productId
    );
    return Boolean(obj?.quantity);
  };

  const subTotal = () => {
    const amount = cartItems.reduce(
      (item: number, { salePrice, quantity }: any) =>
        item + salePrice * quantity,
      0
    );
    return amount;
  };

  const getSavings = () => {
    let savings = 0;
    cartItems.map((item: any) => {
      savings += applyOffer(item);
    });
    return savings;
  };

  const applyOffer = (product: {
    productId: any;
    quantity: number;
    salePrice: number;
    offer: number;
    isDepend: boolean,
    dependentProduct: any
  }) => {
    switch(product.offer) {
      case 1: {
        return (product.salePrice * Math.floor(product.quantity)) / 2;
      }
      case 2: {
        if(product.isDepend) {
          const hasItem = cartItems.some((item: { productId: any; }) => item.productId == product.dependentProduct?.productId)
          if(hasItem) {
            return (product.salePrice / 2) * Math.floor(product.quantity);
          }
        }
        return 0;
      }
      case 3: {
        return (product.salePrice / 3) * Math.floor(product.quantity);;
      }
      default: {
        return 0;
      }
    }
  };
  return (
    <div className="flex">
      <div className="w-1/2 mt-10 mr-10 h-[80vh]">
        <div className="w-full h-full  bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h5 className="text-2xl font-bold leading-none text-gray-900 dark:text-white">
              Latest Products
            </h5>
          </div>
          <div className="flow-root">
            <ul
              role="list"
              className="divide-y divide-gray-200 dark:divide-gray-700"
            >
              {products.map(
                (
                  product: {
                    productId: number;
                    image: string | undefined;
                    name: string;
                    salePrice: number;
                  },
                  index: React.Key | null | undefined
                ) => {
                  const isDisabled = isProductAddedIntoCart(product.productId);
                  return (
                    <li className="py-5 sm:py-4" key={index}>
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          <img
                            className="w-10 h-10 rounded-sm"
                            src={product.image}
                            alt={`${product.name}`}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-lg font-medium text-gray-900 truncate dark:text-white">
                            {product.name}
                          </p>
                        </div>
                        <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                          {getPrice(product.salePrice)}
                        </div>
                        <button
                          type="button"
                          className={`text-white ${
                            isDisabled
                              ? "bg-gray-600"
                              : "bg-blue-600 hover:bg-blue-700"
                          }  focus:ring-4 focus:outline-none focus:ring-blue-200 dark:focus:ring-blue-900 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex justify-center  text-center`}
                          onClick={() => handleAddToCart(product)}
                          disabled={isDisabled}
                        >
                          Add
                        </button>
                      </div>
                    </li>
                  );
                }
              )}
            </ul>
          </div>
        </div>
      </div>
      <div className="w-1/2 mt-10 h-[80vh]">
        <div className="w-full h-full overflow-scroll  bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
          <div className="flex justify-between border-b pb-8">
            <h1 className="font-semibold text-2xl">Shopping Cart</h1>
            <h2 className="font-semibold text-2xl">{cartItems.length} Items</h2>
          </div>
          {cartItems.length ? (
            <>
              <div className="flex mt-10 mb-5">
                <h3 className="font-semibold text-xs uppercase w-2/5">
                  Product Details
                </h3>
                <h3 className="font-semibold text-center text-xs uppercase w-1/5 text-center">
                  Quantity
                </h3>
                <h3 className="font-semibold text-center text-xs uppercase w-1/5 text-center">
                  Price
                </h3>
                <h3 className="font-semibold text-center text-xs uppercase w-1/5 text-center">
                  Total
                </h3>
              </div>
              {cartItems?.map((cartItem: any, index: number) => {
                return (
                  <div
                    key={index}
                    className="-mx-8 px-6 py-5 "
                  >
                    <div className="flex items-center  ">
                      <div className="flex w-2/5">
                        <div className="flex-shrink-0">
                          <img
                            className="w-10 h-10 rounded-sm"
                            src={cartItem.image}
                            alt={cartItem.name}
                          />
                        </div>
                        <div className="flex flex-col justify-between ml-4 flex-grow">
                          <span className="font-bold text-sm">
                            {cartItem.name}
                          </span>
                        </div>
                      </div>
                      <div className="flex justify-center w-1/5 ">
                        <svg
                          className="fill-current w-3"
                          viewBox="0 0 448 512"
                          onClick={() => handleDecrement(cartItem)}
                        >
                          <path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                        </svg>

                        <input
                          className="mx-2 border text-center w-10 h-10 text-black"
                          type="text"
                          value={cartItem.quantity}
                        />

                        <svg
                          className="fill-current w-3"
                          viewBox="0 0 448 512"
                          onClick={() => handleIncrement(cartItem)}
                        >
                          <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                        </svg>
                      </div>
                      <span className="text-center w-1/5 font-semibold text-sm">
                        {getPrice(cartItem.salePrice)}
                      </span>
                      <span className="text-center w-1/5 font-semibold text-sm">
                        {getPrice(cartItem.salePrice * cartItem.quantity)}{" "}
                      </span>
                    </div>
                    {Boolean(applyOffer(cartItem)) && (
                      <>
                        <div className="flex justify-between mb-2 text-red-400">
                          <div></div>
                          <div>Savings: {getPrice(applyOffer(cartItem))}</div>
                        </div>
                        <div className="flex justify-between mb-2">
                          <div></div>
                          <div>
                            Item price:{" "}
                            {getPrice(
                              cartItem.salePrice * cartItem.quantity -
                                applyOffer(cartItem)
                            )}
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
            </>
          ) : (
            <div className="flex mt-10 mb-5 justify-center items-center">
              <img src="/empty.png" alt="empty cart" />
            </div>
          )}
          {Boolean(cartItems.length) && (
            <>
              <div className="flex justify-between border-t pt-5 mb-5">
                <div>Sub Total:</div>
                <div className="">{getPrice(subTotal())}</div>
              </div>
              <div className="flex justify-between border-t pt-5 mb-5 text-red-400">
                <div>Savings:</div>
                <div className="">{getPrice(getSavings())}</div>
              </div>
              <div className="flex justify-between border-t border-b pt-5">
                <div className="mb-5">Total Amount:</div>
                <div className="mb-5 pb-2">
                  {getPrice(subTotal() - getSavings())}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
