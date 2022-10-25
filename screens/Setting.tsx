import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View, Image, ToastAndroid } from 'react-native';

import { Button, SettingForm, TextView } from '@components/index';

import { button, common, container, flexbox, login, spacing } from '@assets/styles';
import { images } from '@utils/constants';
import { useTrans } from '@utils/hooks';
const styles = StyleSheet.create({
    ...common,
    ...flexbox,
    ...spacing,
    ...login,
    ...container,
    ...button,
});
const Setting: ISettingScreen<ISettingScreenProps> = (props) => {
    const { navigation } = props;
    const trans = useTrans();
    return (
        <>
        <View style={[{ width: '100%' }, styles.padding15, styles.background_white, styles.flexRow, styles.justifyBetween]}>
            <TouchableOpacity onPress={navigation?.goBack}>
                <Image source={images.ICON_LEFTARROW} />
            </TouchableOpacity>
            <TextView
                style={[
                    styles.color_blue,
                    styles.alignSelfCenter,
                    styles.alignItemsCenter,
                    styles.justifyCenter,
                    styles.font_weight_regular,
                    styles.font_size_27,
                ]}>
                {trans.setting.title}
            </TextView>
            <Button  style={[{ width: 50 }, styles.background_white]}/>
        </View>
        <ScrollView style={[styles.dFlex1]} contentContainerStyle={[styles.container]} showsVerticalScrollIndicator={false}>
            <SettingForm {...props} />
        </ScrollView>
    </>
    );
};

export default Setting;
