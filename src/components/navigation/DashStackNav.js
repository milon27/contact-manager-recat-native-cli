import React from 'react'
import { createStackNavigator, HeaderTitle } from '@react-navigation/stack';
import Contacts from './../screens/dashboard/Contacts';
import ContactDetail from './../screens/dashboard/ContactDetail';
import CreateContact from './../screens/dashboard/CreateContact';
import Settings from './../screens/dashboard/Settings';
import SignIn from './../screens/auth/SignIn';
import URL from './../../utils/helpers/URL';
import { useNavigation } from '@react-navigation/native';
import Theme from './../../utils/helpers/Theme';
import Icon from './../layouts/icon/Icon';
import DefineIcon from '../layouts/icon/DefineIcon';


const dashStack = createStackNavigator()
/**
 * @description we will use it to navigate to different screen when the user is logged in.
 */
export default function DashStackNav() {
    const nav = useNavigation()
    return (
        <dashStack.Navigator initialRouteName={URL.CONTACTS}

            screenOptions={
                {
                    headerTitleAlign: "center",
                    headerLeft: ({ canGoBack }) => (<Icon type={DefineIcon.FAIcon} size={25} style={{ padding: 15 }} name="angle-left" onPress={() => { canGoBack ? nav.goBack() : "" }} />),
                    headerStyle: {
                        backgroundColor: Theme.COLOR_BG,
                        elevation: 5,
                        shadowColor: 'black',
                        shadowOpacity: 1,
                    }
                }
            }//global header style
        >
            <dashStack.Screen name={URL.CONTACTS} component={Contacts}
                options={
                    {
                        headerLeft: () => (<Icon type={DefineIcon.Feather} style={{ padding: 15 }} name="menu" onPress={() => { nav.toggleDrawer() }} />),
                    }
                }//home header style
            />
            <dashStack.Screen name={URL.CONTACT_DETAIL} component={ContactDetail} />
            <dashStack.Screen name={URL.CREATE_CONTACT} component={CreateContact} />
            <dashStack.Screen name={URL.SETTINGS} component={Settings} />
            <dashStack.Screen name={URL.SIGN_IN} component={SignIn} />
        </dashStack.Navigator >
    )
}
