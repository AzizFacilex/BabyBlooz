import * as React from 'react';
import { Component } from 'react';
import { LineChart, BarChart, PieChart, ProgressChart, ContributionGraph, StackedBarChart } from 'react-native-chart-kit';
import * as SignalR from '@aspnet/signalr'
import { View, AsyncStorage, Text, Dimensions, ScrollView, StyleSheet, ScaledSize, Button } from 'react-native';


interface props {
    navigation: any;
}
interface state {
    movement: number[];
    sound: number[];
    temperature: number[];
    heartbeat: number[];
    lilypadid: string | null;

}

export default class ChartsPage extends Component<props, state>{
    movement: number[] = [0, 0, 0, 0, 0, 0, 0];
    sound: number[]=[0, 0, 0, 0, 0, 0, 0] ;
    temperature: number[] = [0, 0, 0, 0, 0, 0, 0];
    heartbeat: number[] = [0, 0, 0, 0, 0, 0, 0];
    height: ScaledSize = Dimensions.get('window');
    value = "";
    constructor(props: props) {
        super(props)
        this.state = {
            movement: this.movement,
            sound: this.sound,
            temperature: this.temperature,
            heartbeat: this.heartbeat,
            lilypadid: '',

        }
    }

    async componentDidMount() {

        await this.setId()
        this.initConnection();

    }
    async setId() {
        var lilypadid = await AsyncStorage.getItem('lilypadid')
        this.setState( {
            movement: this.movement,
            sound: this.sound,
            temperature: this.temperature,
            heartbeat: this.heartbeat,
         

            lilypadid: lilypadid
        }
        )}
    setData = () => {
        this.setState({
            movement: this.movement,
            sound: this.sound,
            temperature: this.temperature,
            heartbeat: this.heartbeat,


        });
    }
    initConnection() {
        let connection = new SignalR.HubConnectionBuilder()
            .withUrl('http://149.233.36.113:5000/hub/Values')
            .configureLogging(SignalR.LogLevel.Information)

            .build();


        connection
            .start()
            .then(() => console.log('Connection started'))
            .catch(err => console.log('Error while starting connection: ' + err));
        connection.on(this.state.lilypadid, (res) => {
            this.movement.splice(0, 1);
            this.movement.push(res.movement);
            this.sound.splice(0, 1);
            this.sound.push(res.sound);
            this.temperature.splice(0, 1);
            this.temperature.push(res.temperature);
            this.heartbeat.splice(0, 1);
            this.heartbeat.push(res.heartbeat);
            this.setData()
        });
    }

    labels = ['January', 'February', 'March', 'April', 'May', 'June'];
    datasets = [{
        sound: [
            Math.random() * 100
        ],
        temperature: [
            Math.random() * 100

        ],
        heartbeat: [
            Math.random() * 100

        ],
        movement: [
            Math.random() * 100
        ]
    }]
    chartConfig = {
        backgroundGradientFrom: '#7891F4',
        backgroundGradientTo: '#7891F4',
        color: (opacity = 1) => `rgba(26, 100, 146, ${opacity})`,
        strokeWidth: 2 // optional, default 3
    }
    render() {
        return (
            <ScrollView
                style={{ flex: 1 }}
            >
                <View>
                    <Text>
                      Lilypad Name : {this.state.lilypadid} /////////
                        Sound Graph
            </Text>
           
                    <LineChart
                        data={{
                            labels: ['January', 'February', 'March', 'April', 'May', 'June'],
                            datasets: [{
                                data: this.sound
                            }]
                        }}
                        width={Dimensions.get('window').width} // from react-native
                        height={220}
                        yAxisLabel={'dB'}
                        // fromZero= {true}
                        chartConfig={{
                            backgroundColor: '#7891F4',

                            backgroundGradientFrom: '#0233F1',
                            backgroundGradientTo: '#1D1367',
                            decimalPlaces: 2, // optional, defaults to 2dp
                            color: (opacity = 1) => `rgba(200, 200, 255, ${opacity})`,
                            style: {
                                borderRadius: 16
                            }
                        }}
                        bezier
                        style={{
                            marginVertical: 8,
                            borderRadius: 16
                        }}
                    />
                    <Text>
                        Temperature Graph
            </Text>
                    <LineChart
                        data={{
                            labels: ['January', 'February', 'March', 'April', 'May', 'June'],
                            datasets: [{
                                data: this.temperature
                            }]
                        }}
                        width={Dimensions.get('window').width} // from react-native
                        height={220}
                        yAxisLabel={'C°'}
                        chartConfig={{
                            backgroundColor: '#7891F4',

                            backgroundGradientFrom: '#0233F1',
                            backgroundGradientTo: '#1D1367',
                            decimalPlaces: 2, // optional, defaults to 2dp
                            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                            style: {
                                borderRadius: 16
                            }
                        }}
                        bezier
                        style={{
                            marginVertical: 8,
                            borderRadius: 16
                        }}
                    />
                    <Text>
                        Heartbeat Graph            </Text>
                    <LineChart
                        data={{
                            labels: ['January', 'February', 'March', 'April', 'May', 'June'],
                            datasets: [{
                                data: this.heartbeat
                            }]
                        }}
                        width={Dimensions.get('window').width} // from react-native
                        height={220}
                        yAxisLabel={'BPM'}
                        chartConfig={{
                            backgroundColor: '#7891F4',

                            backgroundGradientFrom: '#0233F1',
                            backgroundGradientTo: '#1D1367',
                            decimalPlaces: 2, // optional, defaults to 2dp
                            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                            style: {
                                borderRadius: 16
                            }
                        }}
                        bezier
                        style={{
                            marginVertical: 8,
                            borderRadius: 16
                        }}
                    />
                    <Text>
                        Movement Graph            </Text>
                    <LineChart
                        data={{
                            labels: ['January', 'February', 'March', 'April', 'May', 'June'],
                            datasets: [{
                                data: this.movement
                            }]
                        }}
                        width={Dimensions.get('window').width} // from react-native
                        height={220}
                        yAxisLabel={'m/s'}
                        chartConfig={{
                            backgroundColor: '#7891F4',

                            backgroundGradientFrom: '#0233F1',
                            backgroundGradientTo: '#1D1367',
                            decimalPlaces: 2, // optional, defaults to 2dp
                            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                            style: {
                                borderRadius: 16
                            }
                        }}
                        bezier
                        style={{
                            marginVertical: 8,
                            borderRadius: 16
                        }}
                    />
                    
                </View>

            </ScrollView>
        )
    }
}