'use server'

import { getProducts } from "../actions/productActions"
import Products from "./Products"


const ProductList = async () => {
    const products = await getProducts()
    return (
        <Products products={products} />
    )
}

export default ProductList