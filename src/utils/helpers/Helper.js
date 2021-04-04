import {
    ToastAndroid,
    Platform,
    AlertIOS,
} from 'react-native';
const Helper = {
    validateField: (...arr) => {
        const n_arr = arr.filter(itm => {
            if (itm && itm !== null && itm !== undefined) {
                return true
            }
        })
        if (n_arr.length === arr.length) {
            return true;//valid all field
        } else {
            return false;//invalid some field
        }
    },//validateField

    validateObject: (input) => {//{key:value}

        const n_arr = Object.entries(input).filter((value) => {
            if (value[1] && value[1] !== null && value[1] !== undefined && value[1] !== "") {//they are valid so ignore them
                return false
            }
            return true
        })
        //[["name", null], ["email", "milon@g.com"]]
        //[["name", null]]-> key:value[0]
        return n_arr
    },//validateObject

    Toast: (msg) => {
        if (Platform.OS === 'android') {
            ToastAndroid.show(msg, ToastAndroid.SHORT)
        } else {
            AlertIOS.alert(msg);
        }
    },//Toast
    onChange: ({ name, value, setInput, setError }) => {
        setInput((input) => ({ ...input, [name]: value }))
        //check error & remove error
        if (value !== "") {
            setError((pre) => ({ ...pre, [name]: "" }))
        } else {
            setError((pre) => ({ ...pre, [name]: "This field is required" }))
        }
    }
}

export default Helper