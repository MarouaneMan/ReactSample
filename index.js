import 'react-app-polyfill/stable';
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import store from 'app/store';
import App from './App';

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App/>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

// disable react-dev-tools in production
if (process.env.NODE_ENV === 'production')
{
    if (typeof window.__REACT_DEVTOOLS_GLOBAL_HOOK__ === "object") {
        for (let [key, value] of Object.entries(window.__REACT_DEVTOOLS_GLOBAL_HOOK__)) {
            window.__REACT_DEVTOOLS_GLOBAL_HOOK__[key] = typeof value == "function" ? ()=>{} : null;
        }
    }
}
