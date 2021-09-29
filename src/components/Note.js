import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
const SCREEN_WIDTH = Dimensions.get('window').width;

const Note = (props) => {
  const isDelete = props.item.isDeleted;

  const renderLabelActive = () =>{
    if(isDelete == true){
      return(
        <Ionicons name="close-circle" size={24} color="red" />
      )
    }else{
      return(
        <Ionicons name="md-checkmark-circle" size={24} color="green" />
      )
    }
  }
  const rightSwipe = (progress, dragX) => {
    const scale = dragX.interpolate({
      inputRange: [0, 100],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });
    if(!isDelete){
      return (
        <TouchableOpacity onPress={props.handleDelete} activeOpacity={0.6}>
          <View style={styles.deleteBox}>
            <Animated.Text style={{transform: [{scale: scale}], color: '#fff'}}>
            <AntDesign name="delete" size={24} color="white" />
            </Animated.Text>
          </View>
        </TouchableOpacity>
      );
    };
    }
  return (
    <Swipeable renderRightActions={rightSwipe}>
      <View style={styles.note}>
        <View> 
            <Text style={styles.title}>Title: {props.item.title}</Text>
        </View>
        <View style={styles.isActiveLable}>
          {renderLabelActive()}
        </View>
      </View>
    </Swipeable>
  );
};

export default Note
const styles = StyleSheet.create({
    note:{
        width: '100%',
        height: 120,
        alignContent: 'center',
        paddingTop: 30,
        paddingRight: 10,
        paddingLeft: 17,
        backgroundColor: '#fff',
        marginBottom: 7,
        borderRadius: 10
    },
    "note:first-child":{
      marginTop: 0
    },
    title: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 15,
        letterSpacing: 1,
    },
    content: {
        fontSize: 12,
    },
    contentView:{
        marginTop: 20
    }
    ,
    deleteBox: {
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        width: 100,
        height: 120,
        borderRadius: 10
      },
      isActiveLable:{
        display: 'flex',
        flex: 1,
        alignItems: 'flex-end',
        bottom: '50%'
      }
})