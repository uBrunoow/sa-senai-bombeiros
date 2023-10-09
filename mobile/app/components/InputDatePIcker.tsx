import DateTimePickerAndroid from '@react-native-community/datetimepicker'
import React, { useState, useEffect } from 'react'
import { TextInput, Text, View, Pressable, Platform } from 'react-native'

type InputDatePickerProps = {
  reportDate: string
  setReportDate: React.Dispatch<React.SetStateAction<string>>
}

export default function InputDatePicker({
  reportDate,
  setReportDate,
}: InputDatePickerProps) {
  const [date, setDate] = useState(new Date())
  const [showPicker, setShowPicker] = useState(false)
  const [selectedDate, setSelectedDate] = useState('')

  // Atualiza a data e o valor inicial ao receber um novo reportDate
  useEffect(() => {
    if (reportDate) {
      const parsedDate = new Date(reportDate)
      setDate(parsedDate)
      const formattedDate = new Intl.DateTimeFormat('pt-BR').format(parsedDate)
      setSelectedDate(formattedDate)
    }
  }, [reportDate])

  const toggleDatePicker = () => {
    setShowPicker(!showPicker)
  }

  const onDateChange = (event, selectedDate) => {
    setShowPicker(Platform.OS === 'ios')
    if (event.type === 'set' && selectedDate) {
      setDate(selectedDate)

      const formattedDate = new Intl.DateTimeFormat('pt-BR').format(
        selectedDate,
      )
      setSelectedDate(formattedDate)

      const formattedApiDate = selectedDate.toISOString().split('T')[0]
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
