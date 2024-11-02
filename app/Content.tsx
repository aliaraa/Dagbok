import { View, Text, SafeAreaView, TextInput, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from 'expo-router';
import { contentStyle } from '@/components/ContentStyle';

const Content = ({ route }) => {
  const [description, setDescription] = useState('');
  const { task } = route.params;
  const navigation = useNavigation();
  const scrollViewRef = useRef(null);

  // Load content when the component mounts
  useEffect(() => {
    loadContent();

    // Save content when navigating away from the screen
    const unsubscribe = navigation.addListener('beforeRemove', () => {
      saveContent(description);
    });

    return unsubscribe;
  }, []);

  // Debounced saving function that saves only after typing stops for 1 second
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      saveContent(description);
    }, 1000);

    return () => clearTimeout(timeoutId); // Clear timeout if description changes quickly
  }, [description]);

  async function saveContent(savedContent) {
    try {
      if (savedContent.trim()) {
        await AsyncStorage.setItem(`myContent_${task.id}`, JSON.stringify(savedContent));
      }
    } catch (error) {
      // Handle error if needed
    }
  }

  async function loadContent() {
    try {
      const loadContents = await AsyncStorage.getItem(`myContent_${task.id}`);
      if (loadContents) {
        setDescription(JSON.parse(loadContents));
      }
    } catch (error) {
      // Handle error if needed
    }
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text style={contentStyle.noteText}>{task.text}</Text>
      <View style={contentStyle.divider}></View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={80}
      >
        <ScrollView
          ref={scrollViewRef}
          onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
          contentContainerStyle={{ flexGrow: 1 }}
        >
          <TextInput
            style={contentStyle.textInput}
            onChangeText={setDescription}
            value={description}
            placeholder="Write your notes..."
            multiline
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Content;
