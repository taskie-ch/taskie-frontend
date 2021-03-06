import { connect } from 'react-redux';
import React, { Component } from 'react';
import { View, AsyncStorage } from 'react-native';
import Header from '../components/Header';
import TaskContainer from '../components/TaskContainer';
import HallOfFameContainer from "../components/HallOfFameContainer";
import { FetchUsers } from './../Actions/FetchUsers';
import { FetchTasks } from './../Actions/FetchTasks';

class HomeScreen extends Component {
    // Sets title of "tab"
    static navigationOptions = {
        title: 'Cleaning Schedule',
    };
    
    constructor(props) {
        super(props);
    
        // console.log('HOME props ------');
        // const {score} = this.props;
        const {currentUser} = this.props;
        const {roommates} = this.props;
        // const {tasks} = this.props;
        // console.log(currentUser);
        // console.log(roommates);

        this.state = {
            tabSelected: 'Overview',
            score: currentUser ? currentUser.score : 'score!',
            currentUser: currentUser,
            roommates: roommates,
            // tasks: tasks,
        };
        
        this.onTabPressed = this.onTabPressed.bind(this);
        this.handleActionSubmit = this.handleActionSubmit.bind(this);
        this.handleResetSubmit = this.handleResetSubmit.bind(this);
    }
    
    componentDidMount() {
        this.props.FetchUsers();
    }
    
    handleActionSubmit = async (score) => {
        const res = await this.props.FetchUsers();
        console.log('handleActionSubmit fetch users res');
        console.log(res);
        const {currentUser} = this.props;
        // const {roommates} = this.props;
        console.log(currentUser);
    };
    
    handleResetSubmit = (currentUser, roommates) => {
        // const res = await this.props.FetchUsers();
        // console.log('handleActionSubmit fetch users res');
        // console.log(res);
        // const {currentUser} = this.props;
        // const {roommates} = this.props;
        // console.log('handleResetSubmit');
        // console.log(currentUser);
        // console.log(roommates);
        this.setState({
            score: 0,
            currentUser: currentUser,
            roommates: roommates,
        });
    };
    
    renderHeader() {
        const currentUser = this.props.currentUser;
        // console.log('current user score');
        // console.log(currentUser);
        let score = currentUser ? currentUser.score : 'score';
        
        const {tabSelected} = this.state;
        return (
            <Header
                tabSelected={tabSelected}
                onTabPressed={this.onTabPressed}
                onCreateTaskPressed={() => this.onCreateTaskPressed()}
                currentUser={currentUser}
                score={score}
            />
        );
    }
    
    onTabPressed(tabSelected) {
        console.log(tabSelected);
        this.setState({
            ...this.state,
            tabSelected: tabSelected
        })
    }
    
    onCreateTaskPressed() {
        const navigator = this.props.navigation;
        navigator.navigate('CreateTask');
    }
    
    render() {
        return (
            <View style={{flex: 1, paddingBottom: 10,}}>
                {this.renderHeader()}
                {this.state.tabSelected === 'Overview' &&
                <TaskContainer navigator={this.props.navigation} onAction={this.handleActionSubmit}/>
                }
                {this.state.tabSelected === 'HoF' &&
                <HallOfFameContainer onAction={this.handleActionSubmit} onResetRanking={this.handleResetSubmit}>HoF container</HallOfFameContainer>
                }
            </View>
        );
    }
}

function mapStateToProps(state) {
    // console.log('HOME SCREEN state ---');
    // console.log(state);
    // let currentUser = state.usersData.currentUser;
    //     currentUser.then(currentUser => {
    //     // Get the logged in user.
    //     console.log('currentUser HOME SCREEN ----');
    //     console.log(currentUser);
    //     // Set the user ID in localStorage.
    //     AsyncStorage.setItem('currentUserID', currentUser.id);
    //     // return dispatch({
    //     //     type: USER_LOGGED_IN,
    //     //     currentUser: currentUser,
    //     // });
    // });
    
    // this.props.FetchTasks();
    return {
        // tasks: state.taskData.tasks,
        // score: state.usersData.currentUser.score,
        currentUser: state.usersData.currentUser,
        roommates: state.usersData.users,
    }
}

const mapDispatchToProps = {
    FetchUsers,
    FetchTasks,
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
