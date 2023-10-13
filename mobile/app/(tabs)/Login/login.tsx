import { View, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import Icon from '@expo/vector-icons/Feather'
import { AntDesign } from '@expo/vector-icons'
import loginUser from '@src/api/users/loginUser'
import Header from '@app/components/Header'
import Footer from '@app/components/Footer'
import { useDispatch } from 'react-redux'
import { saveToken } from '@src/redux/actions/authActions'
import { styles as s } from '@app/styles/boxShadow'
import { Stack, Box, FormControl, Input, Text, Flex } from 'native-base'

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
      <Header />
      <View className=" h-[370] justify-around ">
        <View className=" flex-row justify-center ">
          <Icon name="user" size={40} color="#A00e00" />
          <Text className=" pl-2 text-3xl">Login</Text>
        </View>
        <View style={s.boxShadow} className="p-6">
          <View className="mb-4">
            <Text className="text-xl">E-mail</Text>
            <TextInput
              className=" w-[300px] rounded-md border-width1 p-2"
              onChangeText={handleChangeEmail}
              value={email}
            />
          </View>

          <View className="mb-4">
            <Text className=" text-xl">Senha</Text>
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
          <View className="items-center justify-center">
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
    // <ScrollView className="flex-1">
    //   <Flex flex="1" justifyContent="space-between">
    //     <Header />

    //     <Flex
    //       direction="column"
    //       alignItems="center"
    //       justifyContent="space-around"
    //       flex="1"
    //       p="4"
    //       h="100%"
    //     >
    //       <Text fontSize="xl" mb="4">
    //         Default
    //       </Text>
    //       <FormControl mb="5" isRequired>
    //         <FormControl.Label>E-mail</FormControl.Label>
    //         <Input type="text" />
    //         <FormControl.HelperText>
    //           Give your project a title.
    //         </FormControl.HelperText>
    //       </FormControl>
    //     </Flex>

    //     <Footer />
    //   </Flex>
    // </ScrollView>
  )
}
