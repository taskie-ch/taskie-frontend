import Spinner from 'react-native-loading-spinner-overlay';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { ScrollView, View } from 'react-native';

import FetchTasks from './../Actions/FetchTasks';
import TaskCard from './TaskCard';


class TaskContainer extends Component {

    componentDidMount() {
        this.props.FetchTasks();
    }

    onTaskCardPressed(id) {
        this.props.navigator.navigate('CreateTask', {id: id});
    }

    renderTaskCards() {
        let tasks = this.props.tasks;
        tasks.sort(function(task1, task2){return new Date(task1.start) - new Date(task2.start)});
        return tasks.map(task => {
                return <TaskCard
                    key={`${task.id}`}
                    id={task.id}
                    title={task.title}
                    // effort={task.effort}
                    // frequency={task.frequency}
                    start={task.start ? new Date(task.start).toDateString() : 'Monday'}
                    done={task.done}
                    user={task.users.length ? task.users[0].toUpperCase() : 'Nickname'}
                    taskCardPressed={() => this.onTaskCardPressed(task.id)}
                />
            }
        )
    }

    render() {
        const {tasks} = this.props;
        const {contentContainer} = styles;

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
            <ScrollView style={ contentContainer }>
                {this.renderTaskCards()}
            </ScrollView>
        )
    }
}

const styles = {
    contentContainer: {
        paddingBottom: 100,
        marginTop: 70,
    }
};

function mapStateToProps(state) {
    return {
        tasks: state.taskData.tasks
    }
}

export default connect(mapStateToProps, { FetchTasks })(TaskContainer)
