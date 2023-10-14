import { Text, View } from 'react-native'
import SuspectProblemButton from './SuspectProblemButton'
import InputFull from '@app/components/InputLowPadding'
import { styles as s } from '@app/styles/boxShadow'
import { CheckIcon, Select } from 'native-base'
import { useState } from 'react'
export default function AvalPacienteGroup() {
  const [victimWas, setVictimWas] = useState('')

  return (
    <View
      style={s.boxShadow}
      className=" mx-auto w-[90%] rounded-[14px] bg-white px-[17px] py-[30px] shadow-md"
    >
      <View className="flex-row flex-wrap">
        <SuspectProblemButton iconName="car-crash" content="Transporte" />
        <SuspectProblemButton iconName="cubes" content="Diabetes" />
        <SuspectProblemButton iconName="baby-carriage" content="Obstétrico" />
        <SuspectProblemButton iconName="lungs" content="Respiratório" />
        <SuspectProblemButton iconName="brain" content="Psiquiátrico" />
        <View className="w-2/5 grow flex-row justify-center py-3">
          <Text className="text-center text-lg">Outro:</Text>
          <InputFull />
        </View>
        <View>
          <Select
            selectedValue={victimWas}
            minWidth="200"
            accessibilityLabel="Choose Service"
            placeholder="Choose Service"
            _selectedItem={{
              bg: 'teal.600',
              endIcon: <CheckIcon size="5" />,
            }}
            mt={1}
            onValueChange={(itemValue) => setVictimWas(itemValue)}
          >
            <Select.Item label="CICLISTA" value="CICLISTA" />
            <Select.Item label="CONDUTOR MOTO" value="CONDUTOR MOTO" />
            <Select.Item label="GESTANTE" value="GESTANTE" />
            <Select.Item label="CONDUTOR CARRO" value="CONDUTOR CARRO" />
            <Select.Item label="TRAUMA" value="TRAUMA" />
            <Select.Item label="PAS. BCO. ATRAS" value="PAS. BCO. ATRAS" />
            <Select.Item label="PASS. BAN. FRENTE" value="PASS. BAN. FRENTE" />
            <Select.Item label="PAS. MOTO" value="TRAUMA" />
            <Select.Item label="PEDESTRE" value="PEDESTRE" />
          </Select>
        </View>
      </View>
    </View>
  )
}
