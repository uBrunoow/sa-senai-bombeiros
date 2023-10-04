import { View, Text, TextInput } from 'react-native'
import React, { useState } from 'react'
// import { Entypo } from '@expo/vector-icons'

type InputProps = {
  title?: string
  size?: 'small' | 'regular' | 'big'
  isCalendar?: boolean
  alignText?: 'center' | 'left' | 'right'
  isBig?: boolean
  value?: string
  placeholder?: string
  onChangeText?: (text: string) => void
}

export default function InputFull(props: InputProps) {
  const [inputValue, setInputValue] = useState(props.value || '')

  const handleTextChange = (text: string) => {
    setInputValue(text)

    if (props.onChangeText) {
      props.onChangeText(text)
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

  const handleAlignText = () => {
    if (props.alignText === 'center') {
      return 'center'
    } else if (props.alignText === 'left') {
      return 'left'
    } else if (props.alignText === 'right') {
      return 'right'
    }
  }

  return (
    <View
      style={{
        flexGrow: handleWidth(),
      }}
      className="justfy-between m-auto h-full w-5/6 flex-1 p-2"
    >
      {props.title && (
        <Text
          className="text-base font-medium"
          style={{
            textAlign: handleAlignText(),
          }}
        >
          {props.title}
        </Text>
      )}
      <View className="w-full rounded-lg border p-2">
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
          placeholder={props.placeholder}
        ></TextInput>
      </View>
    </View>
  )
}
