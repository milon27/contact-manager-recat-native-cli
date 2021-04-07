import React from 'react'
import { View, Text, StyleSheet, Image, StatusBar } from 'react-native'
import Theme from './../../../utils/helpers/Theme';

export default function Splash() {
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor={Theme.COLOR_PRIMARY} />
            <View style={styles.logo_container}>
                <Image
                    height={75}
                    width={75}
                    source={require('../../../assets/img/logo.png')}
                    style={styles.logo}
                />
            </View>
            <Text style={styles.text}>Contacts</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: Theme.COLOR_PRIMARY
    },
    text: {
        color: Theme.COLOR_WHITE,
        fontSize: 45
    },
    logo: {
        width: 75,
        height: 75,
    },
    logo_container: {
        margin: 15,
        alignSelf: "center"
    },
})
