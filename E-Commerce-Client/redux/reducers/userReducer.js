import {createReducer} from "@reduxjs/toolkit";

const initialState = {
    isLoading: true,
    isAuthenticated: false,
    user: null,
}
export const userReducer = createReducer({} || initialState, (builder) => {
    builder.addCase("loginRequest", (state) => {
        state.isLoading = true;
    })
        // Get the user from the server on login success.
        // From the server, this will be /me after isAuthenticated middleware, and get request will execute.
        .addCase("getUserRequest", (state) => {
            state.isLoading = true;
        })
        .addCase("logoutRequest", (state) => {
            state.isLoading = true;
        })
        .addCase("registerRequest", (state) => {
            state.isLoading = true;
        })

    // If login is successful, stop loading indicator, set isAuthenticated to true.
    // the payload contains the message from the server, and store it in the state. e.g. {message: "Login Successful"}
    builder.addCase("loginSuccess", (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.message = action.payload;
    })
        // Chain actions together to get the payload from the server and store it in the state.
        .addCase("getUserSuccess", (state, action) => {
            state.isLoading = false;
            state.isAuthenticated = true;
            state.user = action.payload;
        })
        .addCase("logoutSuccess", (state, action) => {
            state.isLoading = false;
            state.isAuthenticated = false;
            state.message = action.payload;
            state.user = null;
        })
        .addCase("registerSuccess", (state, action) => {
            state.isLoading = false;
            state.isAuthenticated = true;
            state.message = action.payload;
        })

    // If login fails, stop loading indicator, set isAuthenticated to false.
    // the payload contains the error message from the server, and store it in the state. e.g. {message: "Invalid Credentials"}
    builder.addCase("loginFailed", (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.error = action.payload;
    })
        .addCase("getUserFailed", (state, action) => {
            state.isLoading = false;
            state.isAuthenticated = false;
            state.error = action.payload;
        })
        .addCase("logoutFailed", (state, action) => {
            state.isLoading = false;
            state.isAuthenticated = false;
            state.error = action.payload;
        })
        .addCase("registerFailed", (state, action) => {
            state.isLoading = false;
            state.isAuthenticated = false;
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