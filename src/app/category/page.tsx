'use server'

import { getCategories } from "../actions/categoryAction"
import { Categories } from "./Categories"



const CategoriesPage = async () => {
    const categories = await getCategories()
    return <Categories categories={categories} />;

}

export default CategoriesPage 