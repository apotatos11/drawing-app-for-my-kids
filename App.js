import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "./src/screens/HomeScreen";
import NotebookScreen from "./src/screens/NotebookScreen";
import PainterScreen from "./src/screens/PainterScreen";
import LoadImageScreen from "./src/screens/LoadImageScreen";

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen
          name="Notebook"
          component={NotebookScreen}
          options={({ route }) => ({
            title: `${route.params.noteBookTitle} 노트북`,
          })}
        />
        <Stack.Screen name="Painter" component={PainterScreen} />
        <Stack.Screen name="LoadImage" component={LoadImageScreen} />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
