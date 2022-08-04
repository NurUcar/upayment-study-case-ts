import { all } from "redux-saga/effects";
import products from "./products/sagas";
import categories from "./categories/sagas";


export default function* sagas() {
    yield all([
        ...products,
        ...categories
    ]);
}