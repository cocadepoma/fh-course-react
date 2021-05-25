import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import { notesReducer } from "../reducers/notesReducer";
import { authReducer } from "../reducers/authReducer";
import { loginReducer } from "../reducers/loginReducer";
import { uiReducer } from "../reducers/uiReducer";
// Para poder habilitar REDUX necesita window.___REDUX....
// En el caso de que necesitemos hacer peticiones async, deberemos aplicar middlewares
// Lo podemos hacer con la libreria redux-thunk

// En el caso de que necesitemos más de un reducer, debemos usar combineReducers, y dentro de un objeto
// le indicaremos todos nuestros reducers.

const composeEnhancers =
    (typeof window !== "undefined" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const reducers = combineReducers({
    auth: authReducer,
    ui: uiReducer,
    login: loginReducer,
    notes: notesReducer,
});

export const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));
