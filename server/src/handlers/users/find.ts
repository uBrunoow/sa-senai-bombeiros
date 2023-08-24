import { prisma } from '../../lib/prisma'

export async function userFindHandler(
  req: FastifyRequest,
  res: FastifyResponse,
) {
  const allUsers = await prisma.user.findMany()
  return res.send({
    msg: `🟢 Usuários localizado com sucesso.`,
    allUsers,
  })
}

export async function userFindOneHandler(
  req: FastifyRequest,
  res: FastifyResponse,
) {
  const { id } = req.params as { id: string }

  // Busca o usuário pelo id
  const user = await prisma.user.findUnique({
    where: {
      id: parseInt(id),
    },
  })

  // Se não existir usuário retorna um erro
  if (!user) {
    return res.status(404).send({ message: `User with ID ${id} not found.` })
  }

  return res.send({ msg: `🟢 Usuário ${id} localizado com sucesso.`, user })
}
