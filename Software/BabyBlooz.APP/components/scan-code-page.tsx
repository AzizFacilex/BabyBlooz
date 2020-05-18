import * as React from 'react';
import { Component } from 'react';
import { ToastAndroid, AsyncStorage } from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';

interface props {
    navigation: any;
}
export default class ScanCodePage extends Component<props> {
    // e = "http://149.233.36.113:5000/api/id?lilypadid=test"
    scanner: any;

    onSuccess = async (k) => {
        fetch(k.data, {//TODO: use the k variable instead of e. after generating qr-code
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },

        }).then((response) => response.json())
            .then(async (responseJson) => {

                if (responseJson) {
                    await AsyncStorage.setItem('id', responseJson.id)
                    await AsyncStorage.setItem('lilypadid', responseJson.lilypadUsers[0]['lilypadId'])
                } else {
                    ToastAndroid.show('Invalid QR-COde, Scan again', ToastAndroid.SHORT)

                }
                this.props.navigation.replace('Charts')

            })
            .catch((error) => {
                ToastAndroid.show('Invalid QR-COde, Scan again', ToastAndroid.SHORT)
                // this.scanner.reactivate()
                // console.error(this.props)
            });


    }

    render() {
        return (
            <QRCodeScanner ref={(node) => { this.scanner = node }} reactivateTimeout={2000}
                reactivate={true} onRead={this.onSuccess}>

            </QRCodeScanner>
            // <View></View>
        );

    }
    styles = {
        buttonContainer: {


        },
        exitButton: {},
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#000',
            color: '#000',
        }

    }
    
}

