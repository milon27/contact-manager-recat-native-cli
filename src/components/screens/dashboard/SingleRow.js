import React from 'react'
import { StyleSheet, Image, Text, View, TouchableOpacity, Linking } from 'react-native'
import Theme from './../../../utils/helpers/Theme';
import Helper from './../../../utils/helpers/Helper';
import DefineIcon from './../../layouts/icon/DefineIcon';
import Icon from '../../layouts/icon/Icon';
import { useNavigation } from '@react-navigation/native';
import URL from './../../../utils/helpers/URL';

export default function SingleRow({ item, hideMore }) {

    const { navigate } = useNavigation()

    return <View style={styles.item_container}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>

            {item?.pic ? <Image style={styles.img} width={45} height={45} source={{ uri: item?.pic }} /> : <View style={[styles.img, { backgroundColor: Helper?.ramdomColor() || Theme.COLOR_GRAY }]}>
                <Text style={{ color: Theme.COLOR_WHITE }}>{item.name.slice(0, 2)}</Text>
            </View>}

            <View>
                <Text style={{ fontWeight: "bold" }}>{item.name}</Text>
                <Text>{item.phone_code}-{item.phone}</Text>
            </View>
        </View>
        <View style={styles.icons}>
            <TouchableOpacity onPress={() => { Linking.openURL(`tel:${item.phone_code}${item.phone}`) }}>
                <Icon style={{ margin: 10 }} size={22} name="phone" type={DefineIcon.AntDesign} />
            </TouchableOpacity>
            {!hideMore && <TouchableOpacity onPress={() => { navigate(URL.CONTACT_DETAIL, item) }}>
                <Icon style={{ margin: 10 }} size={22} name="right" type={DefineIcon.AntDesign} />
            </TouchableOpacity>}
        </View>
    </View >
}

const styles = StyleSheet.create({
    item_container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginVertical: 8,
    },
    img: {
        height: 45,
        width: 45,
        borderRadius: 45,
        justifyContent: "center",
        alignItems: "center",
        margin: 2,
        marginRight: 10
    },
    icons: {
        flexDirection: "row"
    }
})
