import { TipoDeFerimento } from '@app/(tabs)/LocalTraumas/utils/TipoDeFerimento'

export function obterDescricaoTipo(tipo: string): string {
  const descricao =
    TipoDeFerimento.object[tipo as keyof typeof TipoDeFerimento.object]
  return descricao || tipo
}
