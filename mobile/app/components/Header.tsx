import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import NOARLogo from '../../src/assets/logo-noar.svg'

export default function Header() {
  return (
    <View className="h-[67px] w-full flex-row items-center bg-[#A00E00] p-[10px]">
      <NOARLogo height={42} width={42} />
      <Text
        style={styles.textShadow}
        className="ml-[14px] text-[32.5px] font-black leading-normal text-[#33338D]"
      >
        NOAR
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  textShadow: {
    textShadowColor: 'rgba(245, 245, 245, 0.3)',
    textShadowRadius: 4,
    textShadowOffset: { width: -1, height: 2 },
  },
})
