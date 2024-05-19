import { ProductFields } from "../../utils/types";


export const fields : ProductFields= {
    name: {
        type: "text",
        required: true,
        label: "Name"
    },
    image: {
        type: "image",
        required: true,
        label: "Image"
    },
    price: {
        type: "number",
        required: true,
        label: 'Price'
    },
    quantity: {
        type: "number",
        required: true,
        label: 'Quantity',
    },
    description: {
        type: "text",
        required: true,
        label: "Description"
    }
}