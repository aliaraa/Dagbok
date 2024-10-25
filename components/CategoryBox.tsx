import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { categoryStyle } from './CategoryStyle'


const CategoryBox = ({tasks, category, navigation, updateTasks}) => {



  return (
    <TouchableOpacity 
      onPress={()=> navigation.navigate('Notes', {category, updateTasks})}
      style={categoryStyle.boxStyle}>

      <Text style = {categoryStyle.boxTitle}>{category}</Text>
      <View style={{ paddingVertical: 5 }}>
        {tasks.length > 0 ? (
          tasks.map((task, index) => (
            <Text key={index} style={{ marginVertical: 2 }}> - {task}</Text>
          ))
        ) : (
          <Text>Its empty</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default CategoryBox