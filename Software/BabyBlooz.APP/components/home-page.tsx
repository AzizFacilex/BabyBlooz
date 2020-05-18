import * as React from 'react';
import { Component } from 'react';
import {  StyleSheet, ImageBackground, TouchableHighlight, AsyncStorage } from 'react-native';
import { Button, Image } from 'react-native-elements';
import { withNavigation } from 'react-navigation';
interface props{
    navigation:any;
}
interface state {
    id: string | null;
}
export default class HomePage extends Component<props,state>{
    
    async componentDidMount() {

        await this.setId()

    }
    async setId() {
        var id = await AsyncStorage.getItem('id')
        this.state = {
            id: id
        }
    }
    render() {

        // console.error(this.props)
        // this.props.navigation.navigate('ScanCode')
        return (
            <ImageBackground source={require('../assets/home/Background.jpg')}
                style={this.styles.container}>
                    <Image source={require('../assets/home/logo.png')} style={this.styles.logoImage}/>
                <TouchableHighlight  style={this.styles.buttonContainer}>
                    <Button   buttonStyle={this.styles.scanButton} style={this.styles.scanButton} title="Scan QR-Code" onPress={()=>this.props.navigation.navigate('ScanCode')}></Button>

                </TouchableHighlight>
                
                <TouchableHighlight style={this.styles.buttonContainer}>
                    <Button  buttonStyle={this.styles.exitButton} style={this.styles.scanButton} title="Charts" onPress={()=>this.props.navigation.navigate('Charts')}></Button>

                </TouchableHighlight>
                <TouchableHighlight style={this.styles.buttonContainer}>
                    <Button  buttonStyle={this.styles.exitButton} style={this.styles.scanButton} title="Configure" onPress={()=>this.props.navigation.navigate('Configure')}></Button>

                </TouchableHighlight>
                <TouchableHighlight style={this.styles.buttonContainer}>
                    <Button  buttonStyle={this.styles.exitButton} style={this.styles.scanButton} title="History" onPress={()=>this.props.navigation.navigate('History')}></Button>

                </TouchableHighlight>
                <TouchableHighlight style={this.styles.buttonContainer}>
                    <Button type="outline" buttonStyle={this.styles.exitButton} style={this.styles.exitButton} title="Exit" onPress={this.exit}></Button>

                </TouchableHighlight>
            </ImageBackground>

        );
    }
    goToScan()
    {
        console.error(this.props)
        this.props.navigation.navigate('ScanCode');
    }
    exit(){}

    
    styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#000',
            color: '#000',


        },
        buttonContainer: {
            height: 50,
            width: '90%',
            borderRadius: 10,
            marginBottom: 10,
            backgroundColor: 'rgba(52, 52, 52, 0.2)',
            justifyContent:'center'

        },
        scanButton:{
            height:'100%',
            borderRadius:10,


        },
        exitButton:{
            height:'100%',
            borderRadius:10,
            borderWidth:1,

        },
        logoImage: {
            marginBottom:75,
            borderRadius:50,
        }
    });
}
