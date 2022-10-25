import { common, container, flexbox, login, spacing } from '@assets/styles';
import Button from '@components/commons/Button';
import Choice from '@components/commons/Choice';
import Input from '@components/commons/Input';
import TextView from '@components/commons/TextView';
import Validator from '@components/commons/Validator';
import { ReduxStates } from '@redux/reducers';
import { api, enums, images } from '@utils/constants';
import { useTrans } from '@utils/hooks';
import axios from 'axios';
import React, { createRef, useEffect, useState } from 'react';
import { StyleSheet, TextInput, ToastAndroid, TouchableOpacity, View, Image } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useDispatch, useSelector } from 'react-redux';

const styles = StyleSheet.create({
    ...common,
    ...spacing,
    ...flexbox,
    ...container,
    ...login,
});

const SettingForm: ISettingFormComponent<ISettingFormComponentProps> = (props) => {
    const { navigation } = props;
    const [date, setDate] = useState(new Date());
    const [openDate, setOpenDate] = useState(false);
    let dateSelected = '';
    const trans = useTrans();
    const dispatch = useDispatch();
    const { setting, locale } = useSelector((states: ReduxStates) => states);
    const [state, setState] = useState({
        DiaChi: '',
        DienThoai: '',
        DoanhNghiep: '',
        HoTen: '',
        MaDiaChi: 14,
        MaKhachHang: 2,
        MaPhuong: 3,
        MaQuan: 3,
        MaTP: 1,
        MatKhau: '',
        TaiKhoan: '',
        TenPhuong: '',
        TenQuan: '',
        TenTP: '',
        TenTat: '',
        NgaySinh: '',
        Email: '',
    });
    const { DiaChi, DienThoai, DoanhNghiep, HoTen, NgaySinh, Email, TenPhuong, TenQuan, TenTP, TaiKhoan, MatKhau } = state;
    const showToast = () => {
        ToastAndroid.show('Bạn đã cập nhật thành công !', ToastAndroid.LONG);
    };
    const usernameValidatorRef = createRef<IValidatorComponentHandle>();
    const passwordValidatorRef = createRef<IValidatorComponentHandle>();
    const phoneValidatorRef = createRef<IValidatorComponentHandle>();
    const inputUsernameRef = createRef<TextInput>();
    const inputPasswordRef = createRef<TextInput>();
    const inputPhoneRef = createRef<TextInput>();

    useEffect(() => {
        setState(props.route.params.data[0]);
    }, []);
    const handleDateData = (date: Date) => {
        return (
            (date.getDate() < 10 ? '0' : '') +
            date.getDate() +
            '/' +
            (date.getMonth() + 1 < 10 ? '0' : '') +
            (date.getMonth() + 1) +
            '/' +
            date.getFullYear()
        );
    };
    const handleChangeData = (field: string, value: string | number | boolean) => {
        setState((prevState) => ({
            ...prevState,
            [field]: value,
        }));
    };

    const convertDate = (date: string) => {
        let year = Number(date.substring(6, 10));
        let month = Number(date.substring(3, 5));
        let day = Number(date.substring(0, 2));
        return (year + '-' + (month < 10 ? '0' : '') + month + '-' + (day < 10 ? '0' : '') + day).toString();
    };

    const stringToDate = (string: string) => {
        let year = Number(string.substring(0, 4));
        let month = Number(string.substring(5, 7));
        let day = Number(string.substring(8, 10));
        return ((day < 10 ? '0' : '') + (day + 1) + '/' + (month < 10 ? '0' : '') + month + '/' + year).toString();
    };

    const handleUpdate = () => {
        let url = api.API_URL + '/nhanvien/update/' + props.route.params.idNV;
        axios
            .put(url, {
                hoten: HoTen,
                matkhau: MatKhau,
                dienthoai: DienThoai,
                ngaysinh: NgaySinh ? convertDate(NgaySinh) : '',
            })
            .then((response) => {
                showToast();
            })
            .catch((error) => {
                console.log(error);
            });
    };
    return (
        <KeyboardAwareScrollView>
            <TextView
                style={[
                    styles.color_gray,
                    styles.font_weight_bold,
                    styles.font_size_13,
                    locale === 'vi' ? styles.width_50Percent : styles.width_40Percent,
                ]}>
                {trans.setting.name}
            </TextView>
            <Input
                style={[styles.marginTop8]}
                value={HoTen}
                onChangeText={(data) => {
                    handleChangeData('HoTen', data);
                }}
                maxLength={128}
            />

            <TextView
                style={[
                    styles.color_gray,
                    styles.font_weight_bold,
                    styles.font_size_13,
                    locale === 'vi' ? styles.width_50Percent : styles.width_40Percent,
                ]}>
                {trans.setting.username}
            </TextView>
            <Input
                style={[styles.marginTop8, styles.color_gray]}
                value={TaiKhoan}
                selectTextOnFocus={false}
                editable={false}
                maxLength={128}
            />

            <TextView
                style={[
                    styles.color_gray,
                    styles.font_weight_bold,
                    styles.font_size_13,
                    locale === 'vi' ? styles.width_50Percent : styles.width_40Percent,
                ]}>
                {trans.setting.password}
            </TextView>
            <Validator ref={passwordValidatorRef} inputRef={inputPasswordRef}>
                <Input
                    ref={inputPasswordRef}
                    style={[styles.marginTop8]}
                    value={MatKhau}
                    onChangeText={(data) => {
                        handleChangeData('MatKhau', data);
                    }}
                    secureTextEntry={true}
                    maxLength={128}
                />
            </Validator>

            <TextView
                style={[
                    styles.color_gray,
                    styles.font_weight_bold,
                    styles.font_size_13,
                    locale === 'vi' ? styles.width_50Percent : styles.width_40Percent,
                ]}>
                {trans.setting.birthday}
            </TextView>
            <View style={[styles.flexRow, styles.borderBottom_gray]}>
                <TouchableOpacity style={[styles.login_input, styles.flexRow, { width: '100%' }]} onPress={() => setOpenDate(true)}>
                    <Input
                        style={[styles.login_input]}
                        value={NgaySinh !== null ? (NgaySinh.length > 10 ? stringToDate(NgaySinh) : NgaySinh) : ''}
                        selectTextOnFocus={false}
                        editable={false}
                    />
                    <View style={[styles.justifyCenter]}>
                        <Image source={images.ICON_CALENDAR} />
                    </View>
                </TouchableOpacity>
            </View>

            <TextView
                style={[
                    styles.color_gray,
                    styles.font_weight_bold,
                    styles.font_size_13,
                    locale === 'vi' ? styles.width_50Percent : styles.width_40Percent,
                ]}>
                {trans.setting.email}
            </TextView>
            <Input
                style={[styles.marginTop8]}
                value={Email}
                onChangeText={(data) => {
                    handleChangeData('Email', data);
                }}
                maxLength={128}
            />
            <TextView
                style={[
                    styles.color_gray,
                    styles.font_weight_bold,
                    styles.font_size_13,
                    locale === 'vi' ? styles.width_50Percent : styles.width_40Percent,
                ]}>
                {trans.setting.address}
            </TextView>
            <Input
                style={[styles.marginTop8, styles.color_gray, { height: 'auto' }]}
                value={DiaChi + ', ' + TenPhuong + ', ' + TenQuan + ', ' + TenTP}
                selectTextOnFocus={false}
                editable={false}
                maxLength={128}
                multiline={true}
            />

            <TextView
                style={[
                    styles.color_gray,
                    styles.font_weight_bold,
                    styles.font_size_13,
                    locale === 'vi' ? styles.width_50Percent : styles.width_40Percent,
                ]}>
                {trans.setting.phone}
            </TextView>
            <Input
                style={[styles.marginTop8]}
                value={DienThoai}
                keyboardType="numeric"
                onChangeText={(data) => {
                    handleChangeData('DienThoai', data.replace(/[^0-9]/g, ''));
                }}
                maxLength={128}
            />
            <Button
                text={trans.setting.save}
                style={[styles.marginTop34]}
                styleText={[styles.font_size_17]}
                onPress={handleUpdate.bind(this)}
            />
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
                    dateSelected = handleDateData(date);
                    handleChangeData('NgaySinh',dateSelected);
                }}
                onCancel={() => {
                    setOpenDate(false);
                }}
            />
        </KeyboardAwareScrollView>
    );
};

export default SettingForm;
