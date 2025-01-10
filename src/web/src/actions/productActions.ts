import { Dispatch } from "react";
import { Product } from "../models";
import { ProductService } from '../services/productService';
import { ActionTypes } from "./common";
import config from "../config";
import { ActionMethod, createPayloadAction, PayloadAction } from "./actionCreators";

const productService = new ProductService(config.api.baseUrl, '/lists/products');

export interface ProductActions {
    list(): Promise<Product[]>
}

export const list = (): ActionMethod<Product[]> => async (dispatch: Dispatch<ListProductsAction>) => {
    const products = await productService.getList();

    dispatch(listProductsAction(products));

    return products;
}


export const SaveProduct = (product: Product): ActionMethod<Product> => async (dispatch: Dispatch<SaveProductAction>) => {
    const saveProductService = new ProductService(config.api.baseUrl, `/lists/products/${product.id}`);
    const savedProduct = await saveProductService.save(product);

    dispatch(saveProductAction(savedProduct));

    return savedProduct;
}


export interface ListProductsAction extends PayloadAction<string, Product[]> {
    type: ActionTypes.LOAD_PRODUCTS
}

export interface SaveProductAction extends PayloadAction<string, Product> {
    type: ActionTypes.SAVE_PRODUCT
}

export interface AddProductToShoppingListAction extends PayloadAction<string, Product> {
    type: ActionTypes.ADD_PRODUCT_TO_SHOPPING_LIST
}

export interface PickProductAction extends PayloadAction<string, Product> {
    type: ActionTypes.PICK_PRODUCT
}

export interface AddProductToInventoryAction extends PayloadAction<string, Product> {
    type: ActionTypes.ADD_PRODUCT_TO_INVENTORY
}

const listProductsAction = createPayloadAction<ListProductsAction>(ActionTypes.LOAD_PRODUCTS);
const saveProductAction = createPayloadAction<SaveProductAction>(ActionTypes.SAVE_PRODUCT);