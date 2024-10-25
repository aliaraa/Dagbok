import { View, Text, SafeAreaView, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from 'expo-router';


const Content = ({route}) => {

    const [description, setDescription] = useState('');

    const { tasks } = route.params;

    const navigation = useNavigation();

    useEffect( () => {
      loadContent()
      const leaving = navigation.addListener('beforeRemove', () => {
      saveContent(description);
    });

    return leaving;

    }, [description]);

    


    async function saveContent(savedContent:string) {
      await AsyncStorage.setItem(`myContent_${tasks}`, JSON.stringify(savedContent));
    };

    async function loadContent() {
      const loadContents = await AsyncStorage.getItem(`myContent_${tasks}`);

      if (loadContents !== null) {
        setDescription(JSON.parse(loadContents));
      }
    };

  return (
    <SafeAreaView>
      <Text>Content: {tasks}</Text>
      <TextInput
        onChangeText = {setDescription}
        value = {description}
        placeholder = 'Write your notes...'
        multiline = {true}/>
    </SafeAreaView>
  )
}

export default Content