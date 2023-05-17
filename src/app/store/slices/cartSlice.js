import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    isCartOpen: false,
    products: [
        {
            name: "Bread",
            salePrice: 1.1,
            actualPrice: 1.1,
            image: "/bread.jpg",
            productId: 1,
        },
        {
            name: "Milk",
            salePrice: 0.5,
            actualPrice: 0.5,
            image: "/milk.jpg",
            productId: 2,
        },
        {
            name: "Cheese",
            salePrice: 0.9,
            actualPrice: 0.9,
            image: "cheese.jpg",
            productId: 3,
        },
        {
            name: "Soup",
            salePrice: 0.6,
            actualPrice: 0.6,
            image: "soup.jpg",
            productId: 4,
        },
        {
            name: "Butter",
            salePrice: 1.2,
            actualPrice: 1.2,
            image: "butter.jpg",
            productId: 5,
        },

    ],
    currency: "£",
    cartItems: [],
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {


        toggleCart(state, action) {
            state.isCartOpen = action.payload;
        },


        addToItem(state, action) {
            const newItemId = action.payload.productId;
            const existingItem = state.cartItems.find(item => item.productId === newItemId);

            if (existingItem) {
                existingItem.quantity++;
            } else {
                state.cartItems.push({ ...action.payload, quantity: 1 });
            }
        },


        removeItem(state, action) {
            state.cartItems = state.cartItems.filter(item => item.id !== action.payload);
        },


        incrementItem(state, action) {
            state.cartItems = state.cartItems.map(item => {
                if (item.productId === action.payload) {
                    item.quantity++;
                }
                return item;
            });
        },


        decrementItem(state, action) {
            state.cartItems = state.cartItems.map(item => {
                if (item.productId === action.payload) {
                    item.quantity--;
                }
                return item;
            }).filter(item => item.quantity !== 0);
        },

        isProductAddedIntoCart(state, action) {
            const obj = state.cartItems.find(item => item.productId === action.payload);
            return Boolean(obj?.quantity);
        },

    }
});


export const { toggleCart, addItem, removeItem, incrementItem, decrementItem, addToItem, isProductAddedIntoCart } = cartSlice.actions;
export default cartSlice.reducer;