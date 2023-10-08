import DateTimePickerAndroid from '@react-native-community/datetimepicker'
import React, { useState } from 'react'
import { TextInput, Text, View, Pressable, Platform } from 'react-native'

type InputDatePickerProps = {
  reportDate: string // assuming reportDate is a string, adjust the type as needed
  setReportDate: React.Dispatch<React.SetStateAction<string>>
}

export default function InputDatePicker({
  reportDate,
  setReportDate,
}: InputDatePickerProps) {
  const [date, setDate] = useState(new Date())
  const [showPicker, setShowPicker] = useState(false)
  const [selectedDate, setSelectedDate] = useState('')

  const toggleDatePicker = () => {
    setShowPicker(!showPicker)
  }

  const onDateChange = (event, selectedDate) => {
    setShowPicker(Platform.OS === 'ios')
    if (event.type === 'set' && selectedDate) {
      setDate(selectedDate)

      const day = selectedDate.getDate()
      const month = selectedDate.getMonth() + 1
      const year = selectedDate.getFullYear()

      const formattedDate = `${day < 10 ? '0' + day : day}/${
        month < 10 ? '0' + month : month
      }/${year}`
      setSelectedDate(formattedDate)

      const formattedApiDate = `${year}-${month < 10 ? '0' + month : month}-${
        day < 10 ? '0' + day : day
      }`
      setReportDate(formattedApiDate)
    }
  }

  return (
    <View className=" m-auto w-full flex-row flex-wrap justify-around">
      <Text className="mb-2 w-full text-left text-lg font-medium">Data</Text>
      {showPicker && (
        <>
          <DateTimePickerAndroid
            value={date}
            mode="date"
            display="default"
            onChange={onDateChange}
          />
        </>
      )}

      <Pressable onPress={toggleDatePicker} className="w-full">
        <TextInput
          className=" w-full rounded-lg border px-3 py-2 text-left text-black"
          placeholder="__/__/____"
          editable={false}
          value={selectedDate}
          onChangeText={setSelectedDate}
        ></TextInput>
      </Pressable>
    </View>
  )
}
