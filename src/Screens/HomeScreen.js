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
        console.log(this.props);
        const {currentUser} = this.props;
        const {roommates} = this.props;
        // const {tasks} = this.props;
        console.log(currentUser);
        console.log(this.props);
        AsyncStorage.setItem('currentUserNickname', currentUser ? currentUser.nickname : '');
        AsyncStorage.setItem('currentUserScore', currentUser ? currentUser.score : 'NaN');
        // AsyncStorage.setItem('roommates', roommates);
    
        // console.log(AsyncStorage.getItem('currentUser'));
        // console.log(AsyncStorage.getItem('roommates'));
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
                <HallOfFameContainer>asf</HallOfFameContainer>
                }
            </View>
        );
    }
}

function mapStateToProps(state) {
    console.log('HOME SCREEN state ---');
    console.log(state);
    
    // this.props.FetchTasks();
    return {
        // tasks: state.taskData.tasks,
        currentUser: state.usersData.currentUser,
        roommates: state.usersData.users,
    }
}

// const mapDispatchToProps = {
//     FetchUsers,
//     // FetchTasks,
// };

// export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)

// export default connect(mapStateToProps, { FetchUsers, FetchTasks })(HomeScreen)
export default connect(mapStateToProps, { FetchUsers })(HomeScreen)
