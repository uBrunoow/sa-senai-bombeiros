import { TouchableOpacity, Text } from 'react-native'

export default function MainButton() {
  const handleClick = () => {
    console.log('cu')
  }

  return (
    <TouchableOpacity
      className="justify-center rounded-2xl bg-red-800 p-4"
      onPress={handleClick}
    >
      <Text>LuciÂnus</Text>
    </TouchableOpacity>
  )
}
