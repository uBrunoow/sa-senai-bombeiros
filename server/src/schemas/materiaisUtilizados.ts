import { z } from 'zod'

export const registerInfosHospitalares = z.object({
  reportId: z.number(),
  Doctor: z.string().optional(),
  S1: z.string().optional(),
  S2: z.string().optional(),
  S3: z.string().optional(),
  Demandant: z.string().optional(),
  TeamUp: z.string().optional(),
  ProcedimentosEfetuados: z
    .object({
      state: z.boolean().nullable().optional(),
      name: z
        .enum([
          'Aspiração',
          'AVALIACAO_INICIAL',
          'AVALIACAO_DIRIGIDA',
          'AVALIACAO_CONTINUADA',
          'CHAVE_DE_RAUTEK',
          'CANULA_DE_GUEDEL',
          'DESOBSTRUCAO_DE_VA',
          'EMPREGO_DO_DEA',
          'GERENCIAMENTO_DE_RISCOS',
          'LIMPEZA_DE_FERIMENTO',
          'CURATIVOS',
          'COMPRESSIVO',
          'ENCRAVAMENTO',
          'OCULAR',
          'QUEIMADURA',
          'SIMPLES',
          'THREE_PONTAS',
          'IMOBILIZACOES',
          'MEMBRO_INF_DIR',
          'MEMBRO_INF_ESQ',
          'MEMBRO_SUP_DIR',
          'MEMBRO_SUP_ESQ',
          'QUADRIL',
          'CERVICAL',
          'MACA_SOBRE_RODAS',
          'MACA_RIGIDA',
          'PONTE',
          'RETIRADO_CAPACETE',
          'RCP',
          'ROLAMENTO_90',
          'ROLAMENTO_180',
          'TOMADA_DECISAO',
          'TRATADO_CHOQUE',
          'USO_DE_CANULA',
          'USO_KED',
          'USO_TTF',
          'VENTILACAO_SUPORTE',
          'MEIOS_AUXILIARES',
          'CELESC',
          'DEF_CIVIL',
          'IGP_PC',
          'CIT',
          'ANOTHER',
          'USO_COLAR_TAM',
          'OXIGENOTERAPIA',
          'REANIMADOR',
          'SAMU',
          'Policia',
        ])
        .optional(),
      sizes: z.string().nullable().default(null).optional(),
      LPM: z.number().nullable().default(null).optional(),
      options: z.array(z.string()).default(['']).optional(),
    })
    .optional()
    .nullable(),
  MateriaisDescartaveis: z
    .object({
      state: z.boolean().nullable().optional(),
      name: z.enum([
        'Ataduras',
        'KITS',
        'LUVAS_DESC_PARES',
        'Talas Pap.',
        'CATETER_TP_OCULOS',
        'COMPRESSORA_COMUM',
        'MASCARA_DESC',
        'MANTA_ALUMINIZADA',
        'PAS_DO_DEA',
        'SONDA_DE_ASPIRACAO',
        'SORO_FISIOLOGICO',
      ]),
      quantity: z.number().nullable().optional(),
      sizes: z.array(z.string()).nullable().optional(),
    })
    .optional(),

  MateriaisDeixadosNoHospital: z
    .object({
      state: z.boolean().nullable().optional(),
      name: z
        .enum([
          'Colar',
          'KED',
          'T.T.F',
          'Base do estabiliza',
          'Coxins estabiliza',
          'Maca rígida',
          'Tirante aranha',
          'Tirante de cabeça',
          'Cânula',
        ])
        .optional(),
      quantity: z.number().nullable().optional(),
      sizes: z.array(z.string()).nullable().optional(),
    })
    .optional(),
})
export const updateInfosHospitalares = z.object({
  reportId: z.number(),
  Doctor: z.string().optional(),
  S1: z.string().optional(),
  S2: z.string().optional(),
  S3: z.string().optional(),
  Demandant: z.string().optional(),
  TeamUp: z.string().optional(),
  ProcedimentosEfetuados: z
    .array(
      z
        .object({
          state: z.boolean().nullable().optional(),
          name: z
            .enum([
              'Aspiração',
              'Avaliação inicial',
              'Avaliação dirigida',
              'Avaliação continuada',
              'Chave de rautek',
              'Cânula de guedel',
              'Desobstrução de VA',
              'Emprego do D.E.A',
              'Gerenciamento de riscos',
              'Limpeza de ferimento',
              'Curativos',
              'Compressivo',
              'Encravamento',
              'Ocular',
              'Queimadura',
              'Simples',
              '3 pontas',
              'Imobilização',
              'Membro INF. DIR.',
              'Membro INF. ESQ.',
              'Membro SUP. DIR.',
              'Membro SUP. ESQ.',
              'Quadril',
              'Cervical',
              'Maca sobre rodas',
              'Maca rígida',
              'Ponte',
              'Retirado capacete',
              'R.C.P',
              'Rolamento 90°',
              'Rolamento 180°',
              'Tomada decisão',
              'Tratado choque',
              'Uso de cânula',
              'Uso KED',
              'USO_TTF',
              'Ventilação suporte',
              'Meios auxiliares',
              'CELESC',
              'Def. civil',
              'IGP / PC',
              'CIT',
              'Outro',
              'Uso colar Tamanho',
              'Oxigenoterapia',
              'Reanimador',
              'Samu',
              'Polícia',
            ])
            .nullable()
            .optional(),
          sizes: z.string().nullable().default(null).optional(),
          LPM: z.number().nullable().default(null).optional(),
          options: z.array(z.string()).optional(),
        })
        .optional(),
    )
    .optional(),

  MateriaisDescartaveis: z
    .array(
      z
        .object({
          state: z.boolean().nullable(),
          name: z
            .enum([
              'Ataduras',
              'Kits',
              'Luvas DESC. pares',
              'Talas Pap.',
              'Cateter TP. ocúlos',
              'Compressora comum',
              'Máscara DESC.',
              'Manta aluminizada',
              'Pás do dea',
              'Sonda de Aspiração',
              'Soro Fisiológico',
            ])
            .optional()
            .nullable(),
          quantity: z.number().nullable(),
          sizes: z.array(z.string()).nullable(),
        })
        .optional(),
    )
    .optional(),

  MateriaisDeixadosNoHospital: z
    .array(
      z
        .object({
          state: z.boolean().nullable(),
          name: z.enum([
            'Colar',
            'KED',
            'T.T.F',
            'Base do estabiliza',
            'Coxins estabiliza',
            'Maca rígida',
            'Tirante aranha',
            'Tirante de cabeça',
            'Cânula',
          ]),
          quantity: z.number().nullable(),
          sizes: z.array(z.string()).nullable(),
        })
        .optional(),
    )
    .optional(),
})
