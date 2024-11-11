'use client'
import { IVariant } from "@/models/Variant"
import { Box, Button, Card, Drawer, Grid2, IconButton, Link, TextField, Typography } from "@mui/material"
import { SetStateAction, useState } from "react"
import { useAppDispatch, useAppSelector } from "../services/store"
import { addToCart, clearCart, removeFromCart } from "@/cart/cartSlice"
import { IOrder, IOrderItem } from "@/models/Order"
import { Delete } from "@mui/icons-material"
import { currencyFormatter } from "@/lib/currencyFormatter"
import { createOrder } from "../actions/cartActions"
import { Dialog } from "@/components/Dialog"
import { saleUpdateAction } from "../actions/saleAction"
import { PaymentMethod } from "@prisma/client"
import PaymentScreen from "./PaymentScreen"
import CND from "./CND"
import { CnD } from "@/models/CnD"

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
    const [orderRespose, setorderRespose] = useState<IOrder | null>(null)
    const [openPayment, setopenPayment] = useState(false)
    const [cnd, setcnd] = useState(false)

    const [discount, setdiscount] = useState<CnD>()
    const [charge, setcharge] = useState<CnD>()





    const handleCheckout = async () => {
        if (order) {
            const orderdata = await createOrder(order)
            dispatch(clearCart())
            if (orderdata) {
                setorderRespose(orderdata)
                openPaymentDialog()
            }
        }
    }
    const openPaymentDialog = () => setopenPayment(true)
    const closePaymentDialog = () => setopenPayment(false)

    const opencnd = () => setcnd(true)
    const closecnd = () => setcnd(false)


    const handleSale = async () => {
        const values = {
            saleId: 2,
            paidAmount: 150,
            paymentMethod: 'CREDIT_CARD' as PaymentMethod,
            paymentAmount: 200,

        }
        await saleUpdateAction(values.saleId, values.paidAmount, values.paymentMethod, values.paymentAmount)
        setorderRespose(null)
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
                                            {v.quantity}
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
                            <Card sx={{ my: 1 }}>
                                <Box p={1} >
                                    <Box
                                        display={'flex'} justifyContent={'space-between'}
                                    >
                                        <Box>
                                            <Box
                                                component={Typography}
                                                sx={{
                                                    maxWidth: '210px',
                                                    whiteSpace: 'nowrap',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    fontWeight: 'bold'
                                                }}
                                            >
                                                {item.variant?.product?.name}
                                            </Box>
                                            <Box
                                                sx={{
                                                    maxWidth: '160px',
                                                    whiteSpace: 'nowrap',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                }}
                                                variant="body2"
                                                component={Typography} >{item?.variant?.sku}</Box>
                                            <Box
                                                variant="body2"

                                                component={Typography} >{`${item.quantity} x ${currencyFormatter(item.price)}`}</Box>
                                        </Box>
                                        <Box
                                            display={'flex'}
                                            justifyContent={'center'}
                                            alignItems={'stretch'}
                                        >
                                            <Box
                                                sx={{
                                                    height: '100%', /* Matches height of the container */
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    flexDirection: 'column'
                                                }}
                                            >
                                                <Typography>
                                                    {`${currencyFormatter(item.quantity * item.price)}`}
                                                </Typography>
                                                <Typography color="error" onClick={() => handleRemoveCart(item.variantId)} variant="caption" component={Link} underline="hover" sx={{ cursor: 'pointer' }}>
                                                    Delete
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </Box>
                                </Box>
                            </Card>


                        </Box>
                    ))}
                </Box>
                <Box >
                    <Grid2 py={2} container spacing={2}>
                        <Button
                            disabled={(!order?.items || order.items.length === 0)}

                            onClick={opencnd} fullWidth>Discount  |  Charge</Button>

                    </Grid2>
                    <Button
                        disabled={(!order?.items || order.items.length === 0)}
                        size="large"
                        onClick={handleCheckout} variant={'contained'} fullWidth>checkout</Button>
                </Box>
            </Box>
            {orderRespose &&
                <Dialog
                    open={openPayment}
                    onClose={closePaymentDialog}
                    content={
                        <PaymentScreen
                            charge={charge}
                            discount={discount}
                            orderRespose={orderRespose}
                            closePaymentDialog={closePaymentDialog}

                        />
                    }
                    dialogTitle="Payment "
                    fullWidth={true}
                    maxWidth="sm"

                />
            }

            <Dialog
                open={cnd}
                onClose={closecnd}
                content={
                    <CND
                        setdiscount={setdiscount}
                        setcharge={setcharge}
                        closecnd={closecnd}
                    />
                }
                dialogTitle="DISCOUNT | CHARGE "
                fullWidth={true}
                maxWidth="sm"
            />

        </Box>
    )
}

export default POS