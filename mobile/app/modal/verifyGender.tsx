import React, { useState } from 'react'
import { View, ActivityIndicator, Pressable, Text, Modal } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import sendOnlyGenderToVerify from '@src/api/reports/sendOnlyGender'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@src/redux/stores/stores'
import { useNavigation } from '@react-navigation/core'
import registerGesAnamnesis from '@src/api/reports/gestacionalAnamnesis/registerGestacionalAnamnesis'
import { saveGestacionalAnamnesisId } from '@src/redux/actions/reportActions'
import { styles as s } from '@app/styles/boxShadow'
import WarningModal from './warningModal'
import YesOrNo from '@app/components/YesOrNo'

function VerifyGender({ closeModal }: any) {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const [openWarningModal, setOpenWarningModal] = useState(false)
  const [genderFem, setGenderFem] = useState(false)

  const closeWarningModal = () => {
    setOpenWarningModal(false)
  }
  const handleGenderFem = (option: 'SIM' | 'NÃO') => {
    setGenderFem(option === 'SIM')
  }

  const reportId = useSelector((state: RootState) => state.report.reportId)
  const ownerId = useSelector((state: RootState) => state.auth.userId)
  const existingGestacionalAnamnesisId = useSelector(
    (state: RootState) => state.gestacionalAnamnesis.gestacionalAnamnesisId,
  )
  const ReportOwnerId = useSelector((state: RootState) => state.report.reportId)

  const handleUpdateGender = async () => {
    try {
      setLoading(true)

      const convertedGender = genderFem ? 'Female' : 'Male'

      const response = await sendOnlyGenderToVerify(
        ownerId,
        reportId,
        convertedGender,
      )

      if (response && response.updatedReport.gender === 'Male') {
        setOpenWarningModal(true)
      } else if (response && response.updatedReport.gender === 'Female') {
        closeModal()
        if (existingGestacionalAnamnesisId) {
          navigation.navigate('anamnese-gestacional' as never)
        } else {
          const response = await registerGesAnamnesis(ReportOwnerId)
          if (response && response.gesAnamnesis) {
            dispatch(saveGestacionalAnamnesisId(response.gesAnamnesis.id))

            navigation.navigate('anamnese-gestacional' as never)
          }
        }
      }
    } catch (error) {
      console.error(error)
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
            Parece que você não inseriu o{' '}
            <Text className="font-extrabold italic text-[#ff0000]">gênero</Text>{' '}
            do(a) paciente. O paciente é mulher?
          </Text>
          <Text className=" mt-3 text-center text-[#979797b0]">
            (Insira a informação abaixo se o(a) paciente é mulher para acessar a
            página.)
          </Text>
          <View className="w-full flex-col">
            <View className="w-6/6 items-center justify-center">
              <YesOrNo
                Question="Sexo feminino?"
                selectedOption={genderFem ? 'SIM' : 'NÃO'}
                onSelectOption={handleGenderFem}
              />
            </View>
            <Pressable
              className="mt-5 w-full items-center justify-center rounded-[7px] bg-[#F23030] p-3"
              onPress={handleUpdateGender}
            >
              <Text className="text-[18px] font-bold uppercase text-white">
                <Text>ENVIAR</Text>
              </Text>
            </Pressable>
          </View>
        </>
      )}
      {openWarningModal && (
        <Modal
          transparent={true}
          animationType="fade"
          visible={openWarningModal}
          onRequestClose={() => setOpenWarningModal(false)}
        >
          <View className="flex-1 items-center justify-center bg-[#0000007f]">
            <View
              style={s.modalContent}
              className="relative rounded-[7px] bg-white p-4 "
            >
              <WarningModal closeModal={closeWarningModal} />
              <Pressable
                onPress={() => setOpenWarningModal(false)}
                className="absolute right-1 top-1 z-50"
              >
                <AntDesign name="closecircle" size={24} color="red" />
              </Pressable>
            </View>
          </View>
        </Modal>
      )}
    </View>
  )
}

export default VerifyGender
