import { createSlice } from "@reduxjs/toolkit";

const offers = {
  one: {
    id: 1,
    name: "Buy one get one",
  },
  two: {
    id: 2,
    name: "Buy halp price",
  },
  three: {
    id: 3,
    name: "buy third price",
  },
  four: {
    id: 4,
    name: "No offer",
  },
};

const product = {
  soup: {
    name: "Soup",
    salePrice: 0.6,
    actualPrice: 0.6,
    image: "soup.jpg",
    productId: 4,
  },
};

const initialState = {
  products: [
    {
      name: "Bread",
      salePrice: 1.1,
      actualPrice: 1.1,
      image: "/bread.jpg",
      productId: 1,
      offer: offers.two.id,
      dependentProduct: product.soup,
      isDepend: true,
    },
    {
      name: "Milk",
      salePrice: 0.5,
      actualPrice: 0.5,
      image: "/milk.jpg",
      productId: 2,
      offer: offers.four.id,
      isDepend: false,
    },
    {
      name: "Cheese",
      salePrice: 0.9,
      actualPrice: 0.9,
      image: "cheese.jpg",
      productId: 3,
      offer: offers.one.id,
      isDepend: false,
    },
    {
      name: "Soup",
      salePrice: 0.6,
      actualPrice: 0.6,
      image: "soup.jpg",
      productId: 4,
      offer: offers.four.id,
      isDepend: false,
    },
    {
      name: "Butter",
      salePrice: 1.2,
      actualPrice: 1.2,
      image: "butter.jpg",
      productId: 5,
      offer: offers.three.id,
      isDepend: false,
    },
  ],
  currency: "£",
  cartItems: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToItem(state, action) {
      const newItemId = action.payload.productId;
      const existingItem = state.cartItems.find(
        (item) => item.productId === newItemId
      );

      if (existingItem) {
        existingItem.quantity++;
      } else {
        state.cartItems.push({ ...action.payload, quantity: 1 });
      }
    },

    removeItem(state, action) {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload
      );
    },

    incrementItem(state, action) {
      state.cartItems = state.cartItems.map((item) => {
        if (item.productId === action.payload.productId) {
          item.quantity++;
          return item;
        }
        return item;
      });
    },

    decrementItem(state, action) {
      console.log(action.payload);
      state.cartItems = state.cartItems
        .map((item) => {
          if (item.productId === action.payload.productId) {
            item.quantity--;
            return item;
          }
          return item;
        })
        .filter((item) => item.quantity !== 0);
    },

    isProductAddedIntoCart(state, action) {
      const obj = state.cartItems.find(
        (item) => item.productId === action.payload
      );
      return Boolean(obj?.quantity);
    },
  },
});

export const {
  addItem,
  removeItem,
  incrementItem,
  decrementItem,
  addToItem,
  isProductAddedIntoCart,
} = cartSlice.actions;
export default cartSlice.reducer;
