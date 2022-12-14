import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';

import { LoginForm } from '@components/index';
import { common, container, flexbox } from '@assets/styles';

const styles = StyleSheet.create({
    ...container,
    ...common,
    ...flexbox,
});

const Login: ILoginScreen<ILoginScreenProps> = (props) => {
    return (
        <ScrollView
            style={[styles.dFlex1]}
            contentContainerStyle={[styles.container, styles.background_green]}
            showsVerticalScrollIndicator={false}
        >
            <LoginForm {...props} />
        </ScrollView>
    );
};

export default Login;
