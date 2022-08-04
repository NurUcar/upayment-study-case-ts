import produce from "immer";
import { createActions, createReducer, DefaultActionTypes } from "reduxsauce";
import ProductDetail from "../../services/types/productDetailInterface";

export type ProductState = {
    readonly productIsLoading: boolean;
    readonly productErrorMessage: string;
    readonly productInfoMessage: string;
    readonly products: null;
    readonly product: null;
}

const initialState: ProductState = {
    productIsLoading: false,
    productErrorMessage: "",
    productInfoMessage: "",
    products: null,
    product: null
};

type ActionCreators = {
    setProductIsLoading: (productIsLoading: boolean) => any;
    setProductErrorMessage: (productErrorMessage: string) => any;
    setProductInfoMessage: (productInfoMessage: string) => any;
    setProducts: (products: any[]) => any;
    getProducts: () => any;
    getProduct: (productId: string) => any;
    setProduct:(product:ProductDetail) => any;
    createProduct: (avatar: string, category: string, description: string, developerEmail: string, name: string, price:number) => any;
};

export const { Types: ProductActionTypes, Creators: ProductActions } = createActions<DefaultActionTypes, ActionCreators>({
    setProductIsLoading: ["productIsLoading"],
    setProductErrorMessage: ["productErrorMessage"],
    setProductInfoMessage: ["productInfoMessage"],
    getProducts: null,
    setProducts: ["products"],
    getProduct: ["productId"],
    setProduct: ["product"],
    createProduct: ["avatar", "category", "description", "developerEmail", "name", "price"],
       
}, { prefix: 'PRODUCTS/' });

export const productsReducer = createReducer(initialState, {
    [ProductActionTypes.SET_PRODUCT_IS_LOADING]: produce((draft, { productIsLoading }) => ({ ...draft, productIsLoading })),
    [ProductActionTypes.SET_PRODUCT_ERROR_MESSAGE]: produce((draft, { productErrorMessage }) => ({ ...draft, productErrorMessage })),
    [ProductActionTypes.SET_PRODUCT_INFO_MESSAGE]: produce((draft, { productInfoMessage }) => ({ ...draft, productInfoMessage })),
    [ProductActionTypes.SET_PRODUCTS]: produce((draft, { products }) => ({ ...draft, products })),
    [ProductActionTypes.SET_PRODUCT]: produce((draft, { product }) => ({ ...draft, product }))
});
