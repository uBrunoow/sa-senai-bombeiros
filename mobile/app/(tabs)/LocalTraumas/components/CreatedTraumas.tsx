import { View, Text, TouchableOpacity } from 'react-native'
import { styles as s } from '@app/styles/boxShadow'
import { ILocalTrauma } from '@src/interfaces/IReport'
import classNames from 'classnames'
import deleteLocalTraumas from '@src/api/reports/localTraumas/deleteLocalTraumas'
import { SetStateAction, Dispatch } from 'react'
import { useToast } from 'native-base'

type CreatedTraumasProps = {
  localTraumas: ILocalTrauma[]
  setLocalTraumas: Dispatch<SetStateAction<ILocalTrauma[]>>
}

export default function CreatedTraumas({
  localTraumas,
  setLocalTraumas,
}: CreatedTraumasProps) {
  const tipoTraumaMapping = {
    bodyPart: {
      GLUTEOS: 'Glúteos',
      ANTEBRACO: 'Antebraço',
      BRACO: 'Braço',
      PESCOCO: 'Pescoço',
      COSTAS: 'Costas',
      ABDOMEN: 'Abdômen',
      PEITO: 'Peito',
      OMBRO: 'Ombro',
      CABECA: 'Cabeça',
      COXA: 'Coxa',
      JOELHO: 'Joelho',
      PERNA: 'Perna',
      PE: 'Pé',
      VIRILHA: 'Virilha',
      CALCANHAR: 'Calcanhar',
    },
    tipo: {
      FRATURA: 'Fratura',
      DIVERSOS: 'Ferimentos diversos',
      HEMORRAGIAS: 'Hemorragias',
      ESVICERACAO: 'Esvisceração',
      FAV_FAV: 'F.A.V. / F.A.F.',
      AMPUTACAO: 'Amputação',
      QUEIMADURA_1GRAU: 'Queimadura 1º Grau',
      QUEIMADURA_2GRAU: 'Queimadura 2º Grau',
      QUEIMADURA_3GRAU: 'Queimadura 3º Grau',
    },
    side: {
      LEFT: 'Esquerdo',
      RIGHT: 'Direito',
    },
    face: {
      BACK: 'Traseira',
      FRONT: 'Frontal',
    },
  } as Record<string, Record<string, string>>

  const localTraumasCriadosClasses = {
    noTraumas: classNames({
      'h-24 justify-center rounded-lg border border-slate-400':
        !localTraumas.length,
      'hidden ': localTraumas.length,
    }),
    traumasList: classNames({
      'hidden ': !localTraumas.length,
    }),
  }

  const toast = useToast()

  async function handleDeleteLocalTrauma(id: number) {
    if (!id) return
    const { success } = await deleteLocalTraumas(id)

    if (success) {
      setLocalTraumas(localTraumas.filter((trauma) => trauma.id !== id))

      toast.show({
        description: 'Trauma deletado com sucesso.',
        duration: 3000,
        placement: 'bottom',
        style: { backgroundColor: '#F00' },
      })
    } else {
      toast.show({
        description: 'Falha na exclusão do trauma...',
        duration: 3000,
        placement: 'bottom',
        style: { backgroundColor: '#F00' },
      })
    }
  }

  return (
    <View style={s.boxShadow} className="mx-auto px-4">
      <Text className="mb-2 text-xl font-bold">Trauma Cadastrados</Text>
      <View className={localTraumasCriadosClasses.noTraumas}>
        <Text className="mt-[-5] text-center text-xl text-slate-600">
          Nenhum traumas criado...
        </Text>
        <Text className="text-md text-center text-black">
          Clique no corpo e selecione o local e o tipo!
        </Text>
      </View>
      <View className={localTraumasCriadosClasses.traumasList}>
        {localTraumas?.map((trauma, i) => {
          const bodyPart = tipoTraumaMapping.bodyPart[trauma.bodyPart]
          const tipo = tipoTraumaMapping.tipo[trauma.tipo]
          const side = tipoTraumaMapping.side[trauma.side]
          const face = tipoTraumaMapping.face[trauma.face]

          return (
            <View
              className="my-2 grow flex-row justify-between rounded-md border p-2"
              key={i}
            >
              <View>
                <View className="flex-row justify-between">
                  <Text className="mr-3 font-bold">{bodyPart}</Text>
                </View>
                <View className="flex-row justify-between">
                  <Text className="mr-3 font-bold">{tipo}</Text>
                </View>
                <View className="flex-row justify-between">
                  <Text className="mr-3 font-bold">{side}</Text>
                </View>
                <View className="flex-row justify-between">
                  <Text className="mr-3 font-bold">{face}</Text>
                </View>
              </View>
              <View className="justify-between">
                <TouchableOpacity
                  className="w-20 rounded-lg bg-slate-400 py-2"
                  onPress={() => {}}
                >
                  <Text className="text-md text-center font-bold text-white">
                    Ver
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className="w-20 rounded-lg bg-red-700 py-2"
                  onPress={() => handleDeleteLocalTrauma(trauma.id)}
                >
                  <Text className="text-md text-center font-bold text-white">
                    Apagar
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )
        })}
      </View>
    </View>
  )
}
