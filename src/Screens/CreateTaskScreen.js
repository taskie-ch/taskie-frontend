import { connect } from 'react-redux';
import { Text, View } from 'react-native';
import React, { Component } from 'react';
import CreateTaskForm from '../components/CreateTaskForm';
import { FetchTasks, PostTask, DeleteTask } from '../Actions/FetchTasks';
// import styles from './../styles';


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
            id: '',
            title: '',
            frequency: '',
            start: '',
            effort: '',
            done: '',
            // users: [],
            usersRotation: [],
        };
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleDeleteTaskSubmit = this.handleDeleteTaskSubmit.bind(this);
    }

    handleDeleteTaskSubmit(value) {
        console.log("DELETE TASK submit -------");
        console.log(value.title);
        console.log(value.id);
    
        this.deleteNavigateToApp(value);
    }
    
    deleteNavigateToApp = async (value) => {
        console.log('deleting task ' + value.id);
        const res = await this.props.DeleteTask(value.id);
        console.log('delete res');
        console.log(res);
        await this.props.FetchTasks();
        this.props.navigation.navigate('Home');
    };

    handleFormSubmit(value) {
        // console.log("CREATE TASK SCREEN submit -------");
        // console.log(value);
        this.setState(
            {
                ...this.state,
                id: value.id ? value.id : '',
                title: value.title,
                frequency: value.frequency,
                start: value.start,
                effort: value.effort,
                done: value.done,
                usersRotation: value.usersRotation,
            });
    
        this.navigateToApp(value);
    }
    
    navigateToApp = async (value) => {
        
        await this.props.PostTask(value);
        // console.log('post fetching tasks');
        await this.props.FetchTasks();
        this.props.navigation.navigate('Home');
    };

    getTaskById(id) {
        let task = this.props.tasks.filter(task => task.id === id);
        if (task.length) {
            task = task[0];
            return task;
        }
    }

    render() {
        let {roommates} = this.props;
        // console.log('ROOMMATES');
        // console.log(roommates);
        let {title: title, frequency: frequency, start: start, effort: effort, done: done, usersRotation: usersRotation} = this.state;
        // start = start ? start.toLocaleDateString() : '';
        if (start) {
            console.log('create task screen start');
            console.log(start);
            start = start.toLocaleDateString();
        }

        const id = this.props.navigation.state.params ? this.props.navigation.state.params.id : null;
        console.log('Task ID ------');
        console.log(id);
        let task = id ? this.getTaskById(id) : null;
        console.log(task);
        // console.log('Just for debug');
        // console.log(task);
        // console.log(task.title);
        // console.log(frequency);
        // console.log(start);
        // console.log(effort);
        // console.log(users);
        // console.log(usersRotation);
        return (
            <View style={{flex: 1, paddingBottom: 10,}}>
                <CreateTaskForm task={task} roommates={roommates} onFormSubmit={this.handleFormSubmit} onDeleteSubmit={this.handleDeleteTaskSubmit}/>

                {/*<View style={styles.createTaskScreenDebugContainer}>*/}
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

/* Bind the Store's state to CreateTaskScreen props */
function mapStateToProps(state) {
    return {
        tasks: state.taskData.tasks,
        roommates: state.usersData.users,
    }
}

const mapDispatchToProps = {
    FetchTasks,
    PostTask,
    DeleteTask,
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateTaskScreen);
