import { View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import CategoryBox from '@/components/CategoryBox';


const Categories = ({navigation}) => {

  const [categories, setCategories]=useState([]);
  const [categoryInput, setCategoryInput]=useState('');

  const addCategory = () => {
    if (categoryInput.trim()){
      setCategories([...categories, categoryInput]);
      setCategoryInput('');
    }
  };

  return (
    <SafeAreaView>

      <TextInput
      style={{borderWidth: 1, height: 30, width: 300}}
       placeholder='write here'
       onChangeText={setCategoryInput}
       value={categoryInput} 
       />

      <TouchableOpacity onPress={addCategory}>
        <Text>add</Text>
      </TouchableOpacity>

      <FlatList
        numColumns={2}
        data={categories}
        keyExtractor={(item, index)=>index.toString()}
        renderItem={({item})=>(
          <CategoryBox category={item} navigation={navigation} /> )}
        />

    </SafeAreaView>
  )
}

export default Categories