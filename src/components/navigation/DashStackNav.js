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
                    headerLeft: ({ canGoBack }) => (<Icon type={DefineIcon.FAIcon} size={28} style={{ paddingHorizontal: 25 }} name="angle-left" onPress={() => { canGoBack ? nav.goBack() : "" }} />),
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
                        headerLeft: () => (<Icon size={28} type={DefineIcon.Feather} style={{ paddingHorizontal: 25 }} name="align-left" onPress={() => { nav.toggleDrawer() }} />),
                        headerRight: () => {
                            return <Icon size={28} type={DefineIcon.Feather} style={{ paddingHorizontal: 25 }} name="plus-square" onPress={() => { nav.navigate(URL.CREATE_CONTACT) }} />
                        }
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
