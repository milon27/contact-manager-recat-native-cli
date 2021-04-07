import AsyncStorage from '@react-native-community/async-storage';
import React, { useContext, useEffect } from 'react'
import { FlatList } from 'react-native';
import Define from '../../../utils/helpers/Define';
import Container from './../../layouts/Container';
import ResponseLayout from '../../layouts/ResponseLayout';
import Response from './../../../utils/helpers/Response';
import Theme from './../../../utils/helpers/Theme';
import SingleRow from './SingleRow';
import { DispatchContext } from '../../../utils/context/MainContext';
import { StateContext } from './../../../utils/context/MainContext';
import OfflineListAction from './../../../utils/context/actions/OfflineListAction';

export default function Contacts() {

    const { contact_list } = useContext(StateContext)
    const { contact_listDispatch } = useContext(DispatchContext)

    useEffect(() => {
        const load = async () => {
            try {
                await new OfflineListAction(contact_listDispatch).getAll(Define.CONTACTS)
            } catch (e) {
                console.log("error Contacts.js->", e);
            }
        }
        load()
    }, [])


    const renderItem = ({ item }) => {
        return <SingleRow item={item} />
    }

    return (
        <Container>
            <FlatList
                data={contact_list}
                renderItem={renderItem}
                ListEmptyComponent={<ResponseLayout response={Response(true, "Opps", "No Contact Found", Theme.COLOR_ACCENT)} />}
                keyExtractor={item => (String(item.id))}
            />
        </Container>
    )
}