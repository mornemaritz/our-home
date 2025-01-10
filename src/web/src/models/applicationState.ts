import { Dispatch } from "react";
import { TodoActions } from "../actions/common";
import { Product } from "./product";

export interface AppContext {
    state: ApplicationState
    dispatch: Dispatch<TodoActions>
}

export interface ApplicationState {
    products?: Product[]
}

export const getDefaultState = (): ApplicationState => {
    return {
        products: undefined
    }
}

