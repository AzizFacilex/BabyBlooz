import * as React from 'react';
import { createStackNavigator, createDrawerNavigator } from 'react-navigation'
import HomePage from '../components/home-page';
import ScanCodePage from '../components/scan-code-page';
import { createAppContainer } from 'react-navigation';
import ChartsPage from '../components/charts-page';
import SplashPage from '../components/splash-page';
import HistoryPage from '../components/history-page';

import { Icon } from 'react-native-elements';
import { Button, Image, View, Text } from 'react-native';
import ConfigurePage from '../components/configure-page';

const AppNavigator = createStackNavigator({
    
    Splash: {
        screen: SplashPage,
        navigationOptions: {
            header: null
        }
    },
    Home: {
        screen: HomePage,
        navigationOptions: {
            header: null,
        },
    },
    ScanCode: {
        screen: ScanCodePage,
        navigationOptions: {
            title: 'Scan code',

        },
    },
    Charts: {
        screen: ChartsPage,
        navigationOptions: {
            title: 'Charts',
            


        }
    },
    History: {
        screen: HistoryPage,
        navigationOptions: {
            title: 'History',
            


        }
    },

    Configure: {
        screen: ConfigurePage,
        navigationOptions: {
            title: 'Configure'
            // header:null
        }
    },   
});

const AppContainer = createAppContainer(AppNavigator);
export default AppContainer;
