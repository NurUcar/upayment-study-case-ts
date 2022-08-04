import React, { FC } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./store/store";

import "./assets/css/theme.css";
import "./assets/css/custom.css";
import "./assets/css/noty.css";
import "./assets/css/metroui.css";
import "primereact/resources/primereact.min.css";
import "primeflex/primeflex.css";
import "primeicons/primeicons.css";
import App from "./app";




const Entry: FC = () => {
    return (
        <React.StrictMode>
            <Provider store={store}>
                    <App/>
                
            </Provider>
        </React.StrictMode >
    );
}


export default Entry;
