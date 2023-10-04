import { View, Text, TextInput } from 'react-native'
import React, { useState } from 'react'
// import { Entypo } from '@expo/vector-icons'

type InputProps = {
  title: string
  size?: 'small' | 'regular' | 'big'
  isCalendar?: boolean
  isBig?: boolean
  value?: string
  onChangeText?: (text: string) => void
}

export default function InputFull(props: InputProps) {
  const [inputValue, setInputValue] = useState(props.value || '')

  const handleTextChange = (text: string) => {
    setInputValue(text)

    if (props.onChangeText) {
      props.onChangeText(text) // Use onChangeText no lugar de onChange
    }
  }

  const handleWidth = () => {
    if (props.size === 'small') {
      return 1
    } else if (props.size === 'regular') {
      return 2
    }
    return 3
  }
  return (
    <View
      style={{
        flexGrow: handleWidth(),
      }}
      className="justfy-between m-auto w-5/6 flex-1 p-2"
    >
      <Text className="text-lg">{props.title}</Text>
      <View className="w-6/6 rounded-lg border p-2">
        <TextInput
          multiline={true}
          numberOfLines={100}
          style={{
            height: props.isBig ? 100 : 28,
            textAlignVertical: 'top',
            paddingVertical: 3,
            paddingHorizontal: 5,
            fontSize: 16,
          }}
          value={inputValue}
          onChangeText={handleTextChange}
        >
          {/* {props.isCalendar && (
            <>
              <Entypo
                className="absolute right-0 m-5"
                name="calendar"
                size={20}
                color="black"
              />
            </>
          )} */}
        </TextInput>
      </View>
    </View>
  )
}
