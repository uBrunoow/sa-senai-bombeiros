import React from 'react'
import { View, Text } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons'

type titleProps = {
  iconName: string
  title: string
}

export default function Title(props: titleProps) {
  return (
    <View className="my-8 flex-row items-center justify-center">
      <FontAwesome5 name={props.iconName} size={24} color="#A00e00" />
      <Text className="ml-2 text-xl font-medium">{props.title}</Text>
    </View>
  )
}
