import React from 'react'
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native'

type YesOrNoProps = {
  Question: String
  selectedOption: 'SIM' | 'NÃO'
  // eslint-disable-next-line no-unused-vars
  onSelectOption: (option: 'SIM' | 'NÃO') => void
}

export default function YesOrNo(props: YesOrNoProps) {
  return (
    <View className="my-2 flex-row flex-wrap items-center justify-center">
      <Text className="mb-2 w-[90%] text-center text-lg font-medium">
        {props.Question}
      </Text>
      <TouchableOpacity
        style={[
          styles.button,
          props.selectedOption === 'SIM' ? styles.selected : null,
        ]}
        onPress={() => props.onSelectOption('SIM')}
      >
        <Text
          style={
            props.selectedOption === 'SIM' ? styles.whiteText : styles.blackText
          }
        >
          SIM
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.button,
          props.selectedOption === 'NÃO' ? styles.selected : null,
        ]}
        onPress={() => props.onSelectOption('NÃO')}
      >
        <Text
          style={
            props.selectedOption === 'NÃO' ? styles.whiteText : styles.blackText
          }
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
