export const getAberturaOcularGlasgowText = (value: number) => {
  switch (value) {
    case 1:
      return 'Nenhuma'
    case 2:
      return 'Estímulo doloroso'
    case 3:
      return 'Comando verbal'
    case 4:
      return 'Espontânea'

    default:
      return 'Não especificado'
  }
}
export const getRespostaVerbalGlasgowText = (value: number) => {
  switch (value) {
    case 1:
      return 'Nenhuma'
    case 2:
      return 'Palavras incompreensíveis'
    case 3:
      return 'Palavras inapropriadas'
    case 4:
      return 'Confuso'
    case 5:
      return 'Orientado'

    default:
      return 'Não especificado'
  }
}
export const getRespostaMotoraGlasgowText = (value: number) => {
  switch (value) {
    case 1:
      return 'Nenhuma'
    case 2:
      return 'Extensão anormal'
    case 3:
      return 'Flexão anormal'
    case 4:
      return 'Moviemento de retirada'
    case 5:
      return 'Localiza dor'
    case 6:
      return 'Obedece comandos'

    default:
      return 'Não especificado'
  }
}
