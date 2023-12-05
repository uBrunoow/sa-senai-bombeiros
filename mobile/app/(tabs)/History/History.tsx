import { View, SafeAreaView, ScrollView, Button, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import Loader from '@app/components/Loader'
import Header from '@app/components/Header'
import { AntDesign } from '@expo/vector-icons'
import { useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/core'
import Footer from '@app/components/Footer'
import { IReport } from '@src/interfaces/IReport'
import findManyReports from '@src/api/reports/findManyReports'
import HistoryCard from './components/HistoryCard'

interface DownloadedReport {
  msg: string
  reports: IReport
}
const History = () => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const [reportsForDownload, setReportsForDownload] =
    useState<DownloadedReport>({
      msg: '',
      reports: {
        id: 0,
        createdAt: '',
        updatedAt: '',
        reportDate: '',
        name: '',
        age: 0,
        gender: '',
        cpf: '',
        phone: '',
        reportPlace: '',
        systolicBloodPressure: 0,
        diastolicBloodPressure: 0,
        bodyTemp: 0,
        bodyPulse: 0,
        breathing: 0,
        saturation: 0,
        perfusion: '',
        followUp: '',
        followUpAge: 0,
        isFinalized: false,
        ownerId: 0,
        Symptoms: [],
        PreHospitalMethods: [],
        Anamnesis: [],
        GestationalAnamnesis: [],
        Report_PreHospitalMethod: [],
        Report_Symptoms: [],
        Glasglow: [],
        CinematicAvaliation: [],
        Finalization: [],
        SuspectProblems: [],
        LocalTraumas: [],
        InfoTransport: [],
        InfoHospitalar: [],
      },
    })
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const reportsPerPage = 10

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' })

    navigation.navigate('home' as never)
  }

  useEffect(() => {
    const fetchReportsForDownload = async () => {
      try {
        setLoading(true)
        const response = await findManyReports(currentPage)

        setReportsForDownload(response)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    fetchReportsForDownload()
  }, [currentPage])

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1)
  }
  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1)
  }

  const isFirstPage = currentPage === 1
  const isLastPage =
    reportsForDownload?.reports?.length &&
    reportsForDownload.reports.length < reportsPerPage
  return (
    <SafeAreaView>
      <ScrollView>
        {loading ? (
          <Loader />
        ) : (
          <>
            <View>
              <Header />
              <View className="mb-[40px] mt-[34px] flex-row items-center justify-center">
                <AntDesign name="clockcircle" size={24} color="#A00E00" />
                <Text className="ml-[10px] text-[20px] font-medium leading-[20px]">
                  Histórico
                </Text>
              </View>
            </View>
            {reportsForDownload &&
              Object.entries(reportsForDownload?.reports).map(
                ([key, report]) => (
                  <View key={key}>
                    <HistoryCard report={report} />
                  </View>
                ),
              )}
            <View className="mx-auto w-full flex-row items-center justify-center">
              <Text>Página {currentPage}</Text>
            </View>
            <View className="mx-auto w-full flex-row justify-center pb-4">
              <View className="m-2">
                {isFirstPage ? (
                  <Button
                    title="Prev page"
                    disabled={true}
                    onPress={handlePrevPage}
                  />
                ) : (
                  <Button
                    title="Prev page"
                    color="#A00E00"
                    onPress={handlePrevPage}
                  />
                )}
              </View>
              <View className="m-2">
                {isLastPage ? (
                  <Button
                    title="Next page"
                    disabled={true}
                    onPress={handleNextPage}
                  />
                ) : (
                  <Button
                    title="Next page"
                    color="#A00E00"
                    onPress={handleNextPage}
                  />
                )}
              </View>
            </View>

            <Button title="Logout" onPress={handleLogout} />
            <Footer />
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  )
}

export default History
