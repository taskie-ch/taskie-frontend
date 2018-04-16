import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { addBlueIcon } from "../Utils/Icons";

export default Header = ({navigator}) => {
    
    return (
        <View style={headerContainer}>
            <Text style={header}>Your Score</Text>
            <TouchableOpacity style={button} onPress={() => navigator.navigate('CreateTask')}>
                <Image
                    style={icon}
                    source={addBlueIcon}
                />
            </TouchableOpacity>
        </View>
    )
};

const styles = StyleSheet.create({
    headerContainer: {
        display: "flex",
        marginTop: 15,
        alignItems: "center",
    },
    header: {
        fontWeight: "bold",
        fontSize: 20,
    },
    button: {
        marginTop: 30,
        width: 60,
        alignItems: 'center',
    },
    icon: {
        width: 50,
        height: 50,
    }
});

const { headerContainer, header, button, icon } = styles;
