import { View, Text, TextInput } from 'react-native'
import React from 'react'

export default function VitaisGroup() {
  return (
    <View>
      {/* Box Pai de Todos */}
      <Text>Sinais Vitais</Text>
      <View>
        <View>
          <Text>Pressão Arterial</Text>
          {/* Titulo Geral */}
          <View>
            <TextInput className="w-[100px] rounded-[7px] border-width1 border-preto p-[10px]"></TextInput>
            {/* Input para temperatura */}
          </View>
          {/* Box Input */}
        </View>
        {/* Fecha Box 1 */}
        <View>
          <Text>Temper.</Text>
          <View>
            <TextInput className="w-[100px] rounded-[7px] border-width1 border-preto p-[10px]"></TextInput>
            {/* Input para temperatura */}
          </View>
          {/* Box Input */}
        </View>
        {/*  FechaBox 2 */}
        <View>
          <Text></Text>
        </View>
        {/* Fecha Box 3 */}
      </View>
    </View>
  )
}
