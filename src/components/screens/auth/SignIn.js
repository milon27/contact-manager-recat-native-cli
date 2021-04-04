import React, { useContext, useState, useEffect } from 'react'
import { StyleSheet, Text, Keyboard } from 'react-native';
import Input from '../../layouts/form/Input';
import Container from './../../layouts/Container';
import URL from '../../../utils/helpers/URL';
import NavLink from '../../layouts/form/NavLink';
import MButton from '../../layouts/form/MButton';
import Theme from './../../../utils/helpers/Theme';
import Helper from './../../../utils/helpers/Helper';
import { StateContext, DispatchContext } from './../../../utils/context/MainContext';
import ResponseLayout from '../../layouts/ResponseLayout';
import AppAction from './../../../utils/context/actions/AppAction';
import AuthAction from './../../../utils/context/actions/AuthAction';
import Response from './../../../utils/helpers/Response';


export default function SignIn() {
    //global state
    const { app } = useContext(StateContext)
    const { authDispatch, appDispatch } = useContext(DispatchContext)

    //local state
    const N_EMAIL = "email"
    const N_PASSWORD = "password"

    const init = {
        [N_EMAIL]: "",
        [N_PASSWORD]: ""
    }
    const initTest = {
        [N_EMAIL]: "jokermr143@gmail.com",
        [N_PASSWORD]: "1234567"
    }

    const [input, setInput] = useState(initTest)
    const [error, setError] = useState(init)
    //const [loading, setLoading] = useState(false)

    //local method

    const onSubmit = async () => {
        //validation
        const errorArray = Helper.validateObject(input)//should pass an object with key:value
        errorArray.forEach(item => {
            return setError((pre) => ({ ...pre, [item[0]]: `Enter ${item[0]}` }))
        })
        if (errorArray.length > 0) {
            return
        }
        //hide keyboard
        Keyboard && Keyboard.dismiss()
        //setLoading(true)
        new AppAction(appDispatch).START_LOADING()
        try {
            await new AuthAction(authDispatch).login(input.email, input.password)
            //setLoading(false)
            new AppAction(appDispatch).STOP_LOADING()
        } catch (e) {
            console.log(e);
            //setLoading(false)
            new AppAction(appDispatch).STOP_LOADING()
            new AppAction(appDispatch).SET_RESPONSE(Response(false, e.message, "try again.", Theme.COLOR_DANGER, e))
        }

    }

    return (
        <Container style={styles.container}>
            <Text style={styles.title}>Hey, Login Now</Text>

            <ResponseLayout response={app.response} />

            <Input value={input.email} error={error?.email} onChangeText={(text) => Helper.onChange({ name: N_EMAIL, value: text, setInput: setInput, setError: setError })} label="Enter Your Email" />

            <Input value={input.password} error={error?.password} onChangeText={(text) => Helper.onChange({ name: N_PASSWORD, value: text, setInput: setInput, setError: setError })} type="password" label="Enter Password" />


            <MButton title="Login Now" loading={app?.loading} color={Theme.COLOR_PRIMARY} onPress={onSubmit} disabled={app?.loading} />
            {/* while loading.. it should be disabled */}
            <NavLink title="Forget Password?" url={URL.SIGN_IN}></NavLink>

            <NavLink title="Don't have account? Create New Now" url={URL.SIGN_UP}></NavLink>

        </Container>
    );
}

const styles = StyleSheet.create({

    small_title: {
        textAlign: "center",
        marginVertical: 5,
        paddingBottom: 5,
        textDecorationLine: "underline",
        textDecorationStyle: "solid"
    },
    title: {
        textAlign: "center",
        fontWeight: "bold",
        color: Theme.COLOR_PRIMARY,
        fontSize: 25,
        marginVertical: 15,
        padding: 7
    },
    container: {
        justifyContent: "center"
    }
})