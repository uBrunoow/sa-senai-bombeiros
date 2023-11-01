import { View, Text, TouchableOpacity } from 'react-native'
import { styles as s } from '@app/styles/boxShadow'
import { ILocalTraumas } from '@src/interfaces/IReport'
import classNames from 'classnames'

type CreatedTraumasProps = {
  localTraumas: ILocalTraumas[]
}

export default function CreatedTraumas({ localTraumas }: CreatedTraumasProps) {
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

  const localTraumasCriadosClasses = classNames({
    'p-4 mx-auto': localTraumas.length,
    'hidden ': !localTraumas.length,
  })

  return (
    <View style={s.boxShadow} className={localTraumasCriadosClasses}>
      {localTraumas?.map((trauma, i) => {
        const bodyPart = tipoTraumaMapping.bodyPart[trauma.bodyPart]
        const tipo = tipoTraumaMapping.tipo[trauma.tipo]
        const side = tipoTraumaMapping.side[trauma.side]
        const face = tipoTraumaMapping.face[trauma.face]

        return (
          <View className="grow flex-row border p-2" key={`${i}${trauma.id}`}>
            <View>
              <View className="flex-row justify-between">
                <Text>Parte do Corpo:</Text>
                <Text>{bodyPart}</Text>
              </View>
              <View className="flex-row justify-between">
                <Text>Tipo de Ferimento:</Text>
                <Text>{tipo}</Text>
              </View>
              <View className="flex-row justify-between">
                <Text>Lado do Trauma:</Text>
                <Text>{side}</Text>
              </View>
              <View className="flex-row justify-between">
                <Text>Face do Trauma:</Text>
                <Text>{face}</Text>
              </View>
            </View>
            <View>
              <TouchableOpacity>
                <Text>Ver</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text>Apagar</Text>
              </TouchableOpacity>
            </View>
          </View>
        )
      })}
    </View>
  )
}
