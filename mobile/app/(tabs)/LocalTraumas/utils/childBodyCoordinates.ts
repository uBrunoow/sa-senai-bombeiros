import { TBodyCoordinates } from '../interfaces/TBodyCoordinates'

// TODO: Terminar as coordenadas da criança
const bodyCoordinates: TBodyCoordinates = {
  Glúteos: {
    coords: {
      tl: { x: 203, y: 243 },
      br: { x: 273, y: 270 },
    },
    side: null,
    face: 'BACK',
    local: 'GLUTEOS',
  },
  'Cabeça Frontal': {
    coords: {
      tl: { x: 47, y: 69 },
      br: { x: 105, y: 127 },
    },
    side: null,
    face: 'FRONT',
    local: 'CABECA',
  },
  'Cabeça Traseira': {
    coords: {
      tl: { x: 196, y: 71 },
      br: { x: 256, y: 136 },
    },
    side: null,
    face: 'BACK',
    local: 'GLUTEOS',
  },
  'Braço direito traseiro': {
    coords: {
      tl: { x: 273, y: 153 },
      br: { x: 297, y: 196 },
    },
    side: 'RIGHT',
    face: 'BACK',
    local: 'BRACO',
  },
  'Braço esquerdo frontal': {
    coords: {
      tl: { x: 111, y: 152 },
      br: { x: 138, y: 199 },
    },
    side: 'LEFT',
    face: 'FRONT',
    local: 'BRACO',
  },
  'Braço direito frontal': {
    coords: {
      tl: { x: 22, y: 157 },
      br: { x: 42, y: 204 },
    },
    side: 'RIGHT',
    face: 'FRONT',
    local: 'BRACO',
  },
  'Braço esquerdo traseiro': {
    coords: {
      tl: { x: 177, y: 157 },
      br: { x: 201, y: 204 },
    },
    side: 'LEFT',
    face: 'BACK',
    local: 'BRACO',
  },
  'Antebraço direito frontal': {
    coords: {
      tl: { x: 15, y: 199 },
      br: { x: 33, y: 237 },
    },
    side: 'RIGHT',
    face: 'FRONT',
    local: 'ANTEBRACO',
  },
  'Antebraço esquerdo frontal': {
    coords: {
      tl: { x: 119, y: 210 },
      br: { x: 143, y: 238 },
    },
    side: 'LEFT',
    face: 'FRONT',
    local: 'ANTEBRACO',
  },
  'Antebraço esquerdo traseiro': {
    coords: {
      tl: { x: 176, y: 205 },
      br: { x: 193, y: 235 },
    },
    side: 'LEFT',
    face: 'BACK',
    local: 'ANTEBRACO',
  },
  'Antebraço direito Traseiro': {
    coords: {
      tl: { x: 279, y: 202 },
      br: { x: 302, y: 238 },
    },
    side: 'RIGHT',
    face: 'BACK',
    local: 'ANTEBRACO',
  },
  Costas: {
    coords: {
      tl: { x: 203, y: 147 },
      br: { x: 270, y: 230 },
    },
    side: null,
    face: 'BACK',
    local: 'COSTAS',
  },
  Peito: {
    coords: {
      tl: { x: 41, y: 152 },
      br: { x: 108, y: 196 },
    },
    side: null,
    face: 'FRONT',
    local: 'PEITO',
  },
  'Perna Frontal Direita': {
    coords: {
      tl: { x: 47, y: 318 },
      br: { x: 72, y: 372 },
    },
    side: 'RIGHT',
    face: 'FRONT',
    local: 'PERNA',
  },
  'Perna Frontal Esquerda': {
    coords: {
      tl: { x: 81, y: 322 },
      br: { x: 107, y: 371 },
    },
    side: 'LEFT',
    face: 'FRONT',
    local: 'PERNA',
  },
  'Perna Traseira Direita': {
    coords: {
      tl: { x: 245, y: 327 },
      br: { x: 271, y: 371 },
    },
    side: 'RIGHT',
    face: 'FRONT',
    local: 'PERNA',
  },
  'Perna Traseira Esquerda': {
    coords: {
      tl: { x: 201, y: 318 },
      br: { x: 231, y: 372 },
    },
    side: 'LEFT',
    face: 'FRONT',
    local: 'PERNA',
  },
  'Coxa Frontal Direita': {
    coords: {
      tl: { x: 42, y: 272 },
      br: { x: 77, y: 307 },
    },
    side: 'RIGHT',
    face: 'FRONT',
    local: 'COXA',
  },
  'Coxa Frontal Esquerda': {
    coords: {
      tl: { x: 81, y: 272 },
      br: { x: 107, y: 313 },
    },
    side: 'LEFT',
    face: 'FRONT',
    local: 'COXA',
  },
  'Coxa Traseira Direita': {
    coords: {
      tl: { x: 243, y: 272 },
      br: { x: 271, y: 371 },
    },
    side: 'RIGHT',
    face: 'FRONT',
    local: 'COXA',
  },
  'Coxa Traseira Esquerda': {
    coords: {
      tl: { x: 201, y: 273 },
      br: { x: 231, y: 318 },
    },
    side: 'LEFT',
    face: 'FRONT',
    local: 'COXA',
  },
}

export default bodyCoordinates
