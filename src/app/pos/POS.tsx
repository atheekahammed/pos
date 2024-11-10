'use client'
import { IVariant } from "@/models/Variant"
import { Box, Button, Card, Drawer, Grid2, IconButton } from "@mui/material"
import { useState } from "react"
import { useAppDispatch, useAppSelector } from "../services/store"
import { addToCart, removeFromCart } from "@/cart/cartSlice"
import { IOrderItem } from "@/models/Order"
import { Delete } from "@mui/icons-material"

interface POSProps {
    variants: IVariant[]
}
const drawerWidth = 270;

const POS = (props: POSProps) => {
    const { variants } = props
    const [open, setOpen] = useState(true);

    const toggleDrawer = () => {
        setOpen(!open);
    };
    const dispatch = useAppDispatch()
    const { order } = useAppSelector(state => state.cart)

    const handleaddtoCart = (item: IVariant) => {
        const data: IOrderItem = {
            id: 0,
            price: item.price,
            quantity: 1,
            variantId: item.id,
            variant: item
        }
        dispatch(addToCart(data))
    }
    const handleRemoveCart = (id: number) => {
        dispatch(removeFromCart(id))
    }

    return (
        <Box display={'flex'} gap={2}>
            <Box flexGrow={1}>
                <Grid2 container spacing={2}>
                    <Grid2 size={12}>
                        <Grid2 container spacing={2}>
                            {variants.map(v => (
                                <Grid2 size={2} key={v.id}>
                                    <Card onClick={() => { handleaddtoCart(v) }} sx={{}}>
                                        <Box minHeight={10} display={'flex'} justifyContent={'center'} alignItems={'center'}>
                                            {v.product?.name}
                                        </Box>
                                    </Card>
                                </Grid2>
                            ))}
                        </Grid2>
                    </Grid2>
                </Grid2>
            </Box>

            <Box width={'400px'} minHeight={'92vh'} display={'flex'} justifyContent={'space-between'} flexDirection={'column'} >
                <Box flexGrow={1}>
                    {order?.items.map((item, i) => (
                        <Box key={i}>
                            <Card>
                                <Box p={1}>
                                    <Box>{item.variant?.product?.name}</Box>
                                    <Box>{item?.variant?.sku}</Box>
                                    <Box>{`${item.quantity} x ${item.price}`}</Box>
                                </Box>
                            </Card>

                            {`${item.price} - ${item.quantity} - ${item.variant?.sku} - ${item.price * item.quantity}`}
                            <IconButton onClick={() => handleRemoveCart(item.variantId)}><Delete /></IconButton>
                        </Box>
                    ))}
                </Box>
                <Box>
                    <Button variant={'contained'} fullWidth>checkout</Button>
                </Box>
            </Box>
        </Box>
    )
}

export default POS