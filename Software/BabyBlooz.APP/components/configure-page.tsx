import * as React from 'react';
import { Component } from 'react';
import { View, Text, StyleSheet, TextInput, PermissionsAndroid, ScrollView, ToastAndroid } from 'react-native';
import { IconButton, Button, withTheme, Card, Switch, List, Portal, Dialog, Checkbox } from 'react-native-paper';
const wifi= require('./../node_modules/react-native-android-wifi');

interface state {
    tryingToConnect:boolean,
    isFocused: boolean,
    updateInterval: number,
    isSwitchOn: boolean,
    devices: any[],
    isWifiNetworkEnabled: any,
    ssid: any,
    pass: any,
    ssidExist: any,
    currentSSID: any,
    currentBSSID: any,
    wifiList: any[],
    modalVisible: boolean,
    ip: string,
    level: any,
    status: any,
    showPass: boolean,
    selectedNetwork: any

}
interface props {
    theme: any
}
export class ConfigurePage extends Component<props, state>{
     unsubscribe:any;
    constructor(props: any, state: any) {

        super(props);
        
        this.state = {
            tryingToConnect:false,
            isFocused: false,
            updateInterval: 30,
            isSwitchOn: true,
            devices: [],
            isWifiNetworkEnabled: null,
            ssid: null,
            pass: null,
            ssidExist: null,
            currentSSID: null,
            currentBSSID: null,
            wifiList: [],
            modalVisible: false,
            ip: '',
            level: null,
            status: null,
            showPass: false,
            selectedNetwork: null
        }


    }
    incrementInterval() {
        let temp = this.state.updateInterval + 30;
        if (this.state.updateInterval < 120) {
            this.setState({ updateInterval: temp });
        }
    }
    decrementIntervall() {
        let temp = this.state.updateInterval - 30;
        if (this.state.updateInterval > 30) {
            this.setState({ updateInterval: temp });
        }
    }
    connectionStatusOnPress() {
        wifi.connectionStatus((isConnected:boolean) => {
            this.setState({ status: isConnected });
        });
    }

    levelOnPress() {
        wifi.getCurrentSignalStrength((level:any) => {
            this.setState({ level: level });
        });
    }

    ipOnPress() {
        wifi.getIP((ip:any) => {
            this.setState({ ip: ip });
        });
    }

    componentDidMount() {
        console.log(wifi);
        this.askForUserPermissions();
        this.getWifiNetworksOnPress();
    }
    async askForUserPermissions() {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    'title': 'Wifi networks',
                    'message': 'We need your permission in order to find wifi networks',
                    buttonPositive: ''
                }
            )
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("Thank you for your permission! :)");
            } else {
                console.log("You will not able to retrieve wifi available networks list");
            }
        } catch (err) {
            console.warn(err)
        }
    }
    serviceCheckOnPress() {
        wifi.isEnabled(
            (isEnabled:boolean) => {
                this.setState({ isWifiNetworkEnabled: isEnabled });
                console.log(isEnabled);
            });
    }
    serviceSetEnableOnPress(enabled:boolean) {
        wifi.setEnabled(enabled)
    }
    sendCredentials(){
        
            fetch("http://192.168.4.1/", {//TODO: use the k variable instead of e. after generating qr-code
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                
                body: JSON.stringify({
                    SSID: this.state.selectedNetwork,
                    PASSWORD: this.state.pass,
                  }),
    
            }).then((response) => response.json())
                .then(async (responseJson) => {
    
                    if (responseJson) {
                    } else {
                        ToastAndroid.show('Invalid Password, Try again', ToastAndroid.SHORT)
    
                    }
                })
                .catch((error) => {
                    ToastAndroid.show('Invalid Password, Try again', ToastAndroid.SHORT)
                    // this.scanner.reactivate()
                    // console.error(this.props)
                });
    
    
       
    }
    // connectOnPress() {
    //     wifi.findAndConnect('Lilypad-test', '12345678', (found:any) => {
    //         this.setState(
    //             { 
    //                 ssidExist: found,
    //                 tryingToConnect:true
    //             });
    //     });
    //     setTimeout(this.sendCredentials,15000);

    // }
    connectOnPress() {
        console.warn(this.state.selectedNetwork)

        wifi.findAndConnect('Lilypad-test', '12345678', (found: any) => {
            this.setState(
                {
                    ssidExist: found,
                    tryingToConnect: true
                });
        });
        let postCreds=(net:any,pass:string)=>fetch("http://192.168.4.1/", {//TODO: use the k variable instead of e. after generating qr-code
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            SSID: net["SSID"],
            PASSWORD: pass,
        }),

    }).then((response) => response.json())
        .then(async (responseJson) => {

            if (responseJson) {
            } else {
                ToastAndroid.show('Invalid Password, Try again', ToastAndroid.SHORT)

            }
        })
        .catch((error) => {
            ToastAndroid.show('Invalid Password, Try again', ToastAndroid.SHORT)
            // this.scanner.reactivate()
            // console.error(this.props)
        });
        let net=this.state.selectedNetwork;
        let pass=this.state.pass;
        setTimeout(function(){ postCreds(net,pass)}, 15000);

    }
    disconnectOnPress() {
        wifi.disconnect();
    }
    getSSIDOnPress() {
        wifi.getSSID((ssid:any) => {
            this.setState({ currentSSID: ssid });

        });
    }

    getBSSIDOnPress() {
        wifi.getBSSID((bssid:any) => {
            this.setState({ currentBSSID: bssid });
        });
    }
    getWifiNetworksOnPress() {
        this.setState({ wifiList: [] });
        wifi.reScanAndLoadWifiList((wifiStringList:any) => {
            var wifiArray = JSON.parse(wifiStringList);
            this.setState({
                wifiList: wifiArray
            });
        },
            (error:any) => {
                console.log(error);
            }
        );
    }
    openConfigureNetwork(wifi: any) {
        // console.error(wifi)
        if (this.state.selectedNetwork !== wifi) {
            this.setState({
                pass: '',
                showPass: false
            })
        }
        this.setState({ selectedNetwork: wifi });
        this.setState({ modalVisible: true })
    }
    hideDialog() {
        this.setState({modalVisible:false})
    }

    render() {
        // console.error(this.state.wifiList)
        const { showPass } = this.state;

        const { isSwitchOn } = this.state;

        return (
        <View  style={this.styles.container}>
            <Portal>
                <Dialog
                    visible={this.state.modalVisible}
                    onDismiss={() => this.hideDialog()}>
                    <Dialog.Title>{this.state.selectedNetwork ? this.state.selectedNetwork['SSID'] : null}</Dialog.Title>
                    <Dialog.Content>
                        <TextInput
                            value={this.state.pass}
                            onChangeText={pass => this.setState({ pass })}
                            placeholder="Password"
                            secureTextEntry={!this.state.showPass}></TextInput>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                            <Checkbox status={showPass ? 'checked' : 'unchecked'} onPress={() => { this.setState({ showPass: !showPass }); }} />
                            <Text onPress={() => { this.setState({ showPass: !showPass }); }}>Show password</Text>
                        </View>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={() => this.connectOnPress()}>Done</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
            <View style={this.styles.updateInterval}>
                <Text style={this.styles.updateIntervalText}>Update interval (In seconds)</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                    <IconButton color={this.props.theme.colors.warn} icon='remove' onPress={() => this.decrementIntervall()} />
                    <TextInput editable={false} value={this.state.updateInterval.toString()} style={this.styles.textInput}></TextInput>
                    <IconButton color={this.props.theme.colors.primary} icon='add-box' onPress={() => this.incrementInterval()} />
                </View>


            </View>
            <View style={this.styles.NotifCheckbox}>
                <Text style={this.styles.updateIntervalText}>Enable Notifications</Text>

                <Switch value={isSwitchOn} onValueChange={() => {
                    this.setState({ isSwitchOn: !isSwitchOn, isFocused: this.state.isFocused, updateInterval: this.state.updateInterval })
                }}>

                </Switch>

            </View>
            {/* <View style={this.styles.confgWifi}> */}
            <Card style={this.styles.confgWifi}>
                <Card.Title title="Available Networks" style={{ flexDirection: 'row', justifyContent: 'space-between' }}
                    right={(props: any) => <IconButton {...props} icon="refresh" onPress={() => { this.getWifiNetworksOnPress() }} />}> {/*Add on press to refresh wifi list*/}
                </Card.Title>

                <Card.Content style={this.styles.networkCardContent}>
                    <ScrollView>
                        {
                            this.state.wifiList.map((prop, key) => {
                                return <List.Item title={prop['SSID']} description={"Strength : " + (100 + prop['level']) + " %"} onPress={() => this.openConfigureNetwork(prop)} key={key}></List.Item>
                            })
                        }
                        {/* {this.renderModal()} */}
                    </ScrollView>
                </Card.Content>
                {/* <Card.Cover source={{ uri: 'https://picsum.photos/700' }} /> */}
                {/* <Card.Actions>
                        <Button>Cancel</Button>
                        <Button>Ok</Button>
                    </Card.Actions> */}
            </Card>
            {/* </View> */}
            {/* <Button mode="contained" style={this.styles.confirmButton}>Confirm</Button> */}
        </View>)
    }
    styles = StyleSheet.create({

        container: {
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            // backgroundColor: this.props.theme.colors.primary,
            color: '#000',
        },
        instructionsContainer: {
            padding: 15,
            borderBottomWidth: 1,
            borderBottomColor: '#CCCCCC',
        },
        instructionsTitle: {
            marginBottom: 10,
            color: '#333333'
        },

        textInput: {
            textAlign: 'center',

        },
        networkCardContent: {
            flex: 4,
            borderRadius: 10,


        },
        updateInterval: {
            flex: 1,
            flexDirection: "row",
            alignItems: 'center',
            width: '90%',
            justifyContent: "space-between"

        },
        NotifCheckbox: {
            flex: 1,
            flexDirection: "row",
            alignItems: 'center',
            width: '90%',
            justifyContent: "space-between"

        },
        updateIntervalText: {
            fontFamily: 'Cochin',
            fontWeight: 'bold',


        },
        confgWifi: {
            flex: 6,
            width: "90%",
            marginBottom: 10,
            borderRadius: 10,
        },

        confirmButton: {
            flex: 1,
            height: 50,
            width: '90%',
            borderRadius: 10,
            marginBottom: 10,
            justifyContent: 'center',


        },
    });

}
export default withTheme(ConfigurePage);
