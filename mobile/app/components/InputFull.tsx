import { View, Text, TextInput } from 'react-native'
import React from 'react'
import { Entypo } from '@expo/vector-icons'

type InputProps = {
  title: string
  isCalendar?: boolean
  isBig?: Boolean
}

export default function InputFull(props: InputProps) {
  return (
    <View className="justfy-between m-auto my-2 w-5/6 flex-1 items-center">
      <Text className="text-lg">{props.title}</Text>
      <View className="mb-4 mt-2 w-5/6 rounded-lg border">
        <TextInput
          multiline={true}
          numberOfLines={100}
          style={{
            height: props.isBig ? 100 : 28,
            textAlignVertical: 'top',
            paddingVertical: 6,
            paddingHorizontal: 9,
          }}
        >
          {props.isCalendar && (
            <Entypo
              className="absolute right-0 m-5"
              name="calendar"
              size={20}
              color="black"
            />
          )}
        </TextInput>
      </View>
    </View>
  )
}
