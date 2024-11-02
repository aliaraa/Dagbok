import { View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import NoteBox from '@/components/NoteBox';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { noteStyle } from '@/components/NoteStyle';

const Notes = ({route, navigation}) => {

  const [tasks, setTasks] = useState([]);
  const [noteInput, setNoteInput] = useState('');

  const {category, updateTasks} = route.params;

  useEffect(() => {
    loadNotes()
  }, []);

  async function saveNotes(addMyNotes) {
    await AsyncStorage.setItem(`myNotes_${category.id}`, JSON.stringify(addMyNotes));
  }

  async function loadNotes() {
    const loadedNotes = await AsyncStorage.getItem(`myNotes_${category.id}`)

    if (loadedNotes !== null) {
      setTasks(JSON.parse(loadedNotes));
    }
  }

  const addNotes = () => {
    if (noteInput.trim()){
      const newTask = {
        id: Date.now().toString(),
        text: noteInput,
      };
      const newTasks = ([...tasks, newTask]);
      setTasks(newTasks);
      setNoteInput('');
      saveNotes(newTasks); 
      updateTasks(category.id, newTasks);
    }
  };

  async function deleteNotes(deletedNotes) {
    const removeNote = tasks.filter(task => task.id !== deletedNotes);
    setTasks(removeNote);
    saveNotes(removeNote);
    updateTasks(category.id, removeNote);
  }

  return (
    <SafeAreaView> 

      <Text style = {noteStyle.categoryText}>{category.name}</Text>

      <View style = {noteStyle.divider}></View>

      <View style = {noteStyle.textInputView}> 
        <TextInput style = {noteStyle.textInput}
          onChangeText = {setNoteInput}
          placeholder = 'Write here'
          value = {noteInput}/>
      
        <TouchableOpacity 
          style = {noteStyle.addButton}
          onPress = {addNotes}>
          <Text style = {noteStyle.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      <View>
        <FlatList
          data = {tasks}
          keyExtractor = {(item) => item.id}
          renderItem = {({item}) => (
            <View style ={noteStyle.tasktView}>
              <NoteBox 
                task = {item} 
                navigation = {navigation} />
                
              <TouchableOpacity 
                style = {noteStyle.deleteButton}
                onPress={() => deleteNotes(item.id)}>
                <Text style = {noteStyle.deleButtonText}>Delete</Text>
              </TouchableOpacity>
            </View>
             )}
          />
      </View>

    </SafeAreaView>
  )
}

export default Notes