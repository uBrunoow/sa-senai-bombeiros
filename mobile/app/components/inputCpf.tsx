import { View, Text, TextInput } from 'react-native'
import React, { useState } from 'react'

type InputProps = {
  title?: string
  size?: 'small' | 'regular' | 'big'
  alignText?: 'center' | 'left' | 'right'
  isBig?: boolean
  value?: string | null
  placeholder?: string
  // eslint-disable-next-line no-unused-vars
  onChangeText?: (text: string) => void
}

export default function InputCpf(props: InputProps) {
  const [inputValue, setInputValue] = useState(props.value?.toString() || '')

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
    const numericValue = text.replace(/\D/g, '')
    const formattedValue = numericValue ? formatCpf(numericValue) : ''

    setInputValue(formattedValue)

    if (props.onChangeText) {
      props.onChangeText(formattedValue || '0')
    }
  }

  const formatCpf = (cpf: string) => {
    let formattedText = cpf

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

    return formattedText
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
          multiline={true}
          numberOfLines={100}
          style={{
            height: props.isBig ? 100 : 20,
            textAlignVertical: 'top',
            paddingVertical: 2,
            paddingHorizontal: 2,
            fontSize: 16,
          }}
          value={inputValue}
          onChangeText={handleTextChange}
          placeholder={props.placeholder}
          keyboardType={'numeric'}
        />
      </View>
    </View>
  )
}
