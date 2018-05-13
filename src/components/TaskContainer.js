import Spinner from 'react-native-loading-spinner-overlay';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { ScrollView, View } from 'react-native';

import { FetchUsers } from './../Actions/FetchUsers';
import { FetchTasks, PostTask, DeleteTask, SkipTask, DoneTask } from './../Actions/FetchTasks';
import TaskCard from './TaskCard';
import styles from './../styles';


class TaskContainer extends Component {
    
    constructor(props) {
        super(props);

        this.state = {};

        this.onTaskDone = this.onTaskDone.bind(this);
        this.onTaskSkip = this.onTaskSkip.bind(this);
        this.onTaskIWillDoIt = this.onTaskIWillDoIt.bind(this);
    }

    componentDidMount() {
        this.props.FetchTasks();
    }
    
    onTaskDone(task) {
        console.log("Done task: " + task.title);
        console.log("Done task ID: " + task.id);
        this.props.DoneTask(task.id, task.usersRotation[0]);
        console.log('done');
        this.doneNavigateToApp();
    }
    
    doneNavigateToApp = async () => {
        console.log('done fetching tasks');
        await this.props.FetchTasks();
        console.log("Dispatch done fetching tasks");
        // console.log(this.props);
        console.log('navigating to app');
        this.props.navigator.navigate('App');
    };
    
    onTaskIWillDoIt(task) {
        console.log("Done task: " + task.title);
        console.log("Done task ID: " + task.id);
        this.props.DoneTask(task.id, task.usersRotation[0]);
        console.log('done');
        this.iWillDoItNavigateToApp();
    }
    
    iWillDoItNavigateToApp = async () => {
        console.log('done fetching tasks');
        await this.props.FetchTasks();
        console.log("Dispatch done fetching tasks");
        // console.log(this.props);
        console.log('navigating to app');
        this.props.navigator.navigate('App');
    };

    onTaskSkip(task) {
        console.log("skip task: " + task.title);
        console.log("skip task ID: " + task.id);
        this.props.SkipTask(task.id, task.usersRotation[0]);
        console.log('skip');
        this.skipNavigateToApp();
    }
    
    skipNavigateToApp = async () => {
        console.log('skip fetching tasks');
        await this.props.FetchUsers();
        console.log("Dispatch skip fetching tasks");
        // console.log(this.props);
        console.log('navigating to app');
        this.props.navigator.navigate('App');
    };

    onTaskDelete(task) {
        console.log("Deleting task: " + task.title);
        console.log("Deleting task ID: " + task.id);
        this.props.DeleteTask(task.id);
        console.log('deleted');
        this.navigateToApp();
    }
    
    navigateToApp = async () => {
    
        console.log('delete fetching tasks');
        await this.props.FetchTasks();
        console.log("Dispatch delete fetching tasks");
        // console.log(this.props);
        console.log('navigating to app');
        this.props.navigator.navigate('App');
    };

    onTaskCardPressed(id) {
        this.props.navigator.navigate('CreateTask', {id: id});
    }

    renderTaskCards() {
        const currentUser = this.props.currentUser;
        const roommates = this.props.roommates;
        let tasks = this.props.tasks;
        console.log('RENDER TASK CARD');
        // console.log(this.props);
        console.log(tasks);
        tasks = (tasks.length > 0) ? tasks.sort(function(task1, task2){return new Date(task1.start) - new Date(task2.start)}) : [];
        return tasks.map(task => {
            console.log('renderTaskCards render return');
            // console.log(task);
            console.log(task.usersRotation[0]);
            console.log('Roommates');
            console.log(roommates);
            const currentUser = currentUser ? currentUser : roommates[0];
            console.log(currentUser);
            const user = roommates.filter(roomie => roomie.id === task.usersRotation[0]);
            console.log(user);
            return <TaskCard
                key={`${task.id}`}
                id={task.id}
                title={task.title}
                start={task.start ? new Date(task.start).toDateString() : 'Monday'}
                done={task.done}
                user={user.length ? user[0].nickname.toUpperCase() : 'Nickname'}
                currentUser={currentUser}
                taskCardPressed={() => this.onTaskCardPressed(task.id)}
                taskDone={() => this.onTaskDone(task)}
                taskSkip={() => this.onTaskSkip(task)}
                taskIWillDoIt={() => this.onTaskIWillDoIt(task)}
            />
        })
    }

    render() {
        const {tasks} = this.props;

        if (tasks.isFetching) {
            return (
                <View>
                    <Spinner
                        visible={tasks.isFetching}
                        textContent={"Loading..."}
                        textStyle={{color: '#253145'}}
                        animation="fade"
                    />
                </View>
            )
        }

        return (
            <ScrollView style={ styles.taskContainerBody }>
                {this.renderTaskCards()}
            </ScrollView>
        )
    }
}

function mapStateToProps(state) {
    console.log('TASK Container state ---');
    console.log(state);
    return {
        tasks: state.taskData.tasks,
        currentUser: state.usersData.currentUser,
        roommates: state.usersData.users,
    }
}

const mapDispatchToProps = {
    FetchUsers,
    FetchTasks,
    DeleteTask,
    SkipTask,
    DoneTask,
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskContainer)
