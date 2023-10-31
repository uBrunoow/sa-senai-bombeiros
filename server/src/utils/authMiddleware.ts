import { FastifyRequest, FastifyReply } from 'fastify'
import { prisma } from '../lib/prisma'

export async function authenticateToken(
  req: FastifyRequest,
  res: FastifyReply,
): Promise<void> {
  const token = req.headers.authorization

  if (!token) {
    return res.status(401).send({ msg: 'Unauthorized' })
  }

  try {
    const decodedToken: any = await req.jwtVerify()

    // Você pode adicionar lógica adicional aqui, como verificar se o usuário existe no banco de dados
    const user = await prisma.user.findUnique({
      where: {
        id: decodedToken.userId,
      },
    })

    if (!user) {
      return res.status(401).send({ msg: 'Unauthorized' })
    }

    req.user = decodedToken
  } catch (error) {
    return res.status(403).send({ msg: 'Token inválido' })
  }
}
