import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { categoryStyle } from './CategoryStyle'


const CategoryBox = ({task, category, navigation, updateTasks}) => {

  const taskList = Array.isArray(task) ? task : [];

  return (
    <TouchableOpacity 
      onPress={()=> navigation.navigate('Notes', {
        category: category,
        updateTasks,
      })}
      style={categoryStyle.boxStyle}>

      <Text style = {categoryStyle.boxTitle}>{category.name}</Text>

      <View style = {categoryStyle.divider}></View>

      <View style={{ paddingVertical: 5 }}>
        {task.length > 0 ? (
          taskList.map((task, id) => (
            <Text key={id}  style = {categoryStyle.boxText}>{task.text}</Text>
          ))
        ) : (
          <Text style = {categoryStyle.boxText}>Its empty</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default CategoryBox