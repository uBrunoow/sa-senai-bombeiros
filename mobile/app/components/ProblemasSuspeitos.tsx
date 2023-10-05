import { Text, View } from 'react-native'
import SuspectProblemButton from './SuspectProblemButton'
import InputFull from './InputLowPadding'
import { styles as s } from '@app/styles/boxShadow'

export default function AvalPacienteGroup() {
  return (
    <View style={s.boxShadow}>
      <View className="flex-row flex-wrap">
        <SuspectProblemButton iconName="car-crash" content="Transporte" />
        <SuspectProblemButton iconName="cubes" content="Diabetes" />
        <SuspectProblemButton iconName="baby-carriage" content="Obstétrico" />
        <SuspectProblemButton iconName="lungs" content="Respiratório" />
        <SuspectProblemButton iconName="brain" content="Psiquiátrico" />
        <View className="h-min w-2/5 grow flex-row justify-center py-3">
          <Text className="p-r-3 text-lg">Outro:</Text>
          <InputFull />
        </View>
      </View>
    </View>
  )
}
