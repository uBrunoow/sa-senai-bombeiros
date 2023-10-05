import { View, Text, Pressable, TextInput } from 'react-native'
import React from 'react'

const FInalizacaoModal = () => {
  return (
    <View>
      <View className="w-[320px]">
        <Text className="w-[300px] text-left text-[20px] font-bold">
          Coloque o nome do responsável pelo preenchimento
        </Text>
        <Text className="mt-3 text-[#979797b0]">
          (Caso o nome não for preenchido o responsável será o nome da pessoa
          com a conta logada.)
        </Text>
        <View>
          <Text className="mt-5">Nome:</Text>
          <TextInput
            className="mt-2 items-center justify-between rounded-[7px] border-width1 border-preto p-[10px]"
            placeholder="Digite um nome"
          />
        </View>
        <Pressable className=" mt-10 w-[100px] items-center justify-center rounded-[7px] bg-[#F23030] p-3">
          <Text className="text-[18px] font-bold uppercase text-white">
            Salvar
          </Text>
        </Pressable>
      </View>
    </View>
  )
}

export default FInalizacaoModal
