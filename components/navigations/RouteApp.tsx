import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import { Book, DetailSchedule, Home, Login, Schedule, Setting } from '@screens/index';

import { routes } from '@utils/constants';
import { useTrans } from '@utils/hooks';

const RootApp = createStackNavigator();

const RouteApp: IRouteAppComponent<IRouteAppComponentProps> = ({ startScreen }) => {
    const trans = useTrans();
    return (
        <RootApp.Navigator
            initialRouteName={startScreen}
            screenOptions={{
                cardStyleInterpolator: ({ current, layouts }) => {
                    return {
                        cardStyle: {
                            transform: [
                                {
                                    translateX: current.progress.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [layouts.screen.width, 0],
                                    }),
                                },
                            ],
                        },
                    };
                },
            }}>
            <RootApp.Screen
                name={routes.CLIENT.LOGIN}
                component={Login}
                options={{
                    headerShown: false,
                }}
            />
            <RootApp.Screen
                name={routes.CLIENT.SETTING}
                component={Setting}
                options={{
                    headerShown: false,
                }}
            />
            <RootApp.Screen
                name={routes.CLIENT.DETAILSCHEDULE}
                component={DetailSchedule}
                options={{
                    headerShown: false,
                }}
            />

            <RootApp.Screen
                name={routes.CLIENT.SCHEDULE}
                component={Schedule}
                options={{
                    headerShown: false,
                }}
            />

            <RootApp.Screen
                name={routes.CLIENT.BOOK}
                component={Book}
                options={{
                    headerShown: false,
                }}
            />

            <RootApp.Screen
                name={routes.CLIENT.HOME}
                component={Home}
                options={{
                    headerShown: false,
                }}
            />
        </RootApp.Navigator>
    );
};

export default RouteApp;
