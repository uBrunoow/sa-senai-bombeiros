import { View, ScrollView, SafeAreaView, Text } from 'react-native'
import React from 'react'
import Header from '../../components/Header'
import Title from '../../components/Title'
import Footer from '../../components/Footer'
import MainButton from '../../components/MainButton'
import { MaterialIcons } from '@expo/vector-icons'

export default function Ocorrencia() {
  return (
    <SafeAreaView>
      <ScrollView>
        <View>
          <Header />
          <Title iconName="ambulance" title="Informações Hospitalares" />
          <Footer />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
