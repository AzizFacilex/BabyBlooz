import * as React from 'react';
import { Component } from 'react';
import { LineChart, BarChart, PieChart, ProgressChart, ContributionGraph, StackedBarChart } from 'react-native-chart-kit';
import * as SignalR from '@aspnet/signalr'
import { Card, ButtonGroup } from 'react-native-elements'
import { View, AsyncStorage, Text, Dimensions, ScrollView, StyleSheet, ScaledSize } from 'react-native';
import { List } from 'react-native-paper';
import { array } from 'prop-types';



interface props {
    navigation: any;
}
interface state {
    movement: number[];
    sound: number[];
    lilypadid: string | null;
    id: string | null;
    selectedIndex: number;
    currentDate: Date;
    startDate: Date;
    Dates: string[];
}

export default class HistoryPage extends Component<props, state>{
    movement: number[] = new Array(10).fill(0);
    sound: number[] = new Array(10).fill(0);
    height: ScaledSize = Dimensions.get('window');
    value = "";
    currentDate = new Date()
    startDate = new Date()
    Dates: string[] = new Array();
    constructor(props: props) {
        super(props)
        this.state = {
            selectedIndex: 0,
            movement: this.movement,
            sound: this.sound,
            lilypadid: '',
            id: '',
            currentDate: this.currentDate,
            startDate: this.startDate,
            Dates: this.Dates,
        }
    }

    async componentDidMount() {

        await this.setId()
        this.updateView(0)
    }
    async setId() {
        var lilypadid = await AsyncStorage.getItem('lilypadid')
        var id = await AsyncStorage.getItem('id')
        this.setState({

            movement: this.movement,
            sound: this.sound,
            id: id,
            lilypadid: lilypadid
        })
    }
    setData = () => {
        this.setState({
            movement: this.movement,
            sound: this.sound,



        });
    }

    labels= ['   Day 6   ', '   Day 5   ', '   Day 4   ', '   Day 3   ', '   Day 2   ', '   Day 1   ','   Today   '];
    datasets = [{
        sound: [
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
    data2 = [
        { name: 'Sleep', population: 2000, color: 'rgba(131, 167, 234, 1)', legendFontColor: '#7F7F7F', legendFontSize: 15 },
        { name: 'Cry', population: 1000, color: 'green', legendFontColor: '#7F7F7F', legendFontSize: 15 },
        { name: 'Awake', population: 2000, color: 'red', legendFontColor: '#7F7F7F', legendFontSize: 15 }
    ]
    component1 = () => <Text>7 Days</Text>;
    component2 = () => <Text>30 Days</Text>;
    component3 = () => <Text>90 Days</Text>;
    buttons = [{ element: this.component1 }, { element: this.component2 }, { element: this.component3 }]
    updateView(selectedIndex: number) {
        this.setState({ selectedIndex })
        if (selectedIndex == 0) {

            this.startDate = new Date(this.startDate.setDate(this.currentDate.getDay() - 7));
            this.labels = ['   Day 6   ', '   Day 5   ', '   Day 4   ', '   Day 3   ', '   Day 2   ', '   Day 1   ','   Today   '];
            var e = 'http://149.233.36.113:5000/api/History?id=' + this.state.lilypadid + '&start=' + this.startDate.toISOString() + '&end=' + this.currentDate.toISOString()
            this.fetchData(e)
        } else if (selectedIndex == 1) {
            this.startDate = new Date(this.startDate.setDate(this.currentDate.getDay() - 30));
            this.labels = ['  Day 30  ', '  Day 25  ', '  Day 20  ', '  Day 15  ', '  Day 10  ', '  Day 5  ','  Today  '];

            var e = 'http://149.233.36.113:5000/api/History?id=' + this.state.lilypadid + '&start=' + this.startDate.toISOString() + '&end=' + this.currentDate.toISOString()
            this.fetchData(e)
        } else if (selectedIndex == 2) {

            this.startDate = new Date(this.startDate.setDate(this.currentDate.getDay() - 90));
            this.labels = ['  Day 90  ', '  Day 75  ', '  Day 60  ', '  Day 45  ', '  Day 30  ', '  Day 15  ','  Today  '];

            var e = 'http://149.233.36.113:5000/api/History?id=' + this.state.lilypadid + '&start=' + this.startDate.toISOString() + '&end=' + this.currentDate.toISOString()
            this.fetchData(e)
        }

    };
   
    fetchData = async (e) => fetch(e, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },

    }).then((response) => response.json())
        .then((responseJson) => {

            var tempMax = new Array();
            var tempMin = new Array();
            if (responseJson.temps)
                responseJson.temps.map((prop, key) => {
                    tempMax.push(prop['tempMax'])
                    tempMin.push(prop['tempMin'])

                })

            this.movement = tempMax.slice(0, 15)
            this.setState({ movement: this.movement })
            this.sound = tempMin.slice(0, 15)
            this.setState({ sound: this.sound })
            //   temp.push(responseJson.datas['temperature']) 
        })
        .catch((error) => {
            console.error(error)
        })

    //TODO: Initialzing connection must be outside render method
    render() {
        return (
            <ScrollView
                style={{ flex: 1 }}
            >
                <View>
                    <ButtonGroup
                        onPress={(x: number) => this.updateView(x)}
                        selectedIndex={this.state.selectedIndex}
                        buttons={this.buttons}
                        containerStyle={{ height: 50 }}
                    />
                    <PieChart
                        data={this.data2}

                        width={Dimensions.get('window').width}
                        height={220}
                        accessor="population"
                        backgroundColor="transparent"
                        paddingLeft="15"
                        absolute
                        chartConfig={this.chartConfig}

                    />
                    <Text>
                        Temperature 
            </Text>

                    <LineChart
                        data={{
                            labels: [ this.labels],
                            datasets: [{
                                data: this.state.movement,

                            }, {
                                data: this.state.sound
                            }]
                        }}
                        // decorator=""
                        width={Dimensions.get('window').width} // from react-native
                        height={220}
                        yAxisLabel={'C°'}

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
                    <Card title="My Baby In The Last Days">
                        {
                            <Text>
                                Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.
                </Text>
                        }
                    </Card>
                </View>


            </ScrollView>
        )
    }

}