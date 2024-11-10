'use server'

import { getStocks } from "../actions/stockAction"
import { getVariants } from "../actions/variantAction"
import Stocks from "./Stocks"

const Page = async () => {
    const stocks = await getStocks()
    const variants = await getVariants()
    return <Stocks stocks={stocks} variants={variants}/>
}
export default Page