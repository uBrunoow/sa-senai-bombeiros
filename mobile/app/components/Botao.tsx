import { ReactDOM } from 'react'
import { TouchableOpacity, Text } from 'react-native'

export default function MainButton() {
  const element = document.getElementById('teste') as HTMLParagraphElement
  const handleClick = () => {
    element.style.backgroundColor = 'red'
  }

  return (
    <TouchableOpacity
      className="justify-center rounded-2xl bg-red-800 p-4"
      onPress={handleClick}
    >
      <Text id="teste">LuciÂnus</Text>
    </TouchableOpacity>
  )
}
