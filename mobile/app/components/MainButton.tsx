import React from 'react'
import { ActivityIndicator, Text } from 'react-native'
import { Button } from 'native-base'

type MainButtonProps = {
  innerText: String
  isLoading?: boolean
  onPress: () => void
}

export default function MainButton(props: MainButtonProps) {
  return (
    <Button
      onPress={props.onPress}
      colorScheme={'red'}
      mx={'auto'}
      mb={8}
      w={'75%'}
    >
      {props.isLoading ? (
        <ActivityIndicator size="large" color="#ffffff" />
      ) : (
        <Text className="text-xl font-bold text-white">{props.innerText}</Text>
      )}
    </Button>
  )
}
