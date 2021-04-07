import React, { useState, useRef, useContext } from 'react'
import { Text, View, StyleSheet, Image, TouchableOpacity, Switch } from 'react-native'
import Icon from '../../layouts/icon/Icon';
import Container from './../../layouts/Container';
import Input from './../../layouts/form/Input';
import DefineIcon from './../../layouts/icon/DefineIcon';
import Helper from './../../../utils/helpers/Helper';
import MButton from '../../layouts/form/MButton';
import Theme from './../../../utils/helpers/Theme';
import CountryPicker from 'react-native-country-picker-modal'
import Define from './../../../utils/helpers/Define';
import { DEFAULT_IMAGE_URI } from './../../../assets/img/avatar';
import OfflineListAction from './../../../utils/context/actions/OfflineListAction';
import { DispatchContext } from './../../../utils/context/MainContext';
import { useNavigation } from '@react-navigation/native';
import URL from './../../../utils/helpers/URL';
import BSheet from '../../layouts/bottomsheet/BSheet';
import ImagePicker from 'react-native-image-crop-picker';

export default function CreateContact({ route: { params } }) {
    const { navigate } = useNavigation()
    const { contact_listDispatch } = useContext(DispatchContext)

    //local state

    const refSheet = useRef();

    const N_NAME = "name"
    const N_C_CODE = "country_code"
    const N_P_CODE = "phone_code"
    const N_PHONE = "phone"
    const N_PIC = "pic"
    const N_IS_FAV = "is_fav"

    const init = {
        [N_NAME]: params?.name || "",
        [N_C_CODE]: "BD",
        [N_P_CODE]: "+880",
        [N_PHONE]: params?.phone || "",
        [N_PIC]: params?.pic || DEFAULT_IMAGE_URI,
        [N_IS_FAV]: params?.is_fav || false,
    }
    const error_init = {
        [N_NAME]: "",
        [N_PHONE]: ""
    }
    const [input, setInput] = useState(init)
    const [error, setError] = useState(error_init)


    // local method
    const onCreate = () => {
        //validation
        const errorArray = Helper.validateObject({ [N_NAME]: input.name, [N_PHONE]: input.phone })
        errorArray.forEach(item => {
            return setError((pre) => ({ ...pre, [item[0]]: `Enter ${item[0]}` }))
        })
        if (errorArray.length > 0) {
            return
        }

        //new
        if (!params) {
            input.id = new Date().getTime()
            if (input.pic === DEFAULT_IMAGE_URI) {
                input.pic = undefined
            }
            new OfflineListAction(contact_listDispatch).addData(Define.CONTACTS, input).then(() => {
                navigate(URL.CONTACTS)
            })
        }
        //update
        else {
            input.id = params.id
            new OfflineListAction(contact_listDispatch).updateItem(Define.CONTACTS, input)
            navigate(URL.CONTACTS)
        }
    }
    //open bottom sheet
    const openSheet = () => {
        refSheet?.current?.open()
    }
    const openGellery = () => {
        refSheet?.current?.close()
        ImagePicker.openPicker({
            width: 400,
            height: 400,
            freeStyleCropEnabled: true,
            cropping: true
        }).then(image => {
            if (image.path)
                setInput({ ...input, [N_PIC]: image?.path })
        }).catch(e => {
            console.log('image->', e);
        });
    }


    return (
        <Container>
            {/* bootom sheet  */}

            <BSheet ref={refSheet}>

                <TouchableOpacity onPress={openGellery}>
                    <View style={{ alignItems: "center" }}>
                        <Icon style={{ marginTop: 20 }} size={55} color={Theme.COLOR_GRAY} name="image" type={DefineIcon.FAIcon} />
                        <Text style={{ marginTop: 20, fontSize: 15, paddingStart: 10 }}>Choose Image From Gallery</Text>
                    </View>
                </TouchableOpacity>

            </BSheet>

            {/* bootom sheet end */}
            <TouchableOpacity onPress={openSheet} style={styles.selectImg}>
                <Image style={styles.img} width={120} height={120} source={{ uri: input[N_PIC] }} />
                <Text style={styles.text}>Select Image</Text>
            </TouchableOpacity>

            <Input value={input[N_NAME]} error={error[N_NAME]}
                icon={<Icon type={DefineIcon.Feather} size={17} name="user" />}
                onChangeText={(text) => Helper.onChange({ name: N_NAME, value: text, setInput: setInput, setError: setError })} label="Enter Name" />
            {/* callingCode,cca2,flag */}
            <Input type="number-pad" value={input[N_PHONE]} error={error[N_PHONE]}
                icon={<CountryPicker
                    countryCode={input[N_C_CODE]}
                    callingCode={input[N_P_CODE]}
                    withCallingCode
                    withCallingCodeButton
                    withFilter
                    withFlag
                    withEmoji
                    onSelect={(v) => {
                        const p_code = v.callingCode[0]
                        const c_code = v.cca2
                        setInput({ ...input, [N_P_CODE]: p_code, [N_C_CODE]: c_code })
                    }}
                />}
                onChangeText={(text) => Helper.onChange({ name: N_PHONE, value: text, setInput: setInput, setError: setError })} label="Enter Phone Number" />

            <View style={styles.justifyRow}>
                <Text style={{ color: Theme.COLOR_GRAY }}>Add To Fabourite</Text>
                <Switch
                    thumbColor={input[N_IS_FAV] ? Theme.COLOR_PRIMARY : "#fff"}
                    style={{ transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }] }}
                    value={input[N_IS_FAV]}
                    onValueChange={(text) => Helper.onChange({ name: N_IS_FAV, value: text, setInput: setInput, setError: setError })} />
            </View>

            <MButton title={params ? "Update Now" : "Submit Now"} color={Theme.COLOR_PRIMARY} onPress={onCreate} />
        </Container>
    )
}

const styles = StyleSheet.create({
    img: {
        width: 120,
        height: 120,
        borderRadius: 120
    },
    text: {
        textAlign: "center",
        marginVertical: 15,
        fontSize: 17
    },
    selectImg: {
        alignSelf: "center"
    },
    justifyRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 15,
        marginBottom: 5
    }
})
