import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'

export default function NavLink({ url, title }) {
    const nav = useNavigation()
    return (
        <TouchableOpacity onPress={() => { nav.navigate(url) }}>
            <Text style={styles.small_title}>{title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    small_title: {
        textAlign: "center",
        marginVertical: 5,
        paddingBottom: 5,
        textDecorationLine: "underline",
        textDecorationStyle: "solid"
    }
})