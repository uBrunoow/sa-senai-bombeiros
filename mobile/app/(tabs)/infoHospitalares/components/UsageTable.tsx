import React from 'react'
import { View, Text } from 'react-native'
import { styles as s } from '../../../styles/boxShadow'
import { Checkbox, Radio, Stack } from 'native-base'

type TUsageTableProps = {
  rows: {
    material: string
    quantity: number
    sizes?: string[]
  }[]
}

export default function UsageTable({ rows }: TUsageTableProps) {
  return (
    <View style={s.boxShadow} className="mx-auto flex-row">
      <View className="m-2 grow-[5]">
        <Text className="text-md mb-3 text-center font-bold">MATERIAL</Text>
        <View className="rounded border">
          {rows.map((row, i) => (
            <>
              <View className="ml-4 flex flex-row">
                <Checkbox value="Mano" colorScheme="danger">
                  <Text className="m-2 text-center" key={i}>
                    {row.material}
                  </Text>
                </Checkbox>
                {row.sizes && (
                  <Radio.Group className="flex flex-row" name="test">
                    {row.sizes.map((size, i) => (
                      <Radio
                        value={size}
                        key={i}
                        my={1}
                        colorScheme="black"
                        size="sm"
                        className="ml-2 mr-[-5px]"
                      >
                        {size}
                      </Radio>
                    ))}
                  </Radio.Group>
                )}
              </View>
              {rows.length !== i + 1 && (
                <View className="mx-3 h-[1px] grow bg-slate-900" />
              )}
            </>
          ))}
        </View>
      </View>
      <View className="m-2 grow">
        <Text className="text-md mb-3 text-center font-bold">QUANTIDADE</Text>
        <View className="rounded border">
          {rows.map((row, i) => (
            <>
              <Text className="m-2 text-center font-bold" key={i}>
                {row.quantity}
              </Text>
              {rows.length !== i + 1 && (
                <View className="mx-3 h-[1px] grow bg-slate-900" />
              )}
            </>
          ))}
        </View>
      </View>
    </View>
  )
}
