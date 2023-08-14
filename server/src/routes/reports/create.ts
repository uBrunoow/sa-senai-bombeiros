import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { bodySchema } from './../../schemas/reportSchemas'
import { prisma } from '../../lib/prisma'

export async function reportCreate(app: FastifyInstance, opts: any, done: Function) {
  app.post('api/reports/create', async (req, res) => {
    const {
      name,
      age,
      cpf,
      gender,
      phone,
      reportPlace,
      bloodPressure,
      bodyTemp,
      bodyPulse,
      breathing,
      saturation,
    } = bodySchema.parse(req.body)

    // const newReport = await prisma.report.create({
    //   data: {
    //     name,
    //     gender,
    //     age,
    //     cpf,
    //     phone,
    //     reportPlace,
    //     bloodPressure,
    //     bodyTemp,
    //     bodyPulse,
    //     breathing,
    //     saturation,
    //   },
    // })

    return res.status(200).send({
      msg: '🟢 Usuário criado com sucesso!',
      result: req.body,
    })
  })

  done()
}
