import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { addBlueIcon, xSign, starIcon } from "../Utils/Icons";

export default Header = ({score, onCreateTaskPressed, onTabPressed, tabSelected}) => {
    let leftActive = (tabSelected === 'Overview');
    const leftIconStyle = (leftActive) ? [iconLeft, activeTab] : iconLeft;
    const rightIconStyle = (!leftActive) ? [iconRight, activeTab] : iconRight;

    const leftButtonText = (leftActive) ? activebButtonText : buttonText;
    const rightButtonText = (!leftActive) ? activebButtonText : buttonText;

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
                    style={leftIconStyle}
                    onPress={() => onTabPressed('Overview')}
                    title="Overview"
                    accessibilityLabel="Overview"
                >
                    <Text style={leftButtonText}>Overview</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{height: 65}}
                    onPress={onCreateTaskPressed}>
                    <Image
                        style={iconCenterImage}
                        source={addBlueIcon}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    style={rightIconStyle}
                    onPress={() => onTabPressed('HoF')}
                    title="Hall of Fame"
                    accessibilityLabel="Hall of Fame"
                >
                    <Text style={rightButtonText}>Hall of Fame</Text>
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
        justifyContent: 'center',
        textAlign: 'center',
        fontWeight: 'normal',
        fontSize: 20,
    },
    headerContent: {
        fontWeight: 'bold',
        fontSize: 35,
        paddingTop: 5,
        marginBottom: 5,
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
    activebButtonText: {
        fontWeight: 'bold',
        fontSize: 18,
        color: '#222526',
        alignItems: 'center',
        alignSelf: 'center'
    },
    headerXIcon: {
        width: 7,//70,
        height: 15,//75,
        paddingLeft: 10,
        paddingRight: 10,
        marginBottom: 5,
    },
    headerStarIcon: {
        width: 30,//80,
        height: 30,//80,
        paddingLeft: 10,
        // paddingRight: 10
    },
    activeTab: {
        borderBottomWidth: 5,
        borderBottomColor: '#222526'
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
        // marginTop: 12,
        width: 100,
        height: 40,
        paddingLeft: 8,
        paddingRight: 8,
        flex: 1
    },
    iconCenterImage: {
        width: 60,
        height: 65,
        marginLeft: 10,
        marginRight: 10
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

const {headerContainer, headerTitle, headerContent, button, buttonText, activebButtonText, headerXIcon, headerStarIcon, activeTab, iconLeft, iconCenter, iconCenterImage, iconRight} = styles;
