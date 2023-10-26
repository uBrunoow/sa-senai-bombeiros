import React from 'react'
import { Linking, Text, TouchableOpacity } from 'react-native'
import { Box, Divider, Stack } from 'native-base'
import NOARLogo from '@src/public/logo-noar.svg'
import { Entypo } from '@expo/vector-icons'
export default function Footer() {
  return (
    <Box className="w-full bg-[#A00E00] px-10 py-5">
      <NOARLogo height={70} width={70} />
      {/* <Text className="mt-5 font-normal text-white">
        Salveiros destemidos que desafiam o fogo e as adversidades, nossos
        bombeiros são verdadeiros heróis.
      </Text>
      <Stack direction="row" mb="2.5" mt="1.5">
        <TouchableOpacity
          className="px-2"
          onPress={() => {
            Linking.openURL('https://noar.org.br/')
          }}
        >
          <Entypo name="globe" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity className="px-2">
          <Entypo name="instagram" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity className="px-2">
          <Entypo name="facebook" size={24} color="white" />
        </TouchableOpacity>
      </Stack>
      <Divider
        my="5"
        _light={{
          bg: 'white',
        }}
      />
      <Text className="font-bold text-white">
        Copyright (c) 2023 sa-senai-bombeiros
      </Text>
      <Text className="font-bold text-white">Termos</Text>
      <Text className="font-bold text-white">Privacidade</Text> */}
    </Box>
  )
}
