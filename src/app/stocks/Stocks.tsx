'use client'

import { IStockBatch } from "@/models/Stock"
import { IVariant } from "@/models/Variant"
import { Autocomplete, Box, Button, Grid2, TextField } from "@mui/material"
import { Controller, useForm } from "react-hook-form"
import { createStockBatch } from "../actions/stockAction"
interface StocksProps {
    stocks: IStockBatch[]
    variants: IVariant[]
}
const Stocks = (props: StocksProps) => {
    const { stocks, variants } = props

    const methods = useForm({
        mode: "all",
    });

    const handleForm = async (data: any) => {
        console.log(data)
        await createStockBatch({...data,variantId:0})
    }

    return <Box>
        {stocks.map(s => (
            <Box key={s.id}>{`${s.variant?.sku} - ${s.cost}`}</Box>
        ))}

        <Box component={'form'} onSubmit={methods.handleSubmit(handleForm)}>
            <Grid2 container spacing={2}>
                <Grid2 size={12}>
                    <Controller
                        name={"cost"}
                        control={methods.control}
                        render={({ field: { onChange, value } }) => (
                            <TextField
                                error={!!methods.formState.errors.name}
                                helperText={methods.formState.errors?.name?.message as string}
                                fullWidth
                                value={value ?? ""}
                                label="cost"
                                onChange={(e) => {
                                    onChange(e);
                                }}
                            />
                        )}
                        rules={{ required: 'This Field is Required' }}

                    />
                </Grid2>
                <Grid2 size={12}>
                    <Controller
                        name={"quantity"}
                        control={methods.control}
                        render={({ field: { onChange, value } }) => (
                            <TextField
                                error={!!methods.formState.errors.name}
                                helperText={methods.formState.errors?.name?.message as string}
                                fullWidth
                                value={value ?? ""}
                                label="quantity"
                                onChange={(e) => {
                                    onChange(e);
                                }}
                            />
                        )}
                        rules={{ required: 'This Field is Required' }}

                    />
                </Grid2>
                <Grid2 size={12}>
                    <Controller
                        name="variantsIds"
                        control={methods.control}
                        render={({
                            field: { onChange, value },
                            fieldState: { error },
                        }) => {
                            return (
                                <Autocomplete
                                    multiple
                                    onChange={(e: any, value: IVariant[] | null) => {
                                        const ids = value?.map(v => v.id)
                                        onChange(ids);
                                    }}
                                    getOptionLabel={(option) => option.sku || ""}
                                    options={variants}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="variants"
                                            variant="outlined"

                                        />
                                    )}
                                />
                            );
                        }}
                        rules={{ required: 'This Field is Required' }}
                    />
                </Grid2>
                <Grid2>
                    <Button type="submit">Add stock</Button>
                </Grid2>
            </Grid2>
        </Box>

    </Box>
}
export default Stocks