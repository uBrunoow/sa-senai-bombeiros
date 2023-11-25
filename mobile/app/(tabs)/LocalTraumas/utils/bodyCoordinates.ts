import { TBodyCoordinates } from '../interfaces/TBodyCoordinates'

const bodyCoordinates: TBodyCoordinates = {
  Glúteos: {
    coords: {
      tl: { x: 201, y: 180 },
      br: { x: 260, y: 205 },
    },
    side: null,
    face: 'BACK',
    local: 'GLUTEOS',
  },
  'Antebraço direito frontal': {
    coords: {
      tl: { x: 24, y: 149 },
      br: { x: 40, y: 186 },
    },
    side: 'RIGHT',
    face: 'FRONT',
    local: 'ANTEBRACO',
  },
  'Antebraço esquerdo traseiro': {
    coords: {
      tl: { x: 182, y: 149 },
      br: { x: 205, y: 190 },
    },
    side: 'LEFT',
    face: 'BACK',
    local: 'ANTEBRACO',
  },
  'Antebraço esquerdo frontal': {
    coords: {
      tl: { x: 117, y: 153 },
      br: { x: 142, y: 190 },
    },
    side: 'LEFT',
    face: 'FRONT',
    local: 'ANTEBRACO',
  },
  'Antebraço direito Traseiro': {
    coords: {
      tl: { x: 276, y: 149 },
      br: { x: 299, y: 184 },
    },
    side: 'RIGHT',
    face: 'BACK',
    local: 'ANTEBRACO',
  },
  'Braço esquerdo frontal': {
    coords: {
      tl: { x: 113, y: 113 },
      br: { x: 133, y: 143 },
    },
    side: 'LEFT',
    face: 'FRONT',
    local: 'BRACO',
  },
  'Braço esquerdo traseiro': {
    coords: {
      tl: { x: 188, y: 107 },
      br: { x: 209, y: 140 },
    },
    side: 'LEFT',
    face: 'BACK',
    local: 'BRACO',
  },
  'Braço direito frontal': {
    coords: {
      tl: { x: 29, y: 113 },
      br: { x: 45, y: 144 },
    },
    side: 'RIGHT',
    face: 'FRONT',
    local: 'BRACO',
  },
  'Braço direito traseiro': {
    coords: {
      tl: { x: 2273, y: 106 },
      br: { x: 295, y: 142 },
    },
    side: 'RIGHT',
    face: 'BACK',
    local: 'BRACO',
  },
  'Pecoço frontal': {
    coords: {
      tl: { x: 59, y: 71 },
      br: { x: 103, y: 84 },
    },
    side: null,
    face: 'FRONT',
    local: 'PESCOCO',
  },
  'Pescoço traseiro': {
    coords: {
      tl: { x: 208, y: 68 },
      br: { x: 256, y: 81 },
    },
    side: null,
    face: 'BACK',
    local: 'PESCOCO',
  },
  Costas: {
    coords: {
      tl: { x: 202, y: 107 },
      br: { x: 268, y: 167 },
    },
    side: null,
    face: 'BACK',
    local: 'COSTAS',
  },
  Abdomên: {
    coords: {
      tl: { x: 53, y: 137 },
      br: { x: 109, y: 164 },
    },
    side: null,
    face: 'FRONT',
    local: 'ABDOMEN',
  },
  Peito: {
    coords: {
      tl: { x: 50, y: 103 },
      br: { x: 105, y: 125 },
    },
    side: null,
    face: 'FRONT',
    local: 'PEITO',
  },
  'Ombro Direito Frontal': {
    coords: {
      tl: { x: 29, y: 92 },
      br: { x: 46, y: 119 },
    },
    side: 'RIGHT',
    face: 'FRONT',
    local: 'OMBRO',
  },
  'Ombro Esquerdo Frontal': {
    coords: {
      tl: { x: 107, y: 89 },
      br: { x: 129, y: 121 },
    },
    side: 'LEFT',
    face: 'FRONT',
    local: 'OMBRO',
  },
  'Ombro Esquerdo Traseiro': {
    coords: {
      tl: { x: 191, y: 87 },
      br: { x: 209, y: 103 },
    },
    side: 'LEFT',
    face: 'BACK',
    local: 'OMBRO',
  },
  'Coxa Frontal Direita': {
    coords: {
      tl: { x: 48, y: 206 },
      br: { x: 73, y: 241 },
    },
    side: 'RIGHT',
    face: 'FRONT',
    local: 'COXA',
  },
  'Coxa Frontal Esquerda': {
    coords: {
      tl: { x: 81, y: 211 },
      br: { x: 111, y: 255 },
    },
    side: 'LEFT',
    face: 'FRONT',
    local: 'COXA',
  },
  'Joelho Direito': {
    coords: {
      tl: { x: 54, y: 263 },
      br: { x: 70, y: 273 },
    },
    side: 'RIGHT',
    face: null,
    local: 'JOELHO',
  },
  'Joelho Esquerdo': {
    coords: {
      tl: { x: 86, y: 265 },
      br: { x: 100, y: 271 },
    },
    side: 'LEFT',
    face: null,
    local: 'JOELHO',
  },
  'Perna Frontal Direita': {
    coords: {
      tl: { x: 46, y: 273 },
      br: { x: 73, y: 323 },
    },
    side: 'RIGHT',
    face: 'FRONT',
    local: 'PERNA',
  },
  'Perna Frontal Esquerda': {
    coords: {
      tl: { x: 84, y: 284 },
      br: { x: 107, y: 335 },
    },
    side: 'LEFT',
    face: 'FRONT',
    local: 'PERNA',
  },
  'Pé Esquerdo': {
    coords: {
      tl: { x: 84, y: 284 },
      br: { x: 107, y: 335 },
    },
    side: 'LEFT',
    face: 'FRONT',
    local: 'PE',
  },
  'Pé Direito': {
    coords: {
      tl: { x: 84, y: 284 },
      br: { x: 107, y: 335 },
    },
    side: 'LEFT',
    face: 'FRONT',
    local: 'PE',
  },
}

export default bodyCoordinates
