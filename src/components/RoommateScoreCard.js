import React from 'react';
import { View, Text, Image } from 'react-native';
import { userIcon, starIcon } from '../Utils/Icons';
import styles from './../styles';

const RoommateScoreCard = ({ id, nickname, score}) => {

    const renderStars = () => {
        let children = [];
        for (let i = 0; i < score; i++) {
                children.push(<Image style={starIconStyle} source={starIcon}/>);
        }
        return children;
    };
    
    return (
        <View key={id} style={[shadowStyle, taskCardContainer]}>
            <View style={upperRow}>
                <Image
                    style={profileIcon}
                    source={userIcon}
                />
                <View style={starIconStyleContainer}>
                    {renderStars()}
                </View>
            </View>
            <View style={lowerRow}>
                <Text style={taskAssignee}>{nickname ? nickname : 'T'}</Text>
                <Text style={scoreStyle}>{score ? score : 0} stars</Text>
            </View>
        </View>
    );
};

const {
    shadowStyle,
    taskCardContainer,
    upperRow,
    lowerRow,
    profileIcon,
    scoreStyle,
    taskAssignee,
    starIconStyleContainer,
    starIconStyle,
} = styles;

export default RoommateScoreCard;
