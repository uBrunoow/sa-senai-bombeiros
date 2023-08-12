import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { prisma } from '../lib/prisma'

export async function updateRoutes(app: FastifyInstance) {
  app.put('/api/users/update/:id', async (req, res) => {
    const updateSchema = z.object({
      email: z.string().optional(),
      password: z.string().optional(),
      name: z.string().optional(),
    })

    const { id } = req.params as { id: string }

    const { email, password, name } = updateSchema.parse(req.body)

    if (!email && !password && !name) {
      return res.status(400).send({ message: 'No data to update' })
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        id: parseInt(id),
      },
    })

    if (!existingUser) {
      return res
        .status(404)
        .send({ message: `Cannot update user with ID ${id}. User not found.` })
    }

    const updatedUserData: {
      email?: string
      passwordHash?: string
      name?: string
    } = {}

    if (email) {
      updatedUserData.email = email
    }

    if (password) {
      updatedUserData.passwordHash = password // Note: You should hash the password using bcrypt before updating
    }

    if (name) {
      updatedUserData.name = name
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: parseInt(id),
      },
      data: updatedUserData,
    })

    return res.send(updatedUser)
  })
}
