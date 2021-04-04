import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import DashStackNav from './DashStackNav';
import URL from './../../utils/helpers/URL';

const drawer = createDrawerNavigator()

/**
 * @description we will use it to navigate from drawer nav bar.
 */

export default function DashDrawNav() {
    return (
        <drawer.Navigator>
            <drawer.Screen name={URL.HOME_NAV} component={DashStackNav}></drawer.Screen>
        </drawer.Navigator>
    )
}
