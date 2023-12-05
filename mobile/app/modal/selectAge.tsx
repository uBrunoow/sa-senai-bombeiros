import React, { useState } from 'react'
import { View, ActivityIndicator, Pressable, Text } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import { useSelector } from 'react-redux'
import { RootState } from '@src/redux/stores/stores'
import { useNavigation } from '@react-navigation/core'
import PickOne from '@app/components/PickOne'
import updateAgeReport from '@src/api/reports/updateAgeReport'
import { useToast } from 'native-base'
import InputNumeric from '@app/components/inputNumeric'

function VerifyGender({ closeModal }: any) {
  const navigation = useNavigation()
  const [loading, setLoading] = useState(false)
  const toast = useToast()

  const [age, setAge] = useState<number | null>(null)
  const handleAgeChange = (newAge: string | number) => {
    setAge(parseInt(newAge.toString()))
  }

  const reportId = useSelector((state: RootState) => state.report.reportId)
  const ownerId = useSelector((state: RootState) => state.auth.userId)

  const handleAgeUpdateCompletion = async () => {
    try {
      setLoading(true)
      if (age !== null) {
        await updateAgeReport(ownerId, reportId, age)
        closeModal()
        toast.show({
          description: 'Idade alterada com sucesso!',
          duration: 3000,
          placement: 'bottom',
          style: { backgroundColor: '#0AC800' },
        })
        navigation.navigate('local-traumas' as never)
      } else {
        toast.show({
          description: 'Selecione uma idade para prosseguir.',
          duration: 3000,
          placement: 'bottom',
          style: { backgroundColor: '#ff0000' },
        })
      }
    } catch (error) {
      toast.show({
        description: 'Verifique a sua conexão à internet.',
        duration: 3000,
        placement: 'bottom',
        style: { backgroundColor: '#ff0000' },
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <View className="w-[320px]">
      {loading ? (
        <View className="mx-auto h-[120px] w-[320px] items-center justify-center">
          <ActivityIndicator size="large" color="#ff0000" />
          <Text className="mt-3 text-center text-lg font-bold uppercase">
            Carregando...
          </Text>
          <Text className=" mt-3 text-center text-[#979797b0]">
            (Carregando informações. Inserindo informações. Gerando
            informações.)
          </Text>
        </View>
      ) : (
        <>
          <View className="mx-auto">
            <AntDesign name="exclamationcircle" size={50} color="black" />
          </View>
          <Text className="mt-3 text-center text-[20px] font-bold">
            Parece que você não inseriu a{' '}
            <Text className="font-extrabold italic text-[#ff0000]">idade</Text>{' '}
            do(a) paciente.
          </Text>
          <Text className=" mt-3 text-center text-[#979797b0]">
            (Insira a informação abaixo para exibirmos o modelo corporal
            correto.)
          </Text>
          <View className="w-full flex-col">
            <View className="w-6/6 h-[200px] items-center justify-center">
              <PickOne<number>
                selectedOptionValue={age || NaN}
                title="Selecione uma idade:"
                onSelectOption={handleAgeChange}
                leftOption={{ key: 'Menos de 5', value: 4 }}
                rightOption={{ key: 'Mais de 5', value: 6 }}
              />
              <InputNumeric
                size="big"
                numberWidth={240}
                onChangeText={handleAgeChange}
                value={age?.toString() || ''}
                placeholder="Outro..."
              />
            </View>
            <Pressable
              className="mt-5 w-full items-center justify-center rounded-[7px] bg-[#F23030] p-3"
              onPress={handleAgeUpdateCompletion}
            >
              <Text className="text-[18px] font-bold uppercase text-white">
                <Text>ENVIAR</Text>
              </Text>
            </Pressable>
          </View>
        </>
      )}
    </View>
  )
}

export default VerifyGender
