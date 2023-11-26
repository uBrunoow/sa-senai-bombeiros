type UMaterialDescartaveisNames =
  | 'ATADURAS'
  | 'CATETER_TP_OCULOS'
  | 'COMPRESSORA_COMUM'
  | 'KITS'
  | 'LUVAS_DESC_PARES'
  | 'MASCARA_DESC'
  | 'MANTA_ALUMINIZADA'
  | 'PAS_DO_DEA'
  | 'SONDA_DE_ASPIRACAO'
  | 'SORO_FISIOLOGICO'
  | 'TALAS_PAP'

type UMaterialDeixadoNoHospitalNames =
  | 'BASE_DO_ESTABILIZA'
  | 'COLAR'
  | 'COXINS_ESTABILIZA'
  | 'KED'
  | 'MACA_RIGIDA'
  | 'TTF'
  | 'TIRANTE_ARANHA'
  | 'TIRANTE_DE_CABECA'
  | 'CANULA'

export type TMaterialUtilizadoDescartavelTypes = {
  // eslint-disable-next-line no-unused-vars
  [key in UMaterialDescartaveisNames]: {
    state: boolean
    name: string
    quantity: number
    sizes?: {
      selectedSize: string | null
      entries: string[]
    }
  }
}

export type TMaterialDeixadoNoHostpitalTypes = {
  // eslint-disable-next-line no-unused-vars
  [key in UMaterialDeixadoNoHospitalNames]: {
    state: boolean
    name: string
    quantity: number
    sizes?: {
      selectedSize: string | null
      entries: string[]
    }
  }
}

export const MaterialUtilizadoDescartavelDef: TMaterialUtilizadoDescartavelTypes =
  {
    ATADURAS: {
      state: false,
      name: 'Ataduras',
      quantity: 0,
      sizes: {
        selectedSize: null,
        entries: ['8', '12', '20'],
      },
    },
    CATETER_TP_OCULOS: {
      state: false,
      name: 'Cateter TP. ocúlos',
      quantity: 0,
    },
    COMPRESSORA_COMUM: {
      state: false,
      name: 'Compressora comum',
      quantity: 0,
    },
    KITS: {
      state: false,
      name: 'Kits',
      quantity: 0,
      sizes: {
        selectedSize: null,
        entries: ['H', 'P', 'Q'],
      },
    },
    LUVAS_DESC_PARES: {
      state: false,
      name: 'Luvas DESC. pares',
      quantity: 0,
      sizes: {
        selectedSize: null,
        entries: ['H', 'P', 'Q'],
      },
    },
    MASCARA_DESC: {
      state: false,
      name: 'Máscara DESC.',
      quantity: 0,
    },
    MANTA_ALUMINIZADA: {
      state: false,
      name: 'Manta aluminizada',
      quantity: 0,
    },
    PAS_DO_DEA: {
      state: false,
      name: 'Pás do dea',
      quantity: 0,
    },
    SONDA_DE_ASPIRACAO: {
      state: false,
      name: 'Sonda de Aspiração',
      quantity: 0,
    },
    SORO_FISIOLOGICO: {
      state: false,
      name: 'Soro Fisiológico',
      quantity: 0,
    },
    TALAS_PAP: {
      state: false,
      name: 'Talas Pap.',
      quantity: 0,
      sizes: {
        selectedSize: null,
        entries: ['P', 'G'],
      },
    },
  }

export const MaterialDeixadoNoHostpitalDef: TMaterialDeixadoNoHostpitalTypes = {
  BASE_DO_ESTABILIZA: {
    state: false,
    name: 'Base do estabiliza',
    quantity: 0,
  },
  COLAR: {
    state: false,
    name: 'Colar',
    quantity: 0,
    sizes: {
      selectedSize: null,
      entries: ['M', 'G'],
    },
  },
  COXINS_ESTABILIZA: {
    state: false,
    name: 'Coxins estabiliza',
    quantity: 0,
  },
  KED: {
    state: false,
    name: 'KED',
    quantity: 0,
    sizes: {
      selectedSize: null,
      entries: ['ADULT', 'INFA'],
    },
  },
  MACA_RIGIDA: {
    state: false,
    name: 'Maca rígida',
    quantity: 0,
  },
  TTF: {
    state: false,
    name: 'T.T.F',
    quantity: 0,
    sizes: {
      selectedSize: null,
      entries: ['ADULT', 'INFA'],
    },
  },
  TIRANTE_ARANHA: {
    state: false,
    name: 'Tirante aranha',
    quantity: 0,
  },
  TIRANTE_DE_CABECA: {
    state: false,
    name: 'Tirante de cabeça',
    quantity: 0,
  },
  CANULA: {
    state: false,
    name: 'Cânula',
    quantity: 0,
  },
}
