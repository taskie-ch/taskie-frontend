import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import { userIcon } from '../Utils/Icons';


export default TaskCard = ({ id, title, frequency, start, effort, done, taskCardPressed}) => {
    return (
        <TouchableOpacity key={id} style={container} onPress={ taskCardPressed }>
            <View style={upperRow}>
                <Image
                    style={profileIcon}
                    source={userIcon}
                />
                <Text style={taskTitle}>{title}</Text>
                <Text style={taskFrequency}>{frequency}</Text>
            </View>
            <View style={lowerRow}>
                <Text style={taskStart}>{start}</Text>
                <Text style={taskEffort}>{effort}</Text>
                <Text style={taskTitle}>Is done: {done ? "Done" : "In Progress"}</Text>
            </View>
        </TouchableOpacity>
    );
};

/* Define some CSS rules for TaskCard component elements */
const styles = StyleSheet.create({
    container: {
        display: "flex",
        marginBottom: 20,
        borderBottomColor: "#e5e5e5",
        borderBottomWidth: 3,
        padding: 20
    },
    upperRow: {
        display: "flex",
        flexDirection: "row",
        marginBottom: 15
    },
    lowerRow: {
        display: "flex",
        flexDirection: "row",
        paddingLeft: 50
    },
    profileIcon: {
        width: 35,
        height: 35,
    },
    taskTitle: {
        marginTop: 10,
        marginLeft: 20,
        marginRight: 5,
        fontWeight: "bold",
    },
    taskFrequency: {
        marginTop: 10,
        marginLeft: "auto",
        marginRight: 10,
        fontWeight: "bold",
    },
    taskStart: {
        marginTop: 10,
        marginLeft: "auto",
        marginRight: 10,
        fontWeight: "bold",
    },
    taskEffort: {
        marginTop: 10,
        marginLeft: 5,
        marginRight: 20
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
