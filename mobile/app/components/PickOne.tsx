import React, { Dispatch, SetStateAction } from 'react'
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native'

type OptionsProps = {
  title: string
  selectedOptionValue: string | null
  onSelectOption: Dispatch<SetStateAction<string | null>>
  leftOption: {
    key: string
    value: string
  }
  rightOption: {
    key: string
    value: string
  }
}

export default function Options({
  title,
  selectedOptionValue,
  onSelectOption,
  leftOption,
  rightOption,
}: OptionsProps) {
  function handleOnSelectOption(newValue: string | null) {
    if (!newValue) return
    onSelectOption(newValue)
  }

  return (
    <View
      className="my-5"
      style={{
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Text style={{ textAlign: 'center', fontSize: 16, fontWeight: 'bold' }}>
        {title}
      </Text>
      <View className="mt-3 flex-row">
        <TouchableOpacity
          disabled={selectedOptionValue === leftOption.value}
          className="ml-1 w-[120px] items-center justify-center py-1"
          style={[
            styles.button,
            selectedOptionValue === leftOption.value ? styles.selected : null,
          ]}
          onPress={() => handleOnSelectOption(leftOption.value)}
        >
          <Text
            className="text-center text-lg"
            style={
              selectedOptionValue === leftOption.value
                ? styles.whiteText
                : styles.blackText
            }
          >
            {leftOption.key}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          disabled={selectedOptionValue === rightOption.value}
          className="ml-1 w-[120px] items-center justify-center py-1"
          style={[
            styles.button,
            selectedOptionValue === rightOption.value ? styles.selected : null,
          ]}
          onPress={() => handleOnSelectOption(rightOption.value)}
        >
          <Text
            className="text-center text-lg"
            style={
              selectedOptionValue === rightOption.value
                ? styles.whiteText
                : styles.blackText
            }
          >
            {rightOption.key}
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
    marginRight: 5,
    paddingVertical: 10,
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
})
