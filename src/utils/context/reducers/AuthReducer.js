import Types from "../actions/Types"

export const initAuthState = {
    id: "",
    student_id: "",
    email: "",
    name: "",
    phone: "",
    photo_url: "",
    present_address: "",
    parents_phone: "",
    logged_in: false
}

const AuthReducer = (state, action) => {
    if (action.type === Types.AUTH_LOGIN) {
        let loggedInUser = action.payload//get user object
        return { ...loggedInUser, logged_in: true }
    } else if (action.type === Types.AUTH_SIGNUP) {
        let newUser = action.payload//get user object
        return { ...newUser, logged_in: true }
    } else if (action.type === Types.AUTH_LOGOUT) {
        return { ...initAuthState }
    } else if (action.type === Types.AUTH_STATE) {
        return { ...state, logged_in: action.payload }
    } else {
        return state
    }
}
export default AuthReducer