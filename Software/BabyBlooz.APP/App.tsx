/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import * as React from 'react';
import { Component } from 'react';
import HomePage from './components/home-page';
import AppNavigator from './navigation/main-navigation';
import AppContainer from './navigation/main-navigation';
import { State } from 'react-native-gesture-handler';
import SplashPage from './components/splash-page';
import { any } from 'prop-types';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';



interface Props {
    navigation: any;
};
interface state {
    isLoading: boolean
}
const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: '#4286f4',
        accent: '#dd77c6',
        warn: '#f24d4d'
    },
};

export default class App extends Component<Props, state> {

    render() {

        return (
            <PaperProvider theme={theme}>
                <AppContainer />

            </PaperProvider>


        );
    }
}
