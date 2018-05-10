import { connect } from 'react-redux';
import { Button, Text, View, StyleSheet, AsyncStorage } from 'react-native';
import React, { Component } from 'react';
import { LogInUser } from './../Actions/FetchUsers';
import LoginForm from "../components/LoginForm";


class SignInScreen extends Component {
    // Sets title of "tab"
    static navigationOptions = {
        title: 'Taskie Sign in',
    };
    
    constructor(props) {
        super(props);
        
        this.state = {
            currentUser: null,
            nickname: "",
            password: "",
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
        console.log("CREDENTIALS SUBMIT");
        console.log(value);
        this._signInAsync(value.nickname, value.password);
    }
    
    _signInAsync = async (nickname, password) => {
        console.log("Signin in: " + nickname);
        // await AsyncStorage.setItem('currentUserID', '1234');
        const currentUserID = await AsyncStorage.getItem('currentUserID');
        console.log(currentUserID);
        console.log("Dispatch log in");
        
        const bypassLogin = false;
        
        this.props.LogInUser(nickname, password)
            .then((user) => {
                console.log("User login success!!");
                console.log(user);
                // console.log(this.props);
                // AsyncStorage.setItem('currentUserID', user.id);
                const currentUser = AsyncStorage.getItem('currentUserID');
                console.log(currentUser);
                // this.setCurrentUser(user.userToken, user.nickname, user.score);
                this.navigateToApp();
            })
            .catch(error => {
                console.log("Failed to log-in");
                console.log(error);

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
            <View style={styles.container}>
                <LoginForm
                    hasError={this.state.hasError}
                    onFormSubmit={this.handleFormSubmit}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        marginTop: 20,
        marginLeft: 10,
        marginRight: 10,
        padding: 20,
        backgroundColor: '#ffffff',
    },
    button: {
        height: 36,
        backgroundColor: '#48BBEC',
        borderColor: '#48BBEC',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 10,
        alignSelf: 'stretch',
        justifyContent: 'center'
    },
    buttonText: {
        fontSize: 18,
        color: 'white',
        alignSelf: 'center'
    },
    paddingVertical: {
        paddingVertical: 20
    }
});

function mapStateToProps(state) {
    return {}
}

const mapDispatchToProps = {
    LogInUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignInScreen)
