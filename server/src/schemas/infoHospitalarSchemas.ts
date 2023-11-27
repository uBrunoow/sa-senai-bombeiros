import { z } from 'zod'

export const registerProcedimentosEfetuados = z.object({
  prodEfetuadosOnlyName: z
    .object({
      ASPIRACAO: z.object({
        name: z.string(),
        state: z.boolean().default(false),
      }),
      AVALIACAO_INICIAL: z.object({
        name: z.string(),
        state: z.boolean().default(false),
      }),
      AVALIACAO_DIRIGIDA: z.object({
        name: z.string(),
        state: z.boolean().default(false),
      }),
      AVALIACAO_CONTINUADA: z.object({
        name: z.string(),
        state: z.boolean().default(false),
      }),
      CHAVE_DE_RAUTEK: z.object({
        name: z.string(),
        state: z.boolean().default(false),
      }),
      CANULA_DE_GUEDEL: z.object({
        name: z.string(),
        state: z.boolean().default(false),
      }),
      DESOBSTRUCAO_DE_VA: z.object({
        name: z.string(),
        state: z.boolean().default(false),
      }),
      EMPREGO_DO_DEA: z.object({
        name: z.string(),
        state: z.boolean().default(false),
      }),
      GERENCIAMENTO_DE_RISCOS: z.object({
        name: z.string(),
        state: z.boolean().default(false),
      }),
      LIMPEZA_DE_FERIMENTO: z.object({
        name: z.string(),
        state: z.boolean().default(false),
      }),
      CURATIVOS: z.object({
        name: z.string(),
        state: z.boolean().default(false),
      }),
      COMPRESSIVO: z.object({
        name: z.string(),
        state: z.boolean().default(false),
      }),
      ENCRAVAMENTO: z.object({
        name: z.string(),
        state: z.boolean().default(false),
      }),
      OCULAR: z.object({
        name: z.string(),
        state: z.boolean().default(false),
      }),
      QUEIMADURA: z.object({
        name: z.string(),
        state: z.boolean().default(false),
      }),
      SIMPLES: z.object({
        name: z.string(),
        state: z.boolean().default(false),
      }),
      THREE_PONTAS: z.object({
        name: z.string(),
        state: z.boolean().default(false),
      }),
      IMOBILIZACOES: z.object({
        name: z.string(),
        state: z.boolean().default(false),
      }),
      MEMBRO_INF_DIR: z.object({
        name: z.string(),
        state: z.boolean().default(false),
      }),
      MEMBRO_INF_ESQ: z.object({
        name: z.string(),
        state: z.boolean().default(false),
      }),
      MEMBRO_SUP_DIR: z.object({
        name: z.string(),
        state: z.boolean().default(false),
      }),
      MEMBRO_SUP_ESQ: z.object({
        name: z.string(),
        state: z.boolean().default(false),
      }),
      QUADRIL: z.object({
        name: z.string(),
        state: z.boolean().default(false),
      }),
      CERVICAL: z.object({
        name: z.string(),
        state: z.boolean().default(false),
      }),
      MACA_SOBRE_RODAS: z.object({
        name: z.string(),
        state: z.boolean().default(false),
      }),
      MACA_RIGIDA: z.object({
        name: z.string(),
        state: z.boolean().default(false),
      }),
      PONTE: z.object({
        name: z.string(),
        state: z.boolean().default(false),
      }),
      RETIRADO_CAPACETE: z.object({
        name: z.string(),
        state: z.boolean().default(false),
      }),
      RCP: z.object({
        name: z.string(),
        state: z.boolean().default(false),
      }),
      ROLAMENTO_90: z.object({
        name: z.string(),
        state: z.boolean().default(false),
      }),
      ROLAMENTO_180: z.object({
        name: z.string(),
        state: z.boolean().default(false),
      }),
      TOMADA_DECISAO: z.object({
        name: z.string(),
        state: z.boolean().default(false),
      }),
      TRATADO_CHOQUE: z.object({
        name: z.string(),
        state: z.boolean().default(false),
      }),
      USO_DE_CANULA: z.object({
        name: z.string(),
        state: z.boolean().default(false),
      }),
      USO_KED: z.object({
        name: z.string(),
        state: z.boolean().default(false),
      }),
      USO_TTF: z.object({
        name: z.string(),
        state: z.boolean().default(false),
      }),
      VENTILACAO_SUPORTE: z.object({
        name: z.string(),
        state: z.boolean().default(false),
      }),
      MEIOS_AUXILIARES: z.object({
        name: z.string(),
        state: z.boolean().default(false),
      }),
      CELESC: z.object({
        name: z.string(),
        state: z.boolean().default(false),
      }),
      DEF_CIVIL: z.object({
        name: z.string(),
        state: z.boolean().default(false),
      }),
      IGP_PC: z.object({
        name: z.string(),
        state: z.boolean().default(false),
      }),
      CIT: z.object({
        name: z.string(),
        state: z.boolean().default(false),
      }),
      ANOTHER: z.object({
        name: z.string(),
        state: z.boolean().default(false),
      }),
    })
    .optional(),

  prodEfetuadosOnlySize: z
    .object({
      USO_COLAR_TAM: z.object({
        state: z.boolean().default(false),
        size: z.string(),
      }),
    })
    .optional(),

  prodEfetuadosOnlyLPM: z
    .object({
      OXIGENOTERAPIA: z.object({
        state: z.boolean().default(false),
        LPM: z.number().default(0),
      }),
      REANIMADOR: z.object({
        state: z.boolean().default(false),
        LPM: z.number().default(0),
      }),
    })
    .optional(),

  prodEfetuadosOnlyoOptions: z
    .object({
      SAMU: z.object({
        state: z.boolean().default(false),
        option: z.enum(['USA', 'USB']),
      }),
      POLICIA: z.object({
        state: z.boolean().default(false),
        option: z.enum(['PRF', 'PRE', 'Militar', 'Civil']).optional(),
      }),
    })
    .optional(),
})

// TODO: Fazer o schema da rota de update
export const updateProcedimentosEfetuados = z.object({
  mano: z.string().optional().default('Mano El Mano Angemessiano'),
})
