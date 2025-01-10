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

export interface ListProductsAction extends PayloadAction<string, Product[]> {
    type: ActionTypes.LOAD_PRODUCTS
}

const listProductsAction = createPayloadAction<ListProductsAction>(ActionTypes.LOAD_PRODUCTS);