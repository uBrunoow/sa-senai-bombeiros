import React from 'react'
import { TouchableOpacity, Text } from 'react-native'

type MainButtonProps = {
  innerText: String
}

export default function MainButton(props: MainButtonProps) {
  return (
    <TouchableOpacity className="m-auto mb-4 w-4/6 items-center rounded-lg bg-[#A00E00] p-3">
      <Text className="text-xl font-bold text-white">{props.innerText}</Text>
    </TouchableOpacity>
  )
}
