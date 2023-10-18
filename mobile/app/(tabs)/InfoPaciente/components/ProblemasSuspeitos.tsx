import { Text, View } from 'react-native'
import SuspectProblemButton from './SuspectProblemButton'
import InputFull from '@app/components/InputLowPadding'
import { styles as s } from '@app/styles/boxShadow'
import React, { useState } from 'react'
import { CheckIcon, Select } from 'native-base'
import { useState } from 'react'
import { MultipleSelectList } from 'react-native-dropdown-select-list'

export default function AvalPacienteGroup() {
  const [victimWas, setVictimWas] = useState('')
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

  console.log(transportSuboptions)
  console.log(diabetesSuboptions)
  console.log(obstericoSuboptions)
  console.log(respiratorioSuboptions)

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
        <View className="h-12 w-2/5 grow flex-row items-center justify-center">
          <Text className="pt-4 text-center text-lg">Outro:</Text>
          <InputFull />
        </View>
      </View>
      <View className="mt-2">
        {transportButtonSelected && (
          <View>
            <Text className="-mb-2 mt-5 text-sm font-extrabold text-slate-800">
              Problemas suspeitos de
            </Text>
            <Text className="mb-2 text-2xl font-extrabold text-red-700">
              TRANSPORTE
            </Text>
            {/* <Text>{transportSuboptions.toString()}</Text> */}
            <MultipleSelectList
              setSelected={setTransportSuboptions}
              data={[
                { key: '1', value: 'Aéreo' },
                { key: '2', value: 'Clínico' },
                { key: '3', value: 'Emergencial' },
                { key: '4', value: 'Pós-Trauma' },
                { key: '5', value: 'Samu' },
                { key: '6', value: 'Sem remoção' },
              ]}
              save="value"
              label="Categorias"
              boxStyles={{ padding: 10 }}
              placeholder="Selecione"
              badgeStyles={{
                backgroundColor: '#A00E00',
                paddingHorizontal: 10,
              }}
              searchPlaceholder="Busque por problemas suspeitos"
              notFoundText="Nenhuma categoria encontrada"
            />
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
            {/* <Text>{diabetesSuboptions.toString()}</Text> */}
            <MultipleSelectList
              setSelected={setDiabetesSuboptions}
              data={[
                { key: '1', value: 'Hiperglicemia' },
                { key: '2', value: 'Hipoglicemia' },
              ]}
              save="value"
              label="Categorias"
              boxStyles={{ padding: 10 }}
              placeholder="Selecione"
              badgeStyles={{
                backgroundColor: '#A00E00',
                paddingHorizontal: 10,
              }}
              searchPlaceholder="Busque por problemas suspeitos"
              notFoundText="Nenhuma categoria encontrada"
            />
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
            {/* <Text>{obstericoSuboptions.toString()}</Text> */}
            <MultipleSelectList
              setSelected={setObstericoSuboptions}
              data={[
                { key: '1', value: 'Parto Emergêncial' },
                { key: '2', value: 'Gestante' },
                { key: '3', value: 'Hemorragia Excessiva' },
              ]}
              save="value"
              label="Categorias"
              boxStyles={{ padding: 10 }}
              placeholder="Selecione"
              badgeStyles={{
                backgroundColor: '#A00E00',
                paddingHorizontal: 10,
              }}
              searchPlaceholder="Selecione problemas suspeitos"
              notFoundText="Nenhuma categoria encontrada"
            />
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
            {/* <Text>{respiratorioSuboptions.toString()}</Text> */}
            <MultipleSelectList
              setSelected={setRespiratorioSuboptions}
              data={[
                { key: '1', value: 'DPOC' },
                { key: '2', value: 'Inalação Fumaça' },
              ]}
              save="value"
              label="Categorias"
              boxStyles={{ padding: 10 }}
              placeholder="Selecione"
              badgeStyles={{
                backgroundColor: '#A00E00',
                paddingHorizontal: 10,
              }}
              searchPlaceholder="Busque por problemas suspeitos"
              notFoundText="Nenhuma categoria encontrada"
            />
          </View>
        )}
      </View>
    </View>
  )
}
