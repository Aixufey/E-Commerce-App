import axios from 'axios'
import {server} from "../store";

axios.defaults.baseURL = server;
axios.defaults.withCredentials = true;

export const getAllProducts = (keyword = "", category = "") => async (dispatch) => {
    try {
        dispatch({
            type: "getAllProductsRequest"
        })

        const {data, status} = await axios.get(`/product/all?keyword=${keyword}&category=${category}`);

        if (status === 200) {
            dispatch({
                type: "getAllProductsSuccess",
                payload: data.products
            })
        }


    } catch (error) {
        dispatch({
            type: "getAllProductsFailed",
            payload: error.response ? error.response.data.message : "Request Timeout"
        })
    }
}

export const getAllAdminProducts = () => async (dispatch) => {
    try {
        dispatch({
            type: "getAllAdminProductsRequest"
        })

        const {data, status} = await axios.get("/product/admin");

        const {products, inStock, outOfStock} = data;

        dispatch({
            type: "getAllAdminProductsSuccess",
            payload: {
                products,
                inStock,
                outOfStock
            }
        })

    } catch (error) {
        dispatch({
            type: "getAllAdminProductsFailed",
            payload: error.response ? error.response.data.message : "Request Timeout"
        })
    }
}

// Server endpoint -> product.route("/getById/:id")
export const getProductById = (id) => async (dispatch) => {
    try {
        dispatch({
            type: "getProductByIdRequest"
        })

        const {data, status} = await axios.get(`/product/getById/${id}`);

        if (status === 200) {
            dispatch({
                type: "getProductByIdSuccess",
                payload: data.product
            })
        }

    } catch (error) {
        dispatch({
            type: "getProductByIdFailed",
            payload: error.response ? error.response.data.message : "Request Timeout"
        })
    }
}

export const addProduct = (product) => async (dispatch) => {
    try {
        // product._parts.forEach( part => {
        //     console.log(part[0])
        //     console.log(part[1])
        // })
        dispatch({
            type: "addProductRequest"
        })

        axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
        const {data, status} = await axios.post("/product/createProduct", product);

        dispatch({
            type: "addProductSuccess",
            payload: data.message
        })

    } catch (error) {
        dispatch({
            type: "addProductFailed",
            payload: error.response ? error.response.data.message : "Request Timeout"
        })
    }
}

export const updateProduct = (id, product) => async (dispatch) => {
    try {
        dispatch({
            type: "updateProductRequest"
        })

        const {data} = await axios.put(`/product/getById/${id}`, product, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        console.log(data)

        dispatch({
            type: "updateProductSuccess",
            payload: data.message
        })

    } catch (error) {
        dispatch({
            type: "updateProductFailed",
            payload: error.response ? error.response.data.message : "Request Timeout"
        })
    }
}

export const deleteProduct = (id) => async (dispatch) => {
    try {
        dispatch({
            type: "deleteProductRequest"
        })

        const {data} = await axios.delete(`/product/getById/${id}`);

        dispatch({
            type: "deleteProductSuccess",
            payload: data.message
        })

    } catch (error) {
        dispatch({
            type: "deleteProductFailed",
            payload: error.response ? error.response.data.message : "Request Timeout"
        })
    }
}
export const updateProductImage = (id, formData) => async (dispatch) => {
    try {
        dispatch({
            type: "updateProductImageRequest"
        })

        const {data} = await axios.post(`/product/images/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })

        console.log(data)
        dispatch({
            type: "updateProductImageSuccess",
            payload: data.message
        })

    } catch (e) {
        dispatch({
            type: "updateProductImageFailed",
            payload: e.response ? e.response.data.message : "Request Timeout"
        })
    }
}

export const deleteProductImage = (productId, imageId) => async (dispatch) => {
    try {
        dispatch({
            type: "deleteProductImageRequest"
        })

        const {data} = await axios.delete(`/product/images/${productId}?id=${imageId}`)

        dispatch({
            type: "deleteProductImageSuccess",
            payload: data.message
        })

    } catch (e) {
        dispatch({
            type: "deleteProductImageFailed",
            payload: e.response ? e.response.data.message : "Request Timeout"
        })
    }
}