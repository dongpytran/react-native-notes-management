import React, { useEffect, useState } from 'react'
import { render } from 'react-dom';
import { View, Text, Picker, StyleSheet, Button, Pressable, Alert } from 'react-native'
import MyModal from '../components/MyModal';
import { AntDesign } from '@expo/vector-icons';

const NoteDetails = ({route, navigation, reloadItem}) => {
    const {data} = route.params;
    const [selectedValue, setSelectedValue] = useState('');
    const [note, setnote] = useState({});
    const [isLoaded, setisLoaded] = useState(false);
    useEffect(()=>{
        if(data.order == '0'){
            setSelectedValue('Not Order');
        }else{
            setSelectedValue('Ordered');
        }
    },[]);
    const renderBtnEdit = () =>{
        if(!data.isDeleted)
        {
            return(
                <Pressable style={({ pressed }) => [
                    {
                        backgroundColor: pressed
                        ? 'gray'
                        : 'black'
                    }, styles.btnEdit]} onPress={()=>setShowModal(true)}>
                        <AntDesign name="edit" size={24} color="white" />
                </Pressable>
            )
        }
        }
    const [showModal, setShowModal] = React.useState(false);
    return (
        <View>
            <MyModal isVisible={showModal} onClick={() => {setShowModal(false)}} data={data} isAddNew={false} afterEdit={()=>navigation.popToTop()} />
            <View style={styles.noteDetails}>
                <View style={styles.titleView}>
                    <Text style={styles.title}>Tilte:</Text>
                    <Text style={styles.title}>{data.title}</Text>
                </View>
                <View style={styles.contentView}>
                    <Text style={styles.content}>Content:</Text>
                    <Text style={styles.content}>{data.content}</Text>
                </View>
                <View style={styles.contentView}>
                    <Text style={styles.content}>Order:</Text>
                    <Text style={styles.content}>{selectedValue}</Text>
                </View>
                {renderBtnEdit()}
            </View>
                
                
        </View>
    )
}

export default NoteDetails
const styles = StyleSheet.create({
    noteDetails:{
        marginTop: 20
    },
    titleView:{
        width: '100%',
        height: 100,
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor: '#fff',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 15,
        paddingRight: 15
        
    },
    contentView:{
        width: '100%',
        height: 100,
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor: '#fff',
        marginTop: 20,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 15,
        paddingRight: 15
    },
    title:{
        color: '#2e2e2e',
        fontSize: 20,
        fontWeight: 'bold'
    },
    content:{
        fontSize: 13,
        letterSpacing: 1.1,
    },
    Picker:{
        width: '100%',
        height: 50,
        marginTop: 20
    },
    btnEdit:{
        width: 80,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        left: '66%',
        top: '77%'
    },
    btnEditText:{
        color: '#fff'
    }
});