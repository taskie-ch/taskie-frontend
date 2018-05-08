import { connect } from 'react-redux';
import { Text, View, StyleSheet } from 'react-native';
import React, { Component } from 'react';
import CreateTaskForm from '../components/CreateTaskForm';


class CreateTaskScreen extends Component {
    static navigationOptions = {
        title: 'Create new task',
    };

    constructor(props) {
        super(props);

        this.state = {
            id: "",
            title: "",
            frequency: "",
            start: "",
            effort: "",
            done: "",
            users: [],
            // usersRotation: [],
        };
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    handleFormSubmit(value) {
        console.log("CREATE TASK SCREEN");
        console.log(value);
        this.setState(
            {
                ...this.state,
                title: value.title,
                frequency: value.frequency,
                start: value.start,
                effort: value.effort,
                done: value.done,
                users: value.users,
                // usersRotation: value.usersRotation,
            });
    }

    getTaskById(id) {
        const task = this.props.tasks.filter(task => task.id === id);
        if (task) {
            return task[0];
        }
    }

    render() {
        let {title: title, frequency: frequency, start: start, effort: effort, done: done, users: users, usersRotation: usersRotation} = this.state;
        if (start) {
            start = start.toLocaleDateString();
        }

        const id = this.props.navigation.state.params ? this.props.navigation.state.params.id : null;
        let task = id ? this.getTaskById(id) : null;
        console.log('Just for debug');
        console.log(title);
        console.log(frequency);
        console.log(start);
        console.log(effort);
        console.log(users);
        console.log(usersRotation);
        return (
            <View>
                <CreateTaskForm task={task} onFormSubmit={this.handleFormSubmit}/>

                {/*<View style={container}>*/}
                    {/*<Text style={{color: "red"}}>Just for debug</Text>*/}
                    {/*<Text>Title: {title}</Text>*/}
                    {/*<Text>Frequency: {frequency}</Text>*/}
                    {/*<Text>Start: {start}</Text>*/}
                    {/*<Text>Effort: {effort}</Text>*/}
                    {/*<Text>Done: {done}</Text>*/}
                {/*</View>*/}
            </View>
        )
    }
}

/* Define some CSS rules */
const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        marginLeft: 20,
    },
});

const { container } = styles;

/* Bind the Store's state to CreateTaskScreen props */
function mapStateToProps(state) {
    return {
        tasks: state.taskData.tasks
    }
}

export default connect(mapStateToProps, {})(CreateTaskScreen);
