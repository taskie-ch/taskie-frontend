import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { addBlueIcon, xSign, starIcon } from "../Utils/Icons";

export default Header = ({score, navigator}) => {
    
    return (
        <View style={headerContainer}>
            <View>
                <Text style={headerTitle}>Your Score</Text>
                <Text style={headerContent}>
                    {score ? score : '3'}
                    <Text> </Text>
                    <Image style={headerXIcon} source={xSign}/>
                    <Text> </Text>
                    <Image style={headerStarIcon} source={starIcon}/>
                </Text>
            </View>
            
            <View style={button}>
                <TouchableOpacity
                    style={iconLeft}
                    onPress={() => navigator.navigate('CreateTask')}
                    title="Overview"
                    accessibilityLabel="Overview"
                >
                    <Text style={buttonText}>Overview</Text>
                </TouchableOpacity>
                <Image
                    style={iconCenter}
                    source={addBlueIcon}
                />
                <TouchableOpacity
                    style={iconRight}
                    onPress={() => navigator.navigate('CreateTask')}
                    title="Hall of Fame"
                    accessibilityLabel="Hall of Fame"
                >
                    <Text style={buttonText}>Hall of Fame</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    headerContainer: {
        alignItems: "center",
    },
    headerTitle: {
        fontWeight: "normal",
        fontSize: 20,
    },
    headerContent: {
        fontWeight: "bold",
        fontSize: 30,
        marginBottom: 10,
    },
    button: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 15,
        justifyContent: 'center',
    },
    buttonText: {
        fontSize: 18,
        color: '#6d7071',
        alignItems: 'center',
        alignSelf: 'center'
    },
    headerXIcon: {
        width: 7,
        height: 15,
        paddingLeft: 10,
        paddingRight: 10,
        marginBottom: 5,
    },
    headerStarIcon: {
        width: 30,
        height: 30,
        paddingLeft: 10,
        paddingRight: 10
    },
    iconLeft: {
        marginTop: 12,
        width: 100,
        height: 40,
        padding: 8,
        alignItems: 'flex-start',
        backgroundColor: '#dee1e2',
        flex: 2
    },
    iconCenter: {
        width: 40,
        height: 65,
        flex: 1
    },
    iconRight: {
        marginTop: 12,
        width: 100,
        height: 40,
        padding: 8,
        flex: 2,
        alignItems: 'center',
        backgroundColor: '#dee1e2',
    },
    fullWidthButton: {
        backgroundColor: 'blue',
        height: 70,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    fullWidthButtonText: {
        fontSize: 24,
        color: 'white'
    }
});

const {headerContainer, headerTitle, headerContent, headerXIcon, headerStarIcon, button, buttonText, iconLeft, iconCenter, iconRight} = styles;
