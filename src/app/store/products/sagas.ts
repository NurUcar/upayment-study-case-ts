import { call, put, takeLatest } from "redux-saga/effects";
import { ProductActions, ProductActionTypes } from "./reducer";
import api from "../../services/api";


function* createProduct({avatar, category, description, developerEmail, name, price}) {
    try {
        yield put(ProductActions.setProductIsLoading(true));

        yield call(api.createProduct, avatar, category, description, developerEmail, name, price);
        yield put(ProductActions.setProductInfoMessage("Product created successfully."));
        yield put(ProductActions.setProductErrorMessage(""));
        yield put(ProductActions.setProductIsLoading(false));
    }
    catch (e: any) {
        yield put(ProductActions.setProductIsLoading(false));
        yield put(ProductActions.setProductErrorMessage("An Error occurred when creating product."));
    }
}


function* getProducts() {
    try {
        yield put(ProductActions.setProductIsLoading(true));

        let products = yield call(api.getProducts);
        yield put(ProductActions.setProducts(products));
        yield put(ProductActions.setProductErrorMessage(""));
        yield put(ProductActions.setProductIsLoading(false));
    }
    catch (e: any) {
        yield put(ProductActions.setProductIsLoading(false));
        yield put(ProductActions.setProducts([]));
        yield put(ProductActions.setProductErrorMessage("An Error occurred when creating product."));
    }
}


function* getProduct({ productId }) {
    try {
        yield put(ProductActions.setProductIsLoading(true));
        let product = yield call(api.getProduct, productId);
        yield put(ProductActions.setProduct(product));
        yield put(ProductActions.setProductErrorMessage(""));
        yield put(ProductActions.setProductIsLoading(false));
    }
    catch (e: any) {
        yield put(ProductActions.setProductIsLoading(true));
        yield put(ProductActions.setProducts([]));
        yield put(ProductActions.setProductErrorMessage("An Error occurred when getting product detail."));
    }
}

const sagas = [
    takeLatest(ProductActionTypes.CREATE_PRODUCT, createProduct as any),
    takeLatest(ProductActionTypes.GET_PRODUCTS, getProducts as any),
    takeLatest(ProductActionTypes.GET_PRODUCT, getProduct as any)
];


export default sagas;
    

    