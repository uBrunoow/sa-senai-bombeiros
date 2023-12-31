import { View, Text, TouchableOpacity, Pressable, Modal } from 'react-native'
import React, { useState } from 'react'
import { styles as s } from '@app/styles/boxShadow'
import { AntDesign } from '@expo/vector-icons'
import { formatDate } from '@src/utils/formatDate'
import { formatGender } from '@src/utils/formatGender'
import DownloadPdfModal from '@app/modal/downloadPdfModal'

type HistoryProps = {
  report: {
    id: number
    name: string
    age: number
    gender: string
    cpf: string
    createdAt: string
    isFinalized: boolean
  }
}

const HistoryCard = ({ report }: HistoryProps) => {
  const [showDownloadModal, setShowDownladModal] = useState(false)

  const handleCloseDownloadModal = () => {
    setShowDownladModal(false)
  }

  return (
    <>
      <View
        style={s.boxShadow}
        className=" m-auto mb-5 w-5/6 flex-row rounded-[7px] bg-white p-3 shadow-lg"
      >
        <View className="w-full  border-width1 border-black">
          <View className="w-full  bg-red-700 p-3">
            <Text className="font-semibold uppercase text-white">
              Ocorrência de n° {report?.id}
            </Text>
          </View>
          <View className="w-full bg-white p-3">
            <Text className="font-semibold capitalize text-black">
              Nome:{' '}
              {report?.name || (
                <Text style={{ fontStyle: 'italic', color: 'gray' }}>
                  Não inserido
                </Text>
              )}
            </Text>
            <Text className="font-semibold capitalize text-black">
              CPF:{' '}
              {report?.cpf || (
                <Text style={{ fontStyle: 'italic', color: 'gray' }}>
                  Não inserido
                </Text>
              )}
            </Text>
            <Text className="font-semibold capitalize text-black">
              Gênero:{' '}
              {formatGender(report?.gender) || (
                <Text style={{ fontStyle: 'italic', color: 'gray' }}>
                  Não inserido
                </Text>
              )}
            </Text>
            <Text className="font-semibold capitalize text-black">
              Idade:{' '}
              {report?.age || (
                <Text style={{ fontStyle: 'italic', color: 'gray' }}>
                  Não inserido
                </Text>
              )}
            </Text>
            <Text className="font-semibold capitalize text-black">
              Data:{' '}
              {formatDate(report?.createdAt) || (
                <Text style={{ fontStyle: 'italic', color: 'gray' }}>
                  Não inserido
                </Text>
              )}
            </Text>
            <Text className="font-semibold capitalize text-black">
              Status:{' '}
              {report?.isFinalized || (
                <Text style={{ fontStyle: 'italic', color: 'gray' }}>
                  Não inserido
                </Text>
              )}
            </Text>
          </View>

          <View className="w-full flex-row px-2 py-3">
            {report?.isFinalized === true ? (
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginRight: 5,
                  backgroundColor: '#007bff',
                  padding: 10,
                  borderRadius: 5,
                }}
                onPress={() => setShowDownladModal(true)}
              >
                <AntDesign name="download" size={24} color="white" />
                <Text style={{ marginLeft: 10, color: 'white' }}>Download</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginRight: 5,
                  backgroundColor: '#007bff5a',
                  padding: 10,
                  borderRadius: 5,
                }}
                disabled={true}
              >
                <AntDesign name="download" size={24} color="white" />
                <Text style={{ marginLeft: 10, color: 'white' }}>Download</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: '#dc3545',
                padding: 10,
                borderRadius: 5,
                marginRight: 5,
              }}
              onPress={() => {}}
            >
              <AntDesign name="delete" size={24} color="white" />
              <Text style={{ marginLeft: 10, color: 'white' }}>Excluir</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: '#28a745',
                padding: 10,
                borderRadius: 5,
              }}
              onPress={() => {}}
            >
              <AntDesign name="edit" size={24} color="white" />
              <Text style={{ marginLeft: 10, color: 'white' }}>Editar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {showDownloadModal && (
        <Modal
          transparent={true}
          animationType="fade"
          visible={showDownloadModal}
          onRequestClose={() => setShowDownladModal(false)}
        >
          <View className="flex-1 items-center justify-center bg-[#0000007f]">
            <View
              style={s.modalContent}
              className="relative rounded-[7px] bg-white p-4 "
            >
              <DownloadPdfModal reportId={report?.id} />
              <Pressable
                onPress={() => setShowDownladModal(false)}
                className="absolute right-1 top-1 z-50"
              >
                <AntDesign name="closecircle" size={24} color="red" />
              </Pressable>
            </View>
          </View>
        </Modal>
      )}
    </>
  )
}

export default HistoryCard
