import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Icon from '@expo/vector-icons/Feather'
import { AntDesign } from '@expo/vector-icons'
import loginUser from '@src/api/users/loginUser'
import Header from '@app/components/Header'
import Footer from '@app/components/Footer'
import { useDispatch } from 'react-redux'
import { saveToken } from '@src/redux/actions/authActions'
import { styles as s } from '@app/styles/boxShadow'

export default function Login({ navigation }) {
  const dispatch = useDispatch()

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
      dispatch(saveToken(response.token, response.user.id))
      navigation.navigate('ocorrencia')
    }

    console.log('Id:', response.user.id)
    setEmail('')
    setPassword('')
  }

  return (
    <View className=" h-screen items-center justify-between ">
      {/* Top Bar */}
      <Header />
      {/* Div pai do conteúdo da página */}
      <View className=" h-[370] justify-around ">
        {/* Div do texto escrito login com o ícone de user */}
        <View className=" flex-row justify-center ">
          {/* Ícone do user */}
          <Icon name="user" size={40} color="#A00e00" />
          {/* Título de Login */}
          <Text className=" pl-2 text-3xl">Login</Text>
        </View>
        {/* Div da parte de login */}
        <View style={s.boxShadow} className="p-6">
          {/* Div que engloba o cpf e a senha */}
          <View className="mb-4">
            <Text className="text-xl">E-mail</Text>
            {/* Input do texto para cpf */}
            <TextInput
              className=" w-[300px] rounded-md border-width1 p-2"
              onChangeText={handleChangeEmail}
              value={email}
            />
          </View>

          <View className="mb-4">
            <Text className=" text-xl">Senha</Text>
            {/* Input do texto para senha */}
            <View className=" items-center justify-center">
              <TextInput
                placeholder="••••••••••"
                secureTextEntry
                onChangeText={handleChangePassword}
                value={password}
                className=" w-[300px] rounded-md border-width1 p-2"
              />
              <TouchableOpacity className="absolute right-4">
                <AntDesign name="eye" size={24} color="black" />
              </TouchableOpacity>
            </View>
          </View>
          {/* Div da linha */}
          {/* Div do botão para avançar */}
          <View className="items-center justify-center">
            {/* Botão para avançar */}
            <TouchableOpacity
              className=" rounded-md bg-[#A00E00] px-8 py-3"
              onPress={handleLoginUser}
            >
              <Text className="text-xl text-white">AVANÇAR</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <Footer />
    </View>
  )
}
