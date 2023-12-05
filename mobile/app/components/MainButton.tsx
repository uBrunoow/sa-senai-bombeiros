import React from 'react'
import { ActivityIndicator, Text } from 'react-native'
import { Button } from 'native-base'

type MainButtonProps = {
  innerText: String
  isLoading?: boolean
  disabled?: boolean
  onPress: () => void
}

export default function MainButton(props: MainButtonProps) {
  return (
    <Button
      className="mx-auto rounded-md bg-red-700"
      onPress={props.onPress}
      mb={8}
      w={'75%'}
      disabled={props.disabled}
    >
      {props.isLoading ? (
        <ActivityIndicator size={30} color="#ffffff" />
      ) : (
        <Text className="text-center text-xl font-bold text-white">
          {props.innerText}
        </Text>
      )}
    </Button>
  )
}
