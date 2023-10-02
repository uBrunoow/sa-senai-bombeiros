import { View, Text } from 'react-native'

type InfoPacienteTitleProps = {
  content: string
}

export default function InfoPacienteTitle({ content }: InfoPacienteTitleProps) {
  return (
    <View className="mx-auto my-10 w-5/6 flex-1 justify-center rounded-md border-b-2 border-b-red-800 bg-white p-3 shadow-2xl">
      <Text className="text-bold mx-auto w-fit text-red-800">{content}</Text>
    </View>
  )
}
