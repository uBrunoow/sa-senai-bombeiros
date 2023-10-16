import { View, Text } from 'react-native'
import React from 'react'
import Header from '../../components/Header'
import { styles as s } from '@app/styles/boxShadow'
import { MaterialIcons } from '@expo/vector-icons'

export default function LocalTraumas() {
  return (
    <View>
      <Header />
      <View className=" mt-[34px] flex-row items-center justify-center">
        <MaterialIcons name="person" size={24} color="#A00e00" />
        <Text className="ml-[10px] text-[20px] font-medium leading-[20px]">
          Local Traumas
        </Text>
      </View>
      <View style={s.boxShadow}>
        <Text>Mano</Text>
      </View>
    </View>
  )
}
