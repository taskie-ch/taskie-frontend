import { ActivityIndicator, AsyncStorage, StatusBar, View } from 'react-native';
import React, { Component } from 'react';
import styles from './../styles';

export default class AuthLoadingScreen extends Component {
    constructor(props) {
        super(props);
        this._bootstrapAsync();
    }
    
    // Fetch the token from storage then navigate to our appropriate place
    _bootstrapAsync = async () => {
        const userToken = await AsyncStorage.getItem('currentUserID');//null;//
        console.log('USER TOKEN ?');
        console.log(userToken);
        
        // This will switch to the App screen or Auth screen and this loading
        // screen will be unmounted and thrown away.
        this.props.navigation.navigate(userToken ? 'App' : 'Auth');
    };
    
    // Render any loading content that you like here
    render() {
        return (
            <View style={styles.loginFormContainer}>
                <ActivityIndicator />
                <StatusBar barStyle="default" />
            </View>
        );
    }
}
