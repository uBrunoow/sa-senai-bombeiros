import React, { Dispatch, SetStateAction } from 'react'
import { View, Text, TextInput } from 'react-native'
import { Checkbox } from 'native-base'

type ManyCheckboxesProps = {
  title: string
  options: {
    key: string
    value: string
    state: boolean
    setState: Dispatch<SetStateAction<boolean>>
  }[]
  maxOptions?: number
}

export default function ManyCheckboxes({
  title,
  options,
  maxOptions,
}: ManyCheckboxesProps) {
  if (!maxOptions) maxOptions = 5

  const notRenderizedCheckboxes = options.length - maxOptions

  return (
    <View>
      <Text>{title}</Text>
      <View className="mx-auto w-11/12 rounded-xl border">
        <View className="border-b px-4 py-3 text-lg">
          <TextInput className="text-lg" placeholder="Pesquisar..." />
        </View>
        <View className="my-1 px-4 py-3">
          {options.map((option, i) => {
            if (!(i >= 5)) {
              return (
                <Checkbox size="md" key={option.key} value={option.key}>
                  <Text className="text-lg">{option.key}</Text>
                </Checkbox>
              )
            } else {
              return <></>
            }
          })}
          <Text className="mt-2 text-lg">
            {notRenderizedCheckboxes} Outros...
          </Text>
        </View>
      </View>
    </View>
  )
}
