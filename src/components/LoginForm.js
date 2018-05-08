import t from 'tcomb-form-native';
import React, { Component } from 'react';
import { Text, StyleSheet, TouchableHighlight, View } from 'react-native';

/*
User login struct:
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
            <View style={container}>
                {this.createForm()}
                <TouchableHighlight style={button} onPress={this.handleSubmit} underlayColor='#99d9f4'>
                    <Text style={buttonText}>Sign in!</Text>
                </TouchableHighlight>
            </View>
        )
    }
}

/* Define some CSS rules for this component */
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
    }
});

const { container, button, buttonText } = styles;
