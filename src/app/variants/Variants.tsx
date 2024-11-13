'use client'

import { Dialog } from "@/components/Dialog"
import { PaginationColumns } from "@/components/Table/interface"
import { shortDate } from "@/lib/date"
import { IAttribute } from "@/models/Attribute"
import { ICategory } from "@/models/Category"
import { IVariant } from "@/models/Variant"
import { Add, AddCircleOutline, Delete, DeleteOutline, EditNoteOutlined } from "@mui/icons-material"
import { Box, Chip, Grid2, IconButton, TextField } from "@mui/material"
import dynamic from "next/dynamic"
import { useState } from "react"
import NewStock from "./NewStock"
import { getVariants } from "../actions/variantAction"
import { useVariants } from "./hooks/useVariants"
const PaginationTable = dynamic(() => import("@/components/Table/Table"), { ssr: false });

interface VariantProps {
    variants: IVariant[]
}
const Variants = (props: VariantProps) => {
    const { variants } = props
    const [search, setsearch] = useState('')

const vb=useVariants(search)
console.log(vb)

    const [open, setopen] = useState(false)
    const toggleOpen = () => setopen(!open)
    const [variant, setvariant] = useState<IVariant>()
    const columns: PaginationColumns[] = [

        {
            name: "product.name",
            label: "product name",
        },
        {
            name: "sku",
            label: "SKU",
        },
        {
            name: "product.categories",
            label: "Category",
            options: {
                customBodyRenderLite(dataIndex, rowIndex) {
                    const categories = variants[dataIndex].product?.categories as ICategory[]
                    return <Box display={'flex'} gap={1}>
                        {categories?.map((c, i) => (
                            <Box key={i}>{c.name}</Box>
                        ))}
                    </Box>
                },
            }
        },
        {
            name: "price",
            label: "Price",
        },
        {
            name: "quantity",
            label: "quantity",
        },
        {
            name: "createdAt",
            label: "Created At",
            options: {
                customBodyRenderLite(dataIndex, rowIndex) {
                    const data = variants[dataIndex].createdAt
                        ? new Date(variants[dataIndex].createdAt).toISOString()
                        : '';
                    return <>{shortDate(data)}</>
                },
            }
        },
        {
            name: "n",
            label: "Attributes",
            options: {
                customBodyRenderLite(dataIndex, rowIndex) {
                    const row = variants[dataIndex].attributes as IAttribute[]
                    return <Box display={'flex'} gap={1}>
                        {row.map((r, i) => (
                            <Box key={i}>
                                <Chip color="secondary" sx={{ borderRadius: 2 }} size="small" label={r.name} />
                            </Box>
                        ))}
                    </Box>
                },
            }
        },
        {
            name: "",
            label: "Actions",
            options: {
                customBodyRenderLite(dataIndex, rowIndex) {
                    const data = variants[dataIndex]
                    return <>
                        <IconButton onClick={() => {
                            setvariant(data)
                        }}>
                            <DeleteOutline />
                        </IconButton>
                        <IconButton onClick={() => {
                            setvariant(data)
                            toggleOpen()
                        }}>
                            <AddCircleOutline />
                        </IconButton>
                    </>
                },
            }
        },


    ]

    const handleSearch = async (search:string) => { 
        const dsf = await getVariants(search)
        console.log(dsf)
    }

    return <>
        <Grid2 container spacing={2}>
            <Grid2 size={12}>
                <TextField onChange={(e)=>handleSearch(e.target.value)} size="small" placeholder="search..." />
            </Grid2>
            <Grid2 size={12}></Grid2>
            <Grid2 size={12}>
                <PaginationTable
                    columns={columns}
                    data={variants}
                    options={{
                        enableNestedDataAccess: '.',
                    }}
                />
            </Grid2>
        </Grid2>
        {variant &&
            <Dialog
                content={<NewStock variant={variant} toggleOpen={toggleOpen} />}
                fullWidth={true}
                maxWidth="sm"
                dialogTitle=""
                onClose={toggleOpen}
                open={open}
            />
        }

    </>
}

export default Variants