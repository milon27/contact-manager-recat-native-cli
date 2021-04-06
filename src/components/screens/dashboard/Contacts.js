import AsyncStorage from '@react-native-community/async-storage';
import React, { useState, useEffect, useContext } from 'react'
import { FlatList, Text, View } from 'react-native';
import Define from '../../../utils/helpers/Define';
import Container from './../../layouts/Container';
import Sample from './../../../utils/helpers/Sample';
import ResponseLayout from '../../layouts/ResponseLayout';
import Response from './../../../utils/helpers/Response';
import Theme from './../../../utils/helpers/Theme';
export default function Contacts() {

    const [user, setUser] = useState("")
    useEffect(() => {
        const load = async () => {
            const user = await AsyncStorage.getItem(Define.C_USER)
            setUser(user)
        }
        load()
    }, [])



    const renderItem = ({ item }) => {
        return <Text>{item.name}</Text>
    }

    return (
        <Container>
            <FlatList
                data={Sample}
                renderItem={renderItem}
                ListEmptyComponent={<ResponseLayout response={Response(true, "Opps", "No Contact Found", Theme.COLOR_ACCENT)} />}
                keyExtractor={item => (String(item.id))}
            />
        </Container>
    )
}
