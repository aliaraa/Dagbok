import { View, Text, TextInput, TouchableOpacity, FlatList, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import CategoryBox from '@/components/CategoryBox';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { categoryStyle } from '@/components/CategoryStyle';


const Categories = ({navigation}) => {

  const [categories, setCategories] = useState([]);
  const [categoryInput, setCategoryInput] = useState('');
  const [tasksPerCategory, setTasksPerCategory] = useState({});

  useEffect(() => {
    loadCategory();
  }, []);

  useEffect(() => {
    const loadTasks = async () => {
      const newTasksPerCategory = {};
      for (const category of categories) {
        const tasks = await loadTasksForCategory(category);
        newTasksPerCategory[category] = tasks;
      }
      setTasksPerCategory(newTasksPerCategory);
    };

    if (categories.length > 0) {
      loadTasks();
    }
  }, [categories]);

  async function saveCategory(addCategories:string) {
    await AsyncStorage.setItem('myCategory', JSON.stringify(addCategories));
  };

  async function loadCategory() {
    const loadCategories = await AsyncStorage.getItem('myCategory');

    if (loadCategories !== null) {
      setCategories(JSON.parse(loadCategories)); 
    }
  };

  const addCategory = () => {
    if (categoryInput.trim()){
      const newCategories = ([...categories, categoryInput]);
      setCategories(newCategories);
      setCategoryInput('');
      saveCategory(newCategories);
    }
  };

  async function deleteCategories(deletedCategory) {
    Alert.alert(
      "Confirm Deletion",
      `Are you sure you want to delete the category "${deletedCategory}" and all its tasks?`,
      [
        {
          text: "Cancel",
          onPress: () => console.log("Deletion canceled"),
          style: "cancel"
        },
        {
          text: "Delete",
          onPress: async () => {
            const deleteCategory = categories.filter(category => category !== deletedCategory);
            setCategories(deleteCategory);
            await saveCategory(deleteCategory);
  
            await AsyncStorage.removeItem(`myNotes_${deletedCategory}`);
  
            const newTasksPerCategory = { ...tasksPerCategory };
            delete newTasksPerCategory[deletedCategory];
            setTasksPerCategory(newTasksPerCategory);
            
            console.log(`Category "${deletedCategory}" and its tasks were deleted`);
          },
          style: "destructive"  
        }
      ],
      { cancelable: true }
    );
  }
  

  async function deleteNotes(category, deletedTask) {
    const updatedTasks = tasksPerCategory[category].filter(task => task !== deletedTask);
    setTasksPerCategory(prev => ({
      ...prev,
      [category]: updatedTasks,
    }));
    await AsyncStorage.setItem(`myNotes_${category}`, JSON.stringify(updatedTasks));
  }

  async function loadTasksForCategory(category) {
    const loadedNotes = await AsyncStorage.getItem(`myNotes_${category}`);
    return loadedNotes ? JSON.parse(loadedNotes) : [];
  };

  const updateTasksInCategory = (category, tasks) => {
    setTasksPerCategory(prev => ({
      ...prev, [category]: tasks,
    }));
  };

  return (
    <SafeAreaView>
      <View style = {categoryStyle.textInputView}>
        <TextInput
        style = {categoryStyle.textInput}
        placeholder = 'Write here'
        onChangeText = {setCategoryInput}
        value = {categoryInput} 
       />

        <TouchableOpacity 
          style = {categoryStyle.addButton}
          onPress = {addCategory} >
          <Text>add</Text>
        </TouchableOpacity>
      </View>
      

      

      <FlatList
        style = {categoryStyle.flatList}
        numColumns = {2}
        data = {categories}
        keyExtractor = {(item, index) => index.toString()}
        renderItem = {({item}) => {
          const tasks = tasksPerCategory[item] || [];
          return(
          <View style = {categoryStyle.renderItem}>
            <CategoryBox 
              category = {item} 
              tasks = {tasks}
              deleteTask={deleteNotes}
              updateTasks = {updateTasksInCategory}
              navigation = {navigation} /> 
            <TouchableOpacity 
              style = {categoryStyle.deleteButton}
              onPress = {() => deleteCategories(item)} >
              <Text style = {categoryStyle.deleButtonText}>Delete</Text>
            </TouchableOpacity>
          </View>
          );
        }}
        />

    </SafeAreaView>
  )
}

export default Categories