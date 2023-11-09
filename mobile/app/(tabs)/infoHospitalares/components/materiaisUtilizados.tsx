import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { styles as s } from '@app/styles/boxShadow'
import { Checkbox, Input } from 'native-base'

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

const MateriaisUtilizados = () => {
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
      <View className="flex-row items-center justify-around py-5">
        <Text>Material</Text>
        <Text>Quantidade</Text>
      </View>
      <View className=" w-full border-width1 border-black">
        {Object.entries(procedEfetuadosCheckboxState).map(
          ([key, isChecked]) => (
            <View
              className="flex-row items-center justify-between border-y-width1 border-black p-3"
              key={key}
            >
              <Checkbox
                size="md"
                colorScheme="danger"
                value={key}
                isChecked={isChecked}
                onChange={() =>
                  handleProcedEfetuadosCheckboxChange(
                    key as keyof CheckboxStates,
                  )
                }
              >
                <Text className="text-lg text-slate-800">{key}</Text>
              </Checkbox>
              <Input placeholder="Input" w="1/6" />
            </View>
          ),
        )}
      </View>
    </View>
  )
}

export default MateriaisUtilizados
