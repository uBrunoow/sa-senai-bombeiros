import { View, Text, TextInput } from 'react-native'
import React, { useState } from 'react'
// import { Entypo } from '@expo/vector-icons'

type InputProps = {
  title?: string
  size?: 'small' | 'regular' | 'big'
  isCalendar?: boolean
  alignText?: 'center' | 'left' | 'right'
  isBig?: boolean
  value?: string | number | null
  placeholder?: string
  isCPF?: boolean
  keyBoardType?: 'default' | 'numeric'
  isTelefone?: boolean
  onChangeText?: (text: string | number) => void
}

export default function InputLowPadding(props: InputProps) {
  const [inputValue, setInputValue] = useState(props.value)

  const handleTextChange = (text: string) => {
    let formattedText = text

    if (props.isCPF) {
      formattedText = text.replace(/\D/g, '')

      if (formattedText.length > 11) {
        formattedText = formattedText.substring(0, 11)
      }

      if (formattedText.length > 3) {
        formattedText = formattedText.replace(/^(\d{3})/, '$1.')
        if (formattedText.length > 7) {
          formattedText = formattedText.replace(/^(\d{3})\.(\d{3})/, '$1.$2.')
          if (formattedText.length > 11) {
            formattedText = formattedText.replace(
              /^(\d{3})\.(\d{3})\.(\d{3})/,
              '$1.$2.$3-',
            )
          }
        }
      }
    } else if (props.isTelefone) {
      formattedText = text.replace(/\D/g, '')

      if (formattedText.length > 11) {
        formattedText = formattedText.substring(0, 11)
      }

      if (formattedText.length > 2) {
        formattedText = `(${formattedText.substring(
          0,
          2,
        )})${formattedText.substring(2)}`
        if (formattedText.length > 9) {
          formattedText = `${formattedText.substring(
            0,
            9,
          )}-${formattedText.substring(9)}`
        }
      }
    }

    setInputValue(formattedText)

    if (props.onChangeText) {
      // Certifique-se de converter para número se o tipo for number
      const parsedValue =
        props.keyBoardType === 'numeric'
          ? parseFloat(formattedText)
          : formattedText
      props.onChangeText(parsedValue)
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
      <View className="my-1 w-full rounded-lg border p-4">
        <TextInput
          multiline={true}
          numberOfLines={100}
          style={{
            height: props.isBig ? 100 : 20,
            textAlignVertical: 'top',
            paddingVertical: 2,
            paddingHorizontal: 2,
            fontSize: 16,
          }}
          value={props.value}
          onChangeText={handleTextChange}
          placeholder={props.placeholder}
          keyboardType={props.keyBoardType}
        ></TextInput>
      </View>
    </View>
  )
}
