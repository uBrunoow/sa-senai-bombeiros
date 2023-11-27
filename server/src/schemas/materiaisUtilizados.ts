import { z } from 'zod'

export const registerMateriaisUtilizados = z.object({
  ReportOwnerId: z.number(),
  Doctor: z.string().optional(),
  S1: z.string().optional(),
  S2: z.string().optional(),
  S3: z.string().optional(),
  Demandant: z.string().optional(),
  TeamUp: z.string().optional(),

  MateriaisDeixadosNoHospitalWithoutSizes: z
    .object({
      BASE_DO_ESTABILIZA: z.object({
        state: z.boolean().default(false),
        quantity: z.number().default(0),
      }),
      COXINS_ESTABILIZA: z.object({
        state: z.boolean().default(false),
        quantity: z.number().default(0),
      }),
      MACA_RIGIDA: z.object({
        state: z.boolean().default(false),
        quantity: z.number().default(0),
      }),
      TIRANTE_ARANHA: z.object({
        state: z.boolean().default(false),
        quantity: z.number().default(0),
      }),
      TIRANTE_DE_CABECA: z.object({
        state: z.boolean().default(false),
        quantity: z.number().default(0),
      }),
      CANULA: z.object({
        state: z.boolean().default(false),
        quantity: z.number().default(0),
      }),
    })
    .optional(),

  MateriaisDeixadosNoHospitalWithSizes: z
    .object({
      COLAR: z.object({
        state: z.boolean().default(false),
        quantity: z.number().default(0),
        sizes: z.array(z.string()).nullable(),
      }),
      KED: z.object({
        state: z.boolean().default(false),
        quantity: z.number().default(0),
        sizes: z.array(z.string()).nullable(),
      }),
      TTF: z.object({
        state: z.boolean().default(false),
        quantity: z.number().default(0),
        sizes: z.array(z.string()).nullable(),
      }),
    })
    .optional(),

  MateriaisDescartaveisWithSizes: z
    .object({
      ATADURAS: z.object({
        state: z.boolean().default(false),
        quantity: z.number().default(0),
        sizes: z
          .object({
            selectedSize: z.string().nullable(),
            entries: z.array(z.string()).nullable(),
          })
          .nullable(),
      }),
      KITS: z.object({
        state: z.boolean().default(false),
        quantity: z.number().default(0),
        sizes: z
          .object({
            selectedSize: z.string().nullable(),
            entries: z.array(z.string()).nullable(),
          })
          .nullable(),
      }),
      LUVAS_DESC_PARES: z.object({
        state: z.boolean().default(false),
        quantity: z.number().default(0),
        sizes: z
          .object({
            selectedSize: z.string().nullable(),
            entries: z.array(z.string()).nullable(),
          })
          .nullable(),
      }),
      TALAS_PAP: z.object({
        state: z.boolean().default(false),
        quantity: z.number().default(0),
        sizes: z
          .object({
            selectedSize: z.string().nullable(),
            entries: z.array(z.string()).nullable(),
          })
          .nullable(),
      }),
    })
    .nullable(),

  MateriaisDescartaveisWithoutSizes: z
    .object({
      CATETER_TP_OCULOS: z.object({
        state: z.boolean().default(false),
        quantity: z.number().default(0),
      }),
      COMPRESSORA_COMUM: z.object({
        state: z.boolean().default(false),
        quantity: z.number().default(0),
      }),
      MASCARA_DESC: z.object({
        state: z.boolean().default(false),
        quantity: z.number().default(0),
      }),
      MANTA_ALUMINIZADA: z.object({
        state: z.boolean().default(false),
        quantity: z.number().default(0),
      }),
      PAS_DO_DEA: z.object({
        state: z.boolean().default(false),
        quantity: z.number().default(0),
      }),
      SONDA_DE_ASPIRACAO: z.object({
        state: z.boolean().default(false),
        quantity: z.number().default(0),
      }),
      SORO_FISIOLOGICO: z.object({
        state: z.boolean().default(false),
        quantity: z.number().default(0),
      }),
    })
    .optional(),
})

// TODO: Fazer esse schema da rota de atualização
export const updateMateriaisUtilizados = z.object({
  mano: z.string().optional().default('Mano El Mano Angemessiano'),
})

export type MateriaisDeixadosNoHospitalWithSizesType = {
  [key: string]: {
    state: boolean
    quantity: number
    sizes: '' | null
  }
}
