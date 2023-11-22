import { TBodyCoordinates } from '../interfaces/TBodyCoordinates'

// TODO: Terminar as coordenadas da criança
const bodyCoordinates: TBodyCoordinates = {
  Glúteos: {
    coords: {
      tl: { x: 195, y: 233 },
      br: { x: 260, y: 271 },
    },
    side: null,
    face: 'BACK',
    local: 'GLUTEOS',
  },
  'Cabeça Frontal': {
    coords: {
      tl: { x: 41, y: 69 },
      br: { x: 102, y: 134 },
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
  'Braço direito frontal': {
    coords: {
      tl: { x: 16, y: 162 },
      br: { x: 41, y: 210 },
    },
    side: 'RIGHT',
    face: 'FRONT',
    local: 'GLUTEOS',
  },
}

export default bodyCoordinates
