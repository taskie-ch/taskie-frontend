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
        // console.log('posted task ' + this.id);
        // value.id ? this.props.PostTask(value) : this.props.PostTask(value);
        // this.props.PostTask(value);
        // this.props.FetchTasks();
    
        this.deleteNavigateToApp(value);
        // const navigator = this.props.navigation;
        // navigator.navigate('App');
    }
    
    deleteNavigateToApp = async (value) => {
        
        console.log('deleting task ' + value.id);
        const res = await this.props.DeleteTask(value.id);
        console.log('delete res');
        console.log(res);
        // console.log('post fetching tasks');
        await this.props.FetchTasks();
        // console.log("Dispatch post fetching tasks");
        // console.log(this.props);
        // console.log(this.props.navigation);
        // console.log(this.props.navigator);
        // console.log('navigating to app');
        this.props.navigation.navigate('Home');
        // this.props.navigator.navigate('Home');
    };

    handleFormSubmit(value) {
        console.log("CREATE TASK SCREEN submit -------");
        console.log(value);
        this.setState(
            {
                ...this.state,
                id: value.id ? value.id : '',
                title: value.title,
                frequency: value.frequency,
                start: value.start,
                effort: value.effort,
                done: value.done,
                // users: value.users,
                usersRotation: value.usersRotation,
            });
        // console.log('posted task ' + this.id);
        // value.id ? this.props.PostTask(value) : this.props.PostTask(value);
        // this.props.PostTask(value);
        // this.props.FetchTasks();
    
        this.navigateToApp(value);
        // const navigator = this.props.navigation;
        // navigator.navigate('App');
    }
    
    navigateToApp = async (value) => {
        
        console.log('posting task ' + this.state.id);
        const res = await this.props.PostTask(value);
        console.log('post res');
        console.log(res);
        // console.log('post fetching tasks');
        await this.props.FetchTasks();
        // console.log("Dispatch post fetching tasks");
        // console.log(this.props);
        // console.log(this.props.navigation);
        // console.log(this.props.navigator);
        // console.log('navigating to app');
        this.props.navigation.navigate('Home');
        // this.props.navigator.navigate('Home');
    };

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
        if (task.length) {
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
        // console.log(this.props);
        // console.log(this.props.navigation.state);
        let {roommates} = this.props;
        // console.log('ROOMMATES');
        // console.log(roommates);
        let {title: title, frequency: frequency, start: start, effort: effort, done: done, usersRotation: usersRotation} = this.state;
        // start = start ? start.toLocaleDateString() : '';
        if (start) {
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
            <View>
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
    console.log('CREATE task SCREEN state ---');
    console.log(state);
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
