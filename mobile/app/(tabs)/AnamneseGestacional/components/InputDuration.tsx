import { View, Text, TextInput } from 'react-native'
import React, { useState, useEffect } from 'react'

type InputDurationProps = {
  title?: string
  size?: 'small' | 'regular' | 'big'
  alignText?: 'center' | 'left' | 'right'
  isBig?: boolean
  minutes?: number
  seconds?: number
  placeholder?: string
  onChangeDuration?: (minutes: number, seconds: number) => void
}

export default function InputDuration(props: InputDurationProps) {
  const initialMinutes =
    props.minutes !== undefined ? String(props.minutes) : ''
  const initialSeconds =
    props.seconds !== undefined ? String(props.seconds) : ''

  const [minutes, setMinutes] = useState(initialMinutes)
  const [seconds, setSeconds] = useState(initialSeconds)

  useEffect(() => {
    setMinutes(props.minutes !== undefined ? String(props.minutes) : '')
    setSeconds(props.seconds !== undefined ? String(props.seconds) : '')
  }, [props.minutes, props.seconds])

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

  const handleTextChange = (text: string, isMinutes: boolean) => {
    const numericValue = text.replace(/[^0-9]/g, '')

    if (!isNaN(Number(numericValue))) {
      if (isMinutes) {
        setMinutes(numericValue)
        if (props.onChangeDuration) {
          props.onChangeDuration(Number(numericValue), Number(seconds))
        }
      } else {
        setSeconds(numericValue)
        if (props.onChangeDuration) {
          props.onChangeDuration(Number(minutes), Number(numericValue))
        }
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
      <View className="my-1 w-full flex-row items-center rounded-lg border p-3">
        <TextInput
          keyboardType="numeric"
          style={{
            height: props.isBig ? 100 : 20,
            fontSize: 16,
          }}
          value={minutes}
          placeholder="MM"
          onChangeText={(text) => handleTextChange(text, true)}
        />
        <Text style={{ fontSize: 16, marginRight: 5 }}>:</Text>
        <TextInput
          keyboardType="numeric"
          style={{
            height: props.isBig ? 100 : 20,
            fontSize: 16,
          }}
          value={seconds}
          placeholder="SS"
          onChangeText={(text) => handleTextChange(text, false)}
        />
      </View>
    </View>
  )
}
