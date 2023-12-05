import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons'

type EditOcorrenciaModalProps = {
  handleClearEdit: () => void
  handleCancel: () => void
}

const EditOcorrenciaModal = (props: EditOcorrenciaModalProps) => {
  return (
    <View className="w-[320px]">
      <View className="mx-auto">
        <AntDesign name="warning" size={50} color="black" />
      </View>
      <Text className="mt-3 w-[300px] text-center text-[20px] font-bold">
        Tem certeza que deseja parar de editar ocorrência?
      </Text>
      <Text className=" mt-3 text-center text-[#979797b0]">
        (Caso clique em SIM todos os dados não serão salvos)
      </Text>
      <View className="w-full flex-row">
        <Pressable
          className="ml-[-4px] mt-10 w-3/6 items-center justify-center rounded-[7px] bg-[#F23030] p-3"
          onPress={props.handleClearEdit}
        >
          <Text className="text-[18px] font-bold uppercase text-white">
            Sim
          </Text>
        </Pressable>
        <Pressable
          className="mx-2 mt-10 w-3/6 items-center justify-center rounded-[7px] bg-[#979797b0] p-3"
          onPress={props.handleCancel}
        >
          <Text className="text-[18px] font-bold uppercase text-white">
            Não
          </Text>
        </Pressable>
      </View>
    </View>
  )
}

export default EditOcorrenciaModal
