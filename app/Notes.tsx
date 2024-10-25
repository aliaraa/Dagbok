import { View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import NoteBox from '@/components/NoteBox';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Notes = ({route, navigation}) => {

  const [tasks, setTasks] = useState([]);
  const [noteInput, setNoteInput] = useState('');

  const {category, updateTasks} = route.params;

  useEffect(() => {
    loadNotes()
  }, []);

  async function saveNotes(addMyNotes:string) {
    await AsyncStorage.setItem(`myNotes_${category}`, JSON.stringify(addMyNotes));
  }

  async function loadNotes() {
    const loadedNotes = await AsyncStorage.getItem(`myNotes_${category}`)

    if (loadedNotes !== null) {
      setTasks(JSON.parse(loadedNotes));
    }
  }

  const addNotes = () => {
    if (noteInput.trim()){
      const newTasks = ([...tasks, noteInput]);
      setTasks(newTasks);
      setNoteInput('');
      saveNotes(newTasks); 
      updateTasks(category, newTasks);
    }
  };

  async function deleteNotes(deletedNotes) {
    const removeNote = tasks.filter(task => task !== deletedNotes);
    setTasks(removeNote);
    saveNotes(removeNote);
    updateTasks(category, removeNote);
  }

  return (
    <SafeAreaView>

      <Text>Category: {category}</Text>

      <View style = {{flexDirection:'row', 
                      alignContent:'center'}}> 
        <TextInput style = {{width: '80%',
                            borderWidth: 1}}
          onChangeText = {setNoteInput}
          placeholder = 'Write here'
          value = {noteInput}/>
      
      <TouchableOpacity 
        onPress = {addNotes}>
        <Text>ADD</Text>
      </TouchableOpacity>

      </View>

      <View>
        <FlatList
          data = {tasks}
          keyExtractor = {(item, index) => index.toString()}
          renderItem = {({item}) => (
            <View>
              <NoteBox 
                tasks = {item} 
                navigation = {navigation} />
                
              <TouchableOpacity onPress={() => deleteNotes(item)}>
                <Text>Delete</Text>
              </TouchableOpacity>
            </View>
             )}
          />
      </View>

    </SafeAreaView>
  )
}

export default Notes