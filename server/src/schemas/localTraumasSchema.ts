import { z } from 'zod'

export const localTraumasRegister = z.object({
  ReportOwnerId: z.number(),
  tipoTrauma: z.enum([
    'FRATURA',
    'DIVERSOS',
    'HEMORRAGIAS',
    'ESVICERACAO',
    'FAV_FAV',
    'AMPUTACAO',
    'QUEIMADURA_1GRAU',
    'QUEIMADURA_2GRAU',
    'QUEIMADURA_3GRAU',
  ]),
  bodyPart: z.enum([
    'ABDOMEN',
    'ANTEBRACO',
    'BRACO',
    'CABECA',
    'COSTAS',
    'COXA',
    'GLUTEOS',
    'JOELHO',
    'OMBRO',
    'PEITO',
    'PERNA',
    'PESCOCO',
    'PE',
    'VIRILHA',
    'CALCANHAR',
    'MAO',
  ]),
  side: z.enum(['LEFT', 'RIGHT']),
  face: z.enum(['BACK', 'FRONT']),
})
export const localTraumasUpdate = z.object({
  ReportOwnerId: z.number(),
  tipoTrauma: z
    .enum([
      'FRATURA',
      'DIVERSOS',
      'HEMORRAGIAS',
      'ESVICERACAO',
      'FAV_FAV',
      'AMPUTACAO',
      'QUEIMADURA_1GRAU',
      'QUEIMADURA_2GRAU',
      'QUEIMADURA_3GRAU',
    ])
    .optional(),
  bodyPart: z
    .enum([
      'COSTAS',
      'PESCOCO',
      'GLUTEOS',
      'BRACO',
      'ANTEBRACO',
      'PESCOCOPERNA',
      'COXA',
      'CABECA',
    ])
    .optional(),
  side: z.enum(['LEFT', 'RIGHT']).optional(),
  face: z.enum(['BACK', 'FRONT']).optional(),
})
