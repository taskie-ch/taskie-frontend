import t from 'tcomb-form-native';
import React, { Component } from 'react';
import { Text, StyleSheet, TouchableHighlight, View } from 'react-native';


/* Frequency select dropdown element options */
const Frequency = t.enums({
    DAILY: 'Daily',
    WEEKLY: 'Weekly',
    MONTHLY: 'Monthly'
});

/* Start datepicker element default value */
const TodayOrFutureDate = t.refinement(t.Date, function (n) {
    return n >= new Date().setHours(0, 0, 0, 0);
});

/* Effort select dropdown element options */
const Effort = t.enums({
    1: 'Normal (1 star)',
    2: 'High (2 stars)',
    3: 'Huge (4 stars)'
});

/*
Task struct:
    - Title (input text)
    - Frequency (select)
    - Start (datepicker)
    - Effort (select)
    - Done (boolean)
*/
const Task = t.struct({
    title: t.String,
    frequency: Frequency,
    start: TodayOrFutureDate,
    effort: Effort,
    users: [],
    // usersRoration: [],
    // done: t.Boolean
});

/* Define Form as a Form */
const Form = t.form.Form;

/* Define error messages for invalid Form POST event */
const options = {
    fields: {
        title: {
            error: 'GIVE ME A TITLE!'
        },
        frequency: {
            error: 'GIVE ME A FREQUENCY!'
        },
        start: {
            mode: 'date',
            config: {
                format: date => date.toLocaleDateString(),
            },
            error: 'Date cannot be in the past!'
        },
        effort: {
            error: 'GIVE ME AN EFFORT!'
        }
    }
};

/* Make CreateTaskForm instance as public */
export default class CreateTaskForm extends Component {

    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    /* 'Add task' submit function */
    handleSubmit() {
        // Save the Task instance as 'value'.
        const value = this._form.getValue();

        // If validation fails, value will be null.
        if (value) {
            console.log(value);
            // The onFormSubmit function was passed down as a prop from App.js
            this.props.onFormSubmit(value);
        }
    }

    createForm(task) {
        if (task) {
            task = {
                title: task.title,
                frequency: task.frequency.toUpperCase(),
                effort: task.effort,
                start: new Date(task.start),
                users: task.users,
                // usersRotation: task.usersRotation,
            };
        }
        
        return (
            <Form
                ref={c => this._form = c}
                type={Task}
                value={task}
                options={options}
            />
        );
    }

    /* Build the form markup to be rendered */
    render() {
        const {task} = this.props;
        return (
            <View style={container}>
                {this.createForm(task)}
                <TouchableHighlight style={button} onPress={this.handleSubmit} underlayColor='#99d9f4'>
                    <Text style={buttonText}>Add Task</Text>
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
