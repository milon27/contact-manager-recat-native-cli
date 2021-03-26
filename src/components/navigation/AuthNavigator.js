import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import SignIn from './../screens/auth/SignIn';
import SignUp from './../screens/auth/SignUp';

const authStack = createStackNavigator()

export default function AuthNavigator() {
    return (
        <authStack.Navigator>
            <authStack.Screen name="signin" component={SignIn}></authStack.Screen>
            <authStack.Screen name="signup" component={SignUp}></authStack.Screen>
        </authStack.Navigator>
    )
}
