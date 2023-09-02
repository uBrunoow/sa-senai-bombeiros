import { FastifyInstance } from 'fastify'
import { prisma } from '../../lib/prisma'
import { reportsUpdateSchema } from '../../schemas/reportSchemas'

export async function userUpdateRoutes(
  app: FastifyInstance,
  opts: fastifyNullOpts,
  done: fastifyDoneFunction,
) {
  app.put('/api/users/update/:id', async (req, res) => {
    const { id } = req.params as { id: string } // Buscar o id do usuário

    // Faz uma requisição do body para pegar o email senha e nome
    const {       
      age,
      gender,
      name,
      reportDate,
      cpf,
      phone,
      reportPlace,
      bloodPressure,
      bodyTemp,
      bodyPulse,
      breathing,
      saturation, 
    } = reportsUpdateSchema.parse(req.body)

    const parsedReportDate = new Date(reportDate)

    // Validação dos dados recebidos
    if (!age && !gender && !name && !cpf &&!phone &&!reportPlace &&!bloodPressure &&!bodyTemp &&!bodyPulse &&!bodyPulse &&!breathing &&!saturation) {
      return res
        .status(400)
        .send({ message: '🔴 Nenhuma informação foi fornecida' })
    }

    // Buscar usuário pelo ID se não existir retorna um erro
    const existingUser = await prisma.user.findUnique({
      where: {
        id: parseInt(id),
      },
    })

    if (!existingUser) {
      return res.status(404).send({
        message: `🔴 Não foi possível realizar a pesquisa pelo ${id}. Usuário não encontrado.`,
      })
    }

    // Informações para serem atualizadas
    const updatedUserData: {
      email?: string
      password?: string
      name?: string
    } = {}

    // Se tiver um email, atualizar o email
    if (email) {
      updatedUserData.email = email
    }

    // Se tiver uma senha, atualizar a senha
    if (password) {
      // Criptografar a nova senha antes de atualizar
      const hashedPassword = await app.bcrypt.hash(password)
      updatedUserData.password = hashedPassword
    }

    // Se tiver um nome, atualizar o nome
    if (name) {
      updatedUserData.name = name
    }

    // Atualizar o usuário buscando pelo ID
    const updatedUser = await prisma.user.update({
      where: {
        id: parseInt(id),
      },
      data: updatedUserData,
    })

    return res.send({ msg: '🟢 Usuário atualizado com sucesso.', updatedUser })
  })

  done()
}
