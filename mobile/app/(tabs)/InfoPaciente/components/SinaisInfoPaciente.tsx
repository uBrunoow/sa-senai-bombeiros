import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import Perfusaoinfo from './Perfusaoinfo'
import { styles as s } from '@app/styles/boxShadow'
import InputNumeric from '@app/components/inputNumeric'
import { useDispatch, useSelector } from 'react-redux'
import { setPatientInfoData } from '@src/redux/actions/dataActions'
import findReports from '@src/api/reports/findReport'
import { RootState } from '@src/redux/stores/stores'
import { Divider } from 'native-base'

type perfusaoInfoOption = '>2seg' | '<2seg' | ''

interface PatientInfo {
  systolicBloodPressure: number
  diastolicBloodPressure: number
  bodyTemp: number
  bodyPulse: number
  breathing: number
  saturation: number
}
export default function SinaisInfoPaciente() {
  const dispatch = useDispatch()
  const [perfusaoOption, setPerfusaoOption] = useState<perfusaoInfoOption>('')
  const [patientInfo, setPatientInfo] = useState<PatientInfo>({
    systolicBloodPressure: 0,
    diastolicBloodPressure: 0,
    bodyTemp: 0,
    bodyPulse: 0,
    breathing: 0,
    saturation: 0,
  })
  function handleSetPerfusaoInfo(option: perfusaoInfoOption) {
    setPerfusaoOption(option)
  }

  const reportId = useSelector((state: RootState) => state.report.reportId)

  useEffect(() => {
    const findSinaisVitaisData = async () => {
      try {
        const response = await findReports(reportId)

        const systolicBloodPressureResponse =
          response.report.systolicBloodPressure
        const diastolicBloodPressureResponse =
          response.report.diastolicBloodPressure
        const bodyTempResponse = response.report.bodyTemp
        const bodyPulseResponse = response.report.bodyPulse
        const breathingResponse = response.report.breathing
        const saturationResponse = response.report.saturation

        setPatientInfo({
          systolicBloodPressure: systolicBloodPressureResponse,
          diastolicBloodPressure: diastolicBloodPressureResponse,
          bodyTemp: bodyTempResponse,
          bodyPulse: bodyPulseResponse,
          breathing: breathingResponse,
          saturation: saturationResponse,
        })
      } catch (error) {
        console.error(error)
      }
    }
    findSinaisVitaisData()
  }, [reportId])

  const handleInputChange = (field: keyof PatientInfo, value: number) => {
    try {
      dispatch(
        setPatientInfoData({
          ...patientInfo,
          [field]: value,
        }),
      )
      setPatientInfo((prevPatientInfo) => ({
        ...prevPatientInfo,
        [field]: value,
      }))
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <View
      style={s.boxShadow}
      className=" mx-auto w-[90%] rounded-[14px] bg-white px-[17px] py-[30px] shadow-md"
    >
      <View className="w-full flex-row pb-3">
        <View className="mt-3 w-full flex-row pb-3">
          <View className="center-between flex-1 items-center">
            <Text className="text-center text-base font-medium">
              Pressão arterial
            </Text>
            <View className="flex-row items-center justify-center">
              <InputNumeric
                value={patientInfo.systolicBloodPressure}
                onChangeText={(e) =>
                  handleInputChange('systolicBloodPressure', e)
                }
              />
              <Text className="uppercase">X</Text>
              <InputNumeric
                value={patientInfo.diastolicBloodPressure}
                onChangeText={(e) =>
                  handleInputChange('diastolicBloodPressure', e)
                }
              />
              <Text>mmHg</Text>
            </View>
          </View>
          <View className="center-between w-3/6 flex-1 items-center">
            <Text className="text-center text-base font-medium">Temper.</Text>
            <View className="w-[130px] flex-row items-center justify-center">
              <InputNumeric
                value={patientInfo.bodyTemp}
                onChangeText={(e) => handleInputChange('bodyTemp', e)}
              />
              <Text className="uppercase">°C</Text>
            </View>
          </View>
        </View>
      </View>
      <Divider
        my="2"
        _light={{
          bg: 'muted.800',
        }}
        _dark={{
          bg: 'muted.50',
        }}
      />
      <View className="mt-3 w-full flex-row pb-3">
        <View className="center-between w-3/6 flex-1 items-center">
          <Text className="text-center text-base font-medium">Pulso</Text>
          <View className="w-[130px] flex-row items-center justify-center">
            <InputNumeric
              value={patientInfo.bodyPulse}
              onChangeText={(e) => handleInputChange('bodyPulse', e)}
            />
            <Text className="uppercase">b.c.p.m</Text>
          </View>
        </View>
        <View className="center-between w-3/6 flex-1 items-center">
          <Text className="text-center text-base font-medium">Respiração</Text>
          <View className="w-[130px] flex-row items-center justify-center">
            <InputNumeric
              value={patientInfo.breathing}
              onChangeText={(e) => handleInputChange('breathing', e)}
            />
            <Text className="uppercase">m.r.m</Text>
          </View>
        </View>
      </View>
      <Divider
        my="2"
        _light={{
          bg: 'muted.800',
        }}
        _dark={{
          bg: 'muted.50',
        }}
      />
      <View className="mt-3 w-full flex-row">
        <View className="center-between w-3/6 flex-1 items-center">
          <Text className="text-center text-base font-medium">Saturação</Text>
          <View className="w-[130px] flex-row items-center justify-center">
            <InputNumeric
              value={patientInfo.saturation}
              onChangeText={(e) => handleInputChange('saturation', e)}
            />
            <Text>%</Text>
          </View>
        </View>
        <View className="center-between w-3/6 flex-1 items-center">
          <Text className="text-center text-base font-medium">Perfusão</Text>
          <View className="">
            <Perfusaoinfo
              selectedOption={perfusaoOption}
              onSelectOption={handleSetPerfusaoInfo}
            />
          </View>
        </View>
      </View>
    </View>
  )
}
