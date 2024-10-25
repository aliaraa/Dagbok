import { createNativeStackNavigator } from "@react-navigation/native-stack" 
import Categories from "./Categories";
import Notes from "./Notes";
import Content from "./Content";
import Splash from "./SplashScreen";





export default function Index() {
  const Stack = createNativeStackNavigator();
  return (
    
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name = 'SplashScreen' component = {Splash} />
        <Stack.Screen name = 'Categories' component = {Categories} />
        <Stack.Screen name = 'Notes' component = {Notes} />
        <Stack.Screen name = 'Content' component = {Content} />
      </Stack.Navigator>

  );
}
