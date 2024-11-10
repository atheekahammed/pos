'use server'

import { getVariants } from "../actions/variantAction"
import POS from "./POS"

const Page = async () => {
    const variants = await getVariants()

    return <POS variants={variants} />
}

export default Page