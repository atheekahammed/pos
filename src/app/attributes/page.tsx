
'use server'

import { getAttributes } from "../actions/attributeAction"
import Attributes from "./Attributes"





const AttributesList = async () => {
    const attributes = await getAttributes()
    return <>
        <Attributes attributes={attributes} />
    </>
}

export default AttributesList