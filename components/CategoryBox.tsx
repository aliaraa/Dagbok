import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const CategoryBox = ({category, navigation}) => {
  return (
    <TouchableOpacity 
      onPress={()=> navigation.navigate('Notes', {category})}
      style={{flexDirection: 'column',
      backgroundColor: 'lightblue',
      width: 100, 
      height: 100}}>
      <Text>{category}</Text>
      </TouchableOpacity>
  )
}

export default CategoryBox