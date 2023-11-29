import { Platform, TextInput, Pressable, View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import DateTimePickerAndroid from '@react-native-community/datetimepicker'

type InputClockProps = {
  title?: string
  initialValue?: string
  // eslint-disable-next-line no-unused-vars
  onChange: (newValue: string) => void
}

const InputClock = (props: InputClockProps) => {
  const [date, setDate] = useState(new Date())
  const [showPicker, setShowPicker] = useState(false)
  const [timeMedication, setTimeMedication] = useState<string | undefined>('')

  const toggleDatePicker = () => {
    setShowPicker(!showPicker)
  }

  const onTimeChange = (event: any, selectedDate: Date | undefined) => {
    setShowPicker(Platform.OS === 'ios')
    if (selectedDate) {
      setDate(selectedDate)
      const formattedTime = selectedDate.toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
      })
      props.onChange(formattedTime)
    }
  }

  useEffect(() => {
    setTimeMedication(props.initialValue)
  }, [props.initialValue])

  return (
    <View className="my-1 items-center">
      <Text className="my-1 text-base font-medium">{props.title}</Text>
      {showPicker && (
        <>
          <DateTimePickerAndroid
            value={date}
            mode="time"
            display="clock"
            onChange={onTimeChange}
          />
        </>
      )}
      <View className="w-full">
        <Pressable onPress={toggleDatePicker}>
          <TextInput
            className="m-auto w-[85%] rounded-lg border py-2 pl-2"
            placeholder="00:00"
            editable={false}
            value={timeMedication}
            style={{
              textAlignVertical: 'center',
              fontSize: 16,
            }}
          />
        </Pressable>
      </View>
    </View>
  )
}

export default InputClock
