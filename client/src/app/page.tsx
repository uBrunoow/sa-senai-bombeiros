'use client'

import '@/styles/register.css'
import hexagon from '@/public/hexagon.png'
import firefighter from '@/public/firefighter.png'
import logoPequena from '@/public/logo_pequena 3.png'
import detail from '@/public/detail.png'
import Image from 'next/image'
import {
  TextField,
  Button,
  Stack,
  IconButton,
  InputAdornment,
  CircularProgress,
  Box,
} from '@mui/material'
import { useForm, SubmitHandler, FieldError } from 'react-hook-form'
import { User } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import IUser from '@/interfaces/IUser'
import { useSnackbar } from 'notistack'
import loginUser from '@/api/loginUser'
import { useRouter } from 'next/navigation'

// const schema: any = z.object({
//   email: z.string().email({ message: 'Email inválido' }),
//   name: z.string(),
//   senha: z.string().min(6),
//   confirmarSenha: z.string(),
//   gender: z.string(),

//   isActive: z.boolean(),
// });

export default function Register() {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUser>({
    // resolver: zodResolver(schema),
  })

  const { enqueueSnackbar } = useSnackbar()
  const [buttonLoading, setButtonLoading] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      setLoading(false)
    }, 3000)

    return () => clearTimeout(loadingTimeout)
  }, [])

  const onSubmit: SubmitHandler<IUser> = async (userData) => {
    const dataToSend = {
      ...userData,
    }

    try {
      setButtonLoading(true)
      const response = await loginUser(dataToSend)

      if (response?.status === 200) {
        enqueueSnackbar('Usuário logado com sucesso', { variant: 'success' })
        router.push('/dashboard')
      } else {
        if (response?.status === 422) {
          enqueueSnackbar('Credenciais inválidas.', { variant: 'info' })
        } else if (response?.status === 401) {
          enqueueSnackbar('Não autorizado.', { variant: 'error' })
        } else {
          enqueueSnackbar('Erro inesperado.', { variant: 'error' })
        }
      }
    } catch (error) {
      console.error('Error during registration:', error)
      enqueueSnackbar('Erro de conexão', { variant: 'error' })
    } finally {
      setButtonLoading(false)
    }
  }

  const [showPassword, setShowPassword] = useState(false)

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev)
  }

  return (
    <div style={{ overflow: 'hidden' }}>
      {loading ? (
        <Box
          width={'100%'}
          height={'100vh'}
          display={'flex'}
          justifyContent={'center'}
          alignItems={'center'}
        >
          <CircularProgress size={50} color="error" />
        </Box>
      ) : (
        <>
          <div className="hero-register">
            <div className="background-image">
              <Image src={hexagon} alt="" className="hexagon-image" />
              <Image src={detail} alt="" className="detail-image" />
              <div className="blur-image-2"></div>
            </div>
            <Image src={firefighter} alt="" className="firefighter-image" />
            <div className="blur-image"></div>
          </div>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={2}
            className="register-container"
          >
            <div>
              <div className="title-register">
                <User color="red" height={40} width={40} />
                <h1>Register</h1>
              </div>
              <form onSubmit={handleSubmit(onSubmit)} className="form-register">
                <Stack spacing={2} sx={{ width: '100%' }}>
                  <TextField
                    required
                    className="input-register"
                    id="emailId"
                    label="E-mail"
                    type="text"
                    placeholder="exemplo@gmail.com"
                    {...register('email')}
                    color="error"
                  />
                  {errors.email && (
                    <p>{(errors.email as FieldError).message}</p>
                  )}

                  <TextField
                    required
                    className="input-register"
                    id="senhaId"
                    label="Senha"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="***********"
                    {...register('password')}
                    sx={{
                      width: '100%',
                    }}
                    color="error"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleTogglePassword}
                            edge="end"
                            className="icon-button"
                          >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  {errors.password && (
                    <p>{(errors.password as FieldError).message}</p>
                  )}

                  <Button
                    type="submit"
                    variant="contained"
                    color="error"
                    className="form-register-button"
                  >
                    {buttonLoading ? (
                      <CircularProgress size={25} color="inherit" />
                    ) : (
                      <span>Avançar</span>
                    )}
                  </Button>
                  <span className="alert-text">
                    (Todos os campos com * são obrigatórios)
                  </span>
                </Stack>
              </form>
            </div>
            <Image src={logoPequena} alt="" className="logo" />
            <div className="blur-image-1"></div>
          </Stack>
        </>
      )}
    </div>
  )
}
