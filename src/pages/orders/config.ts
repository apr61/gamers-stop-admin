import { OrderFields } from "../../utils/types";


export const fields : OrderFields= {
    name: {
        type: "text",
        required: true,
        label: "Name"
    },
    paymentStatus: {
        type: "radio",
        required: true,
        label: "Payment Status"
    },
    orderStatus: {
        type: "select",
        required: true,
        label: "Order status"
    },
    totalPrice: {
        type: "number",
        required: true,
        label: "Total Price"
    },
    orderNumber: {
        type: "text",
        required: true,
        label: "Order Number"
    }
}