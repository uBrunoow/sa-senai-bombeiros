import { View, Text } from 'react-native'

type SubtitleProps = {
  content: string
}

export default function Subtitle({ content }: SubtitleProps) {
  return (
    <View className="mx-auto mb-10 w-[90%] rounded-md border-b-2 border-b-red-800 bg-white p-3 shadow-2xl">
      <Text className="text-bold mx-auto text-red-800">{content}</Text>
    </View>
  )
}
