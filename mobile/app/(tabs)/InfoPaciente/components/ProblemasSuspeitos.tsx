import { Text, View } from 'react-native'
import SuspectProblemButton from './SuspectProblemButton'
import InputFull from '@app/components/InputLowPadding'
import { styles as s } from '@app/styles/boxShadow'
import React, { useEffect, useState } from 'react'
import { RootState } from '@src/redux/stores/stores'
import { useDispatch, useSelector } from 'react-redux'
import { Checkbox } from 'native-base'
import { setSuspectProblemsData } from '@src/redux/actions/dataActions'

export default function AvalPacienteGroup() {
  const dispatch = useDispatch()
  const [transportButtonSelected, setTransportButtonSelected] = useState(false)
  const [diabetesButtonSelected, setDiabetesButtonSelected] = useState(false)
  const [obstericoButtonSelected, setObstericoButtonSelected] = useState(false)
  const [respiratorioButtonSelected, setRespiratorioButtonSelected] =
    useState(false)
  const [psiquiatricoButtonSelected, setPsiquiatricoButtonSelected] =
    useState(false)

  const [transportSuboptions, setTransportSuboptions] = useState([])
  const [diabetesSuboptions, setDiabetesSuboptions] = useState([])
  const [obstericoSuboptions, setObstericoSuboptions] = useState([])
  const [respiratorioSuboptions, setRespiratorioSuboptions] = useState([])

  useEffect(() => {
    const onChangeSuspectProblemsDataInfo = () => {
      const suspectProblemsDataInfo = {
        transportSuboptions,
        diabetesSuboptions,
        obstericoSuboptions,
        respiratorioSuboptions,
      }

      dispatch(setSuspectProblemsData(suspectProblemsDataInfo))
    }

    onChangeSuspectProblemsDataInfo()
  }, [
    diabetesSuboptions,
    dispatch,
    obstericoSuboptions,
    respiratorioSuboptions,
    transportSuboptions,
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
          <InputFull />
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
            <Checkbox.Group
              onChange={(values) => {
                setTransportSuboptions(values || [])
              }}
              defaultValue={transportSuboptions}
            >
              <Checkbox size="md" colorScheme="danger" value="AEREO" mb={2}>
                <Text className="  text-lg  text-slate-800">Aéreo</Text>
              </Checkbox>
              <Checkbox size="md" colorScheme="danger" value="CLINICO" mb={2}>
                <Text className=" text-lg  text-slate-800">Clínico</Text>
              </Checkbox>
              <Checkbox
                size="md"
                colorScheme="danger"
                value="EMERGENCIAL"
                mb={2}
              >
                <Text className="  text-lg  text-slate-800">Emergencial</Text>
              </Checkbox>
              <Checkbox
                size="md"
                colorScheme="danger"
                value="POS_TRAUMA"
                mb={2}
              >
                <Text className="  text-lg  text-slate-800">Pós-Trauma</Text>
              </Checkbox>
              <Checkbox size="md" colorScheme="danger" value="SAMU" mb={2}>
                <Text className="  text-lg text-slate-800">SAMU</Text>
              </Checkbox>
              <Checkbox
                size="md"
                colorScheme="danger"
                value="SEM_REMOCAO"
                mb={2}
              >
                <Text className=" text-lg text-slate-800">Sem remoção</Text>
              </Checkbox>
            </Checkbox.Group>
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
            <Checkbox.Group
              onChange={(values) => {
                setDiabetesSuboptions(values || [])
              }}
            >
              <Checkbox
                size="md"
                colorScheme="danger"
                value="HIPERGLICEMIA"
                mb={2}
              >
                <Text className="text-lg text-slate-800">Hiperglicemia</Text>
              </Checkbox>
              <Checkbox
                size="md"
                colorScheme="danger"
                value="HIPOGLICEMIA"
                mb={2}
              >
                <Text className="text-lg text-slate-800">Hipoglicemia</Text>
              </Checkbox>
            </Checkbox.Group>
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
            <Checkbox.Group
              onChange={(values) => {
                setObstericoSuboptions(values || [])
              }}
            >
              <Checkbox
                size="md"
                colorScheme="danger"
                value="PARTO_EMERGENCIAL"
                mb={2}
              >
                <Text className="text-lg text-slate-800">
                  Parto Emergêncial
                </Text>
              </Checkbox>
              <Checkbox size="md" colorScheme="danger" value="GESTANTE" mb={2}>
                <Text className="text-lg text-slate-800">Gestante</Text>
              </Checkbox>
              <Checkbox
                size="md"
                colorScheme="danger"
                value="HEMORRAGIA_EXCESSIVA"
                mb={2}
              >
                <Text className="text-lg text-slate-800">
                  Hemorragia Excessiva
                </Text>
              </Checkbox>
            </Checkbox.Group>
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
            <Checkbox.Group
              onChange={(values) => {
                setRespiratorioSuboptions(values || [])
              }}
            >
              <Checkbox size="md" colorScheme="danger" value="DPOC" mb={2}>
                <Text className="text-lg text-slate-800">DPOC</Text>
              </Checkbox>
              <Checkbox
                size="md"
                colorScheme="danger"
                value="INALACAO_FUMACA"
                mb={2}
              >
                <Text className="text-lg text-slate-800">Inalação Fumaça</Text>
              </Checkbox>
            </Checkbox.Group>
          </View>
        )}
      </View>
    </View>
  )
}
