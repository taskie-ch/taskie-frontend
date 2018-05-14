import { Provider } from 'react-redux';
import { StackNavigator, SwitchNavigator } from 'react-navigation';
import React, { Component } from 'react';
import { View, YellowBox } from 'react-native';
import Store from './src/Store';
import { HomeScreen, CreateTaskScreen, SignInScreen, AuthLoadingScreen } from './src/Screens';

// Ignore warning in the meantime as mentioned in issue: https://github.com/facebook/react-native/issues/18175
YellowBox.ignoreWarnings([
    'Warning: componentWillMount is deprecated',
    'Warning: componentWillReceiveProps is deprecated',
    'Warning: componentWillUpdate is deprecated',
]);

const AuthStack = StackNavigator(
    {
        SignIn: {
            screen: SignInScreen,
            title: 'Sign in',
        },
    }
);

const AppNavigator = StackNavigator(
    {
        Home: {
            screen: HomeScreen,
            title: 'Home'
        },
        CreateTask: {
            screen: CreateTaskScreen,
        },
    },
    {
        initialRouteName: 'Home'
    },
);

const SwitchNav = SwitchNavigator(
    {
        AuthLoading: AuthLoadingScreen,
        App: AppNavigator,
        Auth: AuthStack,
    },
    {
        initialRouteName: 'AuthLoading',
    }
);

export default class App extends Component {
    render() {
        return (
            <Provider store={Store}>
                <SwitchNav/>
            </Provider>
        );
    }
}
