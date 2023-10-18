import { View, ScrollView, Pressable } from 'react-native'
import React, { useState } from 'react'
import Icon from '@expo/vector-icons/Feather'
import loginUser from '@src/api/users/loginUser'
import Header from '@app/components/Header'
import Footer from '@app/components/Footer'
import { useSelector, useDispatch } from 'react-redux'
import { saveToken } from '@src/redux/actions/authActions'
import { styles as s } from '@app/styles/boxShadow'
import { Stack, FormControl, Input, Text, Button } from 'native-base'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import MainButton from '@app/components/MainButton'
import { useForm, Controller, FieldValues, FieldError } from 'react-hook-form'
import { z, ZodError, ZodIssue } from 'zod'
import loginSchema from './schemas/loginSchema'
import { MaterialCommunityIcons } from '@expo/vector-icons'

type FormDataType = {
  email: string
  password: string
}

export default function Login({ navigation }: any) {
  const dispatch = useDispatch()

  const [buttonLoading, setButtonLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [loginError, setLoginError] = useState('')

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormDataType>({
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const handleLoginUser = async (data: FormDataType) => {
    try {
      setButtonLoading(true)

      const response = await loginUser(data.email, data.password)

      if (response && response.user) {
        dispatch(saveToken(response.token, response.user.id))
        navigation.navigate('ocorrencia')
      } else {
        setLoginError('Invalid email or password')
      }

      setValue('email', '')
      setValue('password', '')
    } catch (error) {
      if (error instanceof ZodError) {
        console.error(error.errors)
      } else {
        console.error(error)
      }
    } finally {
      setButtonLoading(false)
    }
  }

  console.log(loginError)

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
            <FormControl isRequired isInvalid={'email' in errors}>
              <Stack w="300px" mb="20px">
                <FormControl.Label color={'black'}>E-mail</FormControl.Label>
                <Controller
                  control={control}
                  render={({ field }) => (
                    <Input
                      className="email"
                      onBlur={field.onBlur}
                      placeholder="exemplo@gmail.com"
                      onChangeText={(val) => field.onChange(val)}
                      value={field.value}
                    />
                  )}
                  name="email"
                  rules={{
                    required: 'Field is required',
                  }}
                />
                <FormControl.ErrorMessage>
                  {(errors && errors.email?.message) || loginError}
                </FormControl.ErrorMessage>
              </Stack>
            </FormControl>
            <FormControl
              isRequired
              isInvalid={'password' in errors}
              position={'relative'}
            >
              <Stack w="300px" mb="20px">
                <FormControl.Label color={'black'}>Password</FormControl.Label>
                <Controller
                  control={control}
                  render={({ field }) => (
                    <>
                      <Input
                        onBlur={field.onBlur}
                        type={showPassword ? 'text' : 'password'}
                        placeholder="*********"
                        onChangeText={(val) => field.onChange(val)}
                        value={field.value}
                        position={'relative'}
                      />
                      <Pressable
                        onPress={() => setShowPassword(!showPassword)}
                        className="absolute bottom-2 right-2"
                      >
                        <Text>
                          {showPassword ? (
                            <MaterialCommunityIcons
                              name="eye"
                              size={24}
                              color="black"
                            />
                          ) : (
                            <MaterialCommunityIcons
                              name="eye-off"
                              size={24}
                              color="black"
                            />
                          )}
                        </Text>
                      </Pressable>
                    </>
                  )}
                  name="password"
                  rules={{
                    required: 'Field is required',
                  }}
                  defaultValue=""
                />

                <FormControl.ErrorMessage>
                  {(errors.password && errors.password.message) || loginError}
                </FormControl.ErrorMessage>
              </Stack>
            </FormControl>

            <MainButton
              innerText="SALVAR"
              onPress={handleSubmit(handleLoginUser)}
              isLoading={buttonLoading}
            />
          </View>
        </View>
        <Footer />
      </View>
    </ScrollView>
  )
}
