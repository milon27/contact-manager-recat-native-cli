import AsyncStorage from '@react-native-community/async-storage';
import React, { useState, useEffect, useContext } from 'react'
import { Text, View } from 'react-native';
import { DispatchContext } from '../../../utils/context/MainContext';
import Define from '../../../utils/helpers/Define';
import MButton from '../../layouts/form/MButton';
import AuthAction from './../../../utils/context/actions/AuthAction';
export default function Contacts() {
    const { authDispatch } = useContext(DispatchContext)

    const [user, setUser] = useState("")
    useEffect(() => {
        const load = async () => {
            const user = await AsyncStorage.getItem(Define.C_USER)
            setUser(user)
        }
        load()
    }, [])


    const logoutNow = async () => {
        await new AuthAction(authDispatch).Logout()
    }

    return (
        <View>
            <Text>Contact Page</Text>
            <Text>{user}</Text>
            <MButton title="logout" color="red" onPress={logoutNow} />
        </View>
    )
}
