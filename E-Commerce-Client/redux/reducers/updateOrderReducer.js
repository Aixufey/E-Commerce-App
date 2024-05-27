import {createReducer} from "@reduxjs/toolkit";

export const updateOrderReducer = createReducer({},(builder) => {
    builder.addCase("processOrderRequest", (state) => {
        state.isLoading = true;
    })
        .addCase("processOrderSuccess", (state, action) => {
            state.isLoading = false;
            state.message = action.payload;
        })
        .addCase("processOrderFailed", (state, action) => {
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