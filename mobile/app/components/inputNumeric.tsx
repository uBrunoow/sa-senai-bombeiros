import { View, Text, TextInput } from 'react-native'
import React, { useState, useEffect } from 'react'

type InputProps = {
  title?: string
  size?: 'small' | 'regular' | 'big'
  alignText?: 'center' | 'left' | 'right'
  isBig?: boolean
  value?: string | number | null
  placeholder?: string
  disabled?: boolean
  numberWidth?: number
  className?: string
  // eslint-disable-next-line no-unused-vars
  onChangeText?: (text: number) => void
}

export default function InputNumeric(props: InputProps) {
  const initialValue =
    props.value !== undefined && props.value !== null
      ? props.value.toString()
      : ''
  const [inputValue, setInputValue] = useState<string>(initialValue)

  useEffect(() => {
    setInputValue(
      props.value !== undefined && props.value !== null
        ? props.value.toString()
        : '',
    )
  }, [props.value])

  const handleWidth = () => {
    if (props.size === 'small') {
      return 1
    } else if (props.size === 'regular') {
      return 2
    } else if (props.size === 'big') {
      return 3
    }
    return 0
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
    const numericValue = text.replace(/[^0-9.]/g, '')
    if (!isNaN(Number(numericValue))) {
      setInputValue(numericValue)

      if (props.onChangeText) {
        props.onChangeText(Number(numericValue))
      }
    }
  }

  const handleMaxWidth = (numberWidth?: number) => {
    return numberWidth !== undefined ? numberWidth * 2 : undefined
  }

  return (
    <View
      style={{
        flexGrow: handleWidth(),
      }}
      className="p-2"
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
      <View className="my-1 w-[95%] rounded-lg border py-3 pl-2">
        <TextInput
          keyboardType="numeric"
          style={{
            height: props.isBig ? 100 : 20,
            fontSize: 16,
            width: props.numberWidth ? props.numberWidth : 50,
            maxWidth: handleMaxWidth(props.numberWidth),
          }}
          editable={props.disabled}
          value={inputValue.toString()}
          onChangeText={handleTextChange}
        />
      </View>
    </View>
  )
}
