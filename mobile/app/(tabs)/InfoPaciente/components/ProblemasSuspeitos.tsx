import { Text, View } from 'react-native'
import SuspectProblemButton from './SuspectProblemButton'
import InputFull from '@app/components/InputLowPadding'
import { styles as s } from '@app/styles/boxShadow'
import React, { useEffect, useState } from 'react'
import { RootState } from '@src/redux/stores/stores'
import { useDispatch, useSelector } from 'react-redux'
import { Checkbox } from 'native-base'
import { setSuspectProblemsData } from '@src/redux/actions/dataActions'
import findSuspectProblems from '@src/api/reports/suspectProblems/findSuspectProblems'
import { formatCheckbox } from '@app/(tabs)/Introducao/utils/formatCheckbox'

type CheckboxStates = {
  AEREO?: boolean
  CLINICO?: boolean
  EMERGENCIAL?: boolean
  POS_TRAUMA?: boolean
  SAMU?: boolean
  SEM_REMOCAO?: boolean
  HIPERGLICEMIA?: boolean
  HIPOGLICEMIA?: boolean
  PARTO_EMERGENCIAL?: boolean
  GESTANTE?: boolean
  HEMORRAGIA_EXCESSIVA?: boolean
  DPOC?: boolean
  INALACAO_FUMACA?: boolean
}

export default function AvalPacienteGroup() {
  const dispatch = useDispatch()
  const [transportButtonSelected, setTransportButtonSelected] = useState(false)
  const [diabetesButtonSelected, setDiabetesButtonSelected] = useState(false)
  const [obstericoButtonSelected, setObstericoButtonSelected] = useState(false)
  const [respiratorioButtonSelected, setRespiratorioButtonSelected] =
    useState(false)
  const [psiquiatricoButtonSelected, setPsiquiatricoButtonSelected] =
    useState(false)
  const [Another, setAnother] = useState('')

  const [transporteCheckboxState, setTransporteCheckboxState] =
    useState<CheckboxStates>({
      AEREO: false,
      CLINICO: false,
      EMERGENCIAL: false,
      POS_TRAUMA: false,
      SAMU: false,
      SEM_REMOCAO: false,
    })

  const handleTransporteCheckboxChange = (key: keyof CheckboxStates) => {
    if (Object.prototype.hasOwnProperty.call(transporteCheckboxState, key)) {
      setTransporteCheckboxState((prevState) => {
        return {
          ...prevState,
          [key]: !prevState[key],
        }
      })
    }
  }

  const [diabetesCheckboxState, setDiabetesCheckboxState] =
    useState<CheckboxStates>({
      HIPERGLICEMIA: false,
      HIPOGLICEMIA: false,
    })

  const handleDiabetesCheckboxChange = (key: keyof CheckboxStates) => {
    if (Object.prototype.hasOwnProperty.call(diabetesCheckboxState, key)) {
      setDiabetesCheckboxState((prevState) => {
        return {
          ...prevState,
          [key]: !prevState[key],
        }
      })
    }
  }

  const [obstericoCheckboxState, setObstericoCheckboxState] =
    useState<CheckboxStates>({
      PARTO_EMERGENCIAL: false,
      GESTANTE: false,
      HEMORRAGIA_EXCESSIVA: false,
    })

  const handleObstericoCheckboxChange = (key: keyof CheckboxStates) => {
    if (Object.prototype.hasOwnProperty.call(obstericoCheckboxState, key)) {
      setObstericoCheckboxState((prevState) => {
        return {
          ...prevState,
          [key]: !prevState[key],
        }
      })
    }
  }

  const [respiratorioCheckboxState, setRespiratorioCheckboxState] =
    useState<CheckboxStates>({
      DPOC: false,
      INALACAO_FUMACA: false,
    })

  const handleRespiratorioCheckboxChange = (key: keyof CheckboxStates) => {
    if (Object.prototype.hasOwnProperty.call(respiratorioCheckboxState, key)) {
      setRespiratorioCheckboxState((prevState) => {
        return {
          ...prevState,
          [key]: !prevState[key],
        }
      })
    }
  }

  const suspectProblemsId = useSelector(
    (state: RootState) => state.suspectProblems.suspectProblemsId,
  )

  const findProblemasSuspeitos = async () => {
    try {
      const response = await findSuspectProblems(suspectProblemsId)

      if (response && response.suspectProblems) {
        const isAereoSelected =
          response.suspectProblems.problemaSuspeitoTransporte.includes('AEREO')
        const isClinicoSelected =
          response.suspectProblems.problemaSuspeitoTransporte.includes(
            'CLINICO',
          )
        const isEmergencialSelected =
          response.suspectProblems.problemaSuspeitoTransporte.includes(
            'EMERGENCIAL',
          )
        const isPosTraumaSelected =
          response.suspectProblems.problemaSuspeitoTransporte.includes(
            'POS_TRAUMA',
          )
        const isSamuSelected =
          response.suspectProblems.problemaSuspeitoTransporte.includes('SAMU')
        const isSemRemocaoSelected =
          response.suspectProblems.problemaSuspeitoTransporte.includes(
            'SEM_REMOCAO',
          )
        const isHipoglicemiaSelected =
          response.suspectProblems.problemaSuspeitoDiabetes.includes(
            'HIPOGLICEMIA',
          )
        const isHiperglicemiaSelected =
          response.suspectProblems.problemaSuspeitoDiabetes.includes(
            'HIPERGLICEMIA',
          )
        const isPartoEmergencialSelected =
          response.suspectProblems.problemaSuspeitoObstetrico.includes(
            'PARTO_EMERGENCIAL',
          )
        const isGestanteSelected =
          response.suspectProblems.problemaSuspeitoObstetrico.includes(
            'GESTANTE',
          )
        const isHemorragiaExcessivaSelected =
          response.suspectProblems.problemaSuspeitoObstetrico.includes(
            'HEMORRAGIA_EXCESSIVA',
          )
        const isDPOCSelected =
          response.suspectProblems.problemaSuspeitoRespiratorio.includes('DPOC')
        const isInalacaoFumacaSelected =
          response.suspectProblems.problemaSuspeitoRespiratorio.includes(
            'INALACAO_FUMACA',
          )
        setTransporteCheckboxState((prevState) => {
          return {
            ...prevState,
            AEREO: isAereoSelected,
            CLINICO: isClinicoSelected,
            EMERGENCIAL: isEmergencialSelected,
            POS_TRAUMA: isPosTraumaSelected,
            SAMU: isSamuSelected,
            SEM_REMOCAO: isSemRemocaoSelected,
          }
        })
        setDiabetesCheckboxState((prevState) => {
          return {
            ...prevState,
            HIPOGLICEMIA: isHipoglicemiaSelected,
            HIPERGLICEMIA: isHiperglicemiaSelected,
          }
        })
        setObstericoCheckboxState((prevState) => {
          return {
            ...prevState,
            PARTO_EMERGENCIAL: isPartoEmergencialSelected,
            GESTANTE: isGestanteSelected,
            HEMORRAGIA_EXCESSIVA: isHemorragiaExcessivaSelected,
          }
        })
        setRespiratorioCheckboxState((prevState) => {
          return {
            ...prevState,
            DPOC: isDPOCSelected,
            INALACAO_FUMACA: isInalacaoFumacaSelected,
          }
        })
        const problemaSuspeitoPsiquiatrico =
          response.suspectProblems.problemaSuspeitoPsiquiatrico
        setPsiquiatricoButtonSelected(problemaSuspeitoPsiquiatrico)

        const anotherResponse = response.suspectProblems.Another
        setAnother(anotherResponse)
      }
      console.log(response)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    const findSuspectProblems = async () => {
      await findProblemasSuspeitos()
    }
    findSuspectProblems()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setTransportButtonSelected(
      Object.values(transporteCheckboxState).some((value) => value === true),
    )
  }, [transporteCheckboxState])

  useEffect(() => {
    setDiabetesButtonSelected(
      Object.values(diabetesCheckboxState).some((value) => value === true),
    )
  }, [diabetesCheckboxState])

  useEffect(() => {
    setObstericoButtonSelected(
      Object.values(obstericoCheckboxState).some((value) => value === true),
    )
  }, [obstericoCheckboxState])

  useEffect(() => {
    setRespiratorioButtonSelected(
      Object.values(respiratorioCheckboxState).some((value) => value === true),
    )
  }, [respiratorioCheckboxState])

  useEffect(() => {
    const onChangeSuspectProblemsDataInfo = () => {
      const transportSuboptions = transporteCheckboxState
      const diabetesSuboptions = diabetesCheckboxState
      const obstericoSuboptions = obstericoCheckboxState
      const respiratorioSuboptions = respiratorioCheckboxState
      const psiquiatricoSuboptions = psiquiatricoButtonSelected
      const AnotherData = Another
      const suspectProblemsDataInfo = {
        transportSuboptions,
        diabetesSuboptions,
        obstericoSuboptions,
        respiratorioSuboptions,
        psiquiatricoSuboptions,
        AnotherData,
      }

      dispatch(setSuspectProblemsData(suspectProblemsDataInfo))
    }

    onChangeSuspectProblemsDataInfo()
  }, [
    dispatch,
    transporteCheckboxState,
    diabetesCheckboxState,
    obstericoCheckboxState,
    respiratorioCheckboxState,
    psiquiatricoButtonSelected,
    Another,
  ])

  return (
    <View
      style={s.boxShadow}
      className="mx-auto mb-10 w-[90%] rounded-[14px] bg-white px-[17px] py-[30px] shadow-md"
    >
      <View className="flex-row flex-wrap">
        <SuspectProblemButton
          buttonState={transportButtonSelected}
          setButtonState={setTransportButtonSelected}
          iconName="car-crash"
          content="Transporte"
        />
        <SuspectProblemButton
          buttonState={diabetesButtonSelected}
          setButtonState={setDiabetesButtonSelected}
          iconName="cubes"
          content="Diabetes"
        />
        <SuspectProblemButton
          buttonState={obstericoButtonSelected}
          setButtonState={setObstericoButtonSelected}
          iconName="baby-carriage"
          content="Obstétrico"
        />
        <SuspectProblemButton
          buttonState={respiratorioButtonSelected}
          setButtonState={setRespiratorioButtonSelected}
          iconName="lungs"
          content="Respiratório"
        />
        <SuspectProblemButton
          buttonState={psiquiatricoButtonSelected}
          setButtonState={setPsiquiatricoButtonSelected}
          iconName="brain"
          content="Psiquiátrico"
        />
        <View className="m-1 h-12 w-2/5 grow flex-row items-center justify-center">
          <Text className="pt-4 text-center text-lg">Outro:</Text>
          <InputFull value={Another} onChangeText={(e) => setAnother(e)} />
        </View>
      </View>
      <View className="mt-2">
        {transportButtonSelected && (
          <View>
            <Text className="mt-5 text-sm font-extrabold text-slate-800">
              Problemas suspeitos de
            </Text>
            <Text className="mb-2 text-2xl font-extrabold text-red-700">
              TRANSPORTE
            </Text>
            {Object.entries(transporteCheckboxState).map(([key, isChecked]) => (
              <Checkbox
                key={key}
                size="md"
                colorScheme="danger"
                value={key}
                isChecked={isChecked}
                onChange={() =>
                  handleTransporteCheckboxChange(key as keyof CheckboxStates)
                }
              >
                <Text className="text-lg text-slate-800">
                  {formatCheckbox(key)}
                </Text>
              </Checkbox>
            ))}
          </View>
        )}
        {diabetesButtonSelected && (
          <View>
            <Text className="-mb-2 mt-5 text-sm font-extrabold text-slate-800">
              Problemas suspeitos de
            </Text>
            <Text className="mb-2 text-2xl font-extrabold text-red-700">
              DIABETES
            </Text>
            {Object.entries(diabetesCheckboxState).map(([key, isChecked]) => (
              <Checkbox
                key={key}
                size="md"
                colorScheme="danger"
                value={key}
                isChecked={isChecked}
                onChange={() =>
                  handleDiabetesCheckboxChange(key as keyof CheckboxStates)
                }
              >
                <Text className="text-lg text-slate-800">
                  {formatCheckbox(key)}
                </Text>
              </Checkbox>
            ))}
          </View>
        )}
        {obstericoButtonSelected && (
          <View>
            <Text className="-mb-2 mt-5 text-sm font-extrabold text-slate-800">
              Problemas suspeitos
            </Text>
            <Text className="mb-2 text-2xl font-extrabold text-red-700">
              OBSTÉRICOS
            </Text>
            {Object.entries(obstericoCheckboxState).map(([key, isChecked]) => (
              <Checkbox
                key={key}
                size="md"
                colorScheme="danger"
                value={key}
                isChecked={isChecked}
                onChange={() =>
                  handleObstericoCheckboxChange(key as keyof CheckboxStates)
                }
              >
                <Text className="text-lg text-slate-800">
                  {formatCheckbox(key)}
                </Text>
              </Checkbox>
            ))}
          </View>
        )}
        {respiratorioButtonSelected && (
          <View>
            <Text className="-mb-2 mt-5 text-sm font-extrabold text-slate-800">
              Problemas suspeitos
            </Text>
            <Text className="mb-2 text-2xl font-extrabold text-red-700">
              RESPIRATÓRIOS
            </Text>
            {Object.entries(respiratorioCheckboxState).map(
              ([key, isChecked]) => (
                <Checkbox
                  key={key}
                  size="md"
                  colorScheme="danger"
                  value={key}
                  isChecked={isChecked}
                  onChange={() =>
                    handleRespiratorioCheckboxChange(
                      key as keyof CheckboxStates,
                    )
                  }
                >
                  <Text className="text-lg text-slate-800">
                    {formatCheckbox(key)}
                  </Text>
                </Checkbox>
              ),
            )}
          </View>
        )}
      </View>
    </View>
  )
}
