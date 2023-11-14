import { View, ScrollView, Pressable } from 'react-native'
import React, { useState } from 'react'
import loginUser from '@src/api/users/loginUser'
import Header from '@app/components/Header'
import Footer from '@app/components/Footer'
import { useDispatch } from 'react-redux'
import { saveToken } from '@src/redux/actions/authActions'
import { styles as s } from '@app/styles/boxShadow'
import { Stack, FormControl, Input, Text } from 'native-base'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import MainButton from '@app/components/MainButton'
import { useForm, Controller } from 'react-hook-form'
import { ZodError } from 'zod'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/core'
import Title from '@app/components/Title'

type FormDataType = {
  email: string
  password: string
}

export default function Login() {
  const dispatch = useDispatch()
  const navigation = useNavigation()

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
        dispatch(
          saveToken(response.token, response.user.id, response.refreshToken),
        )
        navigation.navigate('ocorrencia' as never)
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
      <View className="h-screen items-center justify-between ">
        <Header />
        <View className="justify-center">
          <Title title="Login" iconName="user" />
          <View style={s.boxShadow} className="p-5">
            <FormControl isRequired isInvalid={'email' in errors}>
              <Stack w="300px" mb="15px">
                <FormControl.Label color={'black'}>E-mail </FormControl.Label>
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
                    required: 'Campo obrigatório',
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
                <FormControl.Label color={'black'}>Senha </FormControl.Label>
                <Controller
                  control={control}
                  render={({ field }) => (
                    <>
                      <Input
                        onBlur={field.onBlur}
                        type={showPassword ? 'text' : 'password'}
                        onChangeText={(val) => field.onChange(val)}
                        value={field.value}
                        position={'relative'}
                      />
                      <Pressable
                        onPress={() => setShowPassword(!showPassword)}
                        className="relative bottom-[32px] left-[265px]"
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
                    required: 'Campo obrigatório',
                  }}
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
