"use client";
import React, { useState } from "react";
import { Provider } from "react-redux";
import store from "../app/store/store";
import Cart from "./component/cart";

export default function Home() {
  return (
    <Provider store={store}>
      <div className="md:p-10 p-1 bg-gray-100 ">
        <div className="text-center text-black text-2xl font-bold ">
          GROCERY STORE
        </div>
        <Cart />
      </div>
    </Provider>
  );
}
