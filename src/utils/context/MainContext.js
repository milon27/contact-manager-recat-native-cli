import React, { createContext, useReducer } from 'react'
import AppReducer, { initAppState } from './reducers/AppReducer';
import AuthReducer, { initAuthState } from './reducers/AuthReducer';
import ListReducer, { initListState } from './reducers/ListReducer';

export const StateContext = createContext();
export const DispatchContext = createContext();

export default function MainContext(props) {
    const [auth, authDispatch] = useReducer(AuthReducer, initAuthState);//for student auth
    const [app, appDispatch] = useReducer(AppReducer, initAppState);//for app state
    const [contact_list, contact_listDispatch] = useReducer(ListReducer, initListState);//for any kind of list


    const global_state = {
        auth, app, contact_list
    }
    const global_dispatch = {
        authDispatch, appDispatch, contact_listDispatch
    }

    return (
        <StateContext.Provider value={global_state}>
            <DispatchContext.Provider value={global_dispatch}>
                {props.children}
            </DispatchContext.Provider>
        </StateContext.Provider>
    )
}
