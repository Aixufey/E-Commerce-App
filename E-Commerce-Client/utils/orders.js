export const orders = [
    {
        id: '1', shippingInfo: {
            address: "123, XYZ Street, ABC City", city: "ABC City", country: "ABC Country", postalCode: "123456"
        }, createdAt: '17-3-2024T12', orderStatus: "Pending", paymentMethod: "invoice", totalAmount: 2450
    },
    {
        id: '2', shippingInfo: {
            address: "123, XYZ Street, ABC City", city: "ABC City", country: "DEF Country", postalCode: "123456"
        }, createdAt: '25-4-2024T12', orderStatus: "Delivered", paymentMethod: "card", totalAmount: 5000
    },
    {
        id: '3', shippingInfo: {
            address: "123, XYZ Street, ABC City", city: "ABC City", country: "GHI Country", postalCode: "123456"
        }, createdAt: '17-3-2024T12', orderStatus: "Pending", paymentMethod: "invoice", totalAmount: 2450
    },
    {
        id: '4', shippingInfo: {
            address: "123, XYZ Street, ABC City", city: "ABC City", country: "JKL Country", postalCode: "123456"
        }, createdAt: '25-4-2024T12', orderStatus: "Delivered", paymentMethod: "card", totalAmount: 5000
    },
]