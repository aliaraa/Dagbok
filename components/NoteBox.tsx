import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native'
import React from 'react'


const NoteBox = ({tasks, navigation}) => {
  return (
    <SafeAreaView 
      style = {{
        backgroundColor:'gray',
        borderWidth: 0.6,
        height: 30,
        width: '80%',
        marginLeft: 5,
        marginTop: 5,
        borderRadius: 6 }}>
      <TouchableOpacity onPress={()=> navigation.navigate('Content', {tasks})}>
        <Text style = {{padding: 5}}>{tasks}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default NoteBox