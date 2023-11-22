import { Clear, Visibility, VisibilityOff } from '@mui/icons-material'
import {
  Button,
  CircularProgress,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Radio,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import React, { useState } from 'react'
import '@/styles/register.css'
import IUser from '@/interfaces/IUser'
import { useSnackbar } from 'notistack'
import { SubmitHandler, useForm } from 'react-hook-form'
import registerUser from '@/api/registerUser'

interface NovoBombeiroProps {
  handleClose: () => void
}
function NovoBombeiro({ handleClose }: NovoBombeiroProps) {
  const [gender, setGender] = useState('')
  const [isActive, setIsActive] = useState<boolean>(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [role, setRole] = useState('')
  const [buttonIsLoading, setButtonIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUser>({})

  const { enqueueSnackbar } = useSnackbar()

  const onSubmit: SubmitHandler<IUser> = async (userData) => {
    const dataToSend = {
      ...userData,
      gender,
      isActive,
      role,
    }

    try {
      setButtonIsLoading(true)
      const response = await registerUser(dataToSend)

      if (response?.status === 200) {
        console.log('Usuário registrado com sucesso.', response)
        enqueueSnackbar('Registration successful', { variant: 'success' })
        window.location.reload()
      } else {
        if (response?.status === 422) {
          enqueueSnackbar('Credenciais inválidas', { variant: 'error' })
        } else if (response?.status === 409) {
          enqueueSnackbar(
            'Este Email já está cadastrado, por favor tente novamente.',
            { variant: 'error' },
          )
        } else {
          enqueueSnackbar('Erro inesperado', { variant: 'error' })
        }
      }
    } catch (error) {
      console.error('Error during registration:', error)
      enqueueSnackbar('Erro de conexão', { variant: 'error' })
    } finally {
      setButtonIsLoading(false)
    }
  }

  const handleGenderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGender(event.target.value)
  }
  const handleIsActiveChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsActive(JSON.parse(event.target.value))
  }

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev)
  }
  const handleToggleConfirmPassword = () => {
    setShowConfirmPassword((prev) => !prev)
  }
  const handleRoleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setRole(event.target.value as string)
  }

  return (
    <>
      <Typography id="modal-modal-title" variant="h6" component="h2">
        Cadastrar um novo bombeiro
      </Typography>
      <Divider sx={{ margin: '20px 0' }} />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="form-register"
        style={{ width: '100%' }}
      >
        <Stack spacing={2} sx={{ width: '100%' }}>
          <TextField
            required
            id="emailId"
            label="E-mail"
            type="text"
            placeholder="exemplo@gmail.com"
            color="error"
            sx={{ width: '100%' }}
            {...register('email')}
          />
          <TextField
            required
            id="nameId"
            label="Nome completo"
            type="text"
            color="error"
            sx={{ width: '100%' }}
            {...register('name')}
          />

          <FormControl fullWidth sx={{ width: '100%' }}>
            <InputLabel required id="role-label">
              Cargo
            </InputLabel>
            <Select
              labelId="role-label"
              id="role"
              value={role}
              label="Cargo"
              {...register('role')}
              onChange={handleRoleChange}
            >
              <MenuItem value="segundoTenente">Segundo Tenente</MenuItem>
              <MenuItem value="primeiroTenente">Primeiro Tenente</MenuItem>
              <MenuItem value="Capitao">Capitão</MenuItem>
              <MenuItem value="Major">Major</MenuItem>
              <MenuItem value="TenenteCoronel">Tenente-Coronel</MenuItem>
              <MenuItem value="Admin">Admin</MenuItem>
            </Select>
          </FormControl>

          <FormLabel required component="legend">
            Selecione um gênero:
          </FormLabel>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <div>
              <FormControlLabel
                control={
                  <Radio
                    color="error"
                    checked={gender === 'Male'}
                    onChange={handleGenderChange}
                    value="Male"
                    name="gender-radio"
                    inputProps={{ 'aria-label': 'Male' }}
                  />
                }
                label="Masculino"
              />
            </div>

            <div>
              <FormControlLabel
                control={
                  <Radio
                    color="error"
                    checked={gender === 'Female'}
                    onChange={handleGenderChange}
                    value="Female"
                    name="gender-radio"
                    inputProps={{ 'aria-label': 'Female' }}
                  />
                }
                label="Feminino"
              />
            </div>
          </div>

          <FormLabel required component="legend">
            O usuário é ativo?
          </FormLabel>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <div>
              <FormControlLabel
                control={
                  <Radio
                    color="error"
                    checked={isActive === true}
                    onChange={handleIsActiveChange}
                    value="true"
                    name="isActive-radio"
                    inputProps={{ 'aria-label': 'true' }}
                  />
                }
                label="Ativo"
              />
            </div>
            <div>
              <FormControlLabel
                control={
                  <Radio
                    color="error"
                    checked={isActive === false}
                    onChange={handleIsActiveChange}
                    value="false"
                    name="isActive-radio"
                    inputProps={{ 'aria-label': 'false' }}
                  />
                }
                label="Inativo"
              />
            </div>
          </div>

          <TextField
            required
            className="input-register"
            id="senhaId"
            label="Senha"
            type={showPassword ? 'text' : 'password'}
            placeholder="***********"
            sx={{
              width: '100%',
            }}
            {...register('password')}
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
          <TextField
            required
            className="input-register"
            id="confirmaSenhaId"
            label="Confirmar Senha"
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="***********"
            sx={{
              width: '100%',
            }}
            {...register('confirmPassword')}
            color="error"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleToggleConfirmPassword}
                    edge="end"
                    className="icon-button"
                  >
                    {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
            }}
          >
            <Clear />
          </IconButton>
          {!buttonIsLoading ? (
            <Button
              type="submit"
              variant="contained"
              color="error"
              className="form-register-button"
            >
              <span>Avançar</span>
            </Button>
          ) : (
            <Button
              variant="contained"
              color="error"
              className="form-register-button"
            >
              <CircularProgress size={25} color="inherit" />
            </Button>
          )}
        </Stack>
      </form>
    </>
  )
}

export default NovoBombeiro
