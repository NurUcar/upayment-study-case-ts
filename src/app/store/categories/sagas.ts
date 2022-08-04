import { call, put, takeLatest } from "redux-saga/effects";
import { CategoriesActions, CategoriesActionTypes } from "./reducer";
import api from "../../services/api";


function* getCategories() {
    try {
        yield put(CategoriesActions.setLoading(true));
        let categories = yield call(api.getCategories);
        yield put(CategoriesActions.setCategories(categories));
        yield put(CategoriesActions.setCategoriesErrorMessage(""));
        yield put(CategoriesActions.setLoading(false));
    }
    catch (e: any) {
        yield put(CategoriesActions.setLoading(false));
        yield put(CategoriesActions.setCategories([]));
        yield put(CategoriesActions.setCategoriesErrorMessage("An Error occurred when getting categories."));
    }
}


function* getCategory({ categoryId }) {
    try {
        let category = yield call(api.getCategory, categoryId);
        yield put(CategoriesActions.setCategory(category));
        yield put(CategoriesActions.setCategoriesErrorMessage(""));
        yield put(CategoriesActions.setLoading(false));
    }
    catch (e: any) {
        yield put(CategoriesActions.setLoading(false));
        yield put(CategoriesActions.setCategory(null));
        yield put(CategoriesActions.setCategoriesErrorMessage("An Error occurred when getting category."));
    }
}

const sagas = [
    takeLatest(CategoriesActionTypes.GET_CATEGORIES, getCategories as any),
    takeLatest(CategoriesActionTypes.GET_CATEGORY, getCategory as any)
];


export default sagas;
    

    