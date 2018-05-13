import { Platform, StyleSheet } from 'react-native';
import { Constants } from 'expo';
// import React, { Component } from 'react';

// let React = require('react-native');
//
// let {
//     StyleSheet,
// } = React;

// module.exports = StyleSheet.create({
//
//     alwaysred: {
//         backgroundColor: 'red',
//         height: 100,
//         width: 100,
//     },
//
// });

/* Define some CSS rules */
const styles = StyleSheet.create({
    shadowStyle: {
        marginRight: 10,
        marginLeft: 10,
        ...Platform.select({
            ios: {
                // backgroundColor: 'red',
                // ios
                // boxShadow: 1, // taskCardContainer: 1,
                shadowOpacity: 0.5, // taskCardContainer: //0.15,
                shadowColor: 'rgba(27, 49, 87, 1)',
                shadowRadius: 10, // taskCardContainer: 5,
                shadowOffset: {
                    height: 0.1,
                    width: 0.1,
                },
            },
            android: {
                // backgroundColor: 'blue',
                // android2
                // boxShadow: 1, // taskCardContainer: 1,
                shadowColor: 'rgba(27, 49, 87, 1)',
                elevation: 1, // = shadow
            },
        }),
    },
    // CreateTaskScreen.js, 'just for debug'-div
    // createTaskScreenDebugContainer: {
    //     // height: Platform.OS === 'ios' ? 200 : 100,
    //     marginTop: 10,
    //     marginLeft: 20,
    // },

    // LoginForm.js & SignInScreen.js ---------------------------------
    loginFormContainer: {
        justifyContent: 'center',
        padding: 20,
        marginTop: 20,
        marginRight: 10,
        marginLeft: 10,
        backgroundColor: '#ffffff',
    },
    loginFormButton: {
        height: 36,
        backgroundColor: '#48BBEC',
        borderColor: '#48BBEC',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 10,
        alignSelf: 'stretch',
        justifyContent: 'center',
    },
    loginFormButtonText: {
        fontSize: 18,
        color: 'white',
        alignSelf: 'center',
    },
    // paddingVertical: {
    //     paddingVertical: 20
    // },

    // Header.js ---------------------------------------
    headerContainer: {
        alignItems: 'center',
    },
    headerTitle: {
        justifyContent: 'center',
        textAlign: 'center',
        fontWeight: 'normal',
        fontSize: 20,
    },
    headerContent: {
        paddingTop: 5,
        marginBottom: 5,
        fontWeight: 'bold',
        fontSize: Platform.OS === 'ios' ? 35 : 55,
    },
    headerXIcon: {
        width: Platform.OS === 'ios' ? 7 : 50,//70, // android1
        height: Platform.OS === 'ios' ? 15 : 45,//75, // android1
        paddingRight: 10,
        paddingLeft: 10,
        marginBottom: 5,
    },
    headerStarIcon: {
        width: Platform.OS === 'ios' ? 30 : 60,//80, // android1
        height: Platform.OS === 'ios' ? 30 : 60,//80, // android1
        paddingLeft: 10,
        // paddingRight: 10
    },
    headerButton: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 15,
    },
    headerActiveButton: {
        borderBottomWidth: 5,
        borderBottomColor: '#222526',
    },
    headerButtonText: {
        alignItems: 'center',
        alignSelf: 'center',
        color: '#6d7071',
        fontSize: 18,
    },
    headerActiveButtonText: {
        alignItems: 'center',
        alignSelf: 'center',
        color: '#222526',
        fontWeight: 'bold',
        fontSize: 18,
    },
    headerIconLeft: {
        flex: 2,
        alignItems: 'flex-start',
        width: 100,
        height: 40,
        padding: 8,
        marginTop: 12,
        backgroundColor: '#dee1e2',
    },
    // headerIconCenter: {
    //     // marginTop: 12,
    //     width: 100,
    //     height: 40,
    //     paddingLeft: 8,
    //     paddingRight: 8,
    //     flex: 1
    // },
    headerIconCenterImage: {
        width: 60,
        height: 65,
        marginRight: 10,
        marginLeft: 10,
    },
    headerIconRight: {
        flex: 2,
        alignItems: 'center',
        width: 100,
        height: 40,
        padding: 8,
        marginTop: 12,
        backgroundColor: '#dee1e2',
    },
    // headerFullWidthButton: {
    //     backgroundColor: 'blue',
    //     height: 70,
    //     flexDirection: 'row',
    //     justifyContent: 'center',
    //     alignItems: 'center'
    // },
    // headerFullWidthButtonText: {
    //     fontSize: 24,
    //     color: 'white'
    // }
    
    // TaskContainer.js --------------------------------
    taskContainerBody: {
        paddingBottom: 100,
        marginTop: 70,
    },
    
    // HallOfFameContainer.js --------------------------
    hofButton: {
        flex: 1,
        flexDirection: 'row',
        textAlign: 'center',
        alignSelf: 'stretch',
        justifyContent: 'center',
        // width: 100,
        height: 36,
        marginTop: 15,
        marginRight: 10,
        // marginBottom: 10,
        marginLeft: 10,
        backgroundColor: 'danger',
        borderColor: 'red',
        borderWidth: 1,
        borderRadius: 8,
    },
    hofButtonText: {
        alignSelf: 'center',
        color: 'red',
        fontSize: 18,
    },
    
    // RoommateScoreCard.js ------------------------------
    scoreStyle: {
        flex: 5,
        flexDirection: 'row',
        width: 'auto',
        height: 20,
        marginTop: 4,
        marginBottom: 6,
        marginLeft: Platform.OS === 'ios' ? 5 : 20,
        fontWeight: 'bold',
        fontSize: 17,
    },
    starIconStyleContainer: {
        flex: 1,
        flexDirection: 'row',
        width: 'auto',// 50,//'100%',//80,
        // height: Platform.OS === 'ios' ? 20 : 80,
        marginLeft: 20,
    },
    starIconStyle: {
        width: Platform.OS === 'ios' ? 20 : 80,
        height: Platform.OS === 'ios' ? 20 : 80,
        paddingRight: 10,
        paddingLeft: 10,
        marginTop: 7,
    },

    // TaskCard.js -------------------------------------
    taskCardContainer: {
        // shadowStyle + ...
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 20,
        marginTop: 5,
        // borderColor: "#e5e5e5",
        borderColor: "#c5c5c5",
        borderWidth: 3,
        ...Platform.select({
            ios: {
                // backgroundColor: 'red',
                // ios
                boxShadow: 1,
                shadowOpacity: 0,
                shadowRadius: 5,
            },
            android: {
                // backgroundColor: 'blue',
                // android2
                boxShadow: 1,
            },
        }),
    },
    upperRow: {
        flex: 1,
        flexDirection: 'row',
        height: 20,
        marginBottom: 10,
    },
    lowerRow: {
        flex: 1,
        flexDirection: 'row',
        paddingTop: 15,
    },
    profileIcon: {
        width: 35,
        height: 35,
    },
    taskTitle: {
        flex: 1,
        flexDirection: 'row',
        width: 'auto',
        height: 20,
        marginTop: 5,
        marginRight: 5,
        marginLeft: Platform.OS === 'ios' ? 20 : 35,
        fontWeight: 'bold',
        fontSize: 17,
    },
    // taskFrequency: {
    //     width: 'auto',
    //     height: 20,
    //     marginTop: 5,
    //     marginRight: 10,
    //     fontWeight: 'bold',
    // },
    taskStart: {
        flex: 3,
        flexDirection: 'row',
        width: 'auto',
        height: 20,
        marginTop: 5,
        marginRight: 10,
        marginLeft: Platform.OS === 'ios' ? 5 : 20,
        fontSize: 16,
    },
    // taskEffort: {
    //     width: 'auto',
    //     height: 20,
    //     marginTop: 5,
    // },
    taskAssignee: {
        flex: 1,
        flexDirection: 'row',
        textAlign: 'left',
        width: Platform.OS === 'ios' ? 'auto' : 5,
        height: 20,
        marginTop: 5,
        // marginRight: 5,
        // marginLeft: 10,
        fontWeight: 'bold',
        fontSize: 15,
    },
    taskCardButton: {
        flex: 2,
        flexDirection: 'row',
        textAlign: 'right',
        // alignSelf: 'stretch',
        justifyContent: 'center',
        width: 10,
        height: 30,
        borderRadius: 8,
    },
    taskCardButtonText: {
        alignSelf: 'center',
        // color: 'white',
        color: '#000',
        // textColor: '#000',
        fontWeight: 'bold',
        fontSize: 17,
    },

    // SortableForm.js ---------------------------------
    sortableFormContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        // justifyContent: 'center',
        alignItems: 'center',
        // paddingTop: Constants.statusBarHeight,
        // paddingTop: 10,
        // backgroundColor: '#ecf0f1',
        // backgroundColor: 'powderblue',
    },
    sortedContainer: {
        // flex: 1,
        // flexDirection: 'row',
        width: Platform.OS === 'ios' ? 200 : 250,
        height: 100,
        marginBottom: 10,
        backgroundColor: 'rgba(67, 145, 240, 1)',
    },
    listContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    listItem: {
        alignItems: 'center',
        borderRadius: 15,
        // backgroundSize: 0.5,
        // + shadowStyle
        ...Platform.select({
            ios: {
                // backgroundColor: 'red',
                // ios
                width: 90,
                height: 100,
            },
            android: {
                // backgroundColor: 'blue',
                // android2
                width: 100,
                height: 85,
            },
        }),
    },
    pictureContainer: {
        // flex: 1,
        alignSelf: 'center',
        width: Platform.OS === 'ios' ? 30 : 55,
        height: 66,
        marginTop: 5,
        // marginBottom: 10,
        // borderRadius: 75,
        // backgroundColor: 'rgba(27, 100, 100, 0.5)',
    },
    pictureStyle: {
        flex: 0.9,
        alignSelf: 'center',
        justifyContent:'center',
        width: 66,
        height: 58,
        resizeMode: 'contain',
    },
    captionStyle: {
        textAlign: 'center',
        alignContent: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        paddingTop: 4,
        fontWeight: 'bold',
        fontSize: 17,
        backgroundColor: '#ecf0f1',
        ...Platform.select({
            ios: {
                // backgroundColor: 'red',
                // ios
                verticalAlign: 'center',
                width: 100,
                height: 30,
            },
            android: {
                // backgroundColor: 'blue',
                // android2
                flex: 1,
                textAlignVertical: 'center',
                width: 65,
                height: 300,//150,
                paddingBottom: 4,
                marginBottom: 30,
            },
        }),
    },
    disabledCaptionStyle: {
        ...Platform.select({
            ios: {
                // backgroundColor: 'red',
                // ios
                opacity: 0.5,
            },
            android: {
                // backgroundColor: 'blue',
                // android2
                elevation: 1, // = shadow
            },
        }),
    },
    
    // CreateTaskForm.js ----------------------------
    createTaskFormButton: {
        // loginFormButton + ...
        marginTop: 125,
    },
    createTaskFormDeleteButton: {
        // loginFormButton + ...
        backgroundColor: '#ec4f69',
        borderColor: '#ec4f69',
        marginTop: 5,
    },
    usersRotationContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        // height: 100,
        // paddingTop: Constants.statusBarHeight,
        // backgroundColor: '#ecf0f1',
    },
    createTaskFormParagraph: {
        marginBottom: 7,
        // color: '#34495e',
        color: '#000',
        fontWeight: 'normal',
        fontSize: 17,
    },
});


// const { container, taskContainerBody } = styles;

export default styles;
