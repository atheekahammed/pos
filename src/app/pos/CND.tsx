import { CnD } from "@/models/CnD";
import { Box, Button, FormControlLabel, Grid2, Radio, RadioGroup, TextField } from "@mui/material"
import { Dispatch, SetStateAction } from "react";
import { Controller, useForm } from "react-hook-form";



interface Props {
    setdiscount: Dispatch<SetStateAction<CnD | undefined>>
    setcharge: Dispatch<SetStateAction<CnD | undefined>>
    closecnd: () => void
}
const CND = (props: Props) => {
    const { setcharge, setdiscount, closecnd } = props
    const methods = useForm({
        mode: "all",
    });

    const handleCND = (data: any) => {

        if (data.type === 'discount') {
            setdiscount({ amount: data.amount, description: data.description, id: 0 })
        } else {
            setcharge({ amount: data.amount, description: data.description, id: 0 })
        }
        closecnd()

    }
    return (
        <Box component={'form'} onSubmit={methods.handleSubmit(handleCND)} >

            <Grid2 container spacing={2} direction={'column'}>
                <Grid2 size={12}>
                    <Controller
                        name="type"
                        control={methods.control}
                        defaultValue="discount"
                        rules={{ required: "Please select an option" }}
                        render={({ field }) => (
                            <RadioGroup
                                {...field}
                                row
                            >
                                <FormControlLabel value="discount" control={<Radio />} label="Discount" />
                                <FormControlLabel value="charge" control={<Radio />} label="Charge" />
                            </RadioGroup>
                        )}
                    />

                </Grid2>
                <Grid2 size={12}>
                    <Controller
                        name={"amount"}
                        control={methods.control}
                        render={({ field: { onChange, value } }) => (
                            <TextField
                                error={!!methods.formState.errors.amount}
                                helperText={methods.formState.errors?.amount?.message as string}
                                fullWidth
                                value={value ?? ""}
                                placeholder="Amount"
                                onChange={onChange}
                                type="number"
                            />
                        )}
                        rules={{ required: 'Required Field' }}
                    />
                </Grid2>
                <Grid2 size={12}>
                    <Controller
                        name={"description"}
                        control={methods.control}
                        render={({ field: { onChange, value } }) => (
                            <TextField
                                error={!!methods.formState.errors.description}
                                helperText={methods.formState.errors?.description?.message as string}
                                fullWidth
                                placeholder="Description" multiline rows={3}
                                value={value ?? ""}
                                onChange={onChange}
                            />
                        )}
                        rules={{ required: 'Required Field' }}
                    />

                </Grid2>
                <Grid2 size={12}>
                    <Button type="submit" variant={'contained'} size="large" fullWidth>save</Button>
                </Grid2>
            </Grid2>
        </Box>
    )
}

export default CND