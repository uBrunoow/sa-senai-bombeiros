export type TBodyCoordinates = {
  // eslint-disable-next-line no-unused-vars
  [key in
    | 'Glúteos'
    | 'Costas'
    | 'Abdomên'
    | 'Peito'
    | 'Cabeça Frontal'
    | 'Cabeça Traseira'
    | 'Antebraço direito frontal'
    | 'Antebraço esquerdo traseiro'
    | 'Antebraço esquerdo frontal'
    | 'Antebraço direito Traseiro'
    | 'Braço esquerdo frontal'
    | 'Braço esquerdo traseiro'
    | 'Braço direito frontal'
    | 'Braço direito traseiro'
    | 'Pecoço frontal'
    | 'Pescoço traseiro'
    | 'Ombro Direito Frontal'
    | 'Ombro Esquerdo Frontal'
    | 'Ombro Esquerdo Traseiro'
    | 'Ombro Direito Traseiro'
    | 'Coxa Frontal Direita'
    | 'Coxa Frontal Esquerda'
    | 'Coxa Traseira Esquerda'
    | 'Coxa Traseira Direita'
    | 'Joelho Direito'
    | 'Joelho Esquerdo'
    | 'Perna Frontal Direita'
    | 'Perna Frontal Esquerda'
    | 'Perna Traseira Esquerda'
    | 'Perna Traseira Direita'
    | 'Pé Esquerdo'
    | 'Pé Direito'
    | 'Calcanhar Direito'
    | 'Calcanhar Esquerdo'
    | 'Virilha'
    | 'Palma da Mão Esquerda'
    | 'Palma da Mão Direita'
    | 'Mão Esquerda'
    | 'Mão Direita']: {
    coords: {
      tl: {
        x: number
        y: number
      }
      br: {
        x: number
        y: number
      }
    }
    side: 'LEFT' | 'RIGHT' | null
    face: 'FRONT' | 'BACK' | null
    local:
      | 'ABDOMEN'
      | 'ANTEBRACO'
      | 'BRACO'
      | 'CABECA'
      | 'COSTAS'
      | 'COXA'
      | 'GLUTEOS'
      | 'JOELHO'
      | 'OMBRO'
      | 'PEITO'
      | 'PERNA'
      | 'PESCOCO'
      | 'PE'
      | 'VIRILHA'
      | 'CALCANHAR'
      | 'MAO'
  }
}
