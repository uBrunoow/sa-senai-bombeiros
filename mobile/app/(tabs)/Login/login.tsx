import { View, ScrollView } from 'react-native'
import React, { useState } from 'react'
import Icon from '@expo/vector-icons/Feather'
import loginUser from '@src/api/users/loginUser'
import Header from '@app/components/Header'
import Footer from '@app/components/Footer'
import { useSelector, useDispatch } from 'react-redux'
import { saveToken } from '@src/redux/actions/authActions'
import { styles as s } from '@app/styles/boxShadow'
import {
  Stack,
  FormControl,
  Input,
  Text,
  WarningOutlineIcon,
} from 'native-base'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import MainButton from '@app/components/MainButton'
import registerReport from '@src/api/reports/registerReport'
import { saveReportId } from '@src/redux/actions/reportActions'
import { RootState } from '@src/redux/stores/stores'

export default function Login({ navigation }: any) {
  const dispatch = useDispatch()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [buttonLoading, setButtonLoading] = useState(false)

  const handleChangeEmail = (value: string) => {
    setEmail(value)
  }

  const handleChangePassword = (value: string) => {
    setPassword(value)
  }

  const handleLoginUser = async () => {
    try {
      const response = await loginUser(email, password)
      if (response && response.user) {
        dispatch(saveToken(response.token, response.user.id))
      }
      setEmail('')
      setPassword('')
    } catch (error) {
      console.error(error)
    }
  }

  const handleClickButton = async () => {
    try {
      setButtonLoading(true)
      await handleLoginUser()
    } catch (error) {
      console.error(error)
    } finally {
      setButtonLoading(false)
      navigation.navigate('ocorrencia')
    }
  }

  const { bottom, top } = useSafeAreaInsets()

  return (
    <ScrollView
      className="flex-1"
      contentContainerStyle={{ paddingBottom: bottom, paddingTop: top }}
    >
      <View className=" h-screen items-center justify-between ">
        <Header />
        <View className=" h-[370] justify-around ">
          <View className=" flex-row justify-center ">
            <Icon name="user" size={40} color="#A00e00" />
            <Text className=" pl-2 text-3xl">Login</Text>
          </View>
          <View style={s.boxShadow} className="mt-10 p-6">
            <FormControl isRequired>
              <Stack w="300px" mb="20px">
                <FormControl.Label color={'black'}>E-mail</FormControl.Label>
                <Input
                  type="text"
                  placeholder="exemplo@gmail.com"
                  onChangeText={handleChangeEmail}
                  value={email}
                />
                <FormControl.HelperText>
                  Must be atleast 6 characters.
                </FormControl.HelperText>
                <FormControl.ErrorMessage
                  leftIcon={<WarningOutlineIcon size="xs" />}
                >
                  Atleast 6 characters are required.
                </FormControl.ErrorMessage>

                <FormControl.Label>Password</FormControl.Label>
                <Input
                  type="password"
                  placeholder="password"
                  onChangeText={handleChangePassword}
                  value={password}
                />
                <FormControl.HelperText>
                  Must be atleast 6 characters.
                </FormControl.HelperText>
                <FormControl.ErrorMessage
                  leftIcon={<WarningOutlineIcon size="xs" />}
                >
                  Atleast 6 characters are required.
                </FormControl.ErrorMessage>
              </Stack>
            </FormControl>
            {/* <View className="mb-4">
              <Text className="text-xl">E-mail</Text>
              <TextInput
                className=" w-[300px] rounded-md border-width1 p-2"
                onChangeText={handleChangeEmail}
                value={email}
              />
            </View> */}

            {/* <View className="mb-4">
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
            </View> */}
            <MainButton
              innerText="AVANÇAR"
              isLoading={buttonLoading}
              onPress={() => handleClickButton()}
            />
          </View>
        </View>
        <Footer />
      </View>
    </ScrollView>
  )
}
