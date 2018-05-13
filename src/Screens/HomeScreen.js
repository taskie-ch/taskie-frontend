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
    
        console.log('HOME props ------');
        const {currentUser} = this.props;
        const {roommates} = this.props;
        // const {tasks} = this.props;
        console.log(currentUser);

        this.state = {
            tabSelected: 'Overview',
            currentUser: currentUser,
            roommates: roommates,
            // tasks: tasks,
        };
        
        this.onTabPressed = this.onTabPressed.bind(this);
        
    }
    
    componentDidMount() {
        this.props.FetchUsers();
    }
    
    renderHeader() {
        const currentUser = this.props.currentUser;
        console.log('current user score');
        console.log(currentUser);
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
            <View>
                {this.renderHeader()}
                {this.state.tabSelected === 'Overview' &&
                <TaskContainer navigator={this.props.navigation}/>
                }
                {this.state.tabSelected === 'HoF' &&
                <HallOfFameContainer>HoF container</HallOfFameContainer>
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
        currentUser: state.usersData.currentUser,
        roommates: state.usersData.users,
    }
}

const mapDispatchToProps = {
    FetchUsers,
    FetchTasks,
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)

// export default connect(mapStateToProps, { FetchUsers, FetchTasks })(HomeScreen)
// export default connect(mapStateToProps, { FetchUsers })(HomeScreen)
