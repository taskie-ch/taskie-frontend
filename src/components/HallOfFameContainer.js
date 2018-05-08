import Spinner from 'react-native-loading-spinner-overlay';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { ScrollView, Text, View } from 'react-native';

import { FetchUsers } from './../Actions/FetchUsers';
import RoommateScoreCard from './RoommateScoreCard';


class HallOfFameContainer extends Component {

    componentDidMount() {
        this.props.FetchUsers();
    }

    renderRoomateScoreCards() {
        const users = this.props.users;
        
        return users.map(user => {
            console.log('USER');
            console.log(user);
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
        const {contentContainer} = styles;
    
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
            <ScrollView style={ contentContainer }>
                {this.renderRoomateScoreCards()}
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
    
    console.log('STATE');
    console.log(state);
    return {
        users: state.usersData.users
    }
}

export default connect(mapStateToProps, { FetchUsers })(HallOfFameContainer)
