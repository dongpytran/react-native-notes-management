import React from "react";
import {
  Button,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Home from "../screens/Home";
import NoteScreen from "../screens/NoteScreen";
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
const DrawerStack = createDrawerNavigator();
export function DrawerScreenStack() {
  return (
    <DrawerStack.Navigator initialRouteName="Home">
      <DrawerStack.Screen name="Home" component={Home}
        options={{
           title: 'Home',
           drawerIcon: () => (
            <AntDesign name="home" size={24} color="black" />
           ),
        }}
      />
      <DrawerStack.Screen name="NoteManagement" component={NoteScreen}
        options={{
           title: 'Note Management',
           drawerIcon: () => (
            <FontAwesome name="sticky-note-o" size={24} color="black" />
           ),
        }}
      />
    </DrawerStack.Navigator>
  );
}

const styles = StyleSheet.create({
});
