import { connect } from 'react-redux';
import React, { Component } from 'react';
import { View } from 'react-native';
import Header from '../components/Header';
import TaskContainer from '../components/TaskContainer';
import HallOfFameContainer from "../components/HallOfFameContainer";
import { FetchUsers } from './../Actions/FetchUsers';

class HomeScreen extends Component {
    // Sets title of "tab"
    static navigationOptions = {
        title: 'Cleaning Schedule',
    };
    
    constructor(props) {
        super(props);
        
        this.state = {
            tabSelected: 'Overview'
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
                score={score}
            />
        );
    }
    
    onTabPressed(tabSelected) {
        console.log(tabSelected);
        this.setState({
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
    return {
        currentUser: state.usersData.currentUser
    }
}

export default connect(mapStateToProps, { FetchUsers })(HomeScreen)
