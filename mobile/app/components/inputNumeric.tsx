import { View, Text, TextInput } from 'react-native'
import React, { useState, useEffect } from 'react'

type InputProps = {
  title?: string
  size?: 'small' | 'regular' | 'big'
  alignText?: 'center' | 'left' | 'right'
  isBig?: boolean
  value?: number
  placeholder?: string
  // eslint-disable-next-line no-unused-vars
  onChangeText?: (text: number) => void
}

export default function InputNumeric(props: InputProps) {
  const initialValue = props.value !== undefined ? props.value.toString() : ''
  const [inputValue, setInputValue] = useState(initialValue)

  useEffect(() => {
    setInputValue(props.value !== undefined ? props.value.toString() : '')
  }, [props.value])

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

  const handleTextChange = (text: string) => {
    const numericValue = text.replace(/[^0-9]/g, '')

    if (!isNaN(Number(numericValue))) {
      setInputValue(numericValue)

      if (props.onChangeText) {
        props.onChangeText(Number(numericValue))
      }
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
      <View className="my-1 w-full rounded-lg border p-3">
        <TextInput
          keyboardType="numeric"
          style={{
            height: props.isBig ? 100 : 20,
            fontSize: 16,
          }}
          value={inputValue}
          onChangeText={handleTextChange}
        />
      </View>
    </View>
  )
}
