import { ScrollView, SafeAreaView, View, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import Footer from '@app/components/Footer'
import Title from '@app/components/Title'
import Header from '@app/components/Header'
import DraftsGrouper from './components/draftsGrouper'
import { findManyReports } from '@src/api/reports/findReport'
import Loader from '@app/components/Loader'
import { RootState } from '@src/redux/stores/stores'
import { useDispatch, useSelector } from 'react-redux'
import { clearAnamnesisId, clearCinematicAvaliationId, clearFinalizationId, clearGestacionalAnamnesisId, clearGlasgowId, clearPreHospitalarMethodId, clearSignsAndSymptomsId, clearSuspectProblemsId, saveReportId } from '@src/redux/actions/reportActions'

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
  isDraft: boolean
}
const Rascunhos = ({ navigation, ...props }: any) => {
  const dispatch = useDispatch()
  const [infoReports, setInfoReports] = useState([])
  const [loading, setLoading] = useState(false)
  const ReportOwnerId = useSelector((state: RootState) => state.report.reportId)

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

  const handleDraftClick = (reportId) => {
    navigation.navigate('ocorrencia', { ocorrenciaId: reportId })
    dispatch(saveReportId(reportId))
    dispatch(clearAnamnesisId())
    dispatch(clearGestacionalAnamnesisId())
    dispatch(clearFinalizationId())
    dispatch(clearSuspectProblemsId())
    dispatch(clearGlasgowId())
    dispatch(clearCinematicAvaliationId())
    dispatch(clearPreHospitalarMethodId())
    dispatch(clearSignsAndSymptomsId())
  }

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
                <TouchableOpacity
                  key={index}
                  onPress={() => handleDraftClick(reportData.id)}
                >
                  <DraftsGrouper
                    isComplete={
                      ReportOwnerId === reportData.id
                        ? 'IN PROGRESS'
                        : reportData.isDraft
                        ? 'INCOMPLETE'
                        : 'COMPLETE'
                    }
                    name={reportData.name}
                    reportPlace={reportData.reportPlace}
                    gender={reportData.gender}
                    date={reportData.reportDate}
                    id={reportData.id}
                  />
                </TouchableOpacity>
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
