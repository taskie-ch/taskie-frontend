import { connect } from 'react-redux';
import React, { Component } from 'react';
import { View } from 'react-native';
import Header from '../components/Header';
import TaskContainer from '../components/TaskContainer';
import FetchUser from './../Actions/FetchUser';

class HomeScreen extends Component {
    // Sets title of "tab"
    static navigationOptions = {
        title: 'Cleaning Schedule',
    };
    
    componentDidMount() {
        this.props.FetchUser();
    }

    renderHeader() {
        const user = this.props.user;
        let score = user ? user.score : 'score';
        return (
            <Header
                score={score}
                navigator={this.props.navigation}
            />
        );
    }

    render() {
        return (
            <View>
                {/*<Header navigator={this.props.navigation}/>*/}
                {this.renderHeader()}
                <TaskContainer navigator={this.props.navigation}/>
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.userData.user
    }
}

export default connect(mapStateToProps, { FetchUser })(HomeScreen)
