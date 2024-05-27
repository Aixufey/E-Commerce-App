import {createReducer} from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    error: null,
    message: null,
}
export const categoryReducer = createReducer(initialState, async (builder) => {
    builder.addCase("createCategoryRequest", (state) => {
        state.isLoading = true;
    })
        .addCase("createCategorySuccess", (state, action) => {
            state.isLoading = false;
            state.message = action.payload;
        })
        .addCase("createCategoryFailed", (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        })

    builder.addCase("deleteCategoryRequest", (state) => {
        state.isLoading = true;
    })
        .addCase("deleteCategorySuccess", (state, action) => {
            state.isLoading = false;
            state.message = action.payload;
        })
        .addCase("deleteCategoryFailed", (state, action) => {
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