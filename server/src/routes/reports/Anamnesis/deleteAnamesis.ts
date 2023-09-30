import { FastifyInstance } from 'fastify'
import { prisma } from '../../../lib/prisma'

export async function anamneseDeleteRoutes(
  app: FastifyInstance,
  opts: fastifyNullOpts,
  done: fastifyDoneFunction,
) {
  app.delete('/api/anamnese/delete/:id', async (req, res) => {
    const { id } = req.params as { id: string } // Buscar o id do usuário

    // Buscar esse usuário por meio do seu id
    const existingAnamnese = await prisma.anamnesis.findUnique({
      where: {
        id: parseInt(id),
      },
    })

    // Verificar se esse usuário existe
    if (!existingAnamnese) {
      return res.status(404).send({
        message: `Cannot delete anamnese with ID ${id}. Anamnese not found.`,
      })
    }

    // Esperar o prisma fazer o delete
    await prisma.anamnesis.delete({
      where: {
        id: parseInt(id),
      },
    })

    return res.send({ msg: `🔴 Anamnese com o id ${id} foi deletado.` })
  })

  done()
}
