import { View, Text, ScrollView, SafeAreaView } from 'react-native'
import React from 'react'
import Header from '../../components/Header'
import Title from '../../components/Title'
import Footer from '../../components/Footer'
import { styles as s } from '../../styles/boxShadow'
import Subtitle from '@app/components/Subtitle'
import InputLowPadding from '@app/components/InputLowPadding'
import UsageTable from './components/UsageTable'

export default function Ocorrencia() {
  return (
    <SafeAreaView>
      <ScrollView>
        <View>
          <Header />
          <Title iconName="ambulance" title="Informações Hospitalares" />
          <Subtitle content="Equipe de Atendimento" />
          <View style={s.boxShadow} className="mx-auto">
            <View className="flex-row">
              <InputLowPadding alignText="left" title="Médico" />
              <InputLowPadding alignText="left" title="S1" />
            </View>
            <View className="flex-row">
              <InputLowPadding alignText="left" title="S2" />
              <InputLowPadding alignText="left" title="S3" />
            </View>
            <View className="flex-row">
              <InputLowPadding alignText="left" title="Demandante" />
              <InputLowPadding alignText="left" title="Equipe" />
            </View>
          </View>
          <Subtitle content="Procedimentos efetuados" />
          <View style={s.boxShadow} className="mx-auto">
            <Text className="text-base font-medium">
              Principais procedimentos
            </Text>
            <Text>
              (aval. inicial, compressivo, limpeza de ferimento, curativos,
              imobilizações, membro inf/sup/esq/dir, maca rígida, maca sobre
              rodas, retirado capacete, rolamento 90°, rolamento 180°)
            </Text>
            <Text className="text-base font-medium">Outros procedimentos</Text>
            <Text>
              (Aspiração, aval. dirigida, aval. continuada, chave de rautek,
              cânula de guedel, desobstrução de V. A., emprego do D.E.A., Geren.
              de riscos, encravamento, ocular, queimadura, simples, 3 pontas,
              quadril, cervical, ponte, R.C.P., tomada decisão, tratado choque,
              uso de cânula, uso colar, uso KED, uso TTF, ventilação suporte,
              oxigenoterapia (LPM), reanimador (LPM), meios auxiliares, celesc,
              def. civil, IGPPC, samu, usa, sub, cit, policia civil, policia
              militar, PRE, PRF, outro)
            </Text>
          </View>
          <Subtitle content="Materiais utilizados" />
          <View style={s.boxShadow} className="mx-auto">
            <Text className="text-base font-medium">
              Materiais Descartáveis
            </Text>
            <Text>
              Ataduras (8, 12, 20),cateter TP. óculos, compressa comum, hits (H,
              P, Q), luvas descartáveis (par), máscara desc., manta aluminizada,
              pás do dea, sonda de aspiração, soro fisiológico, talas pap. (P,
              G), outro
            </Text>
            <Text className="text-base font-medium">
              Materiais deixados no Hospital
            </Text>
            <Text>
              Base to estabilizador, colar (N, PP, P, M, G, outro), coxins
              estabilizadores, KED (adulto, infantil), maca rígida, T.T.F.
              (adulto, infantil), tirante aranha, tirande de cabeça, cânula,
              outro
            </Text>
          </View>
          <UsageTable
            rows={[
              {
                material: 'Mano',
                quantity: 1,
                sizes: ['gg', 'md', 'm'],
              },
              {
                material: 'Manin',
                quantity: 11,
              },
              {
                material: 'Man',
                quantity: 2,
              },
            ]}
          />
          <Footer />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
