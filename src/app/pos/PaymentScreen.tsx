'use client'

import { CnD } from "@/models/CnD"
import { IOrder } from "@/models/Order"
import { Box, Button, FormControlLabel, Grid2, Radio, RadioGroup, TextField, Typography } from "@mui/material"
import { Controller, useForm } from "react-hook-form"
import { saleUpdateAction } from "../actions/saleAction"
import { PaymentMethod } from "@prisma/client"
interface Props {
    orderRespose: IOrder
    discount: CnD | undefined
    charge: CnD | undefined
    closePaymentDialog: () => void
}
const pmethods = ['CASH', 'CARD', 'BANK']
const PaymentScreen = (props: Props) => {
    const { orderRespose, charge, closePaymentDialog, discount } = props
    const methods = useForm({
        mode: "all",
    });

    const handlePayment = async (data: any) => {
        console.log(data)
        if (orderRespose) {
            const orderdata = {
                saleId: orderRespose.id,
                paidAmount: data.amount,
                paymentMethod: data.paymentMethod as PaymentMethod,
                paymentAmount: orderRespose.paymentAmount ?? 0,
            }
            const res = await saleUpdateAction(
                orderdata.saleId,
                orderdata.paidAmount,
                orderdata.paymentMethod,
                orderdata.paymentAmount
            )
            closePaymentDialog()

        }
    }

    return (
        <Box component={'form'} onSubmit={methods.handleSubmit(handlePayment)}>
            <Grid2 container spacing={2} direction={'column'}>
                <Grid2 size={12}>
                    <Typography>PAYABLE AMOUNT </Typography>
                    <Typography>{orderRespose.payableAmount} </Typography>
                </Grid2>
                <Grid2 size={12}>
                    <Box>
                        <Controller
                            name="paymentMethod"
                            control={methods.control}
                            defaultValue="CASH"
                            render={({ field }) => (
                                <RadioGroup
                                    {...field}
                                    row
                                >
                                    {pmethods.map((m) => (
                                        <FormControlLabel
                                            key={m}
                                            value={m}
                                            control={<Radio />}
                                            label={m}
                                        />
                                    ))}
                                </RadioGroup>
                            )}
                        />
                    </Box>
                </Grid2>

                <Grid2 size={12}>
                    <Typography py={1}>AMOUNT </Typography>
                    <Controller
                        name="amount"
                        control={methods.control}
                        defaultValue=""
                        rules={{
                            required: 'Amount is required',
                            pattern: {
                                value: /^[0-9]*\.?[0-9]*$/,
                                message: 'Please enter a valid number',
                            },
                        }}
                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                            <TextField
                                placeholder="Amount"
                                fullWidth
                                value={value}
                                onChange={(e) => {
                                    const inputValue = e.target.value;
                                    if (/^[0-9]*\.?[0-9]*$/.test(inputValue)) {
                                        onChange(inputValue);
                                    }
                                }}
                                error={!!methods.formState.errors.amount}
                                helperText={methods.formState.errors?.amount?.message as string}
                            />
                        )}
                    />


                </Grid2>
                <Grid2 size={12}>
                    <Button type="submit" size="large" fullWidth variant="contained"> make payment</Button>
                </Grid2>
            </Grid2>




        </Box>
    )
}
export default PaymentScreen