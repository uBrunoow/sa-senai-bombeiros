import React from 'react'
import DateTimePickerAndroid from '@react-native-community/datetimepicker'
import { TextInput, Text, View, Pressable, Platform } from 'react-native'

type GestationalPeriodPickerProps = {
  gestationalPeriod: string
  setGestationalPeriod: React.Dispatch<React.SetStateAction<string>>
  label: string
}

const GestationalPeriodPicker: React.FC<GestationalPeriodPickerProps> = ({
  gestationalPeriod,
  setGestationalPeriod,
  label,
}) => {
  const [date, setDate] = React.useState(new Date())
  const [showPicker, setShowPicker] = React.useState(false)
  const [selectedDate, setSelectedDate] = React.useState('')

  React.useEffect(() => {
    if (gestationalPeriod) {
      const parsedDate = new Date(gestationalPeriod)
      setDate(parsedDate)
      const formattedDate = new Intl.DateTimeFormat('pt-BR').format(parsedDate)
      setSelectedDate(formattedDate)
    }
  }, [gestationalPeriod])

  const toggleDatePicker = () => {
    setShowPicker(!showPicker)
  }

  const onDateChange = (event: any, selectedDate: Date | undefined) => {
    setShowPicker(Platform.OS === 'ios')
    if (event.type === 'set' && selectedDate) {
      setDate(selectedDate)

      const formattedDate = new Intl.DateTimeFormat('pt-BR').format(
        selectedDate,
      )
      setSelectedDate(formattedDate)

      const formattedApiDate = selectedDate.toISOString().split('T')[0]
      setGestationalPeriod(formattedApiDate)
    }
  }

  return (
    <View className=" mx-auto w-[90%]">
      <Text className="my-2 text-lg font-medium">{label}</Text>
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
          className="rounded-lg border px-3 py-2 text-black"
          placeholder="__/__/____"
          editable={false}
          value={selectedDate}
          onChangeText={setSelectedDate}
        ></TextInput>
      </Pressable>
    </View>
  )
}

export const GestationalPeriodStartPicker: React.FC<
  GestationalPeriodPickerProps
> = (props) => (
  <GestationalPeriodPicker {...props} label="Início do Período de Gestação" />
)

export const GestationalPeriodEndPicker: React.FC<
  GestationalPeriodPickerProps
> = (props) => (
  <GestationalPeriodPicker {...props} label="Fim do Período de Gestação" />
)
