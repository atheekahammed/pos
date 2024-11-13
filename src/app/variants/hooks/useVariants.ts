import { getVariants } from "@/app/actions/variantAction"

export const useVariants = async (key: string) => {
    const variants = await getVariants(key)
    return variants
}