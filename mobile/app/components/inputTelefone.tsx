import { View, Text, TextInput } from 'react-native'
import React, { useState } from 'react'

type InputProps = {
  title?: string
  size?: 'small' | 'regular' | 'big'
  alignText?: 'center' | 'left' | 'right'
  isBig?: boolean
  value?: string | null
  placeholder?: string
  onChangeText?: (formattedValue: string) => void
}

export default function InputTelefone(props: InputProps) {
  const [inputValue, setInputValue] = useState(props.value || '')

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

  const formatPhoneNumber = (phoneNumber: string) => {
    // Remova todos os caracteres não numéricos
    const cleaned = phoneNumber.replace(/\D/g, '')

    // Limite o número máximo de dígitos a 11
    const truncated = cleaned.slice(0, 11)

    // Use regex para adicionar os parênteses e hífen no formato desejado
    const formatted = truncated.replace(
      /^(\d{2})(\d{4,5})(\d{4})$/,
      '($1) $2-$3',
    )

    return formatted
  }

  const handleTextChange = (text: string) => {
    const formattedValue = text.trim() ? formatPhoneNumber(text) : '0'
    setInputValue(formattedValue)

    if (props.onChangeText) {
      props.onChangeText(formattedValue)
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
