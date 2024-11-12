'use client'

import { PaginationColumns } from "@/components/Table/interface"
import { IAttribute } from "@/models/Attribute"
import { IVariant } from "@/models/Variant"
import { Box, Chip } from "@mui/material"
import dynamic from "next/dynamic"
const PaginationTable = dynamic(() => import("@/components/Table/Table"), { ssr: false });

interface VariantProps {
    variants: IVariant[]
}
const Variants = (props: VariantProps) => {
    const { variants } = props

    const columns: PaginationColumns[] = [
        {
            name: "id",
            label: "id",
        },
        {
            name: "product.name",
            label: "product name",
        },
        {
            name: "sku",
            label: "sku",
        },
        {
            name: "price",
            label: "price",
        },
        {
            name: "quantity",
            label: "quantity",
        },
        {
            name: "createdAt",
            label: "createdAt",
            options: {
                customBodyRenderLite(dataIndex, rowIndex) {
                    // const data = variants[dataIndex].createdAt?.getDate()
                    return <></>
                },
            }
        },
        {
            name: "n",
            label: "attributes",
            options: {
                customBodyRenderLite(dataIndex, rowIndex) {
                    const row = variants[dataIndex].attributes as IAttribute[]
                    return <>
                        {row.map((r, i) => (
                            <Box key={i}>
                                <Chip color="secondary" sx={{borderRadius:2}} size="small" label={r.name} />
                            </Box>
                        ))}
                    </>
                },
            }
        },


    ]

    console.log(variants)

    return <>
        {variants.map(v => (
            <Box key={v.id}>{`${v.sku} - qty - ${v.quantity}`}</Box>
        ))}
        <PaginationTable
            columns={columns}
            data={variants}
            options={{
                enableNestedDataAccess: '.',
                serverSide: false,
                pagination: false,
            }}
        />
    </>
}

export default Variants