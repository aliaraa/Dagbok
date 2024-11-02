import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native'
import React from 'react'
import { noteStyle } from './NoteStyle'


const NoteBox = ({task, navigation}) => {

  

  return (
    <SafeAreaView 
      style = {noteStyle.boxStyle}>
      <TouchableOpacity onPress={()=> navigation.navigate('Content', {task})}>
        <Text style = {{padding: 5}}>{task.text}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default NoteBox