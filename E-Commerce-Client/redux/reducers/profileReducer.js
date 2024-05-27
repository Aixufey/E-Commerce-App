import {createReducer} from "@reduxjs/toolkit";

export const profileReducer = createReducer({}, (builder) => {
    builder.addCase("updateProfileRequest", (state) => {
        state.isLoading = true;
    })
        .addCase("updateProfileSuccess", (state, action) => {
            state.isLoading = false;
            state.message = action.payload;
        })
        .addCase("updateProfileFailed", (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        })

    builder.addCase("updatePictureRequest", (state) => {
        state.isLoading = true;
    })
        .addCase("updatePictureSuccess", (state, action) => {
            state.isLoading = false;
            state.message = action.payload;
        })
        .addCase("updatePictureFailed", (state, action) => {
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


export const UPDATE_PROFILE_REQUEST = "updateProfileRequest";
export const UPDATE_PROFILE_SUCCESS = "updateProfileSuccess";
export const UPDATE_PROFILE_FAILED = "updateProfileFailed";

const initialState = {
    isLoading: false,
    profile: {},
    message: null,
    error: null
}

/**
 * Traditional reducer function that receives the state and action as arguments.
 * Handle immutable manually.
 * @param state
 * @param action
 * @returns {{isLoading: boolean, profile: {}, message: null, error: null}|{isLoading: boolean, profile, message: null, error: null}|{isLoading: boolean, profile: {}, message: null, error}|{isLoading: boolean, profile: {}, message: null, error: null}}
 */
export const profileReducerClassic = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_PROFILE_REQUEST: {
            return {
                ...state,
                isLoading: true,
            }
        }
        case UPDATE_PROFILE_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                profile: action.payload
            }
        }
        case UPDATE_PROFILE_FAILED: {
            return {
                ...state,
                isLoading: false,
                error: action.payload
            }
        }
        default:
            return state;
    }
}