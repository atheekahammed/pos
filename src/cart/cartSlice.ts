import { CnD } from "@/models/CnD";
import { IOrder, IOrderItem, } from "@/models/Order";
import { OrderStatus } from "@prisma/client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ICart {
    order: IOrder | null
}

const initialState: ICart = {
    order: null
}

export const cart = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<IOrderItem>) => {
            if (!state.order) {

                state.order = {
                    id: 0,
                    items: [action.payload],
                    status: OrderStatus.INITIAL
                } as IOrder;
            } else {

                const existingItem = state.order.items.find(
                    (item) => item.variantId === action.payload.variantId
                );

                if (existingItem) {

                    existingItem.quantity += action.payload.quantity;
                } else {

                    state.order.items.push(action.payload);
                }

                state.order.updatedAt = new Date();
            }
        },
        removeFromCart: (state, action: PayloadAction<number>) => {
            if (state.order) {

                state.order.items = state.order.items.filter(
                    (item) => item.variantId !== action.payload
                );


                if (state.order.items.length === 0) {
                    state.order = null;
                } else {
                    state.order.updatedAt = new Date();
                }
            }
        },
        applyDiscount: (state, action: PayloadAction<CnD>) => {
            if (state.order) {
                state.order.discount = action.payload;
            }
        },
        applyCharge: (state, action: PayloadAction<CnD>) => {
            if (state.order) {
                state.order.charge = action.payload;
            }
        },
        clearCart: (state) => {
            state.order = null;
        },
    }
})


export const { addToCart, clearCart, removeFromCart, applyCharge, applyDiscount } = cart.actions