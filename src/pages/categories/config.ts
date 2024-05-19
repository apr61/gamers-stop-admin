import { CategoryFields } from "../../utils/types";


export const fields : CategoryFields= {
    category_name: {
        type: "text",
        required: true,
        label: "Name"
    },
    category_image: {
        type: "image",
        required: true,
        label: "Image"
    }
}