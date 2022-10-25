import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';

import { Button, TextView } from '@components/index';

import { routes, api } from '@utils/constants';

import { ReduxStates } from '@redux/reducers';
import { useDispatch, useSelector } from 'react-redux';

import { common, container, flexbox, home, spacing } from '@assets/styles';
import axios from 'axios';
const styles = StyleSheet.create({
    ...container,
    ...flexbox,
    ...home,
    ...spacing,
    ...common,
});

const Home: IHomeScreen<IHomeScreenProps> = (props) => {
    const { navigation } = props;
    const dispatch = useDispatch();

    const dnGet = (routeName: string) => {
        var url = api.API_URL + '/';
        switch (routeName) {
            case 'Schedule':
                url += 'baotriNV/' + props.route.params.idNV;
                axios.get(url).then((aData) => {
                    navigation?.navigate(routes.CLIENT.SCHEDULE, { idNV: props.route.params.idNV, data: aData.data });
                });
                break;
            case 'Setting':
                let nhanvienURL = api.API_URL + '/nhanvien/' + props.route.params.idNV;
                axios.get(nhanvienURL).then((aData) => {
                    navigation?.navigate(routes.CLIENT.SETTING, { idNV: props.route.params.idNV, data: aData.data });
                });
                break;
        }
    };

    return (
        <ScrollView
            style={[styles.dFlex1]}
            contentContainerStyle={[styles.container, styles.justifyCenter]}
            showsVerticalScrollIndicator={false}>
            <Button
                text="Lịch bảo trì"
                style={styles.home_button}
                styleText={[styles.font_size_24, styles.color_white, styles.text_center, styles.font_weight_bold]}
                onPress={() => dnGet('Schedule')}
            />
            <Button
                text="Cài đặt"
                style={styles.home_button}
                styleText={[styles.font_size_24, styles.color_white, styles.text_center, styles.font_weight_bold]}
                onPress={() => dnGet('Setting')}
            />
        </ScrollView>
    );
};

export default Home;
