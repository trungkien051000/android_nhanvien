import { button, common, container, flexbox, login, schedule, spacing } from '@assets/styles';
import { images, routes, api } from '@utils/constants';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';

import { default as Button, default as TextView } from '@components/commons/TextView';
import { useTrans } from '@utils/hooks';
import axios from 'axios';
import { useDispatch } from 'react-redux';
const styles = StyleSheet.create({
    ...common,
    ...flexbox,
    ...spacing,
    ...login,
    ...container,
    ...button,
    ...schedule,
});
const Schedule: IScheduleScreen<IScheduleScreenProps> = (props) => {
    const { navigation } = props;
    const trans = useTrans();
    const [state, setState] = useState([{ MaBaoTri: '', TieuDe: '', MoTa: '', htnv: '', htkh: '', TenThietBi: '', TienDo: '' }]);
    useEffect(() => {
        setState(props.route.params.data);
    });
    const dnGet = (index: number) => {
        var url = api.API_URL + '/';
        url += 'baotriNV/' + props.route.params.idNV;
        axios.get(url).then((aData) => {
            navigation?.navigate(routes.CLIENT.DETAILSCHEDULE, { data: aData.data, index: index});
        });
    };

    return (
        <View style={[{ flex: 1 }, styles.container]}>
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
                    {trans.schedule.title}
                </TextView>
                <Button style={[{ width: 50 }, styles.background_white]} />
            </View>
            <FlatList
                data={state}
                renderItem={({ item, index }) => (
                    <TouchableWithoutFeedback onPress={() => dnGet(index)}>
                        <View style={[styles.schedule_container]}>
                            <Text style={styles.color_blue}>
                                {item.MaBaoTri} - {item.TieuDe}
                            </Text>
                            <View style={[{ flexDirection: 'row' }]}>
                                <Text>Nhân viên: </Text>
                                <Text style={[styles.color_green, { flexShrink: 1 }]}>{item.htnv}</Text>
                            </View>
                            <Text>Mô tả: {item.MoTa}</Text>
                            <View style={[{ flex: 1, flexDirection: 'row' }]}>
                                <Text>Tên khách hàng: </Text>
                                <Text style={styles.color_orange}>{item.htkh}</Text>
                            </View>
                            <Text>{item.TenThietBi}</Text>
                            <Text style={styles.color_blue}>Tiến độ: {item.TienDo}</Text>
                        </View>
                    </TouchableWithoutFeedback>
                )}
            />
        </View>
    );
};

export default Schedule;
