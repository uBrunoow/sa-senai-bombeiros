import { Text, View } from 'react-native'
import SuspectProblemButton from './SuspectProblemButton'
import InputFull from '@app/components/InputLowPadding'
import { styles as s } from '@app/styles/boxShadow'

export default function AvalPacienteGroup() {
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
      </View>
    </View>
  )
}
