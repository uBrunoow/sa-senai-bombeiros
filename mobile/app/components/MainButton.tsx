import React from 'react'
import { ActivityIndicator, Pressable, Text, View } from 'react-native'
import { Button } from 'native-base'

type MainButtonProps = {
  innerText: String
  isLoading?: boolean
  onPress: () => void
}

export default function MainButton(props: MainButtonProps) {
  return (
    // <Pressable onPress={props.onPress}>
    //   {props.isLoading ? (
    //     <View className="m-auto mb-4 w-4/6 items-center rounded-lg bg-[#900e0e] p-3">
    //       <View className="h-[30px]">
    //         <ActivityIndicator size="large" color="#ffffff" />
    //       </View>
    //     </View>
    //   ) : (
    //     <View className="m-auto mb-4 w-4/6 items-center rounded-lg bg-[#A00E00] p-3">
    //       <View className="h-[30px]">
    //         <Text className="text-xl font-bold text-white">
    //           {props.innerText}
    //         </Text>
    //       </View>
    //     </View>
    //   )}
    // </Pressable>
    <Button onPress={props.onPress} colorScheme={'red'}>
      {props.isLoading ? (
        <ActivityIndicator size="large" color="#ffffff" />
      ) : (
        <Text className="text-xl font-bold text-white">{props.innerText}</Text>
      )}
    </Button>
  )
}
