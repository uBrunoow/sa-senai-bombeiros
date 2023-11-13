// import { FastifyRequest, FastifyReply } from 'fastify'
// import { prisma } from '../lib/prisma'

// type decodedTokenType = {
//   userId: number
// }

// export async function authenticateToken(
//   req: FastifyRequest,
//   res: FastifyReply,
// ): Promise<void> {
//   const token = req.headers.authorization
//   const refreshToken = req.headers['x-refresh-token']

//   if (!token && !refreshToken) {
//     return res.status(401).send({ msg: 'Unauthorized' })
//   }

//   try {
//     let decodedToken: decodedTokenType

//     if (token) {
//       decodedToken = await req.jwtVerify()
//     } else if (refreshToken) {
//       decodedToken = app.jwt.verify(refreshToken) as { userId: string }
//       // Adicione aqui a lógica para verificar se o refreshToken está na lista de refreshTokens válidos
//     }

//     const user = await prisma.user.findUnique({
//       where: {
//         id: decodedToken.userId,
//       },
//     })

//     if (!user) {
//       return res.status(401).send({ msg: 'Unauthorized' })
//     }

//     req.user = decodedToken
//   } catch (error) {
//     return res.status(403).send({ msg: 'Token inválido' })
//   }
// }

import { FastifyRequest, FastifyReply, FastifyInstance } from 'fastify'
import { prisma } from '../lib/prisma'

type DecodedTokenType = {
  userId: number
}

export async function authenticateToken(
  req: FastifyRequest,
  res: FastifyReply,
  app: FastifyInstance,
): Promise<void> {
  const token = req.headers.authorization
  const refreshToken = req.headers['x-refresh-token']

  if (!token && !refreshToken) {
    return res.status(401).send({ msg: 'Unauthorized' })
  }

  let decodedToken: DecodedTokenType | undefined

  try {
    if (token) {
      decodedToken = (await req.jwtVerify()) as DecodedTokenType
    } else if (refreshToken && typeof refreshToken === 'string') {
      const decodedRefreshToken = app.jwt.verify(refreshToken) as {
        userId: string
      }
      decodedToken = { userId: Number(decodedRefreshToken.userId) }
    }

    if (!decodedToken) {
      throw new Error('Token inválido')
    }

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
