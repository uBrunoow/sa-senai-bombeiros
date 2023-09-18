import React, { useState } from 'react'
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native'

type YesOrNoProps = {
  Question: String
}

export default function YesOrNo(props: YesOrNoProps) {
  const [selectedOption, setSelectedOption] = useState<'SIM' | 'NÃO' | null>(
    null,
  )

  return (
    <View className="m-auto flex-row flex-wrap items-center justify-center pb-3">
      <Text className="w-5/6 text-center text-lg">{props.Question}</Text>
      <TouchableOpacity
        style={[
          styles.button,
          selectedOption === 'SIM' ? styles.selected : null,
        ]}
        onPress={() => setSelectedOption('SIM')}
      >
        <Text
          style={selectedOption === 'SIM' ? styles.whiteText : styles.blackText}
        >
          SIM
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.button,
          selectedOption === 'NÃO' ? styles.selected : null,
        ]}
        onPress={() => setSelectedOption('NÃO')}
      >
        <Text
          style={selectedOption === 'NÃO' ? styles.whiteText : styles.blackText}
        >
          NÃO
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
