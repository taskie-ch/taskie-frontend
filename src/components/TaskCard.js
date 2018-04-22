import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import { userIcon } from '../Utils/Icons';


export default TaskCard = ({ id, title, frequency, start, effort, done, user, taskCardPressed}) => {
    return (
        <TouchableOpacity key={id} style={container} onPress={ taskCardPressed }>
            <View style={upperRow}>
                <Image
                    style={profileIcon}
                    source={userIcon}
                />
                <Text style={taskTitle}>{title}</Text>
                {/*<Text style={taskFrequency}>{frequency ? frequency : 'frequency'}</Text>*/}
            </View>
            <View style={lowerRow}>
                <Text style={taskStart}>{start ? start : 'start'}</Text>
                {/*<Text style={taskEffort}>{effort ? effort : 'effort'}</Text>*/}
                <Text style={taskTitle}>Assigned to: {user ? user : 'user name'}</Text>
            </View>
        </TouchableOpacity>
    );
};

/* Define some CSS rules for TaskCard component elements */
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
    },
    taskTitle: {
        marginTop: 5,
        marginLeft: 20,
        marginRight: 5,
        width: 'auto',
        height: 20,
        fontWeight: 'bold',
    },
    taskFrequency: {
        marginTop: 5,
        width: 'auto',
        height: 20,
        marginRight: 10,
        fontWeight: 'bold',
    },
    taskStart: {
        marginTop: 5,
        marginLeft: 20,
        width: 'auto',
        height: 20,
        marginRight: 10,
    },
    taskEffort: {
        marginTop: 5,
        width: 'auto',
        height: 20,
    }
});

const {
    container,
    upperRow,
    lowerRow,
    profileIcon,
    taskTitle,
    taskFrequency,
    taskStart,
    taskEffort
} = styles;
