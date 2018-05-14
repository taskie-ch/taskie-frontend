import t from 'tcomb-form-native';
import React, { Component } from 'react';
import { Text, View, TouchableHighlight, ScrollView } from 'react-native';
import SortableForm from './SortableForm';
import styles from './../styles';

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
    4: 'Huge (4 stars)'
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
    // usersRotation: [],
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
        // usersRotation: {
        //     error: ''
        // }
    }
};

/* Make CreateTaskForm instance as public */
export default class CreateTaskForm extends Component {

    constructor(props) {
        super(props);
        const {roommates} = this.props;
        const {task} = this.props;
        const usersRotation = task ? task.usersRotation : roommates;
        // Get the proper assignee|unassignee list as lists of User objects to be properly rendered in CreateTaskForm.
        const assigneeList = usersRotation.map(userId => roommates.filter(roomie => userId === roomie.id)[0]).filter(item => !!item);
        const unassigneeList = roommates.filter(roomie => usersRotation.indexOf(roomie.id) < 0);
    
        this.state = {
            sorted: assigneeList,
            unsorted: unassigneeList,
            task: null,
        };
    
        this.onSortChange = this.onSortChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    /* 'Add task'|'Update task' submit function */
    handleSubmit() {
        // Get the Task instance input values as 'value'.
        let value = this._form.getValue();

        // If validation fails, value will be null.
        if (value) {
            const {task} = this.props;
            const usersRotation = this.state.sorted.map(roomie => roomie.id);
            value = {
                title: value.title,
                frequency: value.frequency,
                start: value.start,
                effort: value.effort,
                usersRotation: usersRotation,
            };
            if (task && task.id) {
                value.id = task.id;
            }
            // The onFormSubmit function was passed down as a prop from App.js
            this.props.onFormSubmit(value);
        }
    }

    /* 'Delete task' submit function */
    handleDelete(task) {
        // The onDeleteSubmit function was passed down as a prop from App.js
        this.props.onDeleteSubmit(task);
    }
    
    handleChange(value) {
        this.setState({
            task: value
        });
    }

    createForm(task) {
        if (this.state.task) {
            task = Object.assign({}, this.state.task);
        } else if (task) {
            task = {
                title: task.title,
                frequency: task.frequency.toUpperCase(),
                effort: task.effort,
                start: new Date(task.start),
                usersRotation: task.usersRotation,
            };
        }
        
        return (
            <Form
                ref={c => this._form = c}
                style={{fontSize: 20,}}
                type={Task}
                value={task}
                onChange={this.handleChange}
                options={options}
            />
        );
    }
    
    onSortChange(value) {
        this.setState({
            ...this.state,
            sorted: value.sorted,
            unsorted: value.unsorted,
        });
    }
    
    renderUsersRotation() {
        const { sorted, unsorted } = this.state;
        return (
            <View style={usersRotationContainer}>
                <SortableForm
                    sorted={sorted}
                    unsorted={unsorted}
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
            <ScrollView>
                <View style={loginFormContainer}>
                    {this.createForm(task)}
                    <Text style={createTaskFormParagraph}>Tap on the pictures to change the order:</Text>
                    {this.renderUsersRotation(task)}
                    <TouchableHighlight style={[loginFormButton, createTaskFormButton]} onPress={this.handleSubmit} underlayColor='#99d9f4'>
                        <Text style={loginFormButtonText}>{task ? 'Update Task' : 'Add Task'}</Text>
                    </TouchableHighlight>
                    {task ?
                    <TouchableHighlight style={[loginFormButton, createTaskFormDeleteButton]} onPress={() => this.handleDelete(task)} underlayColor='#99d9f4'>
                        <Text style={loginFormButtonText}>Delete Task</Text>
                    </TouchableHighlight> : ''}
                </View>
            </ScrollView>
        )
    }
}

const {
    loginFormContainer,
    loginFormButton,
    createTaskFormButton,
    createTaskFormDeleteButton,
    loginFormButtonText,
    usersRotationContainer,
    createTaskFormParagraph
} = styles;
