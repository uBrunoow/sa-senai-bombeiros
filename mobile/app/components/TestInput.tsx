import { View, Text, TextInput } from 'react-native'
import { FormControl, Input } from 'native-base'
import { Controller, set, useForm } from 'react-hook-form'
import React from 'react'
// import { Entypo } from '@expo/vector-icons'

type InputProps = {
  title: string
  name: string
}

export default function InputFull(props: InputProps) {
  const { control, handleSubmit, setValue } = useForm()

  return (
    <View>
      <FormControl.Label>{props.title}</FormControl.Label>
      <Controller
        control={control}
        name={props.name}
        render={({ field }) => (
          <Input
            onBlur={field.onBlur}
            placeholder={'aaaaaaa'}
            onChangeText={(val) => field.onChange(val)}
            value={field.value}
          />
        )}
      ></Controller>
    </View>
  )
}
