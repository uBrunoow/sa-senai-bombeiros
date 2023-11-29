import React from 'react'
import { View, Pressable, Text } from 'react-native'
import { AntDesign } from '@expo/vector-icons'

function WarningModal({ closeModal }: any) {
  return (
    <View className="w-[320px]">
      <View className="mx-auto">
        <AntDesign name="closecircle" size={50} color="black" />
      </View>
      <Text className="mt-3 text-center text-[20px] font-bold">
        Parece que você inseriu o gênero{' '}
        <Text className="font-extrabold italic text-[#ff0000]">Masculino</Text>.
        Porém essa página só pode ser acessada por pacientes mulheres.
      </Text>
      <Pressable
        className="mt-5 w-full items-center justify-center rounded-[7px] bg-[#F23030] p-3"
        onPress={closeModal}
      >
        <Text className="text-[18px] font-bold uppercase text-white">
          <Text>VOLTAR</Text>
        </Text>
      </Pressable>
    </View>
  )
}

export default WarningModal
