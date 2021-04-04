import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Contacts from './../screens/dashboard/Contacts';
import ContactDetail from './../screens/dashboard/ContactDetail';
import CreateContact from './../screens/dashboard/CreateContact';
import Settings from './../screens/dashboard/Settings';
import SignIn from './../screens/auth/SignIn';
import URL from './../../utils/helpers/URL';

const dashStack = createStackNavigator()
/**
 * @description we will use it to navigate to different screen when the user is logged in.
 */
export default function DashStackNav() {
    return (
        <dashStack.Navigator initialRouteName={URL.CONTACTS} >
            <dashStack.Screen name={URL.CONTACTS} component={Contacts}></dashStack.Screen>
            <dashStack.Screen name={URL.CONTACT_DETAIL} component={ContactDetail}></dashStack.Screen>
            <dashStack.Screen name={URL.CREATE_CONTACT} component={CreateContact}></dashStack.Screen>
            <dashStack.Screen name={URL.SETTINGS} component={Settings}></dashStack.Screen>
            <dashStack.Screen name={URL.SIGN_IN} component={SignIn}></dashStack.Screen>
        </dashStack.Navigator >
    )
}
