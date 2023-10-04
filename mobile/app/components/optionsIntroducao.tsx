import React, { useState } from 'react'
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native'

type optionsProps = {
  title?: String
  Option1?: String
  Option2?: String
}

export default function Options(props: optionsProps) {
  const [selectedOption, setSelectedOption] = useState<'MASC' | 'FEM' | null>(
    null,
  )

  return (
    <View className="flex-col items-center justify-center">
      {props.title && (
        <Text className="text-center text-base font-medium">{props.title}</Text>
      )}
      <View className="mt-2 flex-row">
        <TouchableOpacity
          className="h-[40px] w-[70px] items-center justify-center"
          style={[
            styles.button,
            selectedOption === 'MASC' ? styles.selected : null,
          ]}
          onPress={() => setSelectedOption('MASC')}
        >
          <Text
            style={
              selectedOption === 'MASC' ? styles.whiteText : styles.blackText
            }
          >
            {props.Option1}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="ml-1 h-[40px] w-[70px] items-center justify-center"
          style={[
            styles.button,
            selectedOption === 'FEM' ? styles.selected : null,
          ]}
          onPress={() => setSelectedOption('FEM')}
        >
          <Text
            style={
              selectedOption === 'FEM' ? styles.whiteText : styles.blackText
            }
          >
            {props.Option2}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 5,
    borderColor: 'rgba(0, 0, 0, 0.28)',
    borderWidth: 1,
  },
  selected: {
    backgroundColor: '#A00E00',
    borderColor: 'rgba(0, 0, 0, 0.28)',
  },
  blackText: {
    color: '#000000',
  },
  whiteText: {
    color: '#FFFFFF',
  },
  buttonText: {
    color: 'black',
  },
})
