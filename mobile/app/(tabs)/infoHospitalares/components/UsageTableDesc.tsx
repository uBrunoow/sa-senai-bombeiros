import React, { useState } from 'react'
import { View, Text } from 'react-native'
import { styles as s } from '../../../styles/boxShadow'
import { Checkbox, Divider, Button } from 'native-base'
import { TMaterialUtilizadoDescartavelTypes } from './../utils/usageTableMaterials'
import InputNumeric from '@app/components/inputNumeric'

export default function UsageTable({
  MaterialUtilizadoDescartavelDef,
}: {
  MaterialUtilizadoDescartavelDef: TMaterialUtilizadoDescartavelTypes
}) {
  const [materialUtilizadoDescartavel, setMaterialUtilizadoDescartavel] =
    useState<TMaterialUtilizadoDescartavelTypes>(
      MaterialUtilizadoDescartavelDef,
    )

  const handleMaterialCheckboxChange = (
    key: keyof TMaterialUtilizadoDescartavelTypes,
  ) => {
    setMaterialUtilizadoDescartavel((prevState) => {
      const newState = {
        ...prevState,
        [key]: {
          ...prevState[key],
          state: !prevState[key].state,
        },
      }
      if (!newState[key].state) {
        newState[key].sizes = {
          selectedSize: null,
          entries: prevState[key].sizes?.entries || [],
        }
        newState[key].quantity = 0
      }
      return newState
    })
  }

  const handleSizeCheckboxChange = (
    materialKey: keyof TMaterialUtilizadoDescartavelTypes,
    size: string,
  ) => {
    setMaterialUtilizadoDescartavel((prevState) => {
      return {
        ...prevState,
        [materialKey]: {
          ...prevState[materialKey],
          sizes: {
            ...prevState[materialKey].sizes,
            selectedSize: size,
          },
        },
      }
    })
  }

  const handleQuantityChange = (
    materialKey: keyof TMaterialUtilizadoDescartavelTypes,
    newValue: number,
  ) => {
    setMaterialUtilizadoDescartavel((prevState) => {
      return {
        ...prevState,
        [materialKey]: {
          ...prevState[materialKey],
          quantity: newValue,
        },
      }
    })
  }

  const handleShowMore = (category: 'MaterialUtilizadoDescartavel') => {
    if (category === 'MaterialUtilizadoDescartavel') {
      setShowMoreMaterialUtilizadoDescartavel(true)
    }
  }

  const handleShowLess = (category: 'MaterialUtilizadoDescartavel') => {
    if (category === 'MaterialUtilizadoDescartavel') {
      setShowMoreMaterialUtilizadoDescartavel(false)
    }
  }

  const [
    showMoreMaterialUtilizadoDescartavel,
    setShowMoreMaterialUtilizadoDescartavel,
  ] = useState<boolean>(false)

  const renderCheckboxes = (
    checkboxes: TMaterialUtilizadoDescartavelTypes,
    showMore: boolean,
  ) => {
    const visibleCheckboxes = showMore
      ? checkboxes
      : Object.fromEntries(Object.entries(checkboxes).slice(0, 5))

    return Object.entries(visibleCheckboxes).map(
      ([key, { state, name, quantity, sizes }]) => (
        <View
          key={key}
          style={{ flexDirection: 'row' }}
          className="mb-4 w-full items-center justify-between rounded-lg border p-3"
        >
          <View className="w-4/6 flex-col">
            <Checkbox
              value={key}
              isChecked={state}
              size="md"
              colorScheme="danger"
              onChange={() =>
                handleMaterialCheckboxChange(
                  key as keyof TMaterialUtilizadoDescartavelTypes,
                )
              }
            >
              <Text className="text-lg text-slate-800">{name}</Text>
            </Checkbox>
            <View className="mt-3" style={{ flexDirection: 'row' }}>
              {sizes?.entries.map((size) => (
                <Checkbox
                  isDisabled={!state}
                  key={size}
                  value={size}
                  isChecked={size === sizes?.selectedSize}
                  className="pr-1"
                  size="md"
                  colorScheme="danger"
                  onChange={() =>
                    handleSizeCheckboxChange(
                      key as keyof TMaterialUtilizadoDescartavelTypes,
                      size,
                    )
                  }
                >
                  <Text className="ml-[-3px] mr-5 text-lg">{size}</Text>
                </Checkbox>
              ))}
            </View>
          </View>
          <Divider orientation="vertical" mx="3" bg="#000" />
          <InputNumeric
            disabled={state}
            key={key}
            numberWidth={50}
            value={quantity?.toString()}
            onChangeText={(newValue: number) =>
              handleQuantityChange(
                key as keyof TMaterialUtilizadoDescartavelTypes,
                newValue,
              )
            }
          />
        </View>
      ),
    )
  }

  return (
    <View style={s.boxShadow} className="mx-auto flex-row">
      <View className="m-2 grow-[5]">
        <View className="mx-4 flex-row justify-between">
          <Text className="text-md mb-3 text-center font-bold">MATERIAL</Text>
          <Text className="text-md mb-3 text-center font-bold">QUANTIDADE</Text>
        </View>
        <View>
          <View>
            <View className="flex grow flex-col justify-between">
              {renderCheckboxes(
                materialUtilizadoDescartavel,
                showMoreMaterialUtilizadoDescartavel,
              )}
              {!showMoreMaterialUtilizadoDescartavel ? (
                <Button
                  onPress={() => handleShowMore('MaterialUtilizadoDescartavel')}
                  style={{ backgroundColor: 'red', marginVertical: 10 }}
                >
                  <Text className="text-white">Ver Mais</Text>
                </Button>
              ) : (
                <Button
                  onPress={() => handleShowLess('MaterialUtilizadoDescartavel')}
                  style={{ backgroundColor: 'red', marginVertical: 10 }}
                >
                  <Text className="text-white">Ver Menos</Text>
                </Button>
              )}
            </View>
          </View>
        </View>
      </View>
    </View>
  )
}
