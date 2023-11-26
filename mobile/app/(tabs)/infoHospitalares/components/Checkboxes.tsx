import { View, Text } from 'react-native'
import { Checkbox } from 'native-base'
import React, { useState } from 'react'
import { TProcedimentosEfetuadosTypes } from './../utils/prodAccomplished'
import InputNumeric from '@app/components/inputNumeric'
import InputFull from '@app/components/InputFull'

type TCheckboxesProps = {
  checkboxEntries: TProcedimentosEfetuadosTypes
}

export default function Checkboxes({ checkboxEntries }: TCheckboxesProps) {
  const [procedimentosEfetuados, setProcedimentosEfetuados] =
    useState<TProcedimentosEfetuadosTypes>(checkboxEntries)
  const [another, setAnother] = useState('')

  const handleProcedimentosEfetuadosCheckboxChange = (
    key: keyof TProcedimentosEfetuadosTypes,
    option?: string,
  ) => {
    setProcedimentosEfetuados((prevState) => {
      const newState = {
        ...prevState,
        [key]: {
          ...prevState[key],
          state: !prevState[key].state,
        },
      }
      if (!newState[key].state) {
        newState[key].options = (prevState[key].options || []).map((opt) => ({
          ...opt,
          state: false,
        }))
        if (newState[key].LPM !== undefined) newState[key].LPM = 0
      }
      if (option !== undefined) {
        const optionIndex = newState[key].options?.findIndex(
          (o) => o.option === option,
        )
        if (optionIndex !== undefined && optionIndex !== -1) {
          newState[key].options![optionIndex].state =
            !newState[key].options![optionIndex].state
        }
      }
      return newState
    })
  }

  const handleOptionsCheckboxChange = (
    key: keyof TProcedimentosEfetuadosTypes,
    option?: string,
  ) => {
    setProcedimentosEfetuados((prevState) => {
      const newState = { ...prevState }

      if (option !== undefined) {
        const optionIndex = newState[key].options?.findIndex(
          (o) => o.option === option,
        )

        if (optionIndex !== undefined && optionIndex !== -1) {
          newState[key].options![optionIndex].state =
            !newState[key].options![optionIndex].state
        }
      } else {
        newState[key].state = !newState[key].state
      }

      return newState
    })
  }

  const handleQuantityChange = (
    optionKey: keyof TProcedimentosEfetuadosTypes,
    newValue: number,
  ) => {
    setProcedimentosEfetuados((prevState) => {
      return {
        ...prevState,
        [optionKey]: {
          ...prevState[optionKey],
          LPM: newValue,
        },
      }
    })
  }

  return (
    <View className="p-4">
      {Object.entries(procedimentosEfetuados).map(([key, checkbox]) => (
        <View key={key}>
          <View className="mb-2">
            <Checkbox
              colorScheme="danger"
              isChecked={checkbox.state}
              onChange={() =>
                handleProcedimentosEfetuadosCheckboxChange(
                  key as keyof TProcedimentosEfetuadosTypes,
                )
              }
              value={key}
              size="lg"
            >
              <Text className="ml-[-1px] text-xl">{checkbox.name}</Text>
            </Checkbox>
            {checkbox.options && Boolean(checkbox.options?.length) && (
              <View className="mt-2">
                {checkbox?.options?.map((option) => (
                  <View className="ml-3" key={option.option}>
                    <Checkbox
                      isDisabled={!checkbox.state}
                      value={option.option}
                      isChecked={option.state}
                      className="pr-1"
                      size="md"
                      colorScheme="danger"
                      onChange={() =>
                        handleOptionsCheckboxChange(
                          key as keyof TProcedimentosEfetuadosTypes,
                          option.option,
                        )
                      }
                    >
                      <Text className="ml-[-3px] mr-5 text-lg">
                        {option.option}
                      </Text>
                    </Checkbox>
                  </View>
                ))}
              </View>
            )}
            {typeof checkbox.LPM === 'number' && (
              <View className="ml-3 flex-row items-center justify-start">
                <Text className="mr-2 text-lg font-bold">LPM:</Text>
                <InputNumeric
                  disabled={checkbox.state}
                  key={key}
                  numberWidth={50}
                  value={checkbox.LPM}
                  onChangeText={(newValue: number) =>
                    handleQuantityChange(
                      key as keyof TProcedimentosEfetuadosTypes,
                      newValue,
                    )
                  }
                />
              </View>
            )}
            {checkbox.name === 'Outro' && checkbox.state && (
              <View className="flex-row items-center justify-start">
                <InputFull
                  placeholder="OUTRO:"
                  value={another}
                  onChangeText={(e) => setAnother(e)}
                />
              </View>
            )}
          </View>
        </View>
      ))}
    </View>
  )
}
