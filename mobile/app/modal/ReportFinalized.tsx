import { View, Text, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { AntDesign } from '@expo/vector-icons'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@src/redux/stores/stores'
import updateFinalizedReport from '@src/api/reports/isFinalized/updateFinalizedReport'
import { useNavigation } from '@react-navigation/core'
import {
  clearAnamnesisId,
  clearCinematicAvaliationId,
  clearFinalizationId,
  clearGestacionalAnamnesisId,
  clearGlasgowId,
  clearInfoTransportId,
  clearPreHospitalarMethodId,
  clearReportId,
  clearSignsAndSymptomsId,
  clearSuspectProblemsId,
} from '@src/redux/actions/reportActions'
import { clearCompletness } from '@src/redux/reducers/completnessReducer'

function ReportFinalized() {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)

  const reportId = useSelector((state: RootState) => state.report.reportId)
  const ownerId = useSelector((state: RootState) => state.auth.userId)
  const isFinalized = true

  useEffect(() => {
    const changeFinalizedStatus = async () => {
      try {
        setLoading(true)
        await updateFinalizedReport(ownerId, reportId, isFinalized)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    changeFinalizedStatus()
  }, [ownerId, reportId, isFinalized])

  useEffect(() => {
    const redirectTimer = setTimeout(() => {
      navigation.navigate('home' as never)
      dispatch(clearReportId())
      dispatch(clearAnamnesisId())
      dispatch(clearGestacionalAnamnesisId())
      dispatch(clearFinalizationId())
      dispatch(clearSuspectProblemsId())
      dispatch(clearGlasgowId())
      dispatch(clearCinematicAvaliationId())
      dispatch(clearPreHospitalarMethodId())
      dispatch(clearSignsAndSymptomsId())
      dispatch(clearCompletness())
      dispatch(clearInfoTransportId())
    }, 5000)

    return () => {
      clearTimeout(redirectTimer)
    }
  }, [navigation, dispatch])

  return (
    <View className="w-[320px]">
      {loading ? (
        <View className="mx-auto h-[120px] w-[320px] items-center justify-center">
          <ActivityIndicator size="large" color="#ff0000" />
          <Text className="mt-3 text-center text-lg font-bold uppercase">
            Carregando...
          </Text>
          <Text className=" mt-3 text-center text-[#979797b0]">
            (Coletando todas as informações inseridas anteriormente na
            ocorrência.)
          </Text>
        </View>
      ) : (
        <>
          <View className="mx-auto">
            <AntDesign name="checkcircle" size={50} color="#0AC800" />
          </View>
          <Text className="mt-3 text-center text-[20px] font-bold">
            Você finalizou sua ocorrência com sucesso. Agora você será
            redirecionado para página inicial.
          </Text>
        </>
      )}
    </View>
  )
}

export default ReportFinalized
