'use server'

import { getCategories } from "@/app/actions/categoryAction";
import ProductForm from "./ProductForm";
import { getAttributes } from "@/app/actions/attributeAction";




const NewProduct = async () => {

    const categories = await getCategories()
    const attributes = await getAttributes()
    return (
        <ProductForm attributes={attributes} categories={categories} />

    )
}

export default NewProduct