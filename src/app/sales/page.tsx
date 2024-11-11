'use server'

import { saleAction } from "../actions/saleAction"
import Sales from "./Sales"

const Page = async () => {
    const sales = await saleAction()
    console.log(sales)
    return <Sales sale={sales} />
}

export default Page