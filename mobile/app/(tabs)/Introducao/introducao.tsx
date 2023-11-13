/* eslint-disable no-unused-vars */
import { View, ScrollView, Text, ActivityIndicator } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import React, { useEffect, useState } from 'react'
import Header from '@app/components/Header'
import Title from '@app/components/Title'
import Footer from '@app/components/Footer'
import Options from '@app/components/optionsIntroducao'
import InputLowPadding from '@app/components/InputLowPadding'
import { styles as s } from '@app/styles/boxShadow'
import InputDatePicker from '@app/components/InputDatePIcker'
import { RootState } from '@src/redux/stores/stores'
import { useDispatch, useSelector } from 'react-redux'
import updateReport from '@src/api/reports/updateReport'
import MainButton from '@app/components/MainButton'
import { formatReportDate } from '@src/utils/formatReportDate'
import InputNumeric from '@app/components/inputNumeric'
import findReports from '@src/api/reports/findReport'
import InputCpf from '@app/components/inputCpf'
import InputTelefone from '@app/components/inputTelefone'
import { Checkbox, useToast } from 'native-base'
import updatePreHospitalarMethod from '@src/api/reports/preHospitalarMethod/updatePreHospitalarMethods'
import findPreHospitalarMethodByReport from '@src/api/reports/preHospitalarMethod/findPreHospitalarMethodByReport'
import updateSymptomsMethod from '@src/api/reports/symptoms/updateSymtoms'
import findSymptomsByReport from '@src/api/reports/symptoms/findSymptoms'
import { determineCompletness } from './utils/determineCompletness'
import { saveIntroductionCompletness } from '@src/redux/reducers/completnessReducer'
import { RouteProp, useNavigation } from '@react-navigation/core'
import { StackNavigationProp } from '@react-navigation/stack'

type CheckboxStates = {
  AFOGAMENTO?: boolean
  AGRESSAO?: boolean
  ATROPELAMENTO?: boolean
  CAUSADO_POR_ANIMAIS?: boolean
  CHOQUE_ELETRICO?: boolean
  COM_MEIO_DE_TRANSPORTE?: boolean
  DESABAMENTO?: boolean
  DESMORONAMENTO?: boolean
  DOMESTICO?: boolean
  EMERGENCIA_MEDICA?: boolean
  ESPORTIVO?: boolean
  INTOXICACAO?: boolean
  QUEDA_BICICLETA?: boolean
  QUEDA_MOTO?: boolean
  QUEDA_MENOR_QUE_2M?: boolean
  QUEDA_MAIOR_QUE_2M?: boolean
  QUEDA_PROPRIA_ALTURA?: boolean
  TENTATIVA_DE_SUICIDIO?: boolean
  TRABALHO?: boolean
  TRANSFERENCIA?: boolean
}

type SymptomsCheckboxStates = {
  ABD_SENSIVEL_RIGIDO?: boolean
  AFUNDAMENTO_DE_CRANIO?: boolean
  AGITACAO?: boolean
  AMNESIA?: boolean
  ANGINA_DE_PEITO?: boolean
  APINEIA?: boolean
  BRADICARDIA?: boolean
  BRADIPNEIA?: boolean
  BRONCO_ASPIRANDO?: boolean
  CEFALIA?: boolean
  CIANOSE_LABIOS?: boolean
  CIANOSE_EXTREMIDADES?: boolean
  CONVULSAO?: boolean
  DECORTICACAO?: boolean
  DEFORMIDADE?: boolean
  DESCEREBRACAO?: boolean
  DESMAIO?: boolean
  DESVIO_DE_TRAQUEIA?: boolean
  DISPNEIA?: boolean
  DOR_LOCAL?: boolean
  EDEMA_GENERALIZADO?: boolean
  EDEMA_LOCALIZADO?: boolean
  ENFISEMA_SUBCUTANEO?: boolean
  ESTASE_DA_JUGULAR?: boolean
  FACE_PALIDA?: boolean
  HEMORRAGIA_INTERNA?: boolean
  HEMORRAGIA_EXTERNA?: boolean
  HIPERTENSAO?: boolean
  HIPOTENSAO?: boolean
  NAUSEAS_VOMITOS?: boolean
  NASORAGIA?: boolean
  OBITO?: boolean
  OTORREIA?: boolean
  OTORRAGIA?: boolean
  OVACE?: boolean
  PARADA_CARDIACA?: boolean
  PARADA_RESPIRATORIA?: boolean
  PRIAPRISMO?: boolean
  PRURIDO_NA_PELE?: boolean
  ANISOCORIA_NAO_REAGENTE?: boolean
  ANISOCORIA_REAGENTE?: boolean
  ISOCORIA_NAO_REAGENTE?: boolean
  ISOCORIA_REAGENTE?: boolean
  MIDRIASE_NAO_REAGENTE?: boolean
  MIDRIASE_REAGENTE?: boolean
  MIOSE_NAO_REAGENTE?: boolean
  MIOSE_REAGENTE?: boolean
  SEDE?: boolean
  SINAL_DE_BATTLE?: boolean
  SINAL_DE_GUAXINIM?: boolean
  SUDORESE?: boolean
  TAQUIPNEIA?: boolean
  TAQUICARDIA?: boolean
  TONTURA?: boolean
}

type RemoveMetaPropertiesType = {
  id: number
  createdAt: string
  updatedAt: string
  ReportOwnerId: string
  ownerId: number
  systolicBloodPressure: number
  diastolicBloodPressure: number
  bodyTemp: number
  bodyPulse: number
  breathing: number
  saturation: number
  perfusion: string
}

export default function Introducao() {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const { bottom, top } = useSafeAreaInsets()
  const reportId = useSelector((state: RootState) => state.report.reportId)
  const ReportOwnerId = useSelector((state: RootState) => state.report.reportId)
  const ownerId = useSelector((state: RootState) => state.auth.userId)
  const preHospitalarMethodId = useSelector(
    (state: RootState) => state.preHospitalarMethod.preHospitalarMethodId,
  )
  const signsAndSymptomsId = useSelector(
    (state: RootState) => state.signsAndSymptoms.signsAndSymptomsId,
  )

  // const [checkboxTest, setCheckboxTest] = useState(false)

  const [reportDateTime, setReportDateTime] = useState('')
  const [name, setName] = useState(' ')
  const [age, setAge] = useState(0)
  const [gender, setGender] = useState(' ')
  const [cpf, setCpf] = useState('0')
  const [phone, setPhone] = useState('0')
  const [reportPlace, setReportPlace] = useState(' ')
  const [loading, setLoading] = useState(false)
  const [buttonLoading, setButtonLoading] = useState(false)
  const [followUpAge, setFollowUpAge] = useState(0)
  const [followUp, setFollowUp] = useState('')
  const [
    preHospitalarMethodCheckboxState,
    setpreHospitalarMethodCheckboxState,
  ] = useState<CheckboxStates>({
    AFOGAMENTO: false,
    AGRESSAO: false,
    ATROPELAMENTO: false,
    CAUSADO_POR_ANIMAIS: false,
    CHOQUE_ELETRICO: false,
    COM_MEIO_DE_TRANSPORTE: false,
    DESABAMENTO: false,
    DESMORONAMENTO: false,
    DOMESTICO: false,
    EMERGENCIA_MEDICA: false,
    ESPORTIVO: false,
    INTOXICACAO: false,
    QUEDA_BICICLETA: false,
    QUEDA_MOTO: false,
    QUEDA_MENOR_QUE_2M: false,
    QUEDA_MAIOR_QUE_2M: false,
    QUEDA_PROPRIA_ALTURA: false,
    TENTATIVA_DE_SUICIDIO: false,
    TRABALHO: false,
    TRANSFERENCIA: false,
  })

  const [signsAndSymptomsCheckboxState, setSignsAndSymptomsCheckboxState] =
    useState<SymptomsCheckboxStates>({
      ABD_SENSIVEL_RIGIDO: false,
      AFUNDAMENTO_DE_CRANIO: false,
      AGITACAO: false,
      AMNESIA: false,
      ANGINA_DE_PEITO: false,
      APINEIA: false,
      BRADICARDIA: false,
      BRADIPNEIA: false,
      BRONCO_ASPIRANDO: false,
      CEFALIA: false,
      CIANOSE_LABIOS: false,
      CIANOSE_EXTREMIDADES: false,
      CONVULSAO: false,
      DECORTICACAO: false,
      DEFORMIDADE: false,
      DESCEREBRACAO: false,
      DESMAIO: false,
      DESVIO_DE_TRAQUEIA: false,
      DISPNEIA: false,
      DOR_LOCAL: false,
      EDEMA_GENERALIZADO: false,
      EDEMA_LOCALIZADO: false,
      ENFISEMA_SUBCUTANEO: false,
      ESTASE_DA_JUGULAR: false,
      FACE_PALIDA: false,
      HEMORRAGIA_INTERNA: false,
      HEMORRAGIA_EXTERNA: false,
      HIPERTENSAO: false,
      HIPOTENSAO: false,
      NAUSEAS_VOMITOS: false,
      NASORAGIA: false,
      OBITO: false,
      OTORREIA: false,
      OTORRAGIA: false,
      OVACE: false,
      PARADA_CARDIACA: false,
      PARADA_RESPIRATORIA: false,
      PRIAPRISMO: false,
      PRURIDO_NA_PELE: false,
      ANISOCORIA_NAO_REAGENTE: false,
      ANISOCORIA_REAGENTE: false,
      ISOCORIA_NAO_REAGENTE: false,
      ISOCORIA_REAGENTE: false,
      MIDRIASE_NAO_REAGENTE: false,
      MIDRIASE_REAGENTE: false,
      MIOSE_NAO_REAGENTE: false,
      MIOSE_REAGENTE: false,
      SEDE: false,
      SINAL_DE_BATTLE: false,
      SINAL_DE_GUAXINIM: false,
      SUDORESE: false,
      TAQUIPNEIA: false,
      TAQUICARDIA: false,
      TONTURA: false,
    })

  const handlePreHospitalarMethodCheckboxChange = (
    key: keyof CheckboxStates,
  ) => {
    if (
      Object.prototype.hasOwnProperty.call(
        preHospitalarMethodCheckboxState,
        key,
      )
    ) {
      setpreHospitalarMethodCheckboxState((prevState) => {
        return {
          ...prevState,
          [key]: !prevState[key],
        }
      })
    }
  }

  const handleSignsAndSymptomsCheckboxChange = (
    key: keyof SymptomsCheckboxStates,
  ) => {
    if (
      Object.prototype.hasOwnProperty.call(signsAndSymptomsCheckboxState, key)
    ) {
      setSignsAndSymptomsCheckboxState((prevState) => {
        return {
          ...prevState,
          [key]: !prevState[key],
        }
      })
    }
  }

  useEffect(() => {
    const findReportsData = async () => {
      try {
        setLoading(true)

        const response = await findReports(reportId)

        const ageResponse = response.report.age
        const nameResponse = response.report.name
        const phoneResponse = response.report.phone
        const cpfReposnse = response.report.cpf
        const reportDateTimeResponse = response.report.reportDate
        const reportPlaceResponse = response.report.reportPlace
        const genderResponse = response.report.gender
        const followUpResponse = response.report.followUp
        const followUpAgeResponse = response.report.followUpAge

        setAge(ageResponse)
        setName(nameResponse)
        setPhone(phoneResponse)
        setCpf(cpfReposnse)
        setReportDateTime(reportDateTimeResponse)
        setReportPlace(reportPlaceResponse)
        setGender(genderResponse)
        setFollowUp(followUpResponse)
        setFollowUpAge(followUpAgeResponse)

        const preHospitalarMethodResponse =
          await findPreHospitalarMethodByReport(reportId)

        if (
          preHospitalarMethodResponse &&
          Array.isArray(preHospitalarMethodResponse.preHospitalarMethods) &&
          preHospitalarMethodResponse.preHospitalarMethods.length > 0
        ) {
          const preHospitalarMethodDescription =
            preHospitalarMethodResponse.preHospitalarMethods[0]
              .preHospitalarMethodDescription || []

          const isAFOGAMENTOSelected =
            preHospitalarMethodDescription.includes('AFOGAMENTO')
          const isAGRESSAOSelected =
            preHospitalarMethodDescription.includes('AGRESSAO')
          const isATROPELAMENTOSelected =
            preHospitalarMethodDescription.includes('ATROPELAMENTO')
          const isCAUSADO_POR_ANIMAISSelected =
            preHospitalarMethodDescription.includes('CAUSADO_POR_ANIMAIS')
          const isCHOQUE_ELETRICOSelected =
            preHospitalarMethodDescription.includes('CHOQUE_ELETRICO')
          const isCOM_MEIO_DE_TRANSPORTESelected =
            preHospitalarMethodDescription.includes('COM_MEIO_DE_TRANSPORTE')
          const isDESABAMENTOSelected =
            preHospitalarMethodDescription.includes('DESABAMENTO')
          const isDESMORONAMENTOSelected =
            preHospitalarMethodDescription.includes('DESMORONAMENTO')
          const isDOMESTICOSelected =
            preHospitalarMethodDescription.includes('DOMESTICO')
          const isEMERGENCIA_MEDICASelected =
            preHospitalarMethodDescription.includes('EMERGENCIA_MEDICA')
          const isESPORTIVOSelected =
            preHospitalarMethodDescription.includes('ESPORTIVO')
          const isINTOXICACAOSelected =
            preHospitalarMethodDescription.includes('INTOXICACAO')
          const isQUEDA_BICICLETASelected =
            preHospitalarMethodDescription.includes('QUEDA_BICICLETA')
          const isQUEDA_MOTOSelected =
            preHospitalarMethodDescription.includes('QUEDA_MOTO')
          const isQUEDA_MENOR_QUE_2MSelected =
            preHospitalarMethodDescription.includes('QUEDA_MENOR_QUE_2M')
          const isQUEDA_MAIOR_QUE_2MSelected =
            preHospitalarMethodDescription.includes('QUEDA_MAIOR_QUE_2M')
          const isQUEDA_PROPRIA_ALTURASelected =
            preHospitalarMethodDescription.includes('QUEDA_PROPRIA_ALTURA')
          const isTENTATIVA_DE_SUICIDIOSelected =
            preHospitalarMethodDescription.includes('TENTATIVA_DE_SUICIDIO')
          const isTRABALHOSelected =
            preHospitalarMethodDescription.includes('TRABALHO')
          const isTRANSFERENCIASelected =
            preHospitalarMethodDescription.includes('TRANSFERENCIA')

          setpreHospitalarMethodCheckboxState((prevState) => {
            return {
              ...prevState,
              AFOGAMENTO: isAFOGAMENTOSelected,
              AGRESSAO: isAGRESSAOSelected,
              ATROPELAMENTO: isATROPELAMENTOSelected,
              CAUSADO_POR_ANIMAIS: isCAUSADO_POR_ANIMAISSelected,
              CHOQUE_ELETRICO: isCHOQUE_ELETRICOSelected,
              COM_MEIO_DE_TRANSPORTE: isCOM_MEIO_DE_TRANSPORTESelected,
              DESABAMENTO: isDESABAMENTOSelected,
              DESMORONAMENTO: isDESMORONAMENTOSelected,
              DOMESTICO: isDOMESTICOSelected,
              EMERGENCIA_MEDICA: isEMERGENCIA_MEDICASelected,
              ESPORTIVO: isESPORTIVOSelected,
              INTOXICACAO: isINTOXICACAOSelected,
              QUEDA_BICICLETA: isQUEDA_BICICLETASelected,
              QUEDA_MOTO: isQUEDA_MOTOSelected,
              QUEDA_MENOR_QUE_2M: isQUEDA_MENOR_QUE_2MSelected,
              QUEDA_MAIOR_QUE_2M: isQUEDA_MAIOR_QUE_2MSelected,
              QUEDA_PROPRIA_ALTURA: isQUEDA_PROPRIA_ALTURASelected,
              TENTATIVA_DE_SUICIDIO: isTENTATIVA_DE_SUICIDIOSelected,
              TRABALHO: isTRABALHOSelected,
              TRANSFERENCIA: isTRANSFERENCIASelected,
            }
          })
        }

        const symptomsResponse = await findSymptomsByReport(reportId)

        if (
          symptomsResponse &&
          Array.isArray(symptomsResponse.symptoms) &&
          symptomsResponse.symptoms.length > 0
        ) {
          const symptomsDescription =
            symptomsResponse.symptoms[0].symptomsDescription || []

          const isABD_SENSIVEL_RIGIDOSelected = symptomsDescription.includes(
            'ABD_SENSIVEL_RIGIDO',
          )
          const isAFUNDAMENTO_DE_CRANIOSelected = symptomsDescription.includes(
            'AFUNDAMENTO_DE_CRANIO',
          )
          const isAGITACAOSelected = symptomsDescription.includes('AGITACAO')
          const isAMNESIASelected = symptomsDescription.includes('AMNESIA')
          const isANGINA_DE_PEITOSelected =
            symptomsDescription.includes('ANGINA_DE_PEITO')
          const isAPINEIASelected = symptomsDescription.includes('APINEIA')
          const isBRADICARDIASelected =
            symptomsDescription.includes('BRADICARDIA')
          const isBRADIPNEIASelected =
            symptomsDescription.includes('BRADIPNEIA')
          const isBRONCO_ASPIRANDOSelected =
            symptomsDescription.includes('BRONCO_ASPIRANDO')
          const isCEFALIASelected = symptomsDescription.includes('CEFALIA')
          const isCIANOSE_LABIOSSelected =
            symptomsDescription.includes('CIANOSE_LABIOS')
          const isCIANOSE_EXTREMIDADESSelected = symptomsDescription.includes(
            'CIANOSE_EXTREMIDADES',
          )
          const isCONVULSAOSelected = symptomsDescription.includes('CONVULSAO')
          const isDECORTICACAOSelected =
            symptomsDescription.includes('DECORTICACAO')
          const isDEFORMIDADESelected =
            symptomsDescription.includes('DEFORMIDADE')
          const isDESCEREBRACAOSelected =
            symptomsDescription.includes('DESCEREBRACAO')
          const isDESMaIOSelected = symptomsDescription.includes('DESMaIO')
          const isDESVIO_DE_TRAQUEIASelected =
            symptomsDescription.includes('DESVIO_DE_TRAQUEIA')
          const isDISPNEIASelected = symptomsDescription.includes('DISPNEIA')
          const isDOR_LOCALSelected = symptomsDescription.includes('DOR_LOCAL')
          const isEDEMA_GENERALIZADOSelected =
            symptomsDescription.includes('EDEMA_GENERALIZADO')
          const isEDEMA_LOCALIZADOSelected =
            symptomsDescription.includes('EDEMA_LOCALIZADO')
          const isENFISEMA_SUBCUTANEOSelected = symptomsDescription.includes(
            'ENFISEMA_SUBCUTANEO',
          )
          const isESTASE_DA_JUGULARSelected =
            symptomsDescription.includes('ESTASE_DA_JUGULAR')
          const isFACE_PALIDASelected =
            symptomsDescription.includes('FACE_PALIDA')
          const isHEMORRAGIA_INTERNASelected =
            symptomsDescription.includes('HEMORRAGIA_INTERNA')
          const isHEMORRAGIA_EXTERNASelected =
            symptomsDescription.includes('HEMORRAGIA_EXTERNA')
          const isHIPERTENSAOSelected =
            symptomsDescription.includes('HIPERTENSAO')
          const isHIPOTENSAOSelected =
            symptomsDescription.includes('HIPOTENSAO')
          const isNAUSEAS_VOMITOSSelected =
            symptomsDescription.includes('NAUSEAS_VOMITOS')
          const isNASORAGIASelected = symptomsDescription.includes('NASORAGIA')
          const isOBITOSelected = symptomsDescription.includes('OBITO')
          const isOTORREIASelected = symptomsDescription.includes('OTORREIA')
          const isOTORRAGIASelected = symptomsDescription.includes('OTORRAGIA')
          const isOVACESelected = symptomsDescription.includes('OVACE')
          const isPARADA_CARDIACASelected =
            symptomsDescription.includes('PARADA_CARDIACA')
          const isPARADA_RESPIRATORIASelected = symptomsDescription.includes(
            'PARADA_RESPIRATORIA',
          )
          const isPRIAPRISMOSelected =
            symptomsDescription.includes('PRIAPRISMO')
          const isPRURIDO_NA_PELESelected =
            symptomsDescription.includes('PRURIDO_NA_PELE')
          const isANISOCORIA_NAO_REAGENTESelected =
            symptomsDescription.includes('ANISOCORIA_NAO_REAGENTE')
          const isANISOCORIA_REAGENTESelected = symptomsDescription.includes(
            'ANISOCORIA_REAGENTE',
          )
          const isISOCORIA_NAO_REAGENTESelected = symptomsDescription.includes(
            'ISOCORIA_NAO_REAGENTE',
          )
          const isISOCORIA_REAGENTESelected =
            symptomsDescription.includes('ISOCORIA_REAGENTE')
          const isMIDRIASE_NAO_REAGENTESelected = symptomsDescription.includes(
            'MIDRIASE_NAO_REAGENTE',
          )
          const isMIDRIASE_REAGENTESelected =
            symptomsDescription.includes('MIDRIASE_REAGENTE')
          const isMIOSE_NAO_REAGENTESelected =
            symptomsDescription.includes('MIOSE_NAO_REAGENTE')
          const isMIOSE_REAGENTESelected =
            symptomsDescription.includes('MIOSE_REAGENTE')
          const isSEDESelected = symptomsDescription.includes('SEDE')
          const isSINAL_DE_BATTLESelected =
            symptomsDescription.includes('SINAL_DE_BATTLE')
          const isSINAL_DE_GUAXINIMSelected =
            symptomsDescription.includes('SINAL_DE_GUAXINIM')
          const isSUDORESESelected = symptomsDescription.includes('SUDORESE')
          const isTAQUIPNEIASelected =
            symptomsDescription.includes('TAQUIPNEIA')
          const isTAQUICARDIASelected =
            symptomsDescription.includes('TAQUICARDIA')
          const isTONTURASelected = symptomsDescription.includes('TONTURA')

          setSignsAndSymptomsCheckboxState((prevState) => {
            return {
              ...prevState,
              ABD_SENSIVEL_RIGIDO: isABD_SENSIVEL_RIGIDOSelected,
              AFUNDAMENTO_DE_CRANIO: isAFUNDAMENTO_DE_CRANIOSelected,
              AGITACAO: isAGITACAOSelected,
              AMNESIA: isAMNESIASelected,
              ANGINA_DE_PEITO: isANGINA_DE_PEITOSelected,
              APINEIA: isAPINEIASelected,
              BRADICARDIA: isBRADICARDIASelected,
              BRADIPNEIA: isBRADIPNEIASelected,
              BRONCO_ASPIRANDO: isBRONCO_ASPIRANDOSelected,
              CEFALIA: isCEFALIASelected,
              CIANOSE_LABIOS: isCIANOSE_LABIOSSelected,
              CIANOSE_EXTREMIDADES: isCIANOSE_EXTREMIDADESSelected,
              CONVULSAO: isCONVULSAOSelected,
              DECORTICACAO: isDECORTICACAOSelected,
              DEFORMIDADE: isDEFORMIDADESelected,
              DESCEREBRACAO: isDESCEREBRACAOSelected,
              DESMAIO: isDESMaIOSelected,
              DESVIO_DE_TRAQUEIA: isDESVIO_DE_TRAQUEIASelected,
              DISPNEIA: isDISPNEIASelected,
              DOR_LOCAL: isDOR_LOCALSelected,
              EDEMA_GENERALIZADO: isEDEMA_GENERALIZADOSelected,
              EDEMA_LOCALIZADO: isEDEMA_LOCALIZADOSelected,
              ENFISEMA_SUBCUTANEO: isENFISEMA_SUBCUTANEOSelected,
              ESTASE_DA_JUGULAR: isESTASE_DA_JUGULARSelected,
              FACE_PALIDA: isFACE_PALIDASelected,
              HEMORRAGIA_INTERNA: isHEMORRAGIA_INTERNASelected,
              HEMORRAGIA_EXTERNA: isHEMORRAGIA_EXTERNASelected,
              HIPERTENSAO: isHIPERTENSAOSelected,
              HIPOTENSAO: isHIPOTENSAOSelected,
              NAUSEAS_VOMITOS: isNAUSEAS_VOMITOSSelected,
              NASORAGIA: isNASORAGIASelected,
              OBITO: isOBITOSelected,
              OTORREIA: isOTORREIASelected,
              OTORRAGIA: isOTORRAGIASelected,
              OVACE: isOVACESelected,
              PARADA_CARDIACA: isPARADA_CARDIACASelected,
              PARADA_RESPIRATORIA: isPARADA_RESPIRATORIASelected,
              PRIAPRISMO: isPRIAPRISMOSelected,
              PRURIDO_NA_PELE: isPRURIDO_NA_PELESelected,
              ANISOCORIA_NAO_REAGENTE: isANISOCORIA_NAO_REAGENTESelected,
              ANISOCORIA_REAGENTE: isANISOCORIA_REAGENTESelected,
              ISOCORIA_NAO_REAGENTE: isISOCORIA_NAO_REAGENTESelected,
              ISOCORIA_REAGENTE: isISOCORIA_REAGENTESelected,
              MIDRIASE_NAO_REAGENTE: isMIDRIASE_NAO_REAGENTESelected,
              MIDRIASE_REAGENTE: isMIDRIASE_REAGENTESelected,
              MIOSE_NAO_REAGENTE: isMIOSE_NAO_REAGENTESelected,
              MIOSE_REAGENTE: isMIOSE_REAGENTESelected,
              SEDE: isSEDESelected,
              SINAL_DE_BATTLE: isSINAL_DE_BATTLESelected,
              SINAL_DE_GUAXINIM: isSINAL_DE_GUAXINIMSelected,
              SUDORESE: isSUDORESESelected,
              TAQUIPNEIA: isTAQUIPNEIASelected,
              TAQUICARDIA: isTAQUICARDIASelected,
              TONTURA: isTONTURASelected,
            }
          })
        }
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    findReportsData()
  }, [reportId])

  const toast = useToast()

  const preHospitalarMethodDescription = Object.entries(
    preHospitalarMethodCheckboxState || {},
  )
    .filter(([key, value]) => value)
    .map(([key]) => key)

  const symptomsDescription = Object.entries(
    signsAndSymptomsCheckboxState || {},
  )
    .filter(([key, value]) => value)
    .map(([key]) => key)

  const removeMetaProperties = (
    obj: RemoveMetaPropertiesType,
  ): Omit<
    RemoveMetaPropertiesType,
    | 'id'
    | 'createdAt'
    | 'updatedAt'
    | 'ReportOwnerId'
    | 'ownerId'
    | 'systolicBloodPressure'
    | 'diastolicBloodPressure'
    | 'bodyTemp'
    | 'bodyPulse'
    | 'breathing'
    | 'saturation'
    | 'perfusion'
  > => {
    // eslint-disable-next-line no-unused-vars
    const {
      id,
      createdAt,
      updatedAt,
      ReportOwnerId,

      ownerId,
      systolicBloodPressure,
      diastolicBloodPressure,
      bodyTemp,
      bodyPulse,
      breathing,
      saturation,
      perfusion,

      ...withoutMeta
    } = obj
    return withoutMeta
  }

  const handleSubmitIntroduction = async () => {
    try {
      setButtonLoading(true)
      const reportDate = formatReportDate(reportDateTime)

      const response = await updateReport(
        ownerId,
        reportId,
        reportDate,
        name,
        age,
        gender,
        cpf,
        phone,
        reportPlace,
        followUpAge,
        followUp,
      )

      const reportWithoutMeta = removeMetaProperties(
        response.updatedReport,
      ) as Record<string, any>

      let reportEmpty = 0

      for (const key in reportWithoutMeta) {
        if (
          reportWithoutMeta[key] === '' ||
          reportWithoutMeta[key] === 0 ||
          reportWithoutMeta[key] === false ||
          (Array.isArray(reportWithoutMeta[key]) &&
            reportWithoutMeta[key].length === 0) ||
          reportWithoutMeta[key] === null
        ) {
          reportEmpty++
        }
      }

      const preHospitalarMethodResponse = await updatePreHospitalarMethod(
        ReportOwnerId,
        preHospitalarMethodId,
        preHospitalarMethodDescription,
      )

      const preHospitalarMethodWithoutMeta = removeMetaProperties(
        preHospitalarMethodResponse.updatePreHospitalarMethod,
      ) as Record<string, any>

      let preHospitalarMethodEmpty = 0

      for (const key in preHospitalarMethodWithoutMeta) {
        if (
          preHospitalarMethodWithoutMeta[key] === '' ||
          preHospitalarMethodWithoutMeta[key] === 0 ||
          preHospitalarMethodWithoutMeta[key] === false ||
          (Array.isArray(preHospitalarMethodWithoutMeta[key]) &&
            preHospitalarMethodWithoutMeta[key].length === 0) ||
          preHospitalarMethodWithoutMeta[key] === null
        ) {
          preHospitalarMethodEmpty++
        }
      }

      const symptomsResponse = await updateSymptomsMethod(
        ReportOwnerId,
        signsAndSymptomsId,
        symptomsDescription,
      )

      const symptomsWithoutMeta = removeMetaProperties(
        symptomsResponse.updatedSymptom,
      ) as Record<string, any>

      let symptomsEmpty = 0

      for (const key in symptomsWithoutMeta) {
        if (
          symptomsWithoutMeta[key] === '' ||
          symptomsWithoutMeta[key] === 0 ||
          symptomsWithoutMeta[key] === false ||
          (Array.isArray(symptomsWithoutMeta[key]) &&
            symptomsWithoutMeta[key].length === 0) ||
          symptomsWithoutMeta[key] === null
        ) {
          symptomsEmpty++
        }
      }

      const introductionCompletness = determineCompletness(
        reportEmpty,
        preHospitalarMethodEmpty,
        symptomsEmpty,
      )

      if (
        response &&
        response.updatedReport &&
        preHospitalarMethodResponse &&
        preHospitalarMethodResponse.updatePreHospitalarMethod &&
        symptomsResponse &&
        symptomsResponse.updatedSymptom
      ) {
        navigation.navigate('ocorrencia' as never)
        dispatch(saveIntroductionCompletness(introductionCompletness))
        toast.show({
          description: 'Informações de Introdução salvas com sucesso.',
          duration: 3000,
          placement: 'bottom',
          style: { backgroundColor: '#0AC800' },
        })
      }
    } catch (error) {
      console.error(error)
    } finally {
      setButtonLoading(false)
    }
  }

  const handleSelectGender = (selectedGender: 'Male' | 'Female' | null) => {
    if (selectedGender !== null) {
      setGender(selectedGender)
    }
  }

  return (
    <ScrollView
      className="flex-1"
      contentContainerStyle={{ paddingBottom: bottom, paddingTop: top }}
    >
      {loading ? (
        <View className="mx-auto h-screen w-[320px] items-center justify-center">
          <ActivityIndicator size="large" color="#ff0000" />
          <Text className="mt-3 text-center text-lg font-bold uppercase">
            Carregando...
          </Text>
        </View>
      ) : (
        <>
          <Header />
          <Title iconName="suitcase" title="Introdução" />
          <View style={s.boxShadow} className="mx-auto">
            <View className="w-full flex-1 flex-row items-center">
              <View className="w-3/6 p-2">
                <InputDatePicker
                  reportDate={reportDateTime}
                  setReportDate={setReportDateTime}
                />
              </View>
              <View className="h-full w-3/6 items-center justify-center">
                <Options
                  title="Sexo"
                  Option1="Masc."
                  Option2="Fem."
                  selectedOption={gender}
                  onSelectOption={handleSelectGender}
                />
              </View>
            </View>
            <View className="mx-auto flex-1 flex-row">
              <InputLowPadding
                title="Nome"
                size="regular"
                alignText="left"
                value={name}
                placeholder={name || ''}
                onChangeText={(e) => setName(e)}
              />
              <InputNumeric
                title="Idade"
                size="small"
                value={age}
                onChangeText={(e) => setAge(e)}
              />
            </View>
            <View className="mx-auto flex-1 flex-row">
              <InputCpf
                title="RG/CPF"
                placeholder="___.___.___-__"
                value={cpf}
                onChangeText={(e) => setCpf(e)}
              />
              <InputTelefone
                title="Fone"
                placeholder="(__) _____-____"
                value={phone}
                onChangeText={(e) => setPhone(e)}
              />
            </View>
            <InputLowPadding
              title="Local da Ocorrência"
              value={reportPlace}
              onChangeText={(e) => setReportPlace(e)}
            />
            <View className="mx-auto flex-1 flex-row">
              <InputLowPadding
                title="Acompanhante"
                size="regular"
                alignText="left"
                value={followUp}
                placeholder={followUp || ''}
                onChangeText={(e) => setFollowUp(e)}
              />
              <InputNumeric
                title="Idade"
                size="small"
                value={followUpAge}
                onChangeText={(e) => setFollowUpAge(e)}
              />
            </View>

            <View>
              <Title iconName="hospital-user" title="Pré-Hospitalar" />
              {Object.entries(preHospitalarMethodCheckboxState).map(
                ([key, isChecked]) => (
                  <Checkbox
                    key={key}
                    size="md"
                    colorScheme="danger"
                    value={key}
                    isChecked={isChecked}
                    onChange={() =>
                      handlePreHospitalarMethodCheckboxChange(
                        key as keyof CheckboxStates,
                      )
                    }
                  >
                    <Text className="text-lg text-slate-800">{key}</Text>
                  </Checkbox>
                ),
              )}
            </View>
            <View>
              <Title iconName="info-circle" title="Sinais e sintomas" />
              {Object.entries(signsAndSymptomsCheckboxState).map(
                ([key, isChecked]) => (
                  <Checkbox
                    key={key}
                    size="md"
                    colorScheme="danger"
                    value={key}
                    isChecked={isChecked}
                    onChange={() =>
                      handleSignsAndSymptomsCheckboxChange(
                        key as keyof SymptomsCheckboxStates,
                      )
                    }
                  >
                    <Text className="text-lg text-slate-800">{key}</Text>
                  </Checkbox>
                ),
              )}
            </View>
          </View>

          <MainButton
            innerText="SALVAR"
            onPress={() => handleSubmitIntroduction()}
            isLoading={buttonLoading}
          />

          {/* <ManyCheckboxes
            title="Teste"
            options={[
              {
                key: 'test1',
                value: 'test',
                state: checkboxTest,
                setState: setCheckboxTest,
              },
              {
                key: 'test2',
                value: 'test',
                state: checkboxTest,
                setState: setCheckboxTest,
              },
              {
                key: 'test3',
                value: 'test',
                state: checkboxTest,
                setState: setCheckboxTest,
              },
              {
                key: 'test4',
                value: 'test',
                state: checkboxTest,
                setState: setCheckboxTest,
              },
              {
                key: 'test5',
                value: 'test',
                state: checkboxTest,
                setState: setCheckboxTest,
              },
              {
                key: 'test6',
                value: 'test',
                state: checkboxTest,
                setState: setCheckboxTest,
              },
            ]}
            maxOptions={5}
          /> */}
          <Footer />
        </>
      )}
    </ScrollView>
  )
}
