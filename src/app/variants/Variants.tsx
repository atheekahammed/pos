'use client'

import { IVariant } from "@/models/Variant"
import { Box } from "@mui/material"

interface VariantProps {
    variants: IVariant[]
}
const Variants = (props: VariantProps) => {
    const { variants } = props
    return <>
        {variants.map(v => (
            <Box key={v.id}>{`${v.sku} - qty - ${v.quantity}`}</Box>
        ))}
    </>
}

export default Variants