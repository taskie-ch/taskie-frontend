import Spinner from 'react-native-loading-spinner-overlay';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { ScrollView, View } from 'react-native';

import { FetchUsers } from './../Actions/FetchUsers';
import { FetchTasks, SkipTask, DoneTask } from './../Actions/FetchTasks';
import TaskCard from './TaskCard';
import styles from './../styles';


class TaskContainer extends Component {
    
    constructor(props) {
        super(props);
        
        const {tasks, currentUser, roommates} = this.props;
        console.log('tasks TaskContainer');
        console.log(tasks);
        this.state = {
            tasks: tasks,
            currentUser: currentUser,
            roommates: roommates,
        };

        this.onTaskDone = this.onTaskDone.bind(this);
        this.onTaskSkip = this.onTaskSkip.bind(this);
        this.onTaskIWillDoIt = this.onTaskIWillDoIt.bind(this);
    }

    componentDidMount() {
        this.props.FetchTasks();
        this.props.FetchUsers();
    }
    
    navigateToApp = async (score) => {
        const res = await this.props.FetchTasks();
        console.log('fetch tasks res');
        console.log(res);
        await this.props.FetchUsers();
        this.props.onAction(score);
        this.props.navigator.navigate('App');
    };
    
    onTaskDone = async (task, currentUser) => {
        console.log('onTaskDone');
        console.log(task);
        const score = currentUser.score + task.effort;
        await this.props.DoneTask(task.id, task.usersRotation[0]);
        this.navigateToApp(score, task.id, task.usersRotation[0]);
    };
    
    onTaskIWillDoIt = async (task, currentUser) => {
        console.log('onTaskIWillDoIt');
        console.log(task);
        const score = currentUser.score + task.effort;
        await this.props.DoneTask(task.id, currentUser.id);
        this.navigateToApp(score, task.id, currentUser.id);
    };

    onTaskSkip = async (task, currentUser) => {
        console.log('onTaskSkip');
        console.log(task);
        const score = currentUser.score - task.effort;
        await this.props.SkipTask(task.id, task.usersRotation[0]);
        this.navigateToApp(score, task.id, task.usersRotation[0]);
    };

    onTaskCardPressed(id) {
        this.props.navigator.navigate('CreateTask', {id: id});
    }

    renderTaskCards() {
        const currentUser = this.props.currentUser;
        const roommates = this.props.roommates;
        let tasks = this.props.tasks;
        tasks = (tasks.length > 0) ? tasks.sort(function(task1, task2){return new Date(task1.start) - new Date(task2.start)}) : [];
        return tasks.map(task => {
            const user = roommates.filter(roomie => roomie.id === task.usersRotation[0]);
            return <TaskCard
                key={`${task.id}`}
                id={task.id}
                title={task.title}
                start={task.start ? new Date(task.start).toDateString() : 'Monday'}
                done={task.done}
                user={user.length ? user[0].nickname.toUpperCase() : 'Nickname'}
                currentUser={currentUser}
                taskCardPressed={() => this.onTaskCardPressed(task.id)}
                taskDone={() => this.onTaskDone(task, currentUser)}
                taskSkip={() => this.onTaskSkip(task, currentUser)}
                taskIWillDoIt={() => this.onTaskIWillDoIt(task, currentUser)}
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
    return {
        tasks: state.taskData.tasks,
        currentUser: state.usersData.currentUser,
        roommates: state.usersData.users,
    }
}

const mapDispatchToProps = {
    FetchUsers,
    FetchTasks,
    SkipTask,
    DoneTask,
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskContainer)
