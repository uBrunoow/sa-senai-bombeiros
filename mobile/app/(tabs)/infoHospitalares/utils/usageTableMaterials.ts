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
      sizes: {
        selectedSize: null,
        entries: ['8', '12', '20'],
      },
    },
    CATETER_TP_OCULOS: {
      state: false,
      name: 'Cateter TP. ocúlos',
    },
    COMPRESSORA_COMUM: {
      state: false,
      name: 'Compressora comum',
    },
    KITS: {
      state: false,
      name: 'Kits',
      sizes: {
        selectedSize: null,
        entries: ['H', 'P', 'Q'],
      },
    },
    LUVAS_DESC_PARES: {
      state: false,
      name: 'Luvas DESC. pares',
      sizes: {
        selectedSize: null,
        entries: ['H', 'P', 'Q'],
      },
    },
    MASCARA_DESC: {
      state: false,
      name: 'Máscara DESC.',
    },
    MANTA_ALUMINIZADA: {
      state: false,
      name: 'Manta aluminizada',
    },
    PAS_DO_DEA: {
      state: false,
      name: 'Pás do dea',
    },
    SONDA_DE_ASPIRACAO: {
      state: false,
      name: 'Sonda de Aspiração',
    },
    SORO_FISIOLOGICO: {
      state: false,
      name: 'Soro Fisiológico',
    },
    TALAS_PAP: {
      state: false,
      name: 'Talas Pap.',
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
  },
  COLAR: {
    state: false,
    name: 'Colar',
    sizes: {
      selectedSize: null,
      entries: ['M', 'G'],
    },
  },
  COXINS_ESTABILIZA: {
    state: false,
    name: 'Coxins estabiliza',
  },
  KED: {
    state: false,
    name: 'KED',
    sizes: {
      selectedSize: null,
      entries: ['ADULT', 'INFA'],
    },
  },
  MACA_RIGIDA: {
    state: false,
    name: 'Maca rígida',
  },
  TTF: {
    state: false,
    name: 'T.T.F',
    sizes: {
      selectedSize: null,
      entries: ['ADULT', 'INFA'],
    },
  },
  TIRANTE_ARANHA: {
    state: false,
    name: 'Tirante aranha',
  },
  TIRANTE_DE_CABECA: {
    state: false,
    name: 'Tirante de cabeça',
  },
  CANULA: {
    state: false,
    name: 'Cânula',
  },
}
