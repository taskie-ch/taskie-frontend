import React, { Component } from 'react';
import { View } from 'react-native';
import Header from "../components/Header";
import TaskContainer from '../components/TaskContainer';

export default class HomeScreen extends Component {
    // Sets title of "tab"
    static navigationOptions = {
        title: 'Cleaning Schedule',
    };

    render() {
        return (
            <View>
                <Header navigator={this.props.navigation}/>
                <TaskContainer navigator={this.props.navigation}/>
            </View>
        );
    }
}
