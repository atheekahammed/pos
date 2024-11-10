import { IOrder, IOrderItem, OrderStatus } from "@/models/Order";
import { IVariant } from "@/models/Variant";
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
                // If no order exists, create a new one with the item
                state.order = {
                    id: 0,
                    items: [action.payload],
                    status: OrderStatus.INITIAL
                } as IOrder;
            } else {
                // Check if the item already exists in the order
                const existingItem = state.order.items.find(
                    (item) => item.variantId === action.payload.variantId
                );

                if (existingItem) {
                    // Update quantity and price if it exists
                    existingItem.quantity += action.payload.quantity;
                } else {
                    // Add the new item to the order
                    state.order.items.push(action.payload);
                }
                // Update the `updatedAt` timestamp
                state.order.updatedAt = new Date();
            }
        },
        removeFromCart: (state, action: PayloadAction<number>) => {
            if (state.order) {
                // Remove item based on variantId
                state.order.items = state.order.items.filter(
                    (item) => item.variantId !== action.payload
                );

                // If no items remain, reset the order to null
                if (state.order.items.length === 0) {
                    state.order = null;
                } else {
                    state.order.updatedAt = new Date(); // Update timestamp
                }
            }
        },
        clearCart: (state) => {
            state.order = null; // Clear the entire order
        },
    }
})


export const { addToCart, clearCart, removeFromCart } = cart.actions