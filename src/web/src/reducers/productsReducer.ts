import { Reducer } from "react";
import { ActionTypes, TodoActions } from "../actions/common";
import { Product } from "../models/product";

export const productsReducer: Reducer<Product[], TodoActions> = (state: Product[], action: TodoActions): Product[] => {
    switch (action.type) {
        case ActionTypes.LOAD_PRODUCTS:
            state = [...action.payload];
            break;
    }

    return state;
}