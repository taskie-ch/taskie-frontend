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
        const tasks = this.props.tasks;
        return tasks.map(task => {
                return <TaskCard
                    key={`${task.id}`}
                    id={task.id}
                    title={task.title}
                    /*effort={task.effort}
                    frequency={task.frequency}
                    start={task.start}*/
                    done={task.done}
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
        marginTop: 55,
    }
};

function mapStateToProps(state) {
    return {
        tasks: state.taskData.tasks
    }
}

export default connect(mapStateToProps, { FetchTasks })(TaskContainer)
