
import React, { useState, useContext } from 'react'
import { StyleSheet, Text, Keyboard } from 'react-native';
import Container from './../../layouts/Container';
import Helper from './../../../utils/helpers/Helper';
import Input from '../../layouts/form/Input';
import Theme from '../../../utils/helpers/Theme';
import URL from './../../../utils/helpers/URL';
import NavLink from './../../layouts/form/NavLink';
import MButton from './../../layouts/form/MButton';
import { StateContext, DispatchContext } from './../../../utils/context/MainContext';
import AuthAction from './../../../utils/context/actions/AuthAction';
import Response from './../../../utils/helpers/Response';
import ResponseLayout from './../../layouts/ResponseLayout';
import AppAction from './../../../utils/context/actions/AppAction';
import DefineIcon from '../../layouts/icon/DefineIcon';
import Icon from './../../layouts/icon/Icon';

export default function SignUp() {

    //global state
    const { app } = useContext(StateContext)
    const { authDispatch, appDispatch } = useContext(DispatchContext)

    //local state
    const N_EMAIL = "email"
    const N_NAME = "name"
    const N_PASSWORD = "password"
    const N_C_PASSWORD = "c_password"

    const init = {
        [N_EMAIL]: "",
        [N_NAME]: "",
        [N_PASSWORD]: "",
        [N_C_PASSWORD]: ""
    }


    const [input, setInput] = useState(init)
    const [error, setError] = useState(init)


    const onSubmit = async () => {
        //validation
        const errorArray = Helper.validateObject(input)//should pass an object with key:value
        errorArray.forEach(item => {
            let msge = `Enter ${item[0]}`
            if (N_C_PASSWORD === item[0]) {
                msge = `Enter Password Again`
            }
            return setError((pre) => ({ ...pre, [item[0]]: msge }))
        })
        if (errorArray.length > 0) {
            return
        }

        //hide keyboard
        Keyboard && Keyboard.dismiss()
        //start loading..
        new AppAction(appDispatch).START_LOADING()
        const usr = {
            ...input
        }
        delete usr.c_password

        try {
            await new AuthAction(authDispatch).signup(usr)
            new AppAction(appDispatch).STOP_LOADING()
        } catch (e) {
            console.log(e);
            new AppAction(appDispatch).STOP_LOADING()
            new AppAction(appDispatch).SET_RESPONSE(Response(false, e.message, "try again.", Theme.COLOR_DANGER, e))
        }

    }

    return (
        <Container style={styles.container}>
            <Text style={styles.title}>Create Account Now</Text>

            <ResponseLayout response={app?.response} />

            <Input value={input.email}
                icon={<Icon type={DefineIcon.MaterialIcon} size={17} name="alternate-email" />}
                error={error?.email}
                onChangeText={(text) => Helper.onChange({ name: N_EMAIL, value: text, setInput: setInput, setError: setError })} label="Enter Your Email" />

            <Input value={input.name} error={error?.name}
                icon={<Icon type={DefineIcon.Feather} size={17} name="user" />}
                onChangeText={(text) => Helper.onChange({ name: N_NAME, value: text, setInput: setInput, setError: setError })} label="Enter Your Name" />

            <Input value={input.password} error={error?.password}
                icon={<Icon type={DefineIcon.Feather} size={17} name="lock" />}
                onChangeText={(text) => Helper.onChange({ name: N_PASSWORD, value: text, setInput: setInput, setError: setError })} type="password" label="Enter Password" />

            <Input value={input.c_password} error={error?.c_password}
                icon={<Icon type={DefineIcon.Feather} size={17} name="lock" />}
                onChangeText={(text) => Helper.onChange({ name: N_C_PASSWORD, value: text, setInput: setInput, setError: setError })} type="password" label="Confirm Password" />

            <MButton title="Sign Up Now" loading={app?.loading} color={Theme.COLOR_PRIMARY} onPress={onSubmit} disabled={app?.loading} />
            {/* while loading.. it should be disabled */}

            <NavLink title="Already have an account?Login Now" url={URL.SIGN_IN}></NavLink>

        </Container>
    );
}

const styles = StyleSheet.create({
    btn: {
        marginVertical: 12,
    },
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