import React from 'react'
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native'

type PerfusaoInfoProps = {
  Question: String
  selectedOption: '>2seg' | '<2seg'
  onSelectOption: (option: '>2seg' | '<2seg') => void
}

export default function Perfusaoinfo(props: PerfusaoInfoProps) {
  return (
    <View className="m-auto mb-3 flex-row flex-wrap items-center justify-center">
      <Text className="w-5/6 text-center text-lg font-medium">
        {props.Question}
      </Text>
      <TouchableOpacity
        style={[
          styles.button,
          props.selectedOption === '>2seg' ? styles.selected : null,
        ]}
        onPress={() => props.onSelectOption('>2seg')}
      >
        <Text
          style={
            props.selectedOption === '>2seg'
              ? styles.whiteText
              : styles.blackText
          }
        >
          &gt;2seg
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.button,
          props.selectedOption === '<2seg' ? styles.selected : null,
        ]}
        onPress={() => props.onSelectOption('<2seg')}
      >
        <Text
          style={
            props.selectedOption === '<2seg'
              ? styles.whiteText
              : styles.blackText
          }
        >
          &lt;2seg
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
