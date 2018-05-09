import React, { Component } from 'react';
import { Text, View, StyleSheet, Button, Image, TouchableHighlight } from 'react-native';
import { Constants } from 'expo';
import { userIcon } from '../Utils/Icons';

export default class SortableForm extends Component {
    
    popItemIntoUnsortedList(item) {
        const unsorted = this.props.unsorted.slice();
        const sorted = this.props.sorted.slice();
        item.isEnabled = !item.isEnabled;
        this.popIntoOtherList(item, sorted, unsorted);
        this.props.onSortChange({
            unsorted: unsorted,
            sorted: sorted
        })
    }
    
    popItemIntoSortedList(item) {
        const unsorted = this.props.unsorted.slice();
        const sorted = this.props.sorted.slice();
        item.isEnabled = !item.isEnabled;
        this.popIntoOtherList(item, unsorted, sorted);
        
        this.props.onSortChange({
            unsorted: unsorted,
            sorted: sorted
        })
    }
    
    popIntoOtherList(item, fromList, toList) {
        const fromIndex = fromList.indexOf(item);
        const toIndex = fromList.indexOf(item);
        // console.log('ITEM');
        // console.log(item);
        // console.log(index);
        fromList.splice(fromIndex, 1);
        toList.splice(fromIndex, 1);
        // toList.push(item);
        if (item.isEnabled) {
            fromList = fromList.reverse();
            // toList = toList.reverse();
            let nextEnabledIndex = fromList.findIndex((fromElement) => { return fromElement.isEnabled === true; });
            fromList.splice(nextEnabledIndex, 0, item);
            fromList.reverse();
            toList.push(item);
        } else {
            fromList.push(item);
        }
        
        // for (let i = 0; i < fromList.length; i++) {
        //     if
        //     children.push(<Image style={starIconStyle} source={starIcon}/>);
        // }
    }
    
    onSubmit() {
        const sorted = this.props.sorted.slice();
        const unsorted = this.props.unsorted.slice();
        this.props.submit({
            sorted: sorted,
            unsorted: unsorted
        })
    }
    
    render() {
        const {sorted, unsorted} = this.props;
        const flexRatio = (unsorted.length) ? 1/unsorted.length : 1/sorted.length;
        const profilePictureContainerSizeStyle = [styles.listItem, {flex: flexRatio,}];
        
        return (
            <View style={styles.container}>
                
                {/*<View style={styles.listContainer}>*/}
                    {/*{*/}
                        {/*sorted.map(item => {*/}
                            {/*return (*/}
                                {/*<View style={[profilePictureContainerSizeStyle, {backgroundColor: 'green',}]}>*/}
                                {/*/!*<View style={styles.listItem}>*!/*/}
                                    {/*<ClickableImageWithCaption caption={this.props.itemsFormat(item)} onPress={() => this.popItemIntoUnsortedList(item)}/>*/}
                                    {/*/!*<ClickableImageWithCaption caption={this.props.itemsFormat(item)} imageSrc={userIcon} onPress={() => this.popItemIntoUnsortedList(item)}/>*!/*/}
                                {/*</View>*/}
                            {/*);*/}
                        {/*})*/}
                    {/*}*/}
                {/*</View>*/}
                
                <View style={styles.listContainer}>
                    {
                        unsorted.map(item => {
                            return (
                                <View style={item.isEnabled ? [profilePictureContainerSizeStyle, {backgroundColor: 'rgba(67, 145, 240, 0.75)',}] : [profilePictureContainerSizeStyle, {backgroundColor: 'rgba(192, 196, 197, 0.5)',}]}>
                                    <ClickableImageWithCaption caption={this.props.itemsFormat(item)} selectedItem={item} onPress={() => this.popItemIntoSortedList(item)}/>
                                </View>
                            );
                        })
                    }
                </View>
    
                {/*<View style={styles.listContainer}>*/}
                    {/*/!*<Text style={{marginTop: 50, color: '#000',fontSize: 50,}}>Selected order:</Text>*!/*/}
                    {/*<Text style={{color: '#000', fontSize: 50,}}>Selected order:</Text>*/}
                {/*</View>*/}
    
                {/*<View style={[styles.listContainer, {marginTop: 30, marginBottom: 30, backgroundColor: 'rgba(67, 145, 240, 1)',}]}>*/}
                {/*<View style={[styles.listContainer, {backgroundColor: 'rgba(67, 145, 240, 1)',}]}>*/}
                {/*<View style={styles.listContainer}>*/}
                    {/*{*/}
                        {/*sorted.map(item => {*/}
                            {/*return (*/}
                                {/*<View style={profilePictureContainerSizeStyle}>*/}
                                    {/*/!*<View style={item.isEnabled ? [profilePictureContainerSizeStyle, {backgroundColor: 'powderblue',}] : [profilePictureContainerSizeStyle, {backgroundColor: 'green',}]}>*!/*/}
                                    {/*/!*<View style={styles.listItem}>*!/*/}
                                    {/*<SortedNicknameList sortedElement={item}/>*/}
                                    {/*/!*<Text style={styles.captionStyle}>{item.nickname}</Text>*!/*/}
                                    {/*/!*<ClickableImageWithCaption caption={this.props.itemsFormat(item)} imageSrc={userIcon} onPress={() => this.popItemIntoSortedList(item)}/>*!/*/}
                                {/*</View>*/}
                            {/*);*/}
                        {/*})*/}
                    {/*}*/}
                {/*</View>*/}
                {/*<View>*/}
                    {/*<View style={styles.listContainer}>*/}
                        {/*{*/}
                            {/*// sorted.map(item => <View style={profilePictureContainerSizeStyle}><Text style={styles.captionStyle}>{item.nickname}</Text></View>)*/}
                            {/*sorted.map(item => { return (*/}
                                    {/*<View style={profilePictureContainerSizeStyle}>*/}
                                        {/*/!*<SortedNicknameList viewStyle={profilePictureContainerSizeStyle} sortedElement={item}/>*!/*/}
                                        {/*<Text style={styles.captionStyle}>{item.nickname}</Text>*/}
                                    {/*</View>*/}
                                    {/**/}
                                {/*)}*/}
                                {/*)*/}
                        {/*}*/}
                    {/*</View>*/}
                {/*</View>*/}
                
                {/*<Button title={'Submit'} onPress={() => this.onSubmit()}/>*/}
            </View>
        );
    }
}

const SortedNicknameList = ({viewStyle, sortedElement}) => {
    return (
        <View style={viewStyle}>
        {/*<View style={{marginTop: 110, backgroundColor: 'rgba(67, 145, 240, 1)', justifyContent: 'space-between',}}>*/}
            {/*<View style={item.isEnabled ? [profilePictureContainerSizeStyle, {backgroundColor: 'powderblue',}] : [profilePictureContainerSizeStyle, {backgroundColor: 'green',}]}>*/}
            {/*<View style={styles.listItem}>*/}
            {/*<SortedNicknameList sortedElement={item}/>*/}
            <Text style={styles.captionStyle}>{sortedElement.nickname}</Text>
            {/*<ClickableImageWithCaption caption={this.props.itemsFormat(item)} imageSrc={userIcon} onPress={() => this.popItemIntoSortedList(item)}/>*/}
        </View>
    )
    // return (
    //     <Text style={styles.captionStyle}>{sortedElement.nickname}</Text>
    // )
};

// const ClickableImageWithCaption = ({caption, imageSrc, onPress}) => {
const ClickableImageWithCaption = ({caption, selectedItem, onPress}) => {
    const picStyle = selectedItem.isEnabled ? [styles.pictureStyle] : [styles.pictureStyle, {opacity: 0.5,}];
    const captionStyle = selectedItem.isEnabled ? [styles.captionStyle] : [styles.captionStyle, {opacity: 0.5,}];
    return (
        <TouchableHighlight onPress={onPress}>
            <View>
                <View style={styles.pictureContainer}>
                    <Image
                        source={userIcon} style={picStyle}
                        // source={{uri: imageSrc}} style={{width: 66, height: 58}}
                    />
                </View>
                <Text style={captionStyle}>{caption}</Text>
            </View>
        </TouchableHighlight>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        // justifyContent: 'center',
        // paddingTop: Constants.statusBarHeight,
        alignItems: 'center',
        // paddingTop: 10,
        // backgroundColor: '#ecf0f1',
        // backgroundColor: 'powderblue',
    },
    sortedContainer: {
        // flex: 1,
        // flexDirection: 'row',
        width: 250,
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
        marginRight: 10,
        marginLeft: 10,
        width: 100,
        height: 85,
        alignItems: 'center',
        borderRadius: 15,
        // borderTopLeftRadius: 0.5,
        // backgroundSize: 0.5,
        shadowColor: 'rgba(27, 49, 87, 1)',
        // boxShadow: 1,
        //ios
        shadowOpacity: 0.5,
        shadowRadius: 10,
        shadowOffset: {
            height: 0.1,
            width: 0.1,
        },
        // //android
        // elevation: 1
    },
    pictureContainer: {
        // flex: 1,
        alignSelf: 'center',
        width: 55,
        height: 66,
        // borderRadius: 75,
        marginTop: 5,
        // marginBottom: 10,
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
        // verticalAlign: 'center',
        // android
        // textAlignVertical: 'center',
        justifyContent: 'center',
        fontSize: 17,
        fontWeight: 'bold',
        width: 65,
        height: 30,
        paddingTop: 4,
        backgroundColor: '#ecf0f1',
    },
});
