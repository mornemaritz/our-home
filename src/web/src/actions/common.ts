import * as productActions from './productActions';

export enum ActionTypes {
    LOAD_PRODUCTS = "LOAD_PRODUCTS",
    SAVE_PRODUCT = "SAVE_PRODUCT",
    ADD_PRODUCT_TO_SHOPPING_LIST = "ADD_PRODUCT_TO_SHOPPING_LIST",
    PICK_PRODUCT = "PICK_PRODUCT",
    ADD_PRODUCT_TO_INVENTORY = "ADD_PRODUCT_TO_INVENTORY",
}

export type TodoActions = 
    productActions.ListProductsAction |
    productActions.SaveProductAction |
    productActions.AddProductToShoppingListAction |
    productActions.PickProductAction |
    productActions.AddProductToInventoryAction;