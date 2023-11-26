type UProcedimentosEfetuadosNames =
  | 'ASPIRACAO'
  | 'AVALIACAO_INICIAL'
  | 'AVALIACAO_DIRIGIDA'
  | 'AVALIACAO_CONTINUADA'
  | 'CHAVE_DE_RAUTEK'
  | 'CANULA_DE_GUEDEL'
  | 'DESOBSTRUCAO_DE_VA'
  | 'EMPREGO_DO_DEA'
  | 'GERENCIAMENTO_DE_RISCOS'
  | 'LIMPEZA_DE_FERIMENTO'
  | 'CURATIVOS'
  | 'COMPRESSIVO'
  | 'ENCRAVAMENTO'
  | 'OCULAR'
  | 'QUEIMADURA'
  | 'SIMPLES'
  | 'THREE_PONTAS'
  | 'IMOBILIZACOES'
  | 'MEMBRO_INF_DIR'
  | 'MEMBRO_INF_ESQ'
  | 'MEMBRO_SUP_DIR'
  | 'MEMBRO_SUP_ESQ'
  | 'QUADRIL'
  | 'CERVICAL'
  | 'MACA_SOBRE_RODAS'
  | 'MACA_RÍGIDA'
  | 'PONTE'
  | 'RETIRADO_CAPACETE'
  | 'RCP'
  | 'ROLAMENTO_90'
  | 'ROLAMENTO_180'
  | 'ROLAMENTO_180'
  | 'TOMADA_DECISAO'
  | 'TRATADO_CHOQUE'
  | 'USO_DE_CANULA'
  | 'USO_COLAR_TAM'
  | 'USO_KED'
  | 'USO_TTF'
  | 'VENTILACAO_SUPORTE'
  | 'OXIGENOTERAPIA'
  | 'REANIMADOR'
  | 'MEIOS_AUXILIARES'
  | 'CELESC'
  | 'DEF_CIVIL'
  | 'IGP_PC'
  | 'SAMU'
  | 'CIT'
  | 'POLICIA'
  | 'ANOTHER'

export type TProcedimentosEfetuadosTypes = {
  // eslint-disable-next-line no-unused-vars
  [key in UProcedimentosEfetuadosNames]: {
    state: boolean
    name: string
    sizes?: string | null
    LPM?: number
    options?: {
      state: boolean
      option: string
    }[]
  }
}

export const ProcedimentosEfetuadosDef: TProcedimentosEfetuadosTypes = {
  ASPIRACAO: {
    state: false,
    name: 'Aspiração',
  },
  AVALIACAO_INICIAL: {
    state: false,
    name: 'Avaliação inicial',
  },
  AVALIACAO_DIRIGIDA: {
    state: false,
    name: 'Avaliação dirigida',
  },
  AVALIACAO_CONTINUADA: {
    state: false,
    name: 'Avaliação continuada',
  },
  CHAVE_DE_RAUTEK: {
    state: false,
    name: 'Chave de rautek',
  },
  CANULA_DE_GUEDEL: {
    state: false,
    name: 'Cânula de guedel',
  },
  DESOBSTRUCAO_DE_VA: {
    state: false,
    name: 'Desobstrução de VA',
  },
  EMPREGO_DO_DEA: {
    state: false,
    name: 'Emprego do D.E.A',
  },
  GERENCIAMENTO_DE_RISCOS: {
    state: false,
    name: 'Gerenciamento de riscos',
  },
  LIMPEZA_DE_FERIMENTO: {
    state: false,
    name: 'Limpeza de ferimento',
  },
  CURATIVOS: {
    state: false,
    name: 'Curativos',
  },
  COMPRESSIVO: {
    state: false,
    name: 'Compressivo',
  },
  ENCRAVAMENTO: {
    state: false,
    name: 'Encravamento',
  },
  OCULAR: {
    state: false,
    name: 'Ocular',
  },
  QUEIMADURA: {
    state: false,
    name: 'Queimadura',
  },
  SIMPLES: {
    state: false,
    name: 'Simples',
  },
  THREE_PONTAS: {
    state: false,
    name: '3 pontas',
  },
  IMOBILIZACOES: {
    state: false,
    name: 'Imobilização',
  },
  MEMBRO_INF_DIR: {
    state: false,
    name: 'Membro INF. DIR.',
  },
  MEMBRO_INF_ESQ: {
    state: false,
    name: 'Membro INF. ESQ.',
  },
  MEMBRO_SUP_DIR: {
    state: false,
    name: 'Membro SUP. DIR.',
  },
  MEMBRO_SUP_ESQ: {
    state: false,
    name: 'Membro SUP. ESQ.',
  },
  QUADRIL: {
    state: false,
    name: 'Quadril',
  },
  CERVICAL: {
    state: false,
    name: 'Cervical',
  },
  MACA_SOBRE_RODAS: {
    state: false,
    name: 'Maca sobre rodas',
  },
  MACA_RÍGIDA: {
    state: false,
    name: 'Maca rígida',
  },
  PONTE: {
    state: false,
    name: 'Ponte',
  },
  RETIRADO_CAPACETE: {
    state: false,
    name: 'Retirado capacete',
  },
  RCP: {
    state: false,
    name: 'R.C.P',
  },
  ROLAMENTO_90: {
    state: false,
    name: 'Rolamento 90°',
  },
  ROLAMENTO_180: {
    state: false,
    name: 'Rolamento 180°',
  },
  TOMADA_DECISAO: {
    state: false,
    name: 'Tomada decisão',
  },
  TRATADO_CHOQUE: {
    state: false,
    name: 'Tratado choque',
  },
  USO_DE_CANULA: {
    state: false,
    name: 'Uso de cânula',
  },
  USO_COLAR_TAM: {
    state: false,
    name: 'Ponte',
    sizes: null,
  },
  USO_KED: {
    state: false,
    name: 'Uso KED',
  },
  USO_TTF: {
    state: false,
    name: 'Uso TTF',
  },
  VENTILACAO_SUPORTE: {
    state: false,
    name: 'Ventilação suporte',
  },
  OXIGENOTERAPIA: {
    state: false,
    name: 'Oxigenoterapia',
    LPM: 0,
  },
  REANIMADOR: {
    state: false,
    name: 'Reanimador',
    LPM: 0,
  },
  MEIOS_AUXILIARES: {
    state: false,
    name: 'Meios auxiliares',
  },
  CELESC: {
    state: false,
    name: 'CELESC',
  },
  DEF_CIVIL: {
    state: false,
    name: 'Def. civil',
  },
  IGP_PC: {
    state: false,
    name: 'IGP / PC',
  },
  SAMU: {
    state: false,
    name: 'Samu',
    options: [
      {
        state: false,
        option: 'USA',
      },
      {
        state: false,
        option: 'USB',
      },
    ],
  },
  CIT: {
    state: false,
    name: 'CIT',
  },
  POLICIA: {
    state: false,
    name: 'Polícia',
    options: [
      {
        state: false,
        option: 'Civil',
      },
      {
        state: false,
        option: 'Militar',
      },
      {
        state: false,
        option: 'PRE',
      },
      {
        state: false,
        option: 'PRF',
      },
    ],
  },
  ANOTHER: {
    state: false,
    name: 'Outro',
  },
}
