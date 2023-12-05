import {
  ScrollView,
  Text,
  TouchableOpacity,
  Button,
  Modal,
  ActivityIndicator,
  View,
  SafeAreaView,
  Pressable,
} from 'react-native'
import React, { useState } from 'react'
import Header from '@app/components/Header'
import Grouper from '@app/components/Grouper'
import Footer from '@app/components/Footer'
import { FontAwesome5, AntDesign } from '@expo/vector-icons'
import MainButton from '@app/components/MainButton'
import { useDispatch, useSelector } from 'react-redux'
import registerAnamnesis from '@src/api/reports/anamnesis/registerAnamnesis'
import { RootState } from '@src/redux/stores/stores'
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
  saveAnamnesisId,
  saveCinematicAvaliationId,
  saveFinalizationId,
  saveGestacionalAnamnesisId,
  saveGlasgowId,
  saveInfoHospitalarId,
  saveInfoTransportId,
  savePreHospitalarMethodId,
  saveSignsAndSymptomsId,
  saveSuspectProblemsId,
} from '@src/redux/actions/reportActions'
import ExcluirOcorrenciaModal from '@app/modal/ExcluirOcorrenciaModal'
import { styles as s } from '@app/styles/boxShadow'
import deleteReport from '@src/api/reports/deleteReport'
import registerGesAnamnesis from '@src/api/reports/gestacionalAnamnesis/registerGestacionalAnamnesis'
import registerFinalization from '@src/api/reports/finalization/registerFinalization'
import registerSuspectProblems from '@src/api/reports/suspectProblems/registerSuspectProblems'
import registerGlasgow from '@src/api/reports/glasgow/registerGlasgow'
import registerCinematicAvaliation from '@src/api/reports/cinematicAvaliation/registerCinematicAvaliation'
import Loader from '@app/components/Loader'
import registerPreHospitalarMethods from '@src/api/reports/preHospitalarMethod/registerPreHospitalarMethod'
import registerSymptoms from '@src/api/reports/symptoms/registerSymptoms'
import { RouteProp } from '@react-navigation/core'
import { StackNavigationProp } from '@react-navigation/stack'
import registerTransport from '@src/api/reports/infoTransport/registerTransport'
import VerifyGender from '@app/modal/verifyGender'
import findReports from '@src/api/reports/findReport'
import WarningModal from '@app/modal/warningModal'
import { clearCompletness } from '@src/redux/reducers/completnessReducer'
import registerInfoHospitalar from '@src/api/reports/infoHospitalar/registerInfoHospitalar'
import ReportFinalized from '@app/modal/ReportFinalized'
import SelectAge from '@app/modal/selectAge'

type RootStackParamList = {
  ocorrencia: undefined
  home: undefined
  anamnese: {
    screen: string
    params: {
      anamnesisId: number
    }
  }
  'anamnese-gestacional': {
    screen: string
    params: {
      gestacionalAnamnesisId: number
    }
  }
  finalizacao: {
    screen: string
    params: {
      finalizationId: number
      cinematicAvaliation: number
    }
  }
  'info-paciente': {
    screen: string
    params: {
      suspectProblemsId: number
      glasgowId: number
    }
  }
  introducao: {
    screen: string
    params: {
      preHospitalarMethodId: number
      signsAndSymptomsId: number
    }
  }
  'local-traumas': undefined
  'info-transporte': undefined
  'info-hospitalares': undefined
}

type OcorrenciaScreenRouteProp = RouteProp<RootStackParamList, 'ocorrencia'>
type OcorrenciaScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ocorrencia'
>

type OcorrenciaProps = {
  route: OcorrenciaScreenRouteProp
  navigation: OcorrenciaScreenNavigationProp
}

const Ocorrencia: React.FC<OcorrenciaProps> = ({ navigation }) => {
  const ReportOwnerId = useSelector((state: RootState) => state.report.reportId)
  const anamnesisCompletness = useSelector(
    (state: RootState) => state.completness.anamnesisCompletness,
  )
  const finalizationCompletness = useSelector(
    (state: RootState) => state.completness.finalizationCompletness,
  )
  const gesAnamnesisCompletness = useSelector(
    (state: RootState) => state.completness.gesAnamnesisCompletness,
  )
  const introductionCompletness = useSelector(
    (state: RootState) => state.completness.introductionCompletness,
  )
  const infoPacienteCompletness = useSelector(
    (state: RootState) => state.completness.infoPacienteCompletness,
  )
  const localTraumasCompletness = useSelector(
    (state: RootState) => state.completness.localTraumasCompletness,
  )
  const infoTransportCompletness = useSelector(
    (state: RootState) => state.completness.infoTransportCompletness,
  )
  const currentMode = useSelector((state: RootState) => state.mode.mode)
  const reportId = useSelector((state: RootState) => state.report.reportId)

  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' })

    navigation.navigate('home')
  }

  const existingAnamnesisId = useSelector(
    (state: RootState) => state.anamnesis.anamnesisId,
  )

  const handleClickAnamnese = async () => {
    if (currentMode === 'create') {
      if (existingAnamnesisId) {
        navigation.navigate('anamnese', {
          screen: 'anamnese',
          params: { anamnesisId: existingAnamnesisId },
        })
      } else {
        const response = await registerAnamnesis(ReportOwnerId)

        if (response && response.anamnesis) {
          dispatch(saveAnamnesisId(response.anamnesis.id))
          navigation.navigate('anamnese', {
            screen: 'anamnese',
            params: { anamnesisId: response.anamnesis.id },
          })
        }
      }
    } else {
      try {
        // Tente encontrar o relatório
        const response = await findReports(reportId)
        const anamnesisId = response.report.Anamnesis[0]?.id

        if (anamnesisId) {
          // Se encontrar, use o ID existente
          dispatch(saveAnamnesisId(anamnesisId))
          navigation.navigate('anamnese' as never)
        } else {
          const response = await registerAnamnesis(reportId)

          if (response && response.anamnesis) {
            dispatch(saveAnamnesisId(response.anamnesis.id))

            navigation.navigate('anamnese', {
              screen: 'anamnese',
              params: { anamnesisId: response.anamnesis.id },
            })
          }
        }
      } catch (error) {
        console.error('Erro ao buscar/criar InfoTransporte:', error)
      }
    }
  }

  const existingGestacionalAnamnesisId = useSelector(
    (state: RootState) => state.gestacionalAnamnesis.gestacionalAnamnesisId,
  )

  const [modalAnamnesisGestacional, setModalAnamnesisGestacional] =
    useState(false)
  const [openWarningModal, setOpenWarningModal] = useState(false)
  const [gestacionalAnamnesisIsLoading, setGestacionalAnamnesisIsLoading] =
    useState(false)
  const [openAgeModal, setOpenAgeModal] = useState(false)

  const closeAnamnesisGestacionalModal = () => {
    setModalAnamnesisGestacional(false)
  }
  const closeWarningModal = () => {
    setOpenWarningModal(false)
  }
  const closeAgeModal = () => {
    setOpenAgeModal(false)
  }

  const handleClickGestacionalAnamnese = async () => {
    try {
      if (currentMode === 'create') {
        setGestacionalAnamnesisIsLoading(true)
        const findGender = await findReports(reportId)

        if (findGender && findGender.report.gender === null) {
          setModalAnamnesisGestacional(true)
        } else if (findGender && findGender.report.gender === 'Male') {
          setOpenWarningModal(true)
        } else if (findGender && findGender.report.gender === 'Female') {
          if (existingGestacionalAnamnesisId) {
            navigation.navigate('anamnese-gestacional', {
              screen: 'anamnese-gestacional',
              params: {
                gestacionalAnamnesisId: existingGestacionalAnamnesisId,
              },
            })
          } else {
            const response = await registerGesAnamnesis(ReportOwnerId)
            if (response && response.gesAnamnesis) {
              dispatch(saveGestacionalAnamnesisId(response.gesAnamnesis.id))
              navigation.navigate('anamnese-gestacional', {
                screen: 'anamnese-gestacional',
                params: { gestacionalAnamnesisId: response.gesAnamnesis.id },
              })
            }
          }
        }
      } else {
        try {
          setGestacionalAnamnesisIsLoading(true)

          const response = await findReports(reportId)
          const gesAnamnesisId = response.report.GestationalAnamnesis[0]?.id
          if (gesAnamnesisId) {
            // Se encontrar, use o ID existente
            dispatch(saveGestacionalAnamnesisId(gesAnamnesisId))
            navigation.navigate('anamnese-gestacional' as never)
          } else {
            const response = await registerGesAnamnesis(reportId)
            if (response && response.gesAnamnesis) {
              dispatch(saveGestacionalAnamnesisId(response.gesAnamnesis.id))
              navigation.navigate('anamnese-gestacional', {
                screen: 'anamnese-gestacional',
                params: { gestacionalAnamnesisId: response.gesAnamnesis.id },
              })
            }
          }
        } catch (error) {
          console.error('Erro ao buscar/criar InfoTransporte:', error)
        } finally {
          setGestacionalAnamnesisIsLoading(false)
        }
      }
    } catch (error) {
      console.error(error)
    } finally {
      setGestacionalAnamnesisIsLoading(false)
    }
  }

  const existingFinalizationId = useSelector(
    (state: RootState) => state.finalization.finalizationId,
  )

  const existingCinemaitcAvaliationId = useSelector(
    (state: RootState) => state.cinematicAvaliation.cinematicAvaliationId,
  )

  const handleClickFinalization = async () => {
    if (currentMode === 'create') {
      if (existingFinalizationId && existingCinemaitcAvaliationId) {
        navigation.navigate('finalizacao', {
          screen: 'finalizacao',
          params: {
            finalizationId: existingFinalizationId,
            cinematicAvaliation: existingCinemaitcAvaliationId,
          },
        })
      } else {
        const response = await registerFinalization(ReportOwnerId)
        const cinematicAvaliationResponse = await registerCinematicAvaliation(
          ReportOwnerId,
        )

        if (
          response &&
          response.finalization &&
          cinematicAvaliationResponse &&
          cinematicAvaliationResponse.cinematicAvaliation
        ) {
          dispatch(saveFinalizationId(response.finalization.id))
          dispatch(
            saveCinematicAvaliationId(
              cinematicAvaliationResponse.cinematicAvaliation.id,
            ),
          )

          navigation.navigate('finalizacao', {
            screen: 'finalizacao',
            params: {
              finalizationId: response.finalization.id,
              cinematicAvaliation:
                cinematicAvaliationResponse.cinematicAvaliation.id,
            },
          })
        }
      }
    } else {
      try {
        // Tente encontrar o relatório
        const response = await findReports(reportId)
        const finalizationId = response.report.Finalization[0]?.id
        const cinematicId = response.report.CinematicAvaliation[0]?.id

        if (finalizationId && cinematicId) {
          // Se encontrar, use o ID existente
          dispatch(saveFinalizationId(finalizationId))
          dispatch(saveCinematicAvaliationId(cinematicId))
          navigation.navigate('finalizacao' as never)
        } else {
          const response = await registerFinalization(ReportOwnerId)
          const cinematicAvaliationResponse = await registerCinematicAvaliation(
            ReportOwnerId,
          )

          if (
            response &&
            response.finalization &&
            cinematicAvaliationResponse &&
            cinematicAvaliationResponse.cinematicAvaliation
          ) {
            dispatch(saveFinalizationId(response.finalization.id))
            dispatch(
              saveCinematicAvaliationId(
                cinematicAvaliationResponse.cinematicAvaliation.id,
              ),
            )

            navigation.navigate('finalizacao', {
              screen: 'finalizacao',
              params: {
                finalizationId: response.finalization.id,
                cinematicAvaliation:
                  cinematicAvaliationResponse.cinematicAvaliation.id,
              },
            })
          }
        }
      } catch (error) {
        console.error('Erro ao buscar/criar InfoTransporte:', error)
      }
    }
  }

  const existingSuspectProblemsId = useSelector(
    (state: RootState) => state.suspectProblems.suspectProblemsId,
  )
  const existingGlasgowId = useSelector(
    (state: RootState) => state.glasgow.glasgowId,
  )

  const handleClickInfoPaciente = async () => {
    if (currentMode === 'create') {
      if (existingSuspectProblemsId) {
        navigation.navigate('info-paciente', {
          screen: 'info-paciente',
          params: {
            suspectProblemsId: existingSuspectProblemsId,
            glasgowId: existingGlasgowId,
          },
        })
      } else {
        const suspectProblemsResponse = await registerSuspectProblems(
          ReportOwnerId,
        )

        const glasgowResponse = await registerGlasgow(ReportOwnerId)

        if (
          suspectProblemsResponse &&
          suspectProblemsResponse.suspectProblems &&
          glasgowResponse &&
          glasgowResponse.glasgow
        ) {
          dispatch(
            saveSuspectProblemsId(suspectProblemsResponse.suspectProblems.id),
          )
          dispatch(saveGlasgowId(glasgowResponse.glasgow.id))

          navigation.navigate('info-paciente', {
            screen: 'info-paciente',
            params: {
              suspectProblemsId: suspectProblemsResponse.suspectProblems.id,
              glasgowId: glasgowResponse.glasgow.id,
            },
          })
        }
      }
    } else {
      try {
        // Tente encontrar o relatório
        const response = await findReports(reportId)
        const glasgowId = response.report.Glasglow[0]?.id
        const suspectProblemsId = response.report.SuspectProblems[0]?.id

        if (glasgowId && suspectProblemsId) {
          // Se encontrar, use o ID existente
          dispatch(saveGlasgowId(glasgowId))
          dispatch(saveSuspectProblemsId(suspectProblemsId))
          navigation.navigate('info-paciente' as never)
        } else {
          const suspectProblemsResponse = await registerSuspectProblems(
            reportId,
          )

          const glasgowResponse = await registerGlasgow(reportId)

          if (
            suspectProblemsResponse &&
            suspectProblemsResponse.suspectProblems &&
            glasgowResponse &&
            glasgowResponse.glasgow
          ) {
            dispatch(
              saveSuspectProblemsId(suspectProblemsResponse.suspectProblems.id),
            )
            dispatch(saveGlasgowId(glasgowResponse.glasgow.id))

            navigation.navigate('info-paciente', {
              screen: 'info-paciente',
              params: {
                suspectProblemsId: suspectProblemsResponse.suspectProblems.id,
                glasgowId: glasgowResponse.glasgow.id,
              },
            })
          }
        }
      } catch (error) {
        console.error('Erro ao buscar/criar InfoTransporte:', error)
      }
    }
  }

  const existingPreHospitalarMethodId = useSelector(
    (state: RootState) => state.preHospitalarMethod.preHospitalarMethodId,
  )
  const existingSignsAndSymptomsId = useSelector(
    (state: RootState) => state.signsAndSymptoms.signsAndSymptomsId,
  )

  const handleClickIntroduction = async () => {
    if (currentMode === 'create') {
      if (existingPreHospitalarMethodId && existingSignsAndSymptomsId) {
        navigation.navigate('introducao', {
          screen: 'introducao',
          params: {
            preHospitalarMethodId: existingPreHospitalarMethodId,
            signsAndSymptomsId: existingSignsAndSymptomsId,
          },
        })
      } else {
        const preHospitalarMethodResponse = await registerPreHospitalarMethods(
          ReportOwnerId,
        )

        const symptomsResponse = await registerSymptoms(ReportOwnerId)

        if (
          preHospitalarMethodResponse &&
          preHospitalarMethodResponse.preHospitalarMethod &&
          symptomsResponse &&
          symptomsResponse.symptoms
        ) {
          dispatch(
            savePreHospitalarMethodId(
              preHospitalarMethodResponse.preHospitalarMethod.id,
            ),
          )
          dispatch(saveSignsAndSymptomsId(symptomsResponse.symptoms.id))

          navigation.navigate('introducao', {
            screen: 'introducao',
            params: {
              preHospitalarMethodId:
                preHospitalarMethodResponse.preHospitalarMethod.id,
              signsAndSymptomsId: symptomsResponse.symptoms.id,
            },
          })
        }
      }
    } else {
      try {
        // Tente encontrar o relatório
        const response = await findReports(reportId)
        const preHospitalarMethodId = response.report.PreHospitalMethods[0]?.id
        const symptomsId = response.report.Symptoms[0]?.id

        if (preHospitalarMethodId && symptomsId) {
          // Se encontrar, use o ID existente
          dispatch(saveSignsAndSymptomsId(symptomsId))
          dispatch(savePreHospitalarMethodId(preHospitalarMethodId))
          navigation.navigate('introducao' as never)
        } else {
          const preHospitalarMethodResponse =
            await registerPreHospitalarMethods(reportId)

          const symptomsResponse = await registerSymptoms(reportId)

          if (
            preHospitalarMethodResponse &&
            preHospitalarMethodResponse.preHospitalarMethod &&
            symptomsResponse &&
            symptomsResponse.symptoms
          ) {
            dispatch(
              savePreHospitalarMethodId(
                preHospitalarMethodResponse.preHospitalarMethod.id,
              ),
            )
            dispatch(saveSignsAndSymptomsId(symptomsResponse.symptoms.id))

            navigation.navigate('introducao', {
              screen: 'introducao',
              params: {
                preHospitalarMethodId:
                  preHospitalarMethodResponse.preHospitalarMethod.id,
                signsAndSymptomsId: symptomsResponse.symptoms.id,
              },
            })
          } else {
            console.error('Falha ao criar Introducao.')
          }
        }
      } catch (error) {
        console.error('Erro ao buscar/criar InfoTransporte:', error)
        // Trate o erro conforme necessário
      }
    }
  }

  const existingInfoTransportId = useSelector(
    (state: RootState) => state.infoTransport.infoTransportId,
  )

  const handleClickInfoTransport = async () => {
    if (currentMode === 'create') {
      if (existingInfoTransportId) {
        navigation.navigate('info-transporte')
      } else {
        const infoTransportResponse = await registerTransport(ReportOwnerId)

        if (infoTransportResponse && infoTransportResponse.infoTransport) {
          dispatch(saveInfoTransportId(infoTransportResponse.infoTransport.id))

          navigation.navigate('info-transporte')
        }
      }
    } else {
      try {
        // Tente encontrar o relatório
        const response = await findReports(reportId)
        const infoTransportId = response.report.InfoTransporte[0]?.id

        if (infoTransportId) {
          // Se encontrar, use o ID existente
          dispatch(saveInfoTransportId(infoTransportId))
          navigation.navigate('info-transporte')
        } else {
          // Se não encontrar, crie uma nova instância de InfoTransporte
          const infoTransportResponse = await registerTransport(reportId)

          if (infoTransportResponse && infoTransportResponse.infoTransport) {
            dispatch(
              saveInfoTransportId(infoTransportResponse.infoTransport.id),
            )
            navigation.navigate('info-transporte')
          } else {
            console.error('Falha ao criar InfoTransporte.')
            // Trate a falha conforme necessário
          }
        }
      } catch (error) {
        console.error('Erro ao buscar/criar InfoTransporte:', error)
        // Trate o erro conforme necessário
      }
    }
  }

  const existingInfoHospitalarId = useSelector(
    (state: RootState) => state.infoHospitalar.infoHospitalarId,
  )

  const handleClickInfoHospitalares = async () => {
    if (currentMode === 'create') {
      if (existingInfoHospitalarId) {
        navigation.navigate('info-hospitalares')
      } else {
        const infoHospitalarResponse = await registerInfoHospitalar(
          ReportOwnerId,
        )

        if (infoHospitalarResponse && infoHospitalarResponse.infoHospitalar) {
          dispatch(
            saveInfoHospitalarId(infoHospitalarResponse.infoHospitalar.id),
          )

          navigation.navigate('info-hospitalares')
        }
      }
    } else {
      navigation.navigate('info-hospitalares')
    }
  }

  const handleClickLocalTraumas = async () => {
    setLoading(false)
    const response = await findReports(reportId)
    const { age } = response.report

    if (age === null) {
      // await updateAgeReport(ownerId, reportId, 777)
      setOpenAgeModal(true)
    } else {
      navigation.navigate('local-traumas')
    }
  }

  const [showModal, setShowModal] = useState(false)

  const [loading, setLoading] = useState(false)

  const handleDeleteReport = async () => {
    try {
      setLoading(true)
      const response = await deleteReport(reportId)
      if (response.msg) {
        dispatch(clearReportId())
        dispatch(clearAnamnesisId())
        dispatch(clearGestacionalAnamnesisId())
        dispatch(clearFinalizationId())
        dispatch(clearSuspectProblemsId())
        dispatch(clearGlasgowId())
        dispatch(clearCinematicAvaliationId())
        dispatch(clearPreHospitalarMethodId())
        dispatch(clearSignsAndSymptomsId())
        dispatch(clearInfoTransportId())
        dispatch(clearCompletness())
        setShowModal(false)
        navigation.navigate('home')
      }
    } catch (error) {
      console.error('Error deleting report:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleModalCancel = () => {
    setShowModal(false)
  }
  const [showFinalizationModal, setShowFinalizationModal] = useState(false)

  const handleFinalizationModal = () => {
    setShowFinalizationModal(true)
  }

  return (
    <SafeAreaView>
      <ScrollView>
        {loading ? (
          <Loader />
        ) : (
          <>
            <View>
              <Header />
              <View className="mb-[20px] mt-[34px] flex-row items-center justify-center">
                <FontAwesome5 name="fire" size={24} color="#A00E00" />
                <Text className="ml-[10px] text-[20px] font-medium leading-[20px]">
                  {currentMode === 'edit' && <Text>Editando</Text>} Ocorrência
                </Text>
              </View>

              {currentMode === 'edit' && (
                <View className="mb-[20px] flex-row items-center justify-center p-2">
                  <Text className="text-center">
                    Caso você saia dessa página sem salvar o que deseja os seus
                    dados serão perdidos *
                  </Text>
                </View>
              )}
              <TouchableOpacity
                onPress={handleClickIntroduction}
                activeOpacity={0.7}
              >
                <Grouper
                  title="Introdução"
                  desc="Dados da vítima, tipo ocorr..."
                  isCompleted={introductionCompletness ?? 0}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleClickAnamnese}
                activeOpacity={0.7}
              >
                <Grouper
                  title="Anamnese de Emergência"
                  desc="Sinais e sintomas, observações..."
                  isCompleted={anamnesisCompletness ?? 0}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleClickInfoPaciente}
                activeOpacity={0.7}
              >
                <Grouper
                  title="Info. do paciente"
                  desc="Aval. paciente, sinais vitais..."
                  isCompleted={infoPacienteCompletness ?? 0}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleClickLocalTraumas}
                activeOpacity={0.7}
              >
                <Grouper
                  title="Localizações da Fratura"
                  desc="Local dos traumas, tipo trau..."
                  isCompleted={localTraumasCompletness ?? 0}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleClickInfoTransport}
                activeOpacity={0.7}
              >
                <Grouper
                  title="Info. de Transporte"
                  desc="Condução, condição transp..."
                  isCompleted={infoTransportCompletness ?? 0}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleClickInfoHospitalares}
                activeOpacity={0.7}
              >
                <Grouper
                  title="Info. Hospitalares"
                  desc="Procedimentos efetuados..."
                  isCompleted={0}
                />
              </TouchableOpacity>
              {gestacionalAnamnesisIsLoading ? (
                <TouchableOpacity
                  disabled={true}
                  activeOpacity={0.7}
                  style={{ position: 'relative', opacity: 0.5 }}
                >
                  <Grouper
                    title="Anamnese Gestacional"
                    desc="Período gestação, pré-natal..."
                    isCompleted={gesAnamnesisCompletness ?? 0}
                  />
                  <ActivityIndicator
                    size="large"
                    color="#ff0000"
                    className="absolute right-[50px] top-[10px]"
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={handleClickGestacionalAnamnese}
                  activeOpacity={0.7}
                >
                  <Grouper
                    title="Anamnese Gestacional"
                    desc="Período gestação, pré-natal..."
                    isCompleted={gesAnamnesisCompletness ?? 0}
                  />
                </TouchableOpacity>
              )}
              <TouchableOpacity
                onPress={handleClickFinalization}
                activeOpacity={0.7}
              >
                <Grouper
                  title="Finalização"
                  desc="Observações, objetos..."
                  isCompleted={finalizationCompletness ?? 0}
                />
              </TouchableOpacity>
              {currentMode === 'create' && (
                <Pressable onPress={() => navigation.navigate(`home`)}>
                  <MainButton
                    innerText="FINALIZAR"
                    onPress={handleFinalizationModal}
                  />
                </Pressable>
              )}

              <Button title="Logout" onPress={handleLogout} />
              {showModal && (
                <Modal
                  transparent={true}
                  animationType="fade"
                  visible={showModal}
                  onRequestClose={() => setShowModal(false)}
                >
                  <View className="flex-1 items-center justify-center bg-[#0000007f]">
                    <View
                      style={s.modalContent}
                      className="rounded-[7px] bg-white p-4 "
                    >
                      <View className="relative flex-row items-center justify-center">
                        {loading ? (
                          <View className="mx-auto h-[120px] w-[320px] items-center justify-center">
                            <ActivityIndicator size="large" color="#ff0000" />
                            <Text className="mt-3 text-center text-lg font-bold uppercase">
                              Carregando...
                            </Text>
                            <Text className=" mt-3 text-center text-[#979797b0]">
                              (Esspere sua ocorrência ser excluída, enquanto
                              isso pegue um café.)
                            </Text>
                          </View>
                        ) : (
                          <>
                            <ExcluirOcorrenciaModal
                              handleDeleteReport={handleDeleteReport}
                              handleCancel={handleModalCancel}
                            />
                            <Pressable
                              onPress={() => setShowModal(false)}
                              className="absolute right-1 top-1 z-50"
                            >
                              <AntDesign
                                name="closecircle"
                                size={24}
                                color="red"
                              />
                            </Pressable>
                          </>
                        )}
                      </View>
                    </View>
                  </View>
                </Modal>
              )}

              {showFinalizationModal && (
                <Modal
                  transparent={true}
                  animationType="fade"
                  visible={showFinalizationModal}
                  onRequestClose={() => setShowFinalizationModal(false)}
                >
                  <View className="flex-1 items-center justify-center bg-[#0000007f]">
                    <View
                      style={s.modalContent}
                      className="relative rounded-[7px] bg-white p-4 "
                    >
                      <ReportFinalized />
                    </View>
                  </View>
                </Modal>
              )}
              {modalAnamnesisGestacional && (
                <Modal
                  transparent={true}
                  animationType="fade"
                  visible={modalAnamnesisGestacional}
                  onRequestClose={() => setModalAnamnesisGestacional(false)}
                >
                  <View className="flex-1 items-center justify-center bg-[#0000007f]">
                    <View
                      style={s.modalContent}
                      className="relative rounded-[7px] bg-white p-4 "
                    >
                      <VerifyGender
                        closeModal={closeAnamnesisGestacionalModal}
                      />
                      <Pressable
                        onPress={() => setModalAnamnesisGestacional(false)}
                        className="absolute right-1 top-1 z-50"
                      >
                        <AntDesign name="closecircle" size={24} color="red" />
                      </Pressable>
                    </View>
                  </View>
                </Modal>
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
              {openAgeModal && (
                <Modal
                  transparent={true}
                  animationType="fade"
                  visible={openAgeModal}
                  onRequestClose={() => setOpenAgeModal(false)}
                >
                  <View className="flex-1 items-center justify-center bg-[#0000007f]">
                    <View
                      style={s.modalContent}
                      className="relative rounded-[7px] bg-white p-4 "
                    >
                      <SelectAge closeModal={closeAgeModal} />
                      <Pressable
                        onPress={() => setOpenAgeModal(false)}
                        className="absolute right-1 top-1 z-50"
                      >
                        <AntDesign name="closecircle" size={24} color="red" />
                      </Pressable>
                    </View>
                  </View>
                </Modal>
              )}
            </View>
            <Footer />
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  )
}

export default Ocorrencia
