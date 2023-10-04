import React, { useState } from 'react'
import { View, Text } from 'react-native'
// import { Select } from 'native-base'

export default function AvalPacienteGroup() {
  const [aberturaOcular, setAberturaOcular] = useState('0')
  const [respostaVerbal, setRespostaVerbal] = useState('0')
  const [respostaMotora, setRespostaMotora] = useState('0')

  function validateGlasgow(): Number {
    if (![aberturaOcular, respostaVerbal, respostaMotora].includes('0')) {
      return 0
    } else {
      return (
        Number(aberturaOcular) + Number(respostaVerbal) + Number(respostaMotora)
      )
    }
  }

  function handleAberturaOcular(valueAberturaOcular: string): void {
    setAberturaOcular(valueAberturaOcular)
  }

  function handleRespostaVerbal(valueRespostaVerbal: string): void {
    setRespostaVerbal(valueRespostaVerbal)
  }

  function handleRespostaMotora(valueRespostaMotora: string): void {
    setRespostaMotora(valueRespostaMotora)
  }

  return (
    <View className="mx-auto w-5/6 flex-col rounded-md bg-white shadow-2xl">
      <View className="flex-col gap-2 p-5">
        <Text>Abertura ocular</Text>
        {/* <Select
          selectedValue={aberturaOcular}
          accessibilityLabel="Selecione a abertura ocular"
          placeholder="Selecione"
          _selectedItem={{
            bg: 'teal.600',
            // endIcon: <CheckIcon size="5" />,
          }}
          mt={1}
          onValueChange={(itemValue) => setAberturaOcular(itemValue)}
        >
          <Select.Item value={'4'} label="Espontânea" />
          <Select.Item value={'3'} label="Comando verbal" />
          <Select.Item value={'2'} label="Estímulo doloroso" />
          <Select.Item value={'1'} label="Nenhuma" />
        </Select> */}
      </View>
      <View className="flex-col gap-2 p-5">
        <Text>Resposta motora</Text>
      </View>
      <View className="flex-col gap-2 p-5">
        <Text>Abertura ocular</Text>
      </View>
      <View className="flex w-full gap-2">
        <Text>Total GCS</Text>
        <Text>{'(3 - 15)'}</Text>
        <Text className="w-full border-b-2 border-zinc-950">
          {(validateGlasgow()
            ? validateGlasgow()
            : 'Glasglow incompleto'
          ).toString()}
        </Text>
      </View>
    </View>
  )
}
