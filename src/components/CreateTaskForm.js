import t from 'tcomb-form-native';
import React, { Component } from 'react';
import { Text, View, TouchableHighlight } from 'react-native';
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
        console.log('CREATE TASK FORM PROPS');
        console.log(props);
        super(props);
        const {roommates} = this.props;
        const {task} = this.props;
        const usersRotation = task ? task.usersRotation : roommates;
        const assigneeList = this.resetRoommates(usersRotation, roommates);
        console.log(assigneeList);
    
        this.state = {
            sorted: assigneeList,
            unsorted: assigneeList,
            task: null,
        };
    
        this.onSortChange = this.onSortChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    /* 'Add task'|'Update task' submit function */
    handleSubmit() {
        // Save the Task instance as 'value'.
        let value = this._form.getValue();
        //
        // // Get the usersRotation's ID order.
        // let usersID = [];
        // const sorted = this.state.sorted.slice();
        // sorted.map(item => { usersID.push(item.id); });
        // const usersID = this.submitForm();

        // If validation fails, value will be null.
        if (value) {
            const {roommates} = this.props;
            const {task} = this.props;
            this.resetRoommates(roommates, roommates);
            console.log('CreateTaskForm on ');
            console.log(task);
            console.log(value);
            value = {
                title: value.title,
                frequency: value.frequency,
                start: value.start,
                effort: value.effort,
                usersRotation: this.submitForm(),
            };
            if (task && task.id) {
                value.id = task.id;
            }
            console.log('CreateTaskForm on submit');
            console.log(value);
            // The onFormSubmit function was passed down as a prop from App.js
            this.props.onFormSubmit(value);
        }
    }

    /* 'Delete task' submit function */
    handleDelete(task) {
        // Save the Task instance as 'value'.
        // let value = this._form.getValue();
        //
        // // Get the usersRotation's ID order.
        // let usersID = [];
        // const sorted = this.state.sorted.slice();
        // sorted.map(item => { usersID.push(item.id); });
        // const usersID = this.submitForm();
    
        console.log('handleDelete');
        // console.log(this.props);//
        // const {task} = this.props;
        console.log('CreateTaskForm on DELETE submit');
        console.log(task);
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
            console.log('CREATE FORM');
            console.log(task.users);
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
    
    resetRoommates(usersRotation, roommates) {
        // Set all usersRotation's roomies isEnabled back to true.
        console.log(usersRotation);
        const assigneeList = roommates.map(assigneeID => {
            let assignee = roommates.filter(roomies => assigneeID === roomies.id);
            let unassignee = roommates.filter(roomies => assigneeID !== roomies.id);
            console.log('ASSIGNEE---');
            console.log(assignee);
            if (assignee.length) {
                assignee = {
                    id: assignee[0].id,
                    nickname: assignee[0].nickname,
                    score: assignee[0].score,
                    isEnabled: true,
                };
            } else {
                assignee = {
                    id: unassignee[0].id,
                    nickname: unassignee[0].nickname,
                    score: unassignee[0].score,
                    isEnabled: false,
                };
            }
    
            // assignee = {
            //     id: assigneeID.id,
            //     nickname: assigneeID.nickname,
            //     score: assigneeID.score,
            //     isEnabled: true,//
            // };
            // assigneeList.push(assignee);
            return assignee;
        });

        this.setState({
            ...this.state,
            sorted: assigneeList,
            unsorted: assigneeList,
        });

        return assigneeList;
    }
    
    submitForm() {
        // this.setState({
        //     sorted: value.sorted,
        //     unsorted: value.unsorted,
        // });
    
        const sorted = this.state.sorted;
        // Get the usersRotation's ID order.

        return sorted.map(item => item.id);
    }
    
    onSortChange(value) {
        this.setState({
            ...this.state,
            sorted: value.sorted,
            unsorted: value.unsorted,
        });
    }
    
    renderUsersRotation(task) {
        const sorted = this.state.sorted.slice();
        const unsorted = this.state.unsorted.slice();
        const roomiesAssigned = (item) => {
            let assignee = task.usersRotation.filter(assigneeID => assigneeID === item.id);
            assignee = assignee ? assignee[0] : null;
            if (assignee) {
                assignee = assignee[0];
                assignee.isEnabled = true;
            } else {
                assignee = item;
                assignee.isEnabled = false;
            }
            return assignee;
        };
        return (
            <View style={usersRotationContainer}>
                <SortableForm
                    sorted={sorted}
                    unsorted={unsorted}
                    submit={this.submitForm}
                    // itemsFormat={(item) => roomiesAssigned(item)}
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
