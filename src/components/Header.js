import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { addBlueIcon, xSign, starIcon } from "../Utils/Icons";
import styles from './../styles';

export default Header = ({currentUser, score, onCreateTaskPressed, onTabPressed, tabSelected}) => {
    let leftActive = (tabSelected === 'Overview');
    const leftIconStyle = (leftActive) ? [headerIconLeft, headerActiveButton] : headerIconLeft;
    const rightIconStyle = (!leftActive) ? [headerIconRight, headerActiveButton] : headerIconRight;

    const leftButtonText = (leftActive) ? headerActiveButtonText : headerButtonText;
    const rightButtonText = (!leftActive) ? headerActiveButtonText : headerButtonText;
    
    console.log('currentUser in HEADER');
    console.log(currentUser);

    return (
        <View style={headerContainer}>
            <View style={headerContainer}>
                <Text style={headerTitle}>{currentUser ? currentUser.nickname : 'NM'}'s Score</Text>
                <Text style={headerContent}>
                    {score !== null ? score : '3'}
                    <Text> </Text>
                    <Image style={headerXIcon} source={xSign}/>
                    <Text> </Text>
                    <Image style={headerStarIcon} source={starIcon}/>
                </Text>
            </View>

            <View style={headerButton}>
                <TouchableOpacity
                    style={leftIconStyle}
                    onPress={() => onTabPressed('Overview')}
                    title='Overview'
                    accessibilityLabel='Overview'
                >
                    <Text style={leftButtonText}>Overview</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{height: 65}}
                    onPress={onCreateTaskPressed}>
                    <Image
                        style={headerIconCenterImage}
                        source={addBlueIcon}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    style={rightIconStyle}
                    onPress={() => onTabPressed('HoF')}
                    title='Hall of Fame'
                    accessibilityLabel='Hall of Fame'
                >
                    <Text style={rightButtonText}>Hall of Fame</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
};

const {
    headerContainer,
    headerTitle,
    headerContent,
    headerXIcon,
    headerStarIcon,
    headerButton,
    headerActiveButton,
    headerButtonText,
    headerActiveButtonText,
    headerIconLeft,
    headerIconCenterImage,
    headerIconRight
} = styles;
