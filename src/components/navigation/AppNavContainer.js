import React, { useContext, useState, useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import AuthNav from './AuthNav';
import DashDrawNav from './DashDrawNav';
import Splash from './../screens/splash/Splash';
import { DispatchContext, StateContext } from './../../utils/context/MainContext';
import AuthAction from './../../utils/context/actions/AuthAction';

export default function AppNavContainer() {

    const { auth, } = useContext(StateContext)
    const { authDispatch } = useContext(DispatchContext)

    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const load = async () => {
            //start the loading
            setLoading(true)
            //ck is logged in
            await new AuthAction(authDispatch).IsLoggedIn()
            //stop the loading
            setLoading(false)
        }
        load()
    }, [])


    if (loading === true) {
        return <Splash />
    }

    return (
        <NavigationContainer>
            {auth?.logged_in ? <DashDrawNav /> : <AuthNav />}
        </NavigationContainer >
    )
}
