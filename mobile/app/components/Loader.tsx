import { View, Text } from 'react-native'
import React from 'react'
import { Spinner } from 'native-base'

const Loader = () => {
  return (
    <View className="mx-auto h-screen w-[320px] items-center justify-center">
      <Spinner color="red.500" size="lg" />
      <Text className="mt-3 text-center text-lg font-bold uppercase">
        Carregando...
      </Text>
    </View>
  )
}

export default Loader
