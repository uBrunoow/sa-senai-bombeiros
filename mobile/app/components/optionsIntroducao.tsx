import React from 'react'
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native'

type OptionsProps = {
  title?: string
  selectedOption: string
  onSelectOption: (option: 'MASC' | 'FEM') => void
  Option1?: string // You need to define these props
  Option2?: string // You need to define these props
}

export default function Options(props: OptionsProps) {
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
          className="flex-grow"
          style={[
            styles.button,
            props.selectedOption === 'MASC' ? styles.selected : null,
          ]}
          onPress={() => props.onSelectOption('MASC')}
        >
          <Text
            className="text-center"
            style={
              props.selectedOption === 'MASC'
                ? styles.whiteText
                : styles.blackText
            }
          >
            {props.Option1}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="flex-grow"
          style={[
            styles.button,
            props.selectedOption === 'FEM' ? styles.selected : null,
          ]}
          onPress={() => props.onSelectOption('FEM')}
        >
          <Text
            className="text-center"
            style={
              props.selectedOption === 'FEM'
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
