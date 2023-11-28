import { View, Text, TouchableOpacity } from 'react-native'

type modalOption = {
  value: string
  description: string
}

type AvalPacienteModalProps = {
  handleOptionSelection: any
  setModalVisible: any
  modalTitle: string
  options: modalOption[]
}

export default function AvalPacienteModal({
  handleOptionSelection,
  setModalVisible,
  modalTitle,
  options,
}: AvalPacienteModalProps) {
  return (
    <View className="flex-col rounded-2xl bg-white px-10 py-7 shadow-2xl">
      <Text className="p-b-15 mx-auto mb-5 text-xl font-bold">
        {modalTitle} - Selecione:
      </Text>
      <View className="flex-col gap-3">
        {options.map((modalOpction) => {
          const modalDescription = `${modalOpction.value} - ${modalOpction.description}`
          return (
            <TouchableOpacity
              key={modalDescription}
              className="rounded-lg border p-2"
              onPress={() => {
                handleOptionSelection(modalOpction.value)
                setModalVisible(false)
              }}
            >
              <Text>{modalDescription}</Text>
            </TouchableOpacity>
          )
        })}
      </View>
    </View>
  )
}
