'use client'

import { IAttribute } from "@/models/Attribute"
import { ICategory } from "@/models/Category"
import { Autocomplete, Box, Button, Grid2, TextField } from "@mui/material"
import { Controller, useForm } from "react-hook-form"
import { createAttribute } from "../actions/attributeAction"

type AttributeProps = {
    attributes: IAttribute[]
}
const Attributes = (props: AttributeProps) => {
    const { attributes } = props
    const methods = useForm({
        mode: "all",
    });
    const handleForm = async (data: any) => {
        console.log(data)
        await createAttribute(data)
        methods.reset()
    }

    return <>
        {attributes.map(a => (
            <Box key={a.id}>
                {a.name}
            </Box>
        ))}

        <Box component={'form'} onSubmit={methods.handleSubmit(handleForm)} >
            <Grid2 container spacing={2}>
                <Grid2 size={12}>
                    <Controller
                        name={"name"}
                        control={methods.control}
                        render={({ field: { onChange, value } }) => (
                            <TextField
                                error={!!methods.formState.errors.name}
                                helperText={methods.formState.errors?.name?.message as string}
                                fullWidth
                                value={value ?? ""}
                                label="Name"
                                onChange={(e) => {
                                    onChange(e);
                                }}
                            />
                        )}
                        rules={{ required: true }}
                    />
                </Grid2>
                <Grid2 size={12}>
                    <Controller
                        name="parentId"
                        control={methods.control}
                        render={({
                            field: { onChange, value },
                            fieldState: { error },
                        }) => {
                            return (
                                <Autocomplete
                                    size="medium"
                                    value={value ?? ''}
                                    onChange={(e: any, value: ICategory | null) => {
                                        onChange(value?.id);
                                    }}
                                    getOptionLabel={(option) => option.name || ""}
                                    options={attributes}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Parent Attribute"
                                            variant="outlined"

                                        />
                                    )}
                                />
                            );
                        }}
                        rules={{ required: false }}
                    />
                </Grid2>
             
                <Grid2 size={12}>
                    <Button type="submit">Save</Button>
                    <Button type="submit">update</Button>
                </Grid2>
            </Grid2>
        </Box>
    </>
}

export default Attributes