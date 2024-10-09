import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const Notes = ({route}) => {

  const {category} = route.params;
  return (
    <SafeAreaView>
      <Text>Category: {category}</Text>
    </SafeAreaView>
  )
}

export default Notes