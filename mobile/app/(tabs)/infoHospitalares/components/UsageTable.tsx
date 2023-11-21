import React, { useState } from 'react'
import { View, Text } from 'react-native'
import { styles as s } from '../../../styles/boxShadow'
import { Checkbox, Radio } from 'native-base'

type TUsageTableProps = {
  rows: {
    material: string
    quantity: number
    sizes?: string[]
  }[]
}

export default function UsageTable({ rows }: TUsageTableProps) {
  const [selectedMaterial, setSelectedMaterial] = useState<{
    [key: string]: boolean
  }>({})
  const [selectedSizes, setSelectedSizes] = useState<{
    [key: string]: string
  }>({})

  function handleMaterialSelection(material: TUsageTableProps['rows'][number]) {
    setSelectedMaterial({
      ...selectedMaterial,
      [material.material]: !selectedMaterial[material.material],
    })
  }

  function handleSizeSelection(
    material: TUsageTableProps['rows'][number],
    newSize: string,
  ) {
    setSelectedSizes({
      ...selectedSizes,
      [material.material]: newSize,
    })
  }

  console.log('r: ', selectedSizes)

  return (
    <View style={s.boxShadow} className="mx-auto flex-row">
      <View className="m-2 grow-[5]">
        <View className="mx-4 flex-row justify-between">
          <Text className="text-md mb-3 text-center font-bold">MATERIAL</Text>
          <Text className="text-md mb-3 text-center font-bold">QUANTIDADE</Text>
        </View>
        <View className="rounded border">
          {rows.map((row, i) => (
            <View key={i}>
              <View className="flex-row">
                <View className="ml-4 mr-4 flex grow flex-row justify-between">
                  <Checkbox
                    value="Mano"
                    colorScheme="danger"
                    onChange={() => handleMaterialSelection(row)}
                  >
                    <Text className="m-2 ml-[-2px] text-center">
                      {row.material}
                    </Text>
                  </Checkbox>
                  {row.sizes && (
                    <Radio.Group
                      className="flex flex-col"
                      name={row.material}
                      onChange={(selectedSize) => {
                        handleSizeSelection(row, selectedSize)
                      }}
                    >
                      {row.sizes.map((size, i) => (
                        <Radio
                          value={size}
                          key={i}
                          my={1}
                          colorScheme="black"
                          size="md"
                          className="my-1 ml-2 mr-[-5px]"
                        >
                          {size}
                        </Radio>
                      ))}
                    </Radio.Group>
                  )}
                </View>
                <View className="h-full w-1/3 flex-row items-center justify-center border-l-[1px]">
                  <Text
                    className="grow-1 text-center text-xl font-bold"
                    key={i}
                  >
                    {row.quantity}
                  </Text>
                </View>
              </View>
              {rows.length !== i + 1 && (
                <View className="h-[1px] grow bg-slate-900" />
              )}
            </View>
          ))}
        </View>
      </View>
    </View>
  )
}
