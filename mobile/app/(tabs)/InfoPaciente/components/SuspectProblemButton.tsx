import React, { useState } from 'react'
import { Text, TouchableOpacity } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons'
import classNames from 'classnames'

type SuspectProblemButtonProps = {
  content: string
  iconName: string
  subCategories?: string[]
}

export default function SuspectProblemButton({
  content,
  iconName,
}: SuspectProblemButtonProps) {
  const [buttonSelected, setButtonSelected] = useState(false)

  function handleSetButtonSelected() {
    setButtonSelected(!buttonSelected)
  }

  const buttonClasses = classNames({
    'grow py-3 w-2/5 justify-center items-center flex-row m-1 rounded-lg': true,
    'bg-red-700 border-1 border-red-900': buttonSelected,
    'bg-white border': !buttonSelected,
  })

  const buttonTextClasses = classNames({
    'font-xl font-extrabold ml-3': true,
    'text-white': buttonSelected,
    'text-black': !buttonSelected,
  })

  return (
    <TouchableOpacity
      className={buttonClasses}
      onPress={handleSetButtonSelected}
    >
      <FontAwesome5
        name={iconName}
        size={30}
        color={buttonSelected ? 'white' : 'black'}
      />
      <Text className={buttonTextClasses}>{content}</Text>
    </TouchableOpacity>
  )
}
