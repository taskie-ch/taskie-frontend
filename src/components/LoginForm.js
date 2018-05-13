import t from 'tcomb-form-native';
import React, { Component } from 'react';
import { Text, TouchableHighlight, View } from 'react-native';
import styles from './../styles';

/*
User login Struct:
    - nickname (input text)
    - password (input text)
*/
const Credentials = t.struct({
    nickname: t.String,
    password: t.String,
});

/* Define Form as a Form */
const Form = t.form.Form;

/* Define error messages for invalid Form POST event */
let options = {
    fields: {
        nickname: {
            error: 'GIVE ME A USERNAME!'
        },
        password: {
            error: 'GIVE ME A PASSWORD!',
            password: true,
            secureTextEntry: true
        },
    }
};

export default class LoginForm extends Component {

    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
        
        this.state = {
            options: options
        }
    }
    
    handleSubmit() {
        const value = this._form.getValue();

        if (value) {
            this.props.onFormSubmit(value);
        }
    }

    createForm() {
        return (
            <Form
                ref={c => this._form = c}
                type={Credentials}
                options={options}
            />
        );
    }
    
    showError() {
        options = t.update(options, {
            fields: {
                nickname: {
                    hasError: {'$set': true},
                    error: {'$set' : ''}
                },
                password: {
                    hasError: {'$set': true},
                    error: {'$set': 'Bad credentials!'}
                }
            }
        });
        return options;
    }

    /* Build the form markup to be rendered */
    render() {
        if (this.props.hasError) {
            this.showError();
        }
        
        return (
            <View style={loginFormContainer}>
                {this.createForm()}
                <TouchableHighlight style={loginFormButton} onPress={this.handleSubmit} underlayColor='#99d9f4'>
                    <Text style={loginFormButtonText}>Sign in!</Text>
                </TouchableHighlight>
            </View>
        )
    }
}

const { loginFormContainer, loginFormButton, loginFormButtonText } = styles;
