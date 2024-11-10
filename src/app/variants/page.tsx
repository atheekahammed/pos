'use server'

import { getVariants } from "../actions/variantAction"
import Variants from "./Variants"

const Page = async () => {
    const variants = await getVariants()
    return <Variants variants={variants} />
}

export default Page