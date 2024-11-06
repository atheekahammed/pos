'use client'

import { Box, Button } from "@mui/material"
import { createProduct, createProductWithCategoriesAndVariants, getProducts } from "../actions/productActions"
import { IProduct } from "@/models/Product"

const Products = async() => {
    const products = await getProducts()
    console.log(products)
    const createproduct = async () => {
        const data: IProduct = {
            name: 'TestProduct',
            productCode: 'asdseef',
            categories: [1, 2],
        }
        await createProduct(data)
    }
    const createvariantproduct = async () => {
        await createProductWithCategoriesAndVariants()
    }


    return (
        <Box>
            <Button onClick={createproduct}>create basic Product</Button>
            <Button onClick={createvariantproduct}>create variant with Product</Button>
        </Box>
    )
}

export default Products