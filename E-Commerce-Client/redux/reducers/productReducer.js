import {createReducer} from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    products: [],
    product: {}
}
export const productReducer = createReducer(initialState, async (builder) => {

    // Get Product By Id
    builder.addCase("getProductByIdRequest", (state) => {
        state.isLoading = true;
    })
        .addCase("getProductByIdSuccess", (state, action) => {
            state.isLoading = false;
            state.product = action.payload;
        })
        .addCase("getProductByIdFailed", (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        })

    // All Products
    builder.addCase("getAllProductsRequest", (state) => {
        state.isLoading = true;
    })
        .addCase("getAllProductsSuccess", (state, action) => {
            state.isLoading = false;
            state.products = action.payload;
        })
        .addCase("getAllProductsFailed", (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        })

    // Admin Products -- Special Route for Admin
    builder.addCase("getAllAdminProductsRequest", (state) => {
        state.isLoading = true;
    })
        .addCase("getAllAdminProductsSuccess", (state, action) => {
            state.isLoading = false;
            state.products = action.payload.products;
            state.inStock = action.payload.inStock;
            state.outOfStock = action.payload.outOfStock;
        })
        .addCase("getAllAdminProductsFailed", (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        })

    // Add Product
    builder.addCase("addProductRequest", (state) => {
        state.isLoading = true;
    })
        .addCase("addProductSuccess", (state, action) => {
            state.isLoading = false;
            state.message = action.payload;
        })
        .addCase("addProductFailed", (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        })

    builder.addCase("updateProductRequest", (state) => {
        state.isLoading = true;
    })
        .addCase("updateProductSuccess", (state, action) => {
            state.isLoading = false;
            state.message = action.payload;
        })
        .addCase("updateProductFailed", (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        })

    builder.addCase("deleteProductRequest", (state) => {
        state.isLoading = true;
    })
        .addCase("deleteProductSuccess", (state, action) => {
            state.isLoading = false;
            state.message = action.payload;
        })
        .addCase("deleteProductFailed", (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        })

    builder.addCase("updateProductImageRequest", (state) => {
        state.isLoading = true;
    })
        .addCase("updateProductImageSuccess", (state, action) => {
            state.isLoading = false;
            state.message = action.payload;
        })
        .addCase("updateProductImageFailed", (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        })
        .addCase("deleteProductImageSuccess", (state, action) => {
            state.isLoading = false;
            state.message = action.payload;
        })
        .addCase("deleteProductImageFailed", (state, action) => {
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
})