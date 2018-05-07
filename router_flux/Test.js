import React,{
    Component
} from 'react'
import {
    View,
    Text
} from 'react-native'
export default Test=(props)=>{
    let id = this.props.key;
    return (
        <View>
            <Text>{id}</Text>
        </View>
    );
};