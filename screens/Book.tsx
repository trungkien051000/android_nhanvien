import { common, container, flexbox, login, modal, spacing } from '@assets/styles';
import Button from '@components/commons/Button';
import Input from '@components/commons/Input';
import Validator from '@components/commons/Validator';
import { images, routes } from '@utils/constants';
import { useTrans } from '@utils/hooks';
import React, { createRef, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View, ToastAndroid } from 'react-native';
import DatePicker from 'react-native-date-picker';
import Modal from 'react-native-modal';

const styles = StyleSheet.create({
    ...common,
    ...flexbox,
    ...spacing,
    ...login,
    ...container,
    ...modal,
});

const Book: IBookScreen<IBookScreenProps> = (props) => {
    const { navigation } = props;
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState(new Date());
    const [openDate, setOpenDate] = useState(false);
    const [openTime, setOpenTime] = useState(false);
    const [state, setState] = useState<IBookComponentState>({
        tieude: '',
        mota: '',
        doanhnghiep: 'Police Coffee',
        diachi: '80 Lê Lợi, Đà Nẵng',
        ngay: '',
        gio: '',
    });
    const { tieude, mota, doanhnghiep, diachi, ngay, gio } = state;
    const [isModalVisible, setModalVisible] = useState(false);

    const trans = useTrans();
    const tieudeValidatorRef = createRef<IValidatorComponentHandle>();
    const motaValidatorRef = createRef<IValidatorComponentHandle>();

    const showToast = () => {
        ToastAndroid.show('Bạn đã đăng ký lịch bảo trì thành công !', ToastAndroid.LONG);
    };

    const timeSelected =
        (time.getHours() < 10 ? '0' : '') + time.getHours() + ':' + (time.getMinutes() < 10 ? '0' : '') + time.getMinutes();

    const dateSelected =
        (date.getDate() < 10 ? '0' : '') +
        date.getDate() +
        '/' +
        (date.getMonth() + 1 < 10 ? '0' : '') +
        (date.getMonth() + 1) +
        '/' +
        date.getFullYear() +
        ' ' +
        timeSelected;

    const handleChangeData = (field: string, value: string | number | boolean) => {
        setState((prevState) => ({
            ...prevState,
            [field]: value,
        }));
    };

    const navigationSchedule = () => {
        let isValidate = true;
        if (tieude === '') {
            tieudeValidatorRef.current?.onValidateMessage(trans.book.err_inputTieuDe);
            isValidate = false;
        } else {
            tieudeValidatorRef.current?.onValidateMessage('');
        }

        if (mota === '') {
            motaValidatorRef.current?.onValidateMessage(trans.book.err_inputMoTa);
            isValidate = false;
        } else {
            motaValidatorRef.current?.onValidateMessage('');
        }
        if (isValidate) {
            handleChangeData('tieude', '');
            handleChangeData('mota', '');
            showToast();
        }
    };

    const toggleModal = (confirm: boolean) => {
        if (confirm) {
            navigationSchedule();
        }
        setModalVisible(!isModalVisible);
    };

    return (
        <ScrollView style={[styles.dFlex1]} contentContainerStyle={[styles.container]} showsVerticalScrollIndicator={false}>
            <View style={[styles.background_white, styles.border_Radius10, styles.padding10]}>
                <View>
                    <Validator ref={tieudeValidatorRef}>
                        <View>
                            <Text>{trans.book.tieude}</Text>
                            <View style={[styles.flexRow, styles.borderBottom_gray]}>
                                <Input
                                    style={[styles.login_input]}
                                    value={tieude}
                                    onChangeText={(data) => {
                                        handleChangeData('tieude', data);
                                    }}
                                />
                            </View>
                        </View>
                    </Validator>
                </View>

                <View style={[styles.marginVertical15]}>
                    <Validator ref={motaValidatorRef}>
                        <View>
                            <Text>{trans.book.mota}</Text>
                            <View style={[styles.flexRow, styles.borderBottom_gray]}>
                                <Input
                                    style={[styles.login_input]}
                                    value={mota}
                                    onChangeText={(data) => {
                                        handleChangeData('mota', data);
                                    }}
                                />
                            </View>
                        </View>
                    </Validator>
                </View>

                <View style={[styles.marginVertical15]}>
                    <View>
                        <Text>{trans.book.doanhnghiep}</Text>
                        <View style={[styles.flexRow, styles.borderBottom_gray]}>
                            <Input
                                style={[styles.login_input, styles.color_gray]}
                                value={doanhnghiep}
                                selectTextOnFocus={false}
                                editable={false}
                            />
                        </View>
                    </View>
                </View>

                <View style={[styles.marginVertical15]}>
                    <View>
                        <Text>{trans.book.diachi}</Text>
                        <View style={[styles.flexRow, styles.borderBottom_gray]}>
                            <Input
                                style={[styles.login_input, styles.color_gray]}
                                value={diachi}
                                selectTextOnFocus={false}
                                editable={false}
                            />
                        </View>
                    </View>
                </View>

                <View style={[styles.marginVertical15]}>
                    <View>
                        <Text>{trans.book.pickdate}</Text>
                        <View style={[styles.flexRow, styles.borderBottom_gray]}>
                            <TouchableOpacity
                                style={[styles.login_input, styles.flexRow, { width: '100%' }]}
                                onPress={() => setOpenDate(true)}
                            >
                                <Input
                                    style={[styles.login_input]}
                                    placeholder={trans.book.pickdate}
                                    value={dateSelected}
                                    onChangeText={() => {
                                        handleChangeData('ngay', dateSelected);
                                    }}
                                    selectTextOnFocus={false}
                                    editable={false}
                                />
                                <View style={[styles.justifyCenter]}>
                                    <Image source={images.ICON_CALENDAR} />
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <View>
                    <Button
                        style={[styles.marginTop10]}
                        styleText={[styles.font_size_17]}
                        text={trans.common.confirm}
                        onPress={() => {
                            toggleModal(false);
                        }}
                    />
                </View>

                <DatePicker
                    modal={true}
                    title={trans.common.dateTitle}
                    cancelText={trans.common.dateTimeCancel}
                    confirmText={trans.common.dateTimeConfirm}
                    mode="date"
                    androidVariant="nativeAndroid"
                    open={openDate}
                    date={date}
                    locale={trans.common.locale}
                    onConfirm={(date) => {
                        setOpenDate(false);
                        setDate(date);
                        handleChangeData('ngay', dateSelected);
                        setOpenTime(true);
                    }}
                    onCancel={() => {
                        setOpenDate(false);
                    }}
                />

                <DatePicker
                    modal={true}
                    title={trans.common.timeTitle}
                    cancelText={trans.common.dateTimeCancel}
                    confirmText={trans.common.dateTimeConfirm}
                    mode="time"
                    androidVariant="nativeAndroid"
                    is24hourSource="locale"
                    open={openTime}
                    date={time}
                    locale={trans.common.locale}
                    onConfirm={(time) => {
                        setOpenTime(false);
                        setTime(time);
                        handleChangeData('gio', timeSelected);
                    }}
                    onCancel={() => {
                        setOpenTime(false);
                    }}
                />
                <Modal
                    isVisible={isModalVisible}
                    animationIn="fadeIn"
                    animationInTiming={200}
                    animationOut="fadeOut"
                    animationOutTiming={200}
                >
                    <View style={[styles.dFlex1, styles.alignItemsCenter, styles.justifyCenter, styles.alignSelfCenter]}>
                        <View style={[styles.modal_container, styles.padding20]}>
                            <View style={[styles.alignItemsCenter, styles.justifyCenter, styles.marginVertical32]}>
                                <Text style={[styles.text_center, styles.font_size_17]}>{trans.book.message_confirm}</Text>
                            </View>
                            <View style={[styles.flexRow, styles.alignItemsCenter, styles.justifyCenter]}>
                                <Button
                                    text={trans.common.ok}
                                    style={[styles.modal_button_ok]}
                                    onPress={() => {
                                        toggleModal(true);
                                    }}
                                />
                                <Button
                                    text={trans.common.cancel}
                                    style={[styles.modal_button_cancel, styles.marginLeft20]}
                                    styleText={[styles.color_black]}
                                    onPress={() => {
                                        toggleModal(false);
                                    }}
                                />
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        </ScrollView>
    );
};
export default Book;
