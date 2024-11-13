import { IStockBatch } from "@/models/Stock";
import { IVariant } from "@/models/Variant";
import { Box, Button, Grid2, TextField } from "@mui/material"
import { Controller, useForm } from "react-hook-form";
import { createStockBatch } from "../actions/stockAction";


interface Props {
    toggleOpen: () => void
    variant: IVariant
}


const NewStock = (props: Props) => {
    const { toggleOpen, variant } = props
    const methods = useForm({
        mode: "all",
    });
    const handleForm = async (data: any) => {
        const dataValues: IStockBatch = {
            ...data, variantsIds: [variant.id]
        }
       const d = await createStockBatch(dataValues)
       console.log(d)
        toggleOpen()
    }
    return (
        <Box component={'form'} onSubmit={methods.handleSubmit(handleForm)} >
            <Grid2 container spacing={2}>
                <Grid2 size={12}>
                    <Controller
                        name={"quantity"}
                        control={methods.control}
                        render={({ field: { onChange } }) => (
                            <TextField
                                placeholder="Quantity"
                                type="number"
                                fullWidth
                                onChange={onChange}
                                error={!!methods.formState.errors.quantity}
                                helperText={methods.formState.errors?.quantity?.message as string}
                            />
                        )}
                        rules={{ required: 'Required Field' }}
                    />
                </Grid2>
                <Grid2 size={12}>
                    <Controller
                        name={"cost"}
                        defaultValue={''}
                        control={methods.control}
                        render={({ field: { onChange } }) => (
                            <TextField
                                type="number"
                                placeholder="Cost Price"
                                fullWidth
                                onChange={onChange}
                                error={!!methods.formState.errors.cost}
                                helperText={methods.formState.errors?.cost?.message as string}
                            />
                        )}
                        rules={{ required: 'Required Field' }}
                    />
                </Grid2>
                <Grid2 size={12}>
                    <Button type="submit">Save</Button>
                </Grid2>
            </Grid2>
        </Box>
    )
}

export default NewStock