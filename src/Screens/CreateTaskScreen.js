import { connect } from 'react-redux';
import { Text, View, StyleSheet } from 'react-native';
import React, { Component } from 'react';
import CreateTaskForm from '../components/CreateTaskForm';


class CreateTaskScreen extends Component {
    static navigationOptions = ({ navigation }) => {
        //title: `Welcome ${navigation.state.params}`,
        return {
            title: navigation.state.params ? 'Task detail' : 'Create new task',
        }
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
            // users: [],
            usersRotation: [],
        };
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    handleFormSubmit(value) {
        console.log("CREATE TASK SCREEN submit -------");
        console.log(value);
        this.setState(
            {
                ...this.state,
                title: value.title,
                frequency: value.frequency,
                start: value.start,
                effort: value.effort,
                done: value.done,
                // users: value.users,
                usersRotation: value.usersRotation,
            });
    }

    setUsersRotationObject(task) {
        const users = task.usersRotation;
        const roommates = this.props.roommates;
        // console.log(roommates);
        let usersRotation = [];
        users.map(user => { usersRotation.push(roommates.filter(roomie => roomie.nickname === user)); });
        // console.log('set USERS ROTATION obj');
        // console.log(usersRotation);
        // task.users = usersRotation;
        task.usersRotation = usersRotation;
        return task;
    }

    getTaskById(id) {
        let task = this.props.tasks.filter(task => task.id === id);
        if (task) {
            console.log('GET TASK by ID');
            // console.log(task);
            task = this.setUsersRotationObject(task[0]);
            console.log(task);
            return task;
        }
    }

    render() {
        console.log('create task screen RENDER');
        // console.log('this.state');
        // console.log(this.state);
        console.log(this.props.navigation.state);
        let {roommates} = this.props;
        // console.log('ROOMMATES');
        // console.log(roommates);
        let {title: title, frequency: frequency, start: start, effort: effort, done: done, users: users} = this.state;
        if (start) {
            start = start.toLocaleDateString();
        }

        const id = this.props.navigation.state.params ? this.props.navigation.state.params.id : null;
        console.log('Task ID ------');
        console.log(id);
        let task = id ? this.getTaskById(id) : null;
        // console.log('Just for debug');
        // console.log(task);
        // console.log(task.title);
        // console.log(frequency);
        // console.log(start);
        // console.log(effort);
        // console.log(users);
        // console.log(usersRotation);
        return (
            <View>
                <CreateTaskForm task={task} roommates={roommates} onFormSubmit={this.handleFormSubmit}/>

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
    console.log('CREATE task SCREEN state ---');
    console.log(state);
    return {
        tasks: state.taskData.tasks,
        roommates: state.usersData.users,
    }
}

export default connect(mapStateToProps, {})(CreateTaskScreen);
