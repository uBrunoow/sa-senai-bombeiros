import { View, Text, TextInput } from 'react-native'
import React, { useState } from 'react'
// import { Entypo } from '@expo/vector-icons'

type InputProps = {
  title: string
  size?: 'small' | 'regular' | 'big'
  isCalendar?: boolean
  isBig?: boolean
  value?: string
  placeholder?: string
  disabled?: boolean
  // eslint-disable-next-line no-unused-vars
  onChangeText?: (text: string) => void
}

export default function InputFull(props: InputProps) {
  const [inputValue, setInputValue] = useState(props.value)

  const handleTextChange = (text: string) => {
    const updatedText = text.trim() === '' ? ' ' : text
    setInputValue(updatedText)

    if (props.onChangeText) {
      props.onChangeText(updatedText)
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
      className="my-2 w-full flex-1 items-center"
    >
      <Text className="text-lg font-medium">{props.title}</Text>
      <View className="mb-4 mt-2 w-5/6 rounded-lg border">
        <TextInput
          editable={props.disabled}
          multiline={props.isBig}
          numberOfLines={props.isBig ? 100 : 1}
          style={{
            height: props.isBig ? 100 : 38,
            textAlignVertical: 'top',
            paddingVertical: 6,
            paddingHorizontal: 10,
          }}
          value={inputValue}
          onChangeText={handleTextChange}
          placeholder={props.placeholder}
        ></TextInput>
      </View>
    </View>
  )
}
