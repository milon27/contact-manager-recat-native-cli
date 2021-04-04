import React, { useState } from 'react'
import { Pressable, Text, StyleSheet, ActivityIndicator } from 'react-native'
import Theme from './../../../utils/helpers/Theme';
//todo: add loading..
export default function MButton({ title, color, loading, onPress, disabled, ...props }) {


    return (
        <Pressable
            onPress={onPress}
            android_ripple={{ color: Theme.COLOR_SECONDARY }}
            style={({ pressed }) => [{ backgroundColor: pressed ? loading ? Theme.COLOR_GRAY : Theme.COLOR_ACCENT : color }, styles.btn_container, { backgroundColor: loading ? Theme.COLOR_GRAY : color }]}
            disabled={disabled}
            {...props}
        >
            {loading ? <ActivityIndicator color={Theme.COLOR_WHITE} /> : <Text style={styles.btn_text}>{title}</Text>}
        </Pressable >
    )
}


const styles = StyleSheet.create({
    btn_container: {
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5,
        paddingHorizontal: 10,
        marginVertical: 15,
        height: 44,
        elevation: 4,
    },
    btn_text: {
        color: Theme.COLOR_WHITE,
    }
})
