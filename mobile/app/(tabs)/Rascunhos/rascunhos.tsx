import { ScrollView, SafeAreaView, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Footer from '@app/components/Footer'
import Title from '@app/components/Title'
import Header from '@app/components/Header'
import DraftsGrouper from './components/draftsGrouper'
import { findManyReports } from '@src/api/reports/findReport'
import Loader from '@app/components/Loader'

type Report = {
  id: number
  createdAt: string
  updatedAt: string
  reportDate: string | null
  name: string
  age: number
  gender: string | null
  cpf: string
  phone: string
  reportPlace: string
  // ... outras propriedades
  isDraft: boolean
}
const Rascunhos = () => {
  const [infoReports, setInfoReports] = useState([])
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    const findManyReportsData = async () => {
      try {
        setLoading(true)
        const response = await findManyReports()

        if (response && response.reports) {
          setInfoReports(response.reports)
        } else {
          console.error('Resposta da API inválida:', response)
        }
      } catch (error) {
        console.error('Erro ao buscar os relatórios:', error)
      } finally {
        setLoading(false)
      }
    }

    findManyReportsData()
  }, [])

  return (
    <SafeAreaView>
      <ScrollView>
        {loading ? (
          <Loader />
        ) : (
          <>
            <Header />
            <View className="min-h-[80vh]">
              <Title iconName="file-export" title="Rascunhos" />
              {infoReports.map((reportData: Report, index: number) => (
                <DraftsGrouper
                  key={index}
                  isComplete={reportData.isDraft ? 'INCOMPLETE' : 'COMPLETE'}
                  name={reportData.name}
                  reportPlace={reportData.reportPlace}
                  gender={reportData.gender}
                  date={reportData.reportDate}
                />
              ))}
            </View>
            <Footer />
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  )
}

export default Rascunhos
