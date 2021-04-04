import axios from "axios"
import Response from './../../helpers/Response';
import Define from './../../helpers/Define';
import Types from "./Types";
import AsyncStorage from '@react-native-community/async-storage';

class AuthAction {
    constructor(dispatch) {
        this.dispatch = dispatch
    }
    //isLoggedIn
    IsLoggedIn = () => {
        return new Promise(async (resolve, reject) => {
            try {
                //hit api get response 
                const res = await axios.get('student/is-loggedin')
                const resBoolean = res.data
                //clear async storage if false
                if (!resBoolean) {
                    await AsyncStorage.removeItem(Define.C_USER)
                }
                //update auth state
                this.dispatch({
                    type: Types.AUTH_STATE,
                    payload: resBoolean
                })
                resolve(resBoolean)
            } catch (e) {
                reject(new Error(e.message))
            }
        })//end promise
    }
    //Logout
    Logout = () => {
        //student/logout
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.get('student/logout')
                const { error, message, response } = res.data
                if (error) {
                    reject(new Error(message))
                } else {
                    //logout success
                    //remove from localstorage/asyncstorage
                    await AsyncStorage.removeItem(Define.C_USER)
                    //update UI
                    this.dispatch({
                        type: Types.AUTH_LOGOUT
                    })
                    //resolve promise
                    const response_ui = Response(true, "Logged Out Successful", message, Define.BT_SUCCESS, response)
                    resolve(response_ui)
                }
            } catch (e) {
                reject(new Error(e.message))
            }
        })
    }

    //login student/user
    login = (email, password) => {
        return new Promise(async (resolve, reject) => {
            try {
                //hit api get response 
                const res = await axios.post('student/login', { email, password })
                const { error, message, response } = res.data
                if (error) {
                    reject(new Error(message))
                } else {
                    //login success
                    //save to localstorage
                    delete response.token
                    await AsyncStorage.setItem(Define.C_USER, JSON.stringify(response))
                    //update UI
                    this.dispatch({
                        type: Types.AUTH_LOGIN,
                        payload: response//user object
                    })
                    //resolve promise
                    const response_ui = Response(true, "Logged In Successful", message, Define.BT_SUCCESS, response)
                    resolve(response_ui)
                }
            } catch (e) {
                reject(new Error(e.message))
            }
        })//end promise
    }
    //signup a user/student 
    //@param student object{student_id,name,email,phone,parents_phone,password,present_address,photo_url}
    signup = (student_obj) => {
        return new Promise(async (resolve, reject) => {
            try {
                //hit api get response 
                const res = await axios.post('student/signup', student_obj)
                const { error, message, response } = res.data
                if (error) {
                    console.log("we are here..1" + message);
                    reject(new Error(message))
                } else {
                    //login success
                    //save to localstorage
                    delete response.token
                    await AsyncStorage.setItem(Define.C_USER, JSON.stringify(response))
                    //update UI
                    this.dispatch({
                        type: Types.AUTH_SIGNUP,
                        payload: response//user object
                    })
                    //resolve promise
                    const response_ui = Response(true, "SignUP Successful", message, Define.BT_SUCCESS, response)
                    resolve(response_ui)
                }
            } catch (e) {
                console.log("we are here.." + e.message);
                reject(new Error(e.message))
            }
        })//end promise
    }

}

export default AuthAction