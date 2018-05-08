import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { userIcon, starIcon } from '../Utils/Icons';

export default RoommateScoreCard = ({ id, nickname, score}) => {
    
    
    renderStars = () => {
        let children = [];
        for (let i = 0; i < score; i++) {
                children.push(<Image style={starIconStyle} source={starIcon}/>);
        }
        return children;
    };
    
    return (
        <View key={id} style={container}>
            <View style={upperRow}>
                <Image
                    style={profileIcon}
                    source={userIcon}
                />
                <Text></Text>
                {/*<View style={starIconStyleContainer}>*/}
                {this.renderStars()}
                {/*</View>*/}
            </View>
            <View style={lowerRow}>
                <Text style={userNickname}>{score ? score : 0} stars</Text>
                <Text style={userNickname}>{nickname ? nickname : 'T'}</Text>
            </View>
        </View>
    );
};

/* Define some CSS rules for RoommateScoreCard component elements */
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        marginBottom: 20,
        borderBottomColor: "#e5e5e5",
        borderBottomWidth: 3,
        padding: 20
    },
    upperRow: {
        flex: 1,
        flexDirection: 'row',
        height: 20,
        marginBottom: 10
    },
    lowerRow: {
        flex: 1,
        flexDirection: 'row',
        paddingLeft: 35
    },
    profileIcon: {
        width: 35,
        height: 35,
        marginRight: 20,
    },
    userNickname: {
        marginTop: 5,
        marginLeft: 20,
        width: 'auto',
        height: 20,
        fontWeight: 'bold',
    },
    starIconStyleContainer: {
        width: 50,//'100%',//80,
        // height: 20,//80,
        marginLeft: 10,
    },
    starIconStyle: {
        width: 20,//80,
        height: 20,//80,
        paddingLeft: 10,
        paddingRight: 10
    },
});

const {
    container,
    upperRow,
    lowerRow,
    profileIcon,
    userNickname,
    starIconStyleContainer,
    starIconStyle,
} = styles;
