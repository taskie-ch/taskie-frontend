import { connect } from 'react-redux';
import { View, AsyncStorage } from 'react-native';
import React, { Component } from 'react';
import { LogInUser } from './../Actions/FetchUsers';
import LoginForm from '../components/LoginForm';
import styles from './../styles';


class SignInScreen extends Component {
    // Sets title of "tab"
    static navigationOptions = {
        title: 'Taskie Sign in',
    };
    
    constructor(props) {
        super(props);
        
        this.state = {
            currentUser: null,
            nickname: '',
            password: '',
            hasError: false,
        };
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }
    
    setCurrentUser(cuID, cuNickname, cuScore) {
        this.state.currentUser = {id: cuID, nickname: cuNickname, score: cuScore};
    }
    
    setHasError(hasError) {
        console.log('setting hasError');
        this.state.hasError = hasError;
    }
    
    handleFormSubmit(value) {
        console.log('CREDENTIALS SUBMIT');
        console.log(value);
        this._signInAsync(value.nickname, value.password);
    }
    
    _signInAsync = async (nickname, password) => {
        console.log("Signin in: " + nickname);
        const currentUserID = await AsyncStorage.getItem('currentUserID');
        console.log('Dispatch log in ' + currentUserID);
        
        const bypassLogin = false;
        
        this.props.LogInUser(nickname, password)
            .then(async () => {
                console.log('User login success!!');
                const localCurrentUserID = await AsyncStorage.getItem('currentUserID');
                console.log('localCurrentUserID ' + localCurrentUserID);
                if (localCurrentUserID instanceof Promise) {
                    localCurrentUserID.then(currentUserID => {
                        console.log('LogInUser success currentUserID ' + currentUserID);
        
                        // Set the user ID in localStorage.
                        AsyncStorage.setItem('currentUserID', currentUserID);
                        // AsyncStorage.setItem('currentUserNickname', currentUser.nickname);
                        // AsyncStorage.setItem('currentUserScore', currentUser.score.toString());
                    });
                }
                this.navigateToApp();
            })
            .catch(error => {
                console.log('Failed to log-in');
                // console.log(error);

                this.setHasError(true);
                
                if (bypassLogin) {
                    this.setCurrentUser('1234', 'Jane', 6);
                    this.navigateToApp();
                }
            });
    };
    
    navigateToApp() {
        this.props.navigation.navigate('App');
    }
    
    render() {
        return (
            <View style={styles.loginFormContainer}>
                <LoginForm
                    hasError={this.state.hasError}
                    onFormSubmit={this.handleFormSubmit}/>
            </View>
        )
    }
}

function mapStateToProps(state) {
    return {}
}

const mapDispatchToProps = {
    LogInUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignInScreen)
