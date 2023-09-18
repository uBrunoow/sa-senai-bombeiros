import { Platform, TextInput, Pressable, View, Text } from 'react-native'
import React, { useState } from 'react'
import DateTimePickerAndroid from '@react-native-community/datetimepicker'
// import { Entypo } from '@expo/vector-icons'

type InputClockProps = {
  title?: string
}

const InputClock2 = (props: InputClockProps) => {
  const [date, setDate] = useState(new Date())
  const [showPicker, setShowPicker] = useState(false)
  const [timeMedication, setTimeMedication] = useState('')

  const toggleDatePicker = () => {
    setShowPicker(!showPicker)
  }

  const onTimeChange = (event, selectedDate) => {
    setShowPicker(Platform.OS === 'ios')
    if (selectedDate) {
      setDate(selectedDate)
      const formattedTime = selectedDate.toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
      })
      setTimeMedication(formattedTime)
    }
  }

  return (
    <View className="justfy-between m-auto my-2 w-5/6 flex-1 items-center">
      <Text className="text-lg">{props.title}</Text>
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
      <View className="mb-3 mt-2 w-5/6">
        <Pressable onPress={toggleDatePicker}>
          <TextInput
            className="content-center rounded-lg border p-1 px-2 text-black"
            placeholder="00:00"
            editable={false}
            value={timeMedication}
          ></TextInput>
        </Pressable>
      </View>
    </View>
  )
}

export default InputClock2
