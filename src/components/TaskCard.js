import React from 'react';
import {
    View, Text, Image, TouchableOpacity, Button, TouchableHighlight,
} from 'react-native';
import { userIcon } from '../Utils/Icons';
import styles from './../styles';


export default TaskCard = ({ id, title, start, done, user, currentUser, taskCardPressed, taskDone, taskSkip, taskIWillDoIt}) => {
    const dateNow = new Date(new Date().setHours(0, 0, 0, 0));
    const dateDue = new Date(start);
    const DateDiff = require('date-diff');
    const diff = new DateDiff(dateNow, dateDue);

    const renderBotton = (rowLevel) => {
        const isCurrentUser = user === currentUser.nickname.toUpperCase();
        const isExpired = diff.days() > 0;

        let buttonStyle = null;
        let buttonTitle = null;
        let onButtonPressed = null;
        switch (rowLevel) {
            case 'upper':
                if (isExpired && isCurrentUser) {
                    // ios
                    buttonStyle = [taskCardButton, {flex: 0.63, flexDirection: 'row', backgroundColor: '#ec4f69',}];
                    buttonTitle = 'Skip';
                    onButtonPressed = taskSkip;
                } else if (!isExpired && isCurrentUser) {
                    buttonStyle = null;
                    buttonStyle = null;
                    onButtonPressed = null;
                } else {
                    buttonStyle = [taskCardButton, {flex: 0.63, flexDirection: 'row', backgroundColor: '#ecad47',}];
                    buttonTitle = 'Remind';
                    onButtonPressed = taskDone;
                }
                break;
            case 'lower':
                if (isCurrentUser) {
                    buttonStyle = [taskCardButton, {backgroundColor: '#44a255',}];
                    buttonTitle = 'Done';
                    onButtonPressed = taskDone;
                } else {
                    buttonStyle = [taskCardButton, {backgroundColor: '#44a255',}];
                    buttonTitle = "I'll do it!";
                    onButtonPressed = taskIWillDoIt;
                }
                break;
            default:
                buttonStyle = taskCardButton;
                buttonTitle = 'Done';
                onButtonPressed = taskDone;
        }
        
        if (buttonStyle && buttonTitle) {
    
            return (
                <TouchableHighlight style={buttonStyle} onPress={onButtonPressed} underlayColor='#99d9f4'>
                    <Text style={taskCardButtonText}>{buttonTitle}</Text>
                </TouchableHighlight>
            );
        } else {
            return '';
        }
    };
        
        
        {/*<TouchableWithoutFeedback style={[taskCardButton, {backgroundColor: '#44a255',}]} onPress={onButtonPressed} underlayColor='#99d9f4' disabled>*/}
    {/*/!*<Text style={taskCardButtonText}>{'Done'}</Text>*!/*/}
    {/*<Text> </Text>*/}
    {/*</TouchableWithoutFeedback>}*/}
    
    return (
        <TouchableOpacity key={id} style={[shadowStyle, taskCardContainer]} onPress={ taskCardPressed }>
            <View style={upperRow}>
                <Image
                    style={profileIcon}
                    source={userIcon}
                />
                <Text style={taskTitle}>{title}</Text>
                {renderBotton('upper')}
                {/*<Button style={taskCardButton} title={buttonTitle} onPress={() => this.onSubmit()}/>*/}
            </View>
            <View style={lowerRow}>
                <Text style={taskAssignee}>{user ? user : 'user name'}</Text>
                {user === currentUser.nickname.toUpperCase() ?
                <Text style={taskStart}>{start ? start : 'start'}</Text> :
                <Text style={[taskStart, {flex: 3, flexDirection: 'row',}]}>{start ? start : 'start'}</Text>}
                {renderBotton('lower')}
            </View>
        </TouchableOpacity>
    );
};

const {
    shadowStyle,
    taskCardContainer,
    upperRow,
    lowerRow,
    profileIcon,
    taskTitle,
    taskStart,
    taskAssignee,
    taskCardButton,
    taskCardButtonText,
} = styles;
