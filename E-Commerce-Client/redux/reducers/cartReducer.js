import {createReducer} from "@reduxjs/toolkit";

const initialState = {
    cartItems: []
}
export const cartReducer = createReducer(initialState, (builder) => {
    builder.addCase("addToCart", (state, action) => {
        const newItem = action.payload;
        const isExist = state.cartItems.find(item => item.productId === newItem.productId);
        if (isExist) {
            state.cartItems = state.cartItems.map(item => item.productId === newItem.productId ? newItem : item);
        } else {
            state.cartItems = [newItem, ...state.cartItems];
        }
    })
        .addCase("removeFromCart", (state, action) => {
            const productId = action.payload;
            state.cartItems = state.cartItems.filter(item => item.productId !== productId);
        })
        .addCase("emptyCart", (state, action) => {
            state.cartItems = [];
        })


    // Clearing Toast Error and Message
    builder.addCase("clearError", (state) => {
        state.error = null;
    });

    builder.addCase("clearMessage", (state) => {
        state.message = null;
    });
})