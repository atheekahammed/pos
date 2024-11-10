'use client'
import { createProduct } from "@/app/actions/productActions";
import { IAttribute } from "@/models/Attribute";
import { ICategory } from "@/models/Category";
import { IProduct } from "@/models/Product";
import { IVariant } from "@/models/Variant";
import { Cancel } from "@mui/icons-material";
import { Box, Grid2, TextField, Autocomplete, Button, IconButton } from "@mui/material";
import { useRouter } from "next/navigation";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { v4 as uuidv4 } from 'uuid';

type ProductFormProps = {
    categories: ICategory[]
    attributes: IAttribute[]
}
const ProductForm = (props: ProductFormProps) => {
    const { attributes, categories } = props
    const router = useRouter()
    const { control, handleSubmit, formState } = useForm({
        defaultValues: {
            name: "",
            productCode: uuidv4(),
            brand: "",
            categories: [],
            description: "",
            variants: [{ sku: uuidv4(), attributes: [], price: "", quantity: 0, default: "DEFAULT" }],
        },
        mode: "all",
    });




    const { fields, append, remove } = useFieldArray({
        control,
        name: "variants",
    });

    const handleAddVariant = () => {





        const defaultIndex = fields.findIndex(field => field.default === 'DEFAULT');


        if (defaultIndex !== -1) {
            remove(defaultIndex);
        }

        // Append a new record
        append({ sku: uuidv4(), attributes: [], price: '', quantity: 0, default: '' });

    }

    const handleCreateProduct = async (data: any) => {
        const dataV: IProduct = {
            ...data,
            categories: data.categories.map((category: ICategory) => category.id),
            variants: data.variants.map(({ default: _, ...variant }: IVariant) => ({
                ...variant,
                attributes: (variant.attributes as IAttribute[]).map((attribute: IAttribute) => attribute.id)
            }))
        };

        console.log(dataV)
        await createProduct(dataV).catch(e => console.log(e))
        router.push('/products')
    }

    return (
        <>
            <Box>
                <Box component={'form'} onSubmit={handleSubmit(handleCreateProduct)}>
                    <Grid2 container spacing={2}>
                        <Grid2 size={6}>
                            <Controller
                                name={"name"}
                                control={control}
                                render={({ field: { onChange, value } }) => (
                                    <TextField
                                        error={!!formState.errors.name}
                                        helperText={formState.errors?.name?.message as string}
                                        fullWidth
                                        value={value ?? ""}
                                        onChange={(e) => {
                                            onChange(e);
                                        }}
                                        placeholder="Product Name"

                                    />
                                )}
                                rules={{ required: 'Required Field' }}
                            />
                        </Grid2>
                        <Grid2 size={6}>
                            <Controller
                                name={"productCode"}
                                control={control}
                                render={({ field: { onChange, value } }) => (
                                    <TextField fullWidth placeholder="Product Code"
                                        error={!!formState.errors.name}
                                        helperText={formState.errors?.name?.message as string}
                                        value={value ?? ""}
                                        onChange={(e) => {
                                            onChange(e);
                                        }}
                                    />

                                )}
                                rules={{ required: 'Required Field' }}
                            />
                        </Grid2>
                        <Grid2 size={6}>
                            <Controller
                                name={"brand"}
                                control={control}
                                render={({ field: { onChange, value } }) => (

                                    <TextField fullWidth placeholder="Brand"
                                        error={!!formState.errors.name}
                                        helperText={formState.errors?.name?.message as string}
                                        value={value ?? ""}
                                        onChange={(e) => {
                                            onChange(e);
                                        }}
                                    />
                                )}
                                rules={{ required: 'Required Field' }}
                            />
                        </Grid2>
                        <Grid2 size={6}>
                            <Controller
                                name={"categories"}
                                control={control}
                                render={({ field: { onChange, value } }) => (

                                    <Autocomplete
                                        getOptionLabel={opt => opt.name}
                                        options={categories}
                                        multiple
                                        onChange={(e, value) => {
                                            onChange(value);
                                        }}
                                        renderInput={(params) => <TextField {...params} placeholder="Category"
                                            error={!!formState.errors.name}
                                            helperText={formState.errors?.name?.message as string}
                                            value={value ?? ""}
                                        />}
                                    />
                                )}
                                rules={{ required: 'Required Field' }}
                            />
                        </Grid2>
                        <Grid2 size={12}>
                            <Controller
                                name={"description"}
                                control={control}
                                render={({ field: { onChange, value } }) => (

                                    <TextField fullWidth multiline rows={3} placeholder="Product Description"
                                        error={!!formState.errors.name}
                                        helperText={formState.errors?.name?.message as string}
                                        value={value ?? ""}
                                        onChange={(e) => {
                                            onChange(e);
                                        }}
                                    />
                                )}
                                rules={{ required: 'Required Field' }}
                            />
                        </Grid2>
                        <Grid2>
                            <Box py={3}>
                                <Button type="submit">create product</Button>
                            </Box>
                        </Grid2>
                    </Grid2>


                    <Box py={3}>
                        <Button onClick={handleAddVariant}>Add Variant</Button>
                    </Box>

                    {fields.map((field, index) => (
                        <Grid2 py={1} container spacing={2} key={field.id}>
                            <Grid2 size={3}>
                                <Controller
                                    name={`variants.${index}.sku`}
                                    control={control}
                                    rules={{ required: "SKU is required" }}
                                    render={({ field, fieldState: { error } }) => (
                                        <TextField
                                            fullWidth
                                            placeholder="SKU"
                                            value={field.value || ""}
                                            onChange={field.onChange}
                                            onBlur={field.onBlur}
                                            error={!!error}
                                            helperText={error?.message}
                                        />
                                    )}
                                />

                            </Grid2>
                            <Grid2 size={5}>
                                <Controller
                                    name={`variants.${index}.attributes`}
                                    control={control}
                                    render={({ field }) => (
                                        <Autocomplete
                                            multiple
                                            options={attributes}
                                            getOptionLabel={(option) => option.name}
                                            onChange={(event, newValue) => field.onChange(newValue)}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    placeholder="Attributes"
                                                    error={!!formState.errors?.variants?.[index]?.attributes}
                                                    helperText={formState.errors?.variants?.[index]?.attributes?.message}
                                                />
                                            )}
                                        />
                                    )}

                                    rules={{ required: 'Required Field' }}


                                />

                            </Grid2>
                            <Grid2 size={3}>
                                <Controller
                                    name={`variants.${index}.price`}
                                    control={control}
                                    rules={{
                                        required: "Price is required",
                                        validate: (value) => (parseInt(value) > 0 ? true : "Price must be greater than 0"),
                                    }}
                                    render={({ field, fieldState: { error } }) => (
                                        <TextField
                                            fullWidth
                                            placeholder="Price"
                                            value={field.value || ""}
                                            onChange={(e) => field.onChange(e.target.value)}
                                            onBlur={field.onBlur}
                                            error={!!error}
                                            helperText={error?.message}
                                        />
                                    )}
                                />

                            </Grid2>
                            <Grid2
                                size={1}
                                display="flex"
                                justifyContent="center"
                                alignItems="center"
                            >
                                <IconButton onClick={() => remove(index)}>
                                    <Cancel />
                                </IconButton>
                            </Grid2>
                        </Grid2>
                    ))}

                    <Button type="submit">create product</Button>
                </Box>
            </Box>
        </>
    )
}

export default ProductForm