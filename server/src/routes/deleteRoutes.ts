import { FastifyInstance } from 'fastify'
import { prisma } from '../lib/prisma'

export async function deleteRoutes(app: FastifyInstance) {
  app.delete('/api/users/delete/:id', async (req, res) => {
    const { id } = req.params as { id: string } // Buscar o id do usuário

    // Buscar esse usuário por meio do seu id
    const existingUser = await prisma.user.findUnique({
      where: {
        id: parseInt(id),
      },
    })

    // Verificar se esse usuário existe
    if (!existingUser) {
      return res
        .status(404)
        .send({ message: `Cannot delete user with ID ${id}. User not found.` })
    }

    // Esperar o prisma fazer o delete
    await prisma.user.delete({
      where: {
        id: parseInt(id),
      },
    })

    // Redefinir IDs após a exclusão
    const remainingUsers = await prisma.user.findMany()
    await Promise.all(
      remainingUsers.map(async (user, index) => {
        await prisma.user.update({
          where: {
            id: user.id,
          },
          data: {
            id: index + 1,
          },
        })
      }),
    )

    return res.send({ msg: `🔴 Usuário com o id ${id} foi deletado.` })
  })
}
