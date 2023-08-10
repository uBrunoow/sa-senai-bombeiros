import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import Icon from '@expo/vector-icons/Feather'
import { Ionicons } from '@expo/vector-icons'

export default function Login({ navigation }) {
  const handleRouter = () => {
    navigation.navigate('home')
  }
  return (
    <View className=" flex-1 items-center justify-between ">
      {/* Top Bar */}
      <View className="h-[67px] w-full bg-[#A00E00]" />
      {/* Div pai do conteúdo da página */}
      <View className=" h-[370] w-[347px] shrink-0 flex-col items-center justify-between p-[10px]">
        {/* Div do texto escrito login com o ícone de user */}
        <View className=" flex-row items-center justify-center gap-[5px]">
          {/* Ícone do user */}
          <Icon name="user" size={40} color="#A00e00" />
          {/* Título de Login */}
          <Text className=" text-[32px] font-normal leading-[32px] text-[#202020]">
            Login
          </Text>
        </View>
        {/* Div da parte de login */}
        <View className=" w-full rounded-[14px] bg-white px-[17px] py-[30px] shadow-2xl ">
          {/* Div que engloba o cpf e a senha */}
          <View className="h-[152px] flex-col items-center justify-between">
            <View className="h-[76px] gap-[5px]">
              <Text className=" text-[21px] font-normal leading-[21px] text-preto">
                CPF
              </Text>
              {/* Input do texto para cpf */}
              <TextInput className=" w-[290px] items-center justify-between rounded-[7px] border-width1 border-preto p-[10px]" />
            </View>

            <View className="h-[76px] gap-[5px]">
              <Text className="  text-[21px] font-normal leading-[21px] text-preto">
                Senha
              </Text>
              {/* Input do texto para senha */}
              <View className=" items-center justify-center">
                <TextInput
                  placeholder="___.___.___-__"
                  className=" w-[290px] items-center justify-between rounded-[7px] border-width1 border-preto p-[10px]"
                />
                <TouchableOpacity>
                  <Ionicons name="eye" color="#000" size={25} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          {/* Div da linha */}
          <View className="my-[20px] h-[1px] w-full bg-black">
            <Text>1</Text>
          </View>
          {/* Div do botão para avançar */}
          <View className="items-center justify-center">
            {/* Botão para avançar */}
            <TouchableOpacity
              className=" items-center justify-center rounded-[7px] bg-[#A00E00] px-[30px] py-[13px]"
              onPress={handleRouter}
            >
              <Text className=" text-[21px] font-normal leading-[21px] text-offwhite">
                AVANÇAR
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View className="h-[67px] w-full bg-[#A00E00]" />
    </View>
  )
}
