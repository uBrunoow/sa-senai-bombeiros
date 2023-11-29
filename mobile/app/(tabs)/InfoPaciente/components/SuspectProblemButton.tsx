import React, { Dispatch, SetStateAction } from 'react'
import { Text, TouchableOpacity } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons'
import classNames from 'classnames'

type SuspectProblemButtonProps = {
  content: string
  iconName: string
  buttonState: boolean
  setButtonState: Dispatch<SetStateAction<boolean>>
}

export default function SuspectProblemButton({
  iconName,
  content,
  buttonState,
  setButtonState,
}: SuspectProblemButtonProps) {
  function handleSetButtonSelected() {
    setButtonState(!buttonState)
  }

  const buttonClasses = classNames({
    'grow py-3 w-2/5 justify-center items-center flex-row m-1 rounded-lg': true,
    'bg-red-700 border-1 border-red-900': buttonState,
    'bg-white border': !buttonState,
  })

  const buttonTextClasses = classNames({
    'font-xl font-extrabold ml-3': true,
    'text-white': buttonState,
    'text-black': !buttonState,
  })

  return (
    <TouchableOpacity
      className={buttonClasses}
      onPress={handleSetButtonSelected}
    >
      <FontAwesome5
        name={iconName}
        size={30}
        color={buttonState ? 'white' : 'black'}
      />
      <Text className={buttonTextClasses}>{content}</Text>
    </TouchableOpacity>
  )
}
