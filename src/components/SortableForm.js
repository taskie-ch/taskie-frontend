import React, { Component } from 'react';
import { Text, View, StyleSheet, Button, Image, TouchableHighlight } from 'react-native';
import { Constants } from 'expo';
import { userIcon } from '../Utils/Icons';

export default class SortableForm extends Component {
    
    popItemIntoUnsortedList(item) {
        const unsorted = this.props.unsorted.slice();
        const sorted = this.props.sorted.slice();
        this.popIntoOtherList(item, sorted, unsorted);
        this.props.onSortChange({
            unsorted: unsorted,
            sorted: sorted
        })
    }
    
    popItemIntoSortedList(item) {
        const unsorted = this.props.unsorted.slice();
        const sorted = this.props.sorted.slice();
        this.popIntoOtherList(item, unsorted, sorted);
        
        this.props.onSortChange({
            unsorted: unsorted,
            sorted: sorted
        })
    }
    
    popIntoOtherList(item, fromList, toList) {
        const index = fromList.indexOf(item);
        fromList.splice(index, 1);
        toList.push(item);
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
        const nrOfRoomies = 1/unsorted.length;
        const profilePictureContainerSizeStyle = [styles.listItem, {flex: nrOfRoomies,}];//(leftActive) ? [iconLeft, activeTab] : iconLeft;
        const profilePictureSizeStyle = [{flex: 1, width: 67, height: 50,}];//(leftActive) ? [iconLeft, activeTab] : iconLeft;
        
        return (
            <View style={styles.container}>
                
                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between',}}>
                    {
                        sorted.map(item => {
                            return (
                                <View style={profilePictureContainerSizeStyle}>
                                {/*<View style={styles.listItem}>*/}
                                    <ClickableImageWithCaption caption={this.props.itemsFormat(item)} picStyle={profilePictureSizeStyle} onPress={() => this.popItemIntoUnsortedList(item)}/>
                                    {/*<ClickableImageWithCaption caption={this.props.itemsFormat(item)} imageSrc={userIcon} onPress={() => this.popItemIntoUnsortedList(item)}/>*/}
                                </View>
                            );
                        })
                    }
                </View>
                
                <Text>Separator...</Text>
                
                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between',}}>
                    {
                        unsorted.map(item => {
                            return (
                                <View style={profilePictureContainerSizeStyle}>
                                {/*<View style={styles.listItem}>*/}
                                    <ClickableImageWithCaption caption={this.props.itemsFormat(item)} picStyle={profilePictureSizeStyle} onPress={() => this.popItemIntoSortedList(item)}/>
                                    {/*<ClickableImageWithCaption caption={this.props.itemsFormat(item)} imageSrc={userIcon} onPress={() => this.popItemIntoSortedList(item)}/>*/}
                                </View>
                            );
                        })
                    }
                </View>
                
                {/*<Button title={'Submit'} onPress={() => this.onSubmit()}/>*/}
            </View>
        );
    }
}

// const ClickableImageWithCaption = ({caption, imageSrc, onPress}) => {
const ClickableImageWithCaption = ({caption, picStyle, onPress}) => {
    return (
        <TouchableHighlight onPress={onPress}>
            <View>
                <Image
                    source={userIcon} style={picStyle}
                    // source={{uri: imageSrc}} style={{width: 66, height: 58}}
                />
                <Text style={{textAlign: 'center'}}>{caption}</Text>
            </View>
        </TouchableHighlight>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        // paddingTop: Constants.statusBarHeight,
        backgroundColor: '#ecf0f1',
    },
    listItem: {
        marginRight: 10,
        marginLeft: 10,
        width: 80,
        height: 90,
        alignItems: 'center',
        paddingTop: 5,
        backgroundColor: 'powderblue'
    },
});
