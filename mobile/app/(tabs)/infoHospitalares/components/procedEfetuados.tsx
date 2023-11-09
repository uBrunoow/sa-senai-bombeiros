import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { styles as s } from '@app/styles/boxShadow'
import { Checkbox, ChevronDownIcon, Flex } from 'native-base'

type CheckboxStates = {
  ASPIRACAO?: boolean
  AVALIACAO_INICIAL?: boolean
  AVALIACAO_DIRIGIDA?: boolean
  AVALIACAO_CONTINUADA?: boolean
  CHAVE_DE_RAUTEK?: boolean
  CANDULA_DE_GUEDEL?: boolean
  DESDOBRAMENTO_DE_VA?: boolean
  EMPREGO_DO_DEA?: boolean
  GERENCIAMENTO_DE_RISCOS?: boolean
  LIMPEZA_DO_FERIMENTO?: boolean
  CURATIVOS?: boolean
  COMPRESSIVO?: boolean
}

const ProcedEfetuados = () => {
  const [procedEfetuadosCheckboxState, setProcedEfetuadosCheckboxState] =
    useState<CheckboxStates>({
      ASPIRACAO: false,
      AVALIACAO_INICIAL: false,
      AVALIACAO_DIRIGIDA: false,
      AVALIACAO_CONTINUADA: false,
      CHAVE_DE_RAUTEK: false,
      CANDULA_DE_GUEDEL: false,
      DESDOBRAMENTO_DE_VA: false,
      EMPREGO_DO_DEA: false,
      GERENCIAMENTO_DE_RISCOS: false,
      LIMPEZA_DO_FERIMENTO: false,
      CURATIVOS: false,
      COMPRESSIVO: false,
    })

  const handleProcedEfetuadosCheckboxChange = (key: keyof CheckboxStates) => {
    if (
      Object.prototype.hasOwnProperty.call(procedEfetuadosCheckboxState, key)
    ) {
      setProcedEfetuadosCheckboxState((prevState) => {
        return {
          ...prevState,
          [key]: !prevState[key],
        }
      })
    }
  }

  return (
    <View style={s.boxShadow} className="mx-auto">
      <View className="">
        {Object.entries(procedEfetuadosCheckboxState).map(
          ([key, isChecked]) => (
            <Checkbox
              key={key}
              size="md"
              colorScheme="danger"
              value={key}
              isChecked={isChecked}
              onChange={() =>
                handleProcedEfetuadosCheckboxChange(key as keyof CheckboxStates)
              }
            >
              <Text className="text-lg text-slate-800">{key}</Text>
            </Checkbox>
          ),
        )}
      </View>
      <Flex direction="row" className="items-center">
        <Text className="text-base font-bold text-red-500">Ver mais</Text>
        <ChevronDownIcon size="5" mt="0.5" color="red.500" />
      </Flex>
    </View>
  )
}

export default ProcedEfetuados
