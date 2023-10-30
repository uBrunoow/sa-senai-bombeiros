import { View, Text } from 'react-native'
import React from 'react'
import { Feather, MaterialIcons } from '@expo/vector-icons'
import { HStack } from 'native-base'
import { styles as s } from '@app/styles/boxShadow'

type DrafsProps = {
  isComplete?: 'COMPLETE' | 'INCOMPLETE' | 'IN PROGRESS'
  name?: string
  reportPlace?: string
  gender?: string | null
  date?: string | null
}
const DraftsGrouper = (props: DrafsProps) => {
  return (
    <View style={s.boxShadow} className="mx-auto">
      <View className="flex-row justify-between">
        <Text className="text-[20px] font-bold">
          {props.name || 'Não inserido'}
        </Text>
        <Feather name="more-horizontal" size={24} color="black" />
      </View>
      <View>
        <View className="flex-row">
          <Text>Status: </Text>
          {props.isComplete === 'COMPLETE' && (
            <Text className="font-semibold text-[#0AC800]">Complete</Text>
          )}
          {props.isComplete === 'INCOMPLETE' && (
            <Text className="font-semibold text-[#FF0000]">Incomplete</Text>
          )}
          {props.isComplete === 'IN PROGRESS' && (
            <Text className="font-semibold text-[#FFA500]">In Progress</Text>
          )}
        </View>
        <View className="flex-row">
          <Text>Local da ocorrencia: </Text>
          <Text className="font-semibold">
            {props.reportPlace || 'Não inserido'}
          </Text>
        </View>
        <View className="flex-row">
          <Text>Sexo: </Text>
          <Text className="font-semibold">
            {props.gender || 'Não inserido'}
          </Text>
        </View>
        <View className="flex-row">
          <Text>Date: </Text>
          <Text className="font-semibold">{props.date || 'Não inserido'}</Text>
        </View>
      </View>
      <HStack alignItems={'center'} justifyContent={'flex-end'} space={3}>
        <View className="rounded-md bg-gray-400 p-2">
          <MaterialIcons name="edit" size={24} color="white" />
        </View>
        <View className="rounded-md bg-red-500 p-2">
          <MaterialIcons name="delete" size={24} color="white" />
        </View>
      </HStack>
    </View>
  )
}

export default DraftsGrouper
