'use client'

import { IProduct } from "@/models/Product"
import { Box, Button } from "@mui/material"

type ProductProps = {
    products: IProduct[]
}
const Products = (props: ProductProps) => {
    const { products } = props
    return <>
    <Box>
        <Button href="/products/newproduct">new product</Button>
    </Box>
        {products.map(p => (
            <Box key={p.id}>{p.name}</Box>
        ))}
    </>
}

export default Products