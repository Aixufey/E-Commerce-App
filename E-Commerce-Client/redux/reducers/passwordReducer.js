import {createReducer} from "@reduxjs/toolkit"

export const passwordReducer = createReducer({}, (builder) => {
    builder.addCase("changePassword", (state) => {
        state.isLoading = true;
    })
        .addCase("changePasswordSuccess", (state, action) => {
            state.isLoading = false;
            state.message = action.payload;
        })
        .addCase("changePasswordFailed", (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        });

    builder.addCase("forgotPasswordRequest", (state) => {
        state.isLoading = true;
    })
        .addCase("forgotPasswordSuccess", (state, action) => {
            state.isLoading = false;
            state.message = action.payload;
        })
        .addCase("forgotPasswordFailed", (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        });

    builder.addCase("resetPasswordRequest", (state) => {
        state.isLoading = true;
    })
        .addCase("resetPasswordSuccess", (state, action) => {
            state.isLoading = false;
            state.message = action.payload;
        })
        .addCase("resetPasswordFailed", (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        });

    // Clearing Toast Error and Message
    builder.addCase("clearError", (state) => {
        state.error = null;
    });

    builder.addCase("clearMessage", (state) => {
        state.message = null;
    });
});