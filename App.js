import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { HomeScreenStack } from "./src/routes/HomeStack";
export default function App() {

  return (
    <NavigationContainer>
      <HomeScreenStack />
    </NavigationContainer>
  );
}
