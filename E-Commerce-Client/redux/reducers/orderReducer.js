import {createReducer} from "@reduxjs/toolkit";

export const orderReducer = createReducer({}, async (builder) => {
    builder.addCase("createOrderRequest", (state) => {
        state.isLoading = true;
    })
        .addCase("createOrderSuccess", (state, action) => {
            state.isLoading = false;
            state.message = action.payload;
        })
        .addCase("createOrderFailed", (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        })

    // Clearing Toast Error and Message
    builder.addCase("clearError", (state) => {
        state.error = null;
    });

    builder.addCase("clearMessage", (state) => {
        state.message = null;
    });
});