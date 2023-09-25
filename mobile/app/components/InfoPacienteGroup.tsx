import { View, Text } from 'react-native'

export default function InfoPacienteCard() {
  return (
    <View className="mx-auto h-10 w-5/6 flex-col rounded-md bg-white shadow-2xl">
      <View>
        <Text>Abertura ocular</Text>
      </View>
      <View>
        <Text>Resposta verbal</Text>
      </View>
      <View>
        <Text>Reposta motora</Text>
      </View>
    </View>
  )
}
