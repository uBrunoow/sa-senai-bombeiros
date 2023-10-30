import React from 'react'
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native'

type OptionsProps = {
  title?: string
  selectedOption: string
  onSelectOption: (option: 'Male' | 'Female') => void
  Option1?: string // You need to define these props
  Option2?: string // You need to define these props
}

export default function PickOne(props: OptionsProps) {
  return (
    <View
      style={{
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {props.title && (
        <Text style={{ textAlign: 'center', fontSize: 16, fontWeight: 'bold' }}>
          {props.title}
        </Text>
      )}
      <View className="mt-3 flex-row">
        <TouchableOpacity
          className="w-[70px] items-center justify-center py-2"
          style={[
            styles.button,
            props.selectedOption === 'Male' ? styles.selected : null,
          ]}
          onPress={() => props.onSelectOption('Male')}
        >
          <Text
            className="text-center"
            style={
              props.selectedOption === 'Male'
                ? styles.whiteText
                : styles.blackText
            }
          >
            {props.Option1}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="ml-1 w-[70px] items-center justify-center py-3"
          style={[
            styles.button,
            props.selectedOption === 'Female' ? styles.selected : null,
          ]}
          onPress={() => props.onSelectOption('Female')}
        >
          <Text
            className="text-center"
            style={
              props.selectedOption === 'Female'
                ? styles.whiteText
                : styles.blackText
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
    marginRight: 5,
    padding: 10,
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
