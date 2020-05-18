import * as React from 'react';
import { Component } from 'react';
import { View, Text, StyleSheet, ImageBackground, AsyncStorage } from 'react-native';
import { Image } from 'react-native-elements';

interface state {
    isFocused: boolean
}
interface props 
{
    navigation:any
 }
export default class SplashPage extends Component<props, state>{
    constructor(props) {
        super(props);
        this.state = { isFocused: true }

    }
    async componentDidMount(){
        const id=await AsyncStorage.getItem('id');
        const lilypadid=await AsyncStorage.getItem('lilypadid');
        const data = await this.performTimeConsumingTask();
        if(data!==null){
            if(id && lilypadid)
            this.props.navigation.replace('Home');
            if(!id && !lilypadid)
            this.props.navigation.replace('ScanCode');

        // }
        // if(data!==null && id){
        //     this.props.navigation.replace('Charts')
        }
        
    }
    render() {
        return (
            <ImageBackground source={require('../assets/home/Background.jpg')}
                style={this.styles.container}>
                <Image source={require('../assets/home/logo.png')}  />


            </ImageBackground>

        )
    }
    performTimeConsumingTask = async() => {
        return new Promise((resolve) =>
          setTimeout(
            () => { resolve('result') },
            2000
          )
        );
      }
    styles = StyleSheet.create({
        container: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',

        },
        
    })

}