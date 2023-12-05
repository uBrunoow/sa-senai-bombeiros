import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { FormControl, Stack, Input } from 'native-base'
import { Controller, useForm } from 'react-hook-form'
import { RootState } from '@src/redux/stores/stores'
import { useSelector } from 'react-redux'
import updateFinalization from '@src/api/reports/finalization/updateFinalization'
import MainButton from '@app/components/MainButton'

type FormDataType = {
  responsable: string
}

interface FinalizacaoModalProps {
  onClose: () => void
  // eslint-disable-next-line no-unused-vars
  onResponsableChange: (newResponsable: string) => void
}

const FInalizacaoModal = ({
  onClose,
  onResponsableChange,
}: FinalizacaoModalProps) => {
  const { control, handleSubmit } = useForm<FormDataType>({
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
      setButtonLoading(true)
      const response = await updateFinalization(
        reportId,
        finalizationId,
        data.responsable,
      )

      if (response && response.updatedFinalization) {
        onClose()
        onResponsableChange(data.responsable)
      }
    } catch (error) {
      console.error(error)
    } finally {
      setButtonLoading(false)
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
