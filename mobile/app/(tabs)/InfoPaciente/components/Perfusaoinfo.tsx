import React from 'react'
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native'

type PerfusaoInfoProps = {
  question?: String
  selectedOption: '>2seg' | '<2seg' | null
  // eslint-disable-next-line no-unused-vars
  onSelectOption: (option: '>2seg' | '<2seg' | null) => void
}

export default function Perfusaoinfo(props: PerfusaoInfoProps) {
  return (
    <View className="flex-row items-center justify-center">
      <Text className="text-center text-xs font-medium">{props.question}</Text>
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
    alignItems: 'center',
    paddingVertical: 15,
    borderRadius: 5,
    borderColor: 'rgba(0, 0, 0, 0.28)',
    borderWidth: 1,
    marginVertical: 5,
    marginHorizontal: 5,
    minWidth: '40%',
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
