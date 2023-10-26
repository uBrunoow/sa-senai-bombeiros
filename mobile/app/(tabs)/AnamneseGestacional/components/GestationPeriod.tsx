// import DateTimePickerAndroid from '@react-native-community/datetimepicker'
// import React, { useState } from 'react'
// import { TextInput, Text, View, Pressable, Platform } from 'react-native'

// export default function GestationPeriod({ onChange }) {
//   const [date, setDate] = useState(new Date())
//   const [showPicker1, setShowPicker1] = useState(false)
//   const [showPicker2, setShowPicker2] = useState(false)
//   const [dateStart, setDateStart] = useState('')
//   const [dateEnd, setDateEnd] = useState('')

//   const toggleDatePicker1 = () => {
//     setShowPicker1(!showPicker1)
//   }

//   const toggleDatePicker2 = () => {
//     setShowPicker2(!showPicker2)
//   }

//   const onDateStartChange = (event, selectedDate) => {
//     setShowPicker1(Platform.OS === 'ios')
//     if (selectedDate) {
//       setDate(selectedDate)
//       const formattedDate = selectedDate.toLocaleDateString('pt-BR')
//       setDateStart(formattedDate)
//       onChange(formattedDate, dateStart)
//     }
//   }

//   const onDateEndChange = (event, selectedDate) => {
//     setShowPicker2(Platform.OS === 'ios')
//     if (selectedDate) {
//       setDate(selectedDate)
//       const formattedDate = selectedDate.toLocaleDateString('pt-BR')
//       setDateEnd(formattedDate)
//       onChange(formattedDate, dateEnd)
//     }
//   }

//   console.log('START:', dateStart)
//   console.log('END:', dateEnd)

//   return (
//     <View className=" m-auto mb-4 w-5/6 flex-row flex-wrap justify-around">
//       <Text className="mb-2 w-full text-center text-lg font-medium">
//         Período de Gestação
//       </Text>
//       {showPicker1 && (
//         <>
//           <DateTimePickerAndroid
//             value={date}
//             mode="date"
//             display="default"
//             onChange={onDateStartChange}
//           />
//         </>
//       )}
//       {showPicker2 && (
//         <DateTimePickerAndroid
//           value={date}
//           mode="date"
//           display="default"
//           onChange={onDateEndChange}
//         />
//       )}
//       <Pressable onPress={toggleDatePicker1} className="w-2/6">
//         <TextInput
//           className=" w-full rounded-lg border px-3 py-2 text-center text-black"
//           placeholder="Início"
//           editable={false}
//           value={dateStart}
//           onChangeText={setDateStart}
//         ></TextInput>
//       </Pressable>
//       <Text className="text-lg"> - </Text>

//       <Pressable onPress={toggleDatePicker2} className="w-2/6">
//         <TextInput
//           className="w-full rounded-lg border px-3 py-2 text-center text-black"
//           placeholder="Fim"
//           editable={false}
//           value={dateEnd}
//           onChangeText={setDateEnd}
//         />
//       </Pressable>
//     </View>
//   )
// }

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

  const onDateChange = (event, selectedDate) => {
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
    <View className=" m-auto w-full flex-row flex-wrap justify-around">
      <Text className="mb-2 w-full text-left text-lg font-medium">{label}</Text>
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
