import { StyleSheet, Text, View, Pressable, Modal } from 'react-native'
import React, { useState } from 'react'
import NOARLogo from '../../src/public/logo-noar.svg'
import { Feather, AntDesign } from '@expo/vector-icons'
import { styles as s } from '../styles/boxShadow'
import ExcluirOcorrenciaModal from '../modal/ExcluirOcorrenciaModal'
import { useSelector } from 'react-redux'
import { RootState } from '../../src/redux/stores/stores'
import deleteReport from '../../src/api/deleteReport'

export default function Header() {
  const [excluirOcorrenciaAbrir, setExcluirOcorrenciaAbrir] = useState(false)

  const handleExcluirOcorrenciaAbrirModal = () => {
    setExcluirOcorrenciaAbrir(!excluirOcorrenciaAbrir)
  }

  const handleCancel = () => {
    setExcluirOcorrenciaAbrir(false)
  }

  const reportId = useSelector((state: RootState) => state.report.reportId)
  console.log('Report id no header', reportId)

  const handleDeleteReport = async () => {
    try {
      const response = await deleteReport(reportId)
      console.log(response)
      if (response) {
        setExcluirOcorrenciaAbrir(false)
      }
    } catch (error) {
      console.error('Error deleting report:', error)
    }
  }

  return (
    <View className="h-[67px] w-full flex-row items-center justify-between bg-[#A00E00] p-[10px]">
      <View className="flex-row">
        <NOARLogo height={42} width={42} />
        <Text
          style={styles.textShadow}
          className="ml-[14px] text-[32.5px] font-black text-[#33338D]"
        >
          NOAR
        </Text>
      </View>
      <View>
        <Pressable
          className="rounded-[3px] bg-red-600"
          onPress={handleExcluirOcorrenciaAbrirModal}
        >
          <Feather name="x" size={24} color="white" />
        </Pressable>
      </View>
      {excluirOcorrenciaAbrir && (
        <Modal
          transparent={true}
          animationType="fade"
          visible={excluirOcorrenciaAbrir}
          onRequestClose={() => setExcluirOcorrenciaAbrir(false)}
        >
          <View className="flex-1 items-center justify-center bg-[#0000007f]">
            <View
              style={s.modalContent}
              className="rounded-[7px] bg-white p-4 "
            >
              <View className="relative flex-row items-center justify-center">
                <ExcluirOcorrenciaModal
                  handleDeleteReport={handleDeleteReport}
                  handleCancel={handleCancel}
                />
                <Pressable
                  onPress={() => setExcluirOcorrenciaAbrir(false)}
                  className="absolute right-1 top-1 z-50"
                >
                  <AntDesign name="closecircle" size={24} color="red" />
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  textShadow: {
    textShadowColor: 'rgba(245, 245, 245, 0.3)',
    textShadowRadius: 4,
    textShadowOffset: { width: -1, height: 2 },
  },
})
