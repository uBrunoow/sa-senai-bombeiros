import { View, Text, TextInput } from 'react-native'
import React, { useState, useEffect } from 'react'

type InputIntervalProps = {
  title?: string
  size?: 'small' | 'regular' | 'big'
  alignText?: 'center' | 'left' | 'right'
  isBig?: boolean
  hours?: number
  minutes?: number
  seconds?: number
  placeholder?: string
  onChangeInterval?: (hours: number, minutes: number, seconds: number) => void
}

export default function InputInterval(props: InputIntervalProps) {
  const initialHours = props.hours !== undefined ? props.hours.toString() : ''
  const initialMinutes =
    props.minutes !== undefined ? props.minutes.toString() : ''
  const initialSeconds =
    props.seconds !== undefined ? props.seconds.toString() : ''

  const [hours, setHours] = useState(initialHours)
  const [minutes, setMinutes] = useState(initialMinutes)
  const [seconds, setSeconds] = useState(initialSeconds)

  useEffect(() => {
    setHours(props.hours !== undefined ? props.hours.toString() : '')
    setMinutes(props.minutes !== undefined ? props.minutes.toString() : '')
    setSeconds(props.seconds !== undefined ? props.seconds.toString() : '')
  }, [props.hours, props.minutes, props.seconds])

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

  const handleTextChange = (
    text: string,
    isHours: boolean,
    isMinutes: boolean,
  ) => {
    const numericValue = text.replace(/[^0-9]/g, '')

    if (!isNaN(Number(numericValue))) {
      if (isHours) {
        setHours(numericValue)
      } else if (isMinutes) {
        setMinutes(numericValue)
      } else {
        setSeconds(numericValue)
      }

      if (props.onChangeInterval) {
        props.onChangeInterval(Number(hours), Number(minutes), Number(seconds))
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
          value={hours}
          placeholder="HH"
          onChangeText={(text) => handleTextChange(text, true, false)}
        />
        <Text style={{ fontSize: 16, marginHorizontal: 5 }}>:</Text>
        <TextInput
          keyboardType="numeric"
          style={{
            height: props.isBig ? 100 : 20,
            fontSize: 16,
          }}
          value={minutes}
          placeholder="MM"
          onChangeText={(text) => handleTextChange(text, false, true)}
        />
        <Text style={{ fontSize: 16, marginHorizontal: 5 }}>:</Text>
        <TextInput
          keyboardType="numeric"
          style={{
            height: props.isBig ? 100 : 20,
            fontSize: 16,
          }}
          value={seconds}
          placeholder="SS"
          onChangeText={(text) => handleTextChange(text, false, false)}
        />
      </View>
    </View>
  )
}
