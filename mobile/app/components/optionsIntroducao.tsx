import React, { useState } from 'react'
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native'

type optionsProps = {
  title: String
  Option1?: String
  Option2?: String
}

export default function Options(props: optionsProps) {
  const [selectedOption, setSelectedOption] = useState<'MASC' | 'FEM' | null>(
    null,
  )

  return (
    <View className="m-auto flex-col items-center justify-center">
      <Text className=" text-center text-lg">{props.title}</Text>
      <TouchableOpacity
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
        style={[
          styles.button,
          selectedOption === 'FEM' ? styles.selected : null,
        ]}
        onPress={() => setSelectedOption('FEM')}
      >
        <Text
          style={selectedOption === 'FEM' ? styles.whiteText : styles.blackText}
        >
          {props.Option2}
        </Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 7,
    paddingHorizontal: 50,
    borderRadius: 5,
    borderColor: 'rgba(0, 0, 0, 0.28)',
    borderWidth: 1,
    marginVertical: 5,
    marginHorizontal: 15,
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
