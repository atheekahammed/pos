'use client'

import { Sale } from "@/models/Sale"
import { Box } from "@mui/material"

interface SaleProps{
    sale:Sale[]
}
const Sales = (props:SaleProps) => {
    const{sale}=props
    return (
        <Box>
            {sale.map(s=>(
                <Box key={s.id}>{`${s.status} - sssss  ${s.payableAmount} sssssssss- ${s.createdAt} - ${s.paymentStatus}`}</Box>
            ))}
        </Box>
    )
}

export default Sales