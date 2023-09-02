import React, { useState } from 'react'
import { TextInput, Text, View, Platform, Pressable } from 'react-native'
import DateTimePickerAndroid from '@react-native-community/datetimepicker'

export default function GestationPeriod() {
  const [date, setDate] = useState(new Date())
  const [showPicker1, setShowPicker1] = useState(false)
  const [showPicker2, setShowPicker2] = useState(false)
  const [dateStart, setDateStart] = useState('')
  const [dateEnd, setDateEnd] = useState('')

  const toggleDatePicker1 = () => {
    setShowPicker1(!showPicker1)
  }

  const toggleDatePicker2 = () => {
    setShowPicker2(!showPicker2)
  }

  const onDateStartChange = (event, selectedDate) => {
    setShowPicker1(Platform.OS === 'ios')
    if (selectedDate) {
      setDate(selectedDate)
      const formattedDate = selectedDate.toLocaleDateString('pt-BR')
      setDateStart(formattedDate)
    }
  }

  const onDateEndChange = (event, selectedDate) => {
    setShowPicker2(Platform.OS === 'ios')
    if (selectedDate) {
      setDate(selectedDate)
      const formattedDate = selectedDate.toLocaleDateString('pt-BR')
      setDateEnd(formattedDate)
    }
  }
  return (
    <View className=" m-auto mb-4 w-4/6 flex-row flex-wrap justify-around">
      <Text className="mb-2 w-full text-center text-lg">
        Período de Gestação
      </Text>
      {showPicker1 && (
        <>
          <DateTimePickerAndroid
            value={date}
            mode="date"
            display="default"
            onChange={onDateStartChange}
          />
        </>
      )}
      {showPicker2 && (
        <DateTimePickerAndroid
          value={date}
          mode="date"
          display="default"
          onChange={onDateEndChange}
        />
      )}

      <Pressable onPress={toggleDatePicker1}>
        <TextInput
          className=" flex-1 rounded-lg border px-2"
          placeholder="Data de início"
          editable={false}
          value={dateStart}
        />
      </Pressable>
      <Text className="mx-5 text-lg"> - </Text>
      <Pressable onPress={toggleDatePicker2}>
        <TextInput
          className="flex-1 rounded-lg border px-2"
          placeholder="Data de térm."
          editable={false}
          value={dateEnd}
        ></TextInput>
      </Pressable>
    </View>
  )
}
