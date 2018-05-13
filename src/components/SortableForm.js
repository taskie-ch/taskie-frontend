import React, { Component } from 'react';
import { Text, View, Button, Image, TouchableHighlight } from 'react-native';

import { userIcon } from '../Utils/Icons';
import styles from './../styles';


export default class SortableForm extends Component {
    
    popItemIntoUnsortedList(item) {
        const unsorted = this.props.unsorted.slice();
        const sorted = this.props.sorted.slice();
        item.isEnabled = !item.isEnabled;
        this.popIntoOtherList(item, sorted, unsorted);
    
        if (this.props.onSortChange) {
            this.props.onSortChange({
                unsorted: unsorted,
                sorted: sorted
            })
        }
    }
    
    popItemIntoSortedList(item) {
        const unsorted = this.props.unsorted.slice();
        const sorted = this.props.sorted.slice();
        item.isEnabled = !item.isEnabled;
        this.popIntoOtherList(item, unsorted, sorted);
        
        if (this.props.onSortChange) {
            this.props.onSortChange({
                unsorted: unsorted,
                sorted: sorted
            })
        }
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
            let nextEnabledIndex = fromList.findIndex((fromElement) => fromElement.isEnabled === true);
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
        const profilePictureContainerSizeStyle = [listItem, shadowStyle, {flex: flexRatio,}];
        
        return (
            <View style={sortableFormContainer}>
                <View style={listContainer}>
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
