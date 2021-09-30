import React from 'react'
import { View, Text, StyleSheet, Button, Modal, Pressable, Alert, Picker} from 'react-native'
import { StatusBar } from "expo-status-bar";
import { useState, useEffect, useLayoutEffect } from 'react';
import { deleteNote, getAll, searchNote } from '../api/NoteApi';
import Note from '../components/Note';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlatList, TextInput, TouchableHighlight } from 'react-native-gesture-handler';
import MyModal from '../components/MyModal';
import { Ionicons } from '@expo/vector-icons';

const NoteScreen = ({ navigation }) => {
    const [showModal, setShowModal] = useState(false);
    const [notes, setnotes] = useState([]);    
    const [isAddnew, setisAddnew] = useState(false);
    const [lenght, setlenght] = useState(false);
    const [showBox, setShowBox] = useState(true);
    const [keyword, setkeyword] = useState('');
    const [searchType, setsearchType] = useState('0');
    const [isSearch, setisSearch] = useState(false);
    const showConfirmDialog = (id) => {
      return Alert.alert(
        "Are your sure?",
        "Are you really want to delete this note?",
        [
          // The "Yes" button
          {
            text: "Yes",
            onPress: () => {
              deleteItem(id);
              setShowBox(false);
            },
          },
          // The "No" button
          // Does nothing but dismiss the dialog when tapped
          {
            text: "No",
          },
        ]
      );
    };
    useEffect(() => {
      if(!isSearch){
        const unsubscribe = navigation.addListener('focus', () => {
          getAll().then(res=> setnotes(res)).catch(error=> console.log(error));
        });
        return unsubscribe;
      }else{
        handleSearch();
        console.log('search')
      }
      return function cleanup(){
        console.log('clean up');
      }
    }, [navigation, isSearch]);
    const deleteItem = (id) => {
        deleteNote(id).then(Alert.alert('Delete Succeed!')).then(setlenght(true))
        .catch(error=>{
          console.log(error);
        });
      };
    const handleSearch = () =>{
      if(keyword == ''){
        getAll().then(res=>setnotes(res)).catch(error => console.log(error));
      }else{
        if(isSearch){
          searchNote(keyword, searchType).then(res=>setnotes(res))
        .catch(error=>{
          console.log(error);
        });
        }
      }
    }
    useLayoutEffect(() => {
        navigation.setOptions({
        headerRight: () => (
          <Pressable style={({ pressed }) => [
            {
                backgroundColor: pressed
                ? 'gray'
                : 'black'
            }, styles.btnAdd]} onPress={()=>{setShowModal(true)}}>
                <Ionicons name="add" size={24} color="white" />
            </Pressable>
        ),
        });
    }, [navigation]);
    return (
        <View style={styles.container}>
        {/* MODAL */}
        <MyModal isVisible={showModal} onClick={() => {setShowModal(false), setkeyword(''), handleSearch()}} isAddnew={isAddnew} setdata={setlenght} handleSearch={handleSearch()} />
        {/* PAGE CONTENT */}
        <View style={styles.searchContainer}>
          <View style={styles.pickerBar}>
                <Text>Search by:</Text>
                <Picker
                            selectedValue={searchType}
                            onValueChange={(value) => setsearchType(value)}
                            style={styles.picker}
                  >
                            <Picker.Item label="Id" value="0" />
                            <Picker.Item label="Title" value="1" />
                            
                  </Picker>
          </View>
          <View style={styles.searchBar}>
              <TextInput
                onChangeText={(value)=> setkeyword(value)}
                value={keyword}
                style={styles.searchInput}
                placeholder="Keyword">
              </TextInput>
              <Pressable style={({ pressed }) => [
                  {
                      backgroundColor: pressed
                      ? 'gray'
                      : 'black'
                  }, styles.btnSearch]} onPress={()=>{setisSearch(true), handleSearch()}}>
                            <Ionicons name="search" size={24} color="white" />
              </Pressable>
          </View>
        </View>
        <SafeAreaView style={styles.container}>
            <FlatList data={notes}
            renderItem={({item, index}) => {
                return (
                    <View style={styles.noteContainer}>
                      <TouchableHighlight onPress={() => {navigation.navigate("Detail",{
                          data: item
                        }), setisSearch(true)}} underlayColor="#f2f2f2">
                          <Note item={item} handleDelete={() => {navigation.popToTop(), showConfirmDialog(item.id)}} />
                      </TouchableHighlight>
                    </View>
                )
                
            }}
            />
        </SafeAreaView>
        </View>
    );
}

export default NoteScreen
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: -20
      },
    "modal-container": {
      flex: 1,
      alignItems: "center",
      borderRadius: 18,
    },
    searchContainer:{
      backgroundColor: '#fff',
      height: 170,
      marginBottom: 0,
    },
    searchBar: {
      width: '95%',
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    searchInput:{
      width: '70%',
      height: 40,
      borderRadius: 10,
      borderColor: '#000',
      borderWidth: 1,
      paddingLeft: 15
    },
    btnSearchText:{
      color: '#fff'
    },
    btnSearch:{
      width: 80,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 100,
      left: '76.5%',
      bottom: '48%'
    },
    btnAdd:{
      width: 80,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 15,
      borderRadius: 100,
    },
    btnAddText:{
      color: '#fff'
    },
    pickerBar:{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingLeft: 12,
      paddingRight: 12,
      paddingTop: 30,
      paddingBottom: 20,
    },
    picker:{
      flex: 0.8
    },
    noteContainer:{
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignSelf: 'stretch',
    }
  });
