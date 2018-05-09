import t from 'tcomb-form-native';
import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableHighlight } from 'react-native';
import { Constants } from 'expo';
import SortableForm from './SortableForm';

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
    // users: [],
    // usersRoration: [],
    // done: t.Boolean
});

/* Define Form as a Form */
const Form = t.form.Form;

/* Define error messages for invalid Form POST event */
const options = {
    // auto: 'placeholders',
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
        },
        users: {
        //     error: ''
        }
    }
};

/* Make CreateTaskForm instance as public */
export default class CreateTaskForm extends Component {

    constructor(props) {
        console.log('CREATE TASK FORM PROPS');
        console.log(props);
        super(props);
        const {roommates} = this.props;
        const usersRotation = this.resetRoommates(roommates);
        console.log(usersRotation);
    
        this.state = {
            sorted: usersRotation,
            unsorted: usersRotation,
            // unsorted: [
            //     {
            //         id: 1,
            //         nickname: 'Jane',
            //         score: 6,
            //         isEnabled: true,
            //     },
            //     {
            //         id: 2,
            //         nickname: 'Tom',
            //         score: 5,
            //         isEnabled: true,
            //     },
            //     {
            //         id: 3,
            //         nickname: 'Joe',
            //         score: 3,
            //         isEnabled: true,
            //     },
            //     {
            //         id: 4,
            //         nickname: 'Doe',
            //         score: 2,
            //         isEnabled: true,
            //     },],
            // sorted: [
            //     {
            //         id: 1,
            //         nickname: 'Jane',
            //         score: 6,
            //         isEnabled: true,
            //     },
            //     {
            //         id: 2,
            //         nickname: 'Tom',
            //         score: 5,
            //         isEnabled: true,
            //     },
            //     {
            //         id: 3,
            //         nickname: 'Joe',
            //         score: 3,
            //         isEnabled: true,
            //     },
            //     {
            //         id: 4,
            //         nickname: 'Doe',
            //         score: 2,
            //         isEnabled: true,
            //     },
            // ]
        };
    
        this.submitForm = this.submitForm.bind(this);
        this.onSortChange = this.onSortChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    /* 'Add task' submit function */
    handleSubmit() {
        // Save the Task instance as 'value'.
        let value = this._form.getValue();

        // Get the usersRotation's ID order.
        let usersID = [];
        const sorted = this.state.sorted.slice();
        sorted.map(item => { usersID.push(item.id); });

        // If validation fails, value will be null.
        if (value) {
            const {roommates} = this.props;
            this.resetRoommates(roommates);
            value = {
                title: value.title,
                frequency: value.frequency,
                start: value.start,
                effort: value.effort,
                users: usersID,
            };
            // The onFormSubmit function was passed down as a prop from App.js
            this.props.onFormSubmit(value);
        }
    }

    createForm(task) {
        if (task) {
            console.log('CREATE FORM');
            console.log(task.users);
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
    
    resetRoommates(roommates) {
        // Set all usersRotation's roomies isEnabled back to true.
        let usersRotation = [];
        roommates.map(roomie => {
            roomie = {
                id: roomie ? roomie.id : null,
                nickname: roomie ? roomie.nickname : null,
                score: roomie ? roomie.score : null,
                isEnabled: true,
            };
            usersRotation.push(roomie);
        });

        this.setState({
            sorted: usersRotation,
            unsorted: usersRotation,
        });

        return usersRotation;
    }
    
    submitForm(value) {
        this.setState({
            sorted: value.sorted,
            unsorted: value.unsorted,
        });
    }
    
    onSortChange(value) {
        this.setState({
            sorted: value.sorted,
            unsorted: value.unsorted,
        });
    }
    
    renderUsersRotation() {
        const sorted = this.state.sorted.slice();
        const unsorted = this.state.unsorted.slice();
        return (
            <View style={usersRotationContainer}>
                <SortableForm
                    sorted={sorted}
                    unsorted={unsorted}
                    // submit={this.submitForm}
                    itemsFormat={item => item.nickname}
                    onSortChange={this.onSortChange}
                />
            </View>
        );
    }

    /* Build the form markup to be rendered */
    render() {
        const {task} = this.props;
        return (
            <View style={container}>
                {this.createForm(task)}
                <Text style={paragraph}>Tap on the pictures to change the order:</Text>
                {this.renderUsersRotation()}
                <TouchableHighlight style={button} onPress={this.handleSubmit} underlayColor='#99d9f4'>
                    <Text style={buttonText}>{task ? 'Update Task' : 'Add Task'}</Text>
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
        marginTop: 125,
        marginBottom: 10,
        alignSelf: 'stretch',
        justifyContent: 'center'
    },
    buttonText: {
        fontSize: 18,
        color: 'white',
        alignSelf: 'center'
    },
    usersRotationContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        // height: 100,
        // paddingTop: Constants.statusBarHeight,
        // backgroundColor: '#ecf0f1',
    },
    paragraph: {
        marginBottom: 7,
        fontSize: 17,
        fontWeight: 'normal',
        // color: '#34495e',
        color: '#000',
    },
});

const { container, button, buttonText, usersRotationContainer, paragraph } = styles;
