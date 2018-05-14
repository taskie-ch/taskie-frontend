import React, { Component } from 'react';
import { Text, View, Button, Image, TouchableHighlight } from 'react-native';

import { userIcon } from '../Utils/Icons';
import styles from './../styles';


export default class SortableForm extends Component {
    
    popItems(item) {
        const unsorted = this.props.unsorted.slice();
        const sorted = this.props.sorted.slice();
        if (item.isEnabled) {
            this.popIntoOtherList(item, sorted, unsorted);
        } else {
    
            this.popIntoOtherList(item, unsorted, sorted);
        }
        
        this.props.onSortChange({
            unsorted: unsorted,
            sorted: sorted
        });
    }
    
    popIntoOtherList(item, fromList, toList) {
        const index = fromList.indexOf(item);
        fromList.splice(index, 1);
        item.isEnabled = !item.isEnabled;
        toList.push(item);
    }
    
    render() {
        const sorted = this.props.sorted.slice();
        const unsorted = this.props.unsorted.slice();
        sorted.forEach(item => item.isEnabled = true);
        unsorted.forEach(item => item.isEnabled = false);
    
        const listToRender = sorted.concat(unsorted);
        const flexRatio = (unsorted.length) ? 1/unsorted.length : 1/sorted.length;
        const profilePictureContainerSizeStyle = [listItem, shadowStyle, {flex: flexRatio,}];
        
        return (
            <View style={sortableFormContainer}>
                <View style={listContainer}>
                    {
                        listToRender.map(item => {
                            return (
                                <View style={item.isEnabled ? [profilePictureContainerSizeStyle, {backgroundColor: 'rgba(67, 145, 240, 0.75)',}] : [profilePictureContainerSizeStyle, {backgroundColor: 'rgba(192, 196, 197, 0.5)',}]}>
                                    <ClickableImageWithCaption caption={this.props.itemsFormat(item)} selectedItem={item} onPress={() => this.popItems(item)}/>
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

const ClickableImageWithCaption = ({caption, selectedItem, onPress}) => {
    const picStyle = selectedItem.isEnabled ? [pictureStyle] : [pictureStyle, disabledCaptionStyle];
    const captionTagStyle = selectedItem.isEnabled ? [captionStyle] : [captionStyle, disabledCaptionStyle];
    return (
        <TouchableHighlight onPress={onPress}>
            <View>
                <View style={pictureContainer}>
                    <Image
                        source={userIcon} style={picStyle}
                    />
                </View>
                <Text style={[captionTagStyle]}>{caption}</Text>
            </View>
        </TouchableHighlight>
    )
};

const {
    shadowStyle,
    sortableFormContainer,
    sortedContainer,
    listContainer,
    listItem,
    pictureContainer,
    pictureStyle,
    captionStyle,
    disabledCaptionStyle,
} = styles;
