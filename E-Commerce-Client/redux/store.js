import {configureStore} from "@reduxjs/toolkit";
import {userReducer} from "./reducers/userReducer";
import {passwordReducer} from "./reducers/passwordReducer";
import {profileReducer} from "./reducers/profileReducer";
import {productReducer} from "./reducers/productReducer";
import {cartReducer} from "./reducers/cartReducer";
import {orderReducer} from "./reducers/orderReducer";
import {updateOrderReducer} from "./reducers/updateOrderReducer";
import {categoryReducer} from "./reducers/categoryReducer";


export const store = configureStore({
    reducer: {
        user: userReducer,
        password: passwordReducer,
        profile: profileReducer,
        product: productReducer,
        cart: cartReducer,
        order: orderReducer,
        updateOrder: updateOrderReducer,
        category: categoryReducer
    }
});
export const server = "https://e-commerce-server-nkf0.onrender.com/api/v1";