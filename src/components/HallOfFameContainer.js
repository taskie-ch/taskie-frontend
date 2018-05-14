import Spinner from 'react-native-loading-spinner-overlay';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { ScrollView, Text, TouchableHighlight, View } from 'react-native';

import { FetchUsers } from './../Actions/FetchUsers';
import RoommateScoreCard from './RoommateScoreCard';
import styles from './../styles';


class HallOfFameContainer extends Component {
    
    constructor(props) {
        // console.log('HoF PROPS');
        // console.log(props);
        super(props);
        const {roommates} = this.props;
        // const usersRotation = this.resetRoommates(roommates);
        // console.log(usersRotation);
        
        this.state = {
            roommates: roommates,
        };
        
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    updateHeader = () => {
        const {currentUser} = this.props;
        console.log('HoF currentUser');
        console.log(currentUser);
        this.props.onAction(currentUser.score);
    };
    
    /* 'Reset ranking' submit function */
    handleSubmit() {
        // Save the Task instance as 'value'.
        // let value = this._form.getValue();
        
        // Get the usersRotation's ID order.
        // let usersID = [];
        // const sorted = this.state.sorted.slice();
        // sorted.map(item => { usersID.push(item.id); });
        const {roommates} = this.props;
        
        // If validation fails, value will be null.
        if (roommates) {
            this.resetRoommates(roommates);
            // value = {
            //     title: value.title,
            //     frequency: value.frequency,
            //     start: value.start,
            //     effort: value.effort,
            //     usersRotation: usersID,
            // };
            // The onFormSubmit function was passed down as a prop from App.js
            this.props.onFormSubmit(roommates);
        }
    }

    componentDidMount() {
        this.props.FetchUsers();
        this.updateHeader();
    }
    
    resetRoommates(roommates) {
        // Set all usersRotation's roomies isEnabled back to true.
        let usersRotation = [];
        roommates.map(roomie => {
            roomie = {
                id: roomie ? roomie.id : null,
                nickname: roomie ? roomie.nickname : null,
                score: 0,
                isEnabled: true,
            };
            usersRotation.push(roomie);
        });
        
        this.setState({
            ...this.state,
            roommates: usersRotation,
        });
        
        return usersRotation;
    }

    renderRoomateScoreCards() {
        let users = this.props.users;
        users = (users.length > 1) ? users.sort(function(user1, user2){return user1.score - user2.score}).reverse() : [];
        return users.map(user => {
                return <RoommateScoreCard
                    key={`${user.id}`}
                    id={user.id}
                    nickname={user.nickname.toUpperCase()}
                    score={user.score}
                />
            }
        )
    }

    render() {
        const {users} = this.props;
    
        if (users.isFetching) {
            return (
                <View>
                    <Spinner
                        visible={users.isFetching}
                        textContent={"Loading..."}
                        textStyle={{color: '#253145'}}
                        animation="fade"
                    />
                </View>
            )
        }

        return (
            <ScrollView style={styles.taskContainerBody}>
                <View style={{flex: 1, flexDirection: 'column',}}>
                    {this.renderRoomateScoreCards()}
                </View>
                <TouchableHighlight style={styles.hofButton} onPress={this.handleSubmit} underlayColor='#99d9f4'>
                    <Text style={styles.hofButtonText}>{'Reset ranking'}</Text>
                </TouchableHighlight>
            </ScrollView>
        )
    }
}

function mapStateToProps(state) {
    
    // console.log('HoF STATE ------');
    // console.log(state);
    return {
        currentUser: state.usersData.currentUser,
        users: state.usersData.users
    }
}

export default connect(mapStateToProps, { FetchUsers })(HallOfFameContainer)
