import React from 'react'
import { Text, View } from 'react-native'
import Container from './../../layouts/Container';

export default function Settings() {
    return (
        <Container>
            <Text selectable={true} selectionColor='orange' style={{ textAlign: "center" }}>Developed By: milon27 </Text>
            <Text selectable={true} selectionColor='orange' style={{ textAlign: "center" }}>Visit: https://milon27.web.app/ </Text>
        </Container>
    )
}
