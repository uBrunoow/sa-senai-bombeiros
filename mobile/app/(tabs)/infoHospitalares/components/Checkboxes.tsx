import { View } from 'react-native'
import { Checkbox } from 'native-base'
import React from 'react'

type TCheckboxesProps = {
  entries: {
    name: string
    value: string
    state: boolean
    setState: any
  }[]
}

export default function Checkboxes({ entries }: TCheckboxesProps) {
  return (
    <View>
      {entries.map((entry, i) => (
        <Checkbox
          key={i}
          isChecked={entry.state}
          onChange={entry.setState}
          value={entry.name}
        >
          {entry.name}
        </Checkbox>
      ))}
    </View>
  )
}
