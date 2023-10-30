import { View, ScrollView, SafeAreaView } from 'react-native'
import React from 'react'
import Header from '../../components/Header'
import Title from '../../components/Title'
import Footer from '../../components/Footer'

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
