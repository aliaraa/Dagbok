import { View, Text, TextInput, TouchableOpacity, FlatList, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import CategoryBox from '@/components/CategoryBox';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { categoryStyle } from '@/components/CategoryStyle';
import { useFocusEffect } from '@react-navigation/native';


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
        const tasks = await loadTasksForCategory(category.id);
        newTasksPerCategory[category.id] = tasks;
      }
      setTasksPerCategory(newTasksPerCategory);
    };

    if (categories.length > 0) {
      loadTasks();
    }
  }, [categories]);

  useFocusEffect(
    React.useCallback(() => {
        const loadTasks = async () => {
            const newTasksPerCategory = {};
            for (const category of categories) {
                const tasks = await loadTasksForCategory(category.id);
                newTasksPerCategory[category.id] = tasks;
            }
            setTasksPerCategory(newTasksPerCategory);
        };

        loadTasks();
    }, [categories])
);

  async function saveCategory(addCategories) {
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
      const newCategory = {
        id: Date.now().toString(),
        name: categoryInput
      };
      const newCategories = ([...categories, newCategory]);
      setCategories(newCategories);
      setCategoryInput('');
      saveCategory(newCategories);
    }
  };

  async function deleteCategories(categoryId) {
    Alert.alert(
      "Confirm Deletion",
      `Are you sure you want to delete this category and all its tasks?`,
      [
        {
          text: "Cancel",
          
          style: "cancel"
        },
        {
          text: "Delete",
          onPress: async () => {
            const deleteCategory = categories.filter(category => category.id !== categoryId);
            setCategories(deleteCategory);
            await saveCategory(deleteCategory);
  
            await AsyncStorage.removeItem(`myNotes_${categoryId}`);
  
            const newTasksPerCategory = { ...tasksPerCategory };
            delete newTasksPerCategory[categoryId];
            setTasksPerCategory(newTasksPerCategory);
            
          },
          style: "destructive"  
        }
      ],
      { cancelable: true }
    );
  }
  

  async function deleteNotes(categoryId, deletedTask) {
    const updatedTasks = tasksPerCategory[categoryId].filter(task => task.id !== deletedTask.id);
    setTasksPerCategory(prev => ({
      ...prev,
      [categoryId]: updatedTasks,
    }));
    await AsyncStorage.setItem(`myNotes_${categoryId}`, JSON.stringify(updatedTasks));
  }

  async function loadTasksForCategory(categoryId) {
    const loadedNotes = await AsyncStorage.getItem(`myNotes_${categoryId}`);
    return loadedNotes ? JSON.parse(loadedNotes) : [];
  };

  const updateTasksInCategory = (categoryId, tasks) => {
    setTasksPerCategory(prev => ({
      ...prev, [categoryId]: tasks,
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
          <Text style = {categoryStyle.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>
      

      

      <FlatList
        style = {categoryStyle.flatList}
        numColumns = {2}
        data = {categories}
        keyExtractor = {(item) => item.id}
        renderItem = {({item}) => {
          const tasks = tasksPerCategory[item.id] || [];
          return(
          <View style = {categoryStyle.renderItem}>
            <CategoryBox 
              category = {item} 
              task = {tasks}
              deleteTask={(deletedTask) => deleteNotes(item.id, deletedTask)}
              updateTasks = {(task) => updateTasksInCategory(item.id, task)}
              navigation = {navigation} /> 
            <TouchableOpacity 
              style = {categoryStyle.deleteButton}
              onPress = {() => deleteCategories(item.id)} >
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