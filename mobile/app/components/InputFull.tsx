import { View, Text, TextInput } from 'react-native'
import React from 'react'
import { Entypo } from '@expo/vector-icons'

type InputTprops = {
  title: string
  isCalendar?: boolean
  isBig?: boolean
}

export default function InputFull(props: InputTprops) {
  const numberOfLines = props.isBig ? 4 : 1
  const inputMinHeight = props.isBig ? 'min-h-100' : 'min-h-25'

  return (
    <View className="justfy-between m-auto w-5/6 flex-1 items-center">
      <Text className="text-lg">{props.title}</Text>
      <View className="min-h-25 max-h-315 mb-4 mt-2 w-5/6 rounded-lg border">
        <TextInput
          maxLength={1000}
          numberOfLines={numberOfLines}
          className="px-2"
        >
          {props.isCalendar && (
            <Entypo
              className="absolute right-0 m-5"
              name="calendar"
              size={24}
              color="black"
            />
          )}
        </TextInput>
      </View>
    </View>
  )
}
