import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native'
import React, { useState } from 'react'
import Icon from '@expo/vector-icons/Feather'
import { AntDesign } from '@expo/vector-icons'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import loginUser from '../../src/api/loginUser'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function Login({ navigation }) {
  const { bottom, top } = useSafeAreaInsets()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleChangeEmail = (value) => {
    setEmail(value)
  }

  const handleChangePassword = (value) => {
    setPassword(value)
  }

  const handleLoginUser = async (e) => {
    e.preventDefault()

    const response = await loginUser(email, password)
    if (response && response.user) {
      navigation.navigate('ocorrencia')
      console.log(response)
    }

    setEmail('')
    setPassword('')
  }

  return (
    <ScrollView
      className="flex-1"
      contentContainerStyle={{ paddingBottom: bottom, paddingTop: top }}
    >
      <View className=" h-screen items-center justify-between ">
        {/* Top Bar */}
        <Header />
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
          <View
            style={styles.boxShadow}
            className=" w-full rounded-[14px] bg-white px-[17px] py-[30px] shadow-md"
          >
            {/* Div que engloba o cpf e a senha */}
            <View className="h-[152px] flex-col items-center justify-between">
              <View className="relative h-[76px] gap-[5px]">
                <Text className=" text-[21px] font-normal leading-[21px] text-preto">
                  CPF
                </Text>
                {/* Input do texto para cpf */}
                <TextInput
                  className=" w-[290px] items-center justify-between rounded-[7px] border-width1 border-preto p-[10px]"
                  onChangeText={handleChangeEmail}
                  value={email}
                />
              </View>

              <View className="h-[76px] gap-[5px]">
                <Text className="  text-[21px] font-normal leading-[21px] text-preto">
                  Senha
                </Text>
                {/* Input do texto para senha */}
                <View className=" relative items-center justify-center">
                  <TextInput
                    placeholder="___.___.___-__"
                    secureTextEntry
                    onChangeText={handleChangePassword}
                    value={password}
                    className=" w-[290px] items-center justify-between rounded-[7px] border-width1 border-preto p-[10px]"
                  />
                  <TouchableOpacity className="absolute right-5">
                    <AntDesign name="eye" size={24} color="black" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            {/* Div da linha */}
            <View className="my-[20px] h-[1px] w-full bg-black"></View>
            {/* Div do botão para avançar */}
            <View className="items-center justify-center">
              {/* Botão para avançar */}
              <TouchableOpacity
                className=" items-center justify-center rounded-[7px] bg-[#A00E00] px-[30px] py-[13px]"
                onPress={handleLoginUser}
              >
                <Text className=" text-[21px] font-normal leading-[21px] text-offwhite">
                  AVANÇAR
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <Footer />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  boxShadow: {
    shadowColor: 'rgb(0, 0, 0)',
    shadowOpacity: 0,
    shadowRadius: 4,
    textShadowOffset: { width: 8, height: 2 },
  },
})
