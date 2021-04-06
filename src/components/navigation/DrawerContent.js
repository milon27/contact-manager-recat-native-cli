import React, { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native'
import URL from './../../utils/helpers/URL';
import Icon from './../layouts/icon/Icon';
import DefineIcon from '../layouts/icon/DefineIcon';
import LogOutModal from '../layouts/modal/LogOutModal';
import Theme from './../../utils/helpers/Theme';

export default function DrawerContent({ navigation: nav }) {
    const [open, setOpen] = useState(false)


    const logoutNow = () => {
        nav.toggleDrawer()
        setOpen(true)
    }

    const items = [
        { title: "Home", icon: <Icon type={DefineIcon.Feather} name="home" />, onPress: () => { nav.navigate(URL.CONTACTS) } },
        { title: "Create New", icon: <Icon type={DefineIcon.Feather} name="plus-square" />, onPress: () => { nav.navigate(URL.CREATE_CONTACT) } },
        { title: "Settings", icon: <Icon type={DefineIcon.Feather} name="settings" />, onPress: () => { nav.navigate(URL.SETTINGS) } },
        { title: "Log Out", icon: <Icon type={DefineIcon.Feather} name="log-out" />, onPress: logoutNow }
    ]



    return (
        <View style={styles.container}>

            <LogOutModal open={open} setOpen={setOpen} />

            <View style={styles.logo_container}>
                <Image
                    height={75}
                    width={75}
                    source={require('../../assets/img/logo.png')}
                    style={styles.logo}
                />
            </View>
            {items.map(item => {
                return (<TouchableOpacity key={item.title} style={styles.item} onPress={item.onPress}>
                    {item.icon}<Text style={styles.title}>{item.title}</Text>
                </TouchableOpacity>)
            })}


        </View>
    )
}

const styles = StyleSheet.create({
    logo: {
        width: 75,
        height: 75,
    },
    logo_container: {
        margin: 15,
        alignSelf: "center"
    },
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: Theme.COLOR_BG
    },
    item: {
        flexDirection: "row",
        marginVertical: 10,
    },
    title: {
        fontSize: 17,
        paddingLeft: 10
    }
})