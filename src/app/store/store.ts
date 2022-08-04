import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { composeWithDevTools } from 'redux-devtools-extension';
import { rootReducer } from "./rootReducer";
import sagas from "./sagas";
import { persistStore } from "redux-persist";


const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(sagaMiddleware))
);

export const persistor = persistStore(store);


sagaMiddleware.run(sagas);
