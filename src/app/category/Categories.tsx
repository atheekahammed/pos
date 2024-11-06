'use client'

import { Autocomplete, Box, Button, Grid2, TextField } from "@mui/material"
import { Controller, useForm } from "react-hook-form"
import { ICategory } from "@/models/Category"
import { createCategory, deleteCategory } from "../actions/categoryAction"


type CategoriesProps = {
    categories: ICategory[];
}


export const Categories = (props: CategoriesProps) => {
    const { categories } = props
    const methods = useForm({
        mode: "all",
    });

    const handleForm = async (data: any) => {
        console.log(data)
        await createCategory(data)
        methods.reset()
    }
    const handleDelete = async (category: ICategory) => {
        await deleteCategory(category.id)
    }

    const handleUpdateForm = async (category: ICategory) => methods.reset(category)
    const handleUpdate = async (category: ICategory) => {
        methods.reset(category)
    }

    return (
        <Box>
            {categories.map(c => (
                <div key={c.id}>{c.name}
                    <Button onClick={() => handleDelete(c)}>delete</Button>
                    <Button onClick={() => handleUpdateForm(c)}>update</Button>
                </div>
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
                                        size="small"
                                        value={value ?? ''}
                                        onChange={(e: any, value: ICategory | null) => {
                                            onChange(value?.id);
                                        }}
                                        getOptionLabel={(option) => option.name || ""}
                                        options={categories}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label="Parent Categories"
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
                        <Controller
                            name={"description"}
                            defaultValue={''}
                            control={methods.control}
                            render={({ field: { onChange, value } }) => (
                                <TextField
                                    fullWidth
                                    multiline
                                    value={value ?? ""}
                                    rows={3}
                                    label="Description"
                                    onChange={onChange}
                                />
                            )}
                            rules={{ required: false }}
                        />
                    </Grid2>
                    <Grid2 size={12}>
                        <Button type="submit">Save</Button>
                        <Button type="submit">update</Button>
                    </Grid2>
                </Grid2>
            </Box>
        </Box>
    )
}