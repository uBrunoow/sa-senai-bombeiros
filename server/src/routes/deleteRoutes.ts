import { FastifyInstance } from 'fastify'
import { prisma } from '../lib/prisma'

export async function deleteRoutes(app: FastifyInstance) {
  app.delete('/api/users/delete/:id', async (req, res) => {
    const { id } = req.params as { id: string }

    const existingUser = await prisma.user.findUnique({
      where: {
        id: parseInt(id),
      },
    })

    if (!existingUser) {
      return res
        .status(404)
        .send({ message: `Cannot delete user with ID ${id}. User not found.` })
    }

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

    return res.send({ message: `User with ID ${id} has been deleted.` })
  })
}
