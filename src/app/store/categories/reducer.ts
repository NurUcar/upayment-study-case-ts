import produce from "immer";
import { createActions, createReducer, DefaultActionTypes } from "reduxsauce";



export type CategoriesState = {
    readonly isLoading: boolean;
    readonly categoriesErrorMessage: string;
    readonly categoriesInfoMessage: string;
    readonly categories: null;
    readonly category: null;
}

const initialState: CategoriesState = {
    isLoading: false,
    categoriesErrorMessage: "",
    categoriesInfoMessage: "",
    categories: null,
    category: null
};

type ActionCreators = {
    setLoading: (isLoading: boolean) => any;
    setCategoriesErrorMessage: (categoriesErrorMessage: string) => any;
    setCategoriesInfoMessage: (categoriesInfoMessage: string) => any;
    setCategories: (categories: any[]) => any;
    getCategories: () => any;
    setCategory: (category: any) => any;
    getCategory: (categoryId: string) => any;


};

export const { Types: CategoriesActionTypes, Creators: CategoriesActions } = createActions<DefaultActionTypes, ActionCreators>({
    setLoading: ["isLoading"],
    setCategoriesErrorMessage: ["categoriesErrorMessage"],
    setCategoriesInfoMessage: ["categoriesInfoMessage"],
    setCategories: ["categories"],
    getCategories: null,
    setCategory: ["category"],
    getCategory: ["categoryId"],


}, { prefix: 'CATEGORIES/' });

export const categoriesReducer = createReducer(initialState, {
    [CategoriesActionTypes.SET_LOADING]: produce((draft, { isLoading }) => ({ ...draft, isLoading })),
    [CategoriesActionTypes.SET_CATEGORIES_ERROR_MESSAGE]: produce((draft, { categoriesErrorMessage }) => ({ ...draft, categoriesErrorMessage })),
    [CategoriesActionTypes.SET_CATEGORIES_INFO_MESSAGE]: produce((draft, { categoriesInfoMessage }) => ({ ...draft, categoriesInfoMessage })),
    [CategoriesActionTypes.SET_CATEGORIES]: produce((draft, { categories }) => ({ ...draft, categories })),
    [CategoriesActionTypes.SET_CATEGORY]: produce((draft, { category }) => ({ ...draft, category }))

});
