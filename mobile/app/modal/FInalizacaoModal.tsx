import { View, Text, Pressable, TextInput } from 'react-native'
import React, { useState } from 'react'
import { FormControl, Stack, Input } from 'native-base'
import { Controller, useForm } from 'react-hook-form'
import { RootState } from '@src/redux/stores/stores'
import { useSelector } from 'react-redux'
import updateFinalization from '@src/api/reports/finalization/updateFinalization'
import MainButton from '@app/components/MainButton'
import { useNavigation } from '@react-navigation/core'

type FormDataType = {
  responsable: string
}
const FInalizacaoModal = () => {
  const navigation = useNavigation()
  const { control, handleSubmit, setValue } = useForm<FormDataType>({
    defaultValues: {
      responsable: '',
    },
  })

  const finalizationId = useSelector(
    (state: RootState) => state.finalization.finalizationId,
  )
  const reportId = useSelector((state: RootState) => state.report.reportId)

  const [buttonLoading, setButtonLoading] = useState(false)

  const handleFinalization = async (data: FormDataType) => {
    try {
      const response = await updateFinalization(
        reportId,
        finalizationId,
        data.responsable,
      )

      if (response && response.updatedFinalization) {
        navigation.navigate('finalizacao')
      }

      console.log(response)
    } catch (error) {
      console.error(error)
    } finally {
    }
  }

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
          {/* <Text className="mt-5">Nome:</Text>
          <TextInput
            className="mt-2 items-center justify-between rounded-[7px] border-width1 border-preto p-[10px]"
            placeholder="Digite um nome"
          /> */}
          <FormControl>
            <Stack w="320px" my="20px">
              <FormControl.Label color={'black'}>
                Nome do responsável:
              </FormControl.Label>
              <Controller
                control={control}
                render={({ field }) => (
                  <Input
                    onBlur={field.onBlur}
                    onChangeText={(val) => field.onChange(val)}
                    value={field.value}
                  />
                )}
                name="responsable"
                rules={{
                  required: 'Field is required',
                }}
              />
            </Stack>
          </FormControl>
        </View>
        {/* <Pressable
          className=" mt-10 w-[100px] items-center justify-center rounded-[7px] bg-[#F23030] p-3"
          onPress={handleFinalization}
        >
          <Text className="text-[18px] font-bold uppercase text-white">
            Salvar
          </Text>
        </Pressable> */}
        <MainButton
          innerText="SALVAR"
          onPress={handleSubmit(handleFinalization)}
          isLoading={buttonLoading}
        />
      </View>
    </View>
  )
}

export default FInalizacaoModal
