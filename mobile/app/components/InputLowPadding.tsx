import { View, Text, TextInput } from 'react-native'
import React, { useState } from 'react'

type InputProps = {
  title?: string
  size?: 'small' | 'regular' | 'big'
  isCalendar?: boolean
  alignText?: 'center' | 'left' | 'right'
  isBig?: boolean
  value?: string | null
  placeholder?: string
  // eslint-disable-next-line no-unused-vars
  onChangeText?: (text: string) => void
}

export default function InputLowPadding(props: InputProps) {
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
      className="h-full w-full flex-1 p-2"
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
      <View className="my-1 w-full rounded-lg border">
        <TextInput
          multiline={props.isBig}
          numberOfLines={props.isBig ? 100 : 1}
          style={{
            height: props.isBig ? 100 : 45,
            textAlignVertical: 'center',
            fontSize: 16,
            paddingLeft: 10,
          }}
          value={inputValue}
          onChangeText={handleTextChange}
          placeholder={props.placeholder}
          keyboardType={'default'}
        />
      </View>
    </View>
  )
}
