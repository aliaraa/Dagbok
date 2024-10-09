import { NavigationContainer } from "@react-navigation/native";
import { Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack" 
import Categories from "./Categories";
import Notes from "./Notes";





export default function Index() {
  const Stack = createNativeStackNavigator();
  return (
    
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name='Categories' component={Categories} />
        <Stack.Screen name='Notes' component={Notes} />
      </Stack.Navigator>

  );
}
