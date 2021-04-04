import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Theme from './../../../utils/helpers/Theme';

export default function Splash() {
    return (
        <View style={styles.container}>
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
    }
})
