import React, { useEffect, useState } from "react";
import { Pressable, Picker } from "react-native";
import {
    Button,
    Modal,
    SafeAreaView,
    StyleSheet,
    Text,
    View,
  } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { addNote, updateNode } from "../api/NodeApi";
import { getAll } from "../api/NodeApi";
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
export default function MyModal({ isVisible, onClick, isAddNew, setdata, data, afterEdit, handleSearch}) {
    const [note, setnote] = useState({title:'', content: '', order: '0'});
    const [notePreview, setnotePreview] = useState({title:'', content: '', order: ''});
    const clearInput = () =>{
      setnote({title:'', content: '', order: '0'});
      onClick();
    }
    const handleSave = () => {
      if(isAddNew == false){
        console.log(data.id, note);
        updateNode(data.id, note).then(clearInput()).then(afterEdit()).then(()=>handleSearch)
        .catch(error =>{
          console.log(error);
        });
      }else{
        addNote(note).then(getAll().then(res=>setdata(true))).then(clearInput())
        .catch(error =>{
          console.log(error);
        });
      }
    }
    useEffect(()=>{
      if(data!=undefined){
        setnote(data);
        setnotePreview(data);
        console.log(data.id);
      }
    },[isVisible]);
    return(
      <Modal
        visible={isVisible}
        animationType="slide"
        presentationStyle="overFullScreen"
        transparent={false}
        
      >
        <View style={styles.container}>
        <Text style={styles.modalTitle}>Note Infomation</Text>
        </View>
        <SafeAreaView style={styles["modal-container"], styles.form}>
          <Text style={styles.labelForInput}>
          Title:
          </Text>
          <TextInput
            style={styles.input}
            onChangeText={(value)=> setnote({...note, title: value})}
            value={note.title}
            placeholder="Type in Title"
          />
          <Text style={styles.labelForInput} >
          Content:
          </Text>
          <TextInput
            style={styles.input}
            onChangeText={(value)=> setnote({...note, content: value})}
            value={note.content}
            placeholder="Type in Content"
          />
          <Text style={styles.labelForInput}>
          Order:
          </Text>
          <Picker
                    selectedValue={note.order.toString()}
                    onValueChange={(value, itemIndex) => setnote({...note, order: value})}
                    style={styles.input}
          >
                    <Picker.Item label="Ordered" value="1" />
                    <Picker.Item label="Not Order" value="0" />
          </Picker>
          <View style={styles.btnOptions}>
            <Pressable style={({ pressed }) => [
              {
                  backgroundColor: pressed
                  ? 'gray'
                  : 'red'
              }, styles.btnSave]} onPress={()=>clearInput()}>
                  <AntDesign name="closecircle" size={24} color="white" />
              </Pressable>
            <Pressable style={({ pressed }) => [
              {
                  backgroundColor: pressed
                  ? 'gray'
                  : 'green'
              }, styles.btnSave]} onPress={()=>{handleSave()}}>
                  <Ionicons name="save-sharp" size={24} color="white" />
              </Pressable>
          </View>
        </SafeAreaView>
      </Modal>
    )
  }
const styles = StyleSheet.create({
    container: {
      width: '100%',
      height: 100,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
    },
    modalTitle:{
      fontSize: 20,
      fontWeight: '800'
    },
    form:{
      marginTop: 0,
    },  
    "modal-container": {
      flex: 1,
      alignItems: "center",
      borderRadius: 18,
    },
    input: {
      width: '80%',
      height: 40,
      marginTop: 12,
      marginBottom: 12,
      marginLeft: 'auto',
      marginRight:'auto',
      borderRadius: 10,
      padding: 10,
    },
    labelForInput:{
      margin: 12,
      fontSize: 15,
      fontWeight: 'bold'
    },
    btnOptions:{
      display: "flex",
      flexDirection: "row-reverse",
      top: '80%',
      right: 35
    },
    btnSave:{
      width: 80,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 15,
      borderRadius: 100
    },
    btnSaveText:{
      color: '#fff'
    },
  });