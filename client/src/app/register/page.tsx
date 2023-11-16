'use client'

import '@/styles/register.css'
import hexagon from '@/public/hexagon.png'
import firefighter from '@/public/firefighter.png'
import logoPequena from '@/public/logo_pequena 3.png'
import detail from '@/public/detail.png'
import Image from 'next/image';
import { 
  TextField, 
  Button, 
  Stack, 
  IconButton, 
  InputAdornment,
  FormLabel,  
  FormControlLabel, 
  Radio,
  CircularProgress
} from '@mui/material';
import { useForm, SubmitHandler, FieldError } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { boolean, z } from 'zod';
import { User } from 'lucide-react'
import { useState } from 'react'
import { Visibility, VisibilityOff } from '@mui/icons-material';
import registerUser from '@/api/registerUser'
import IUser from '@/interfaces/IUser'
import { useSnackbar } from 'notistack'

// const schema: any = z.object({
//   email: z.string().email({ message: 'Email inválido' }),
//   name: z.string(),
//   senha: z.string().min(6),
//   confirmarSenha: z.string(),
//   gender: z.string(),

//   isActive: z.boolean(),
// });


export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid  },
    getValues,
  } = useForm<IUser>({
    // resolver: zodResolver(schema),
  });
  
  const [gender, setGender] = useState('');
  const [isActive, setIsActive] = useState<boolean | null>(null);

  const handleGenderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGender(event.target.value);
  };
  const handleIsActiveChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsActive(JSON.parse(event.target.value));
  };

  const { enqueueSnackbar } = useSnackbar();
  const [buttonLoading, setButtonLoading] = useState(false)

  const onSubmit: SubmitHandler<IUser> = async (userData) => {
    const dataToSend = {
      ...userData,
      gender: gender,
      isActive: isActive,
    };

    try {
      setButtonLoading(true)
      const response = await registerUser(dataToSend);
  
      if (response?.status === 200) {
        console.log('Usuário registrado com sucesso.', response);
        enqueueSnackbar('Registration successful', { variant: 'success' });
      } else {
        if (response?.status === 422) {
          enqueueSnackbar('Credenciais inválidas', { variant: 'error' });
        } else if (response?.status === 409) {
          enqueueSnackbar('Este Email já está cadastrado, por favor tente novamente.', { variant: 'error' });
        } else {
          enqueueSnackbar('Erro inesperado', { variant: 'error' });
        }
      }
    } catch (error) {
      console.error('Error during registration:', error);
      enqueueSnackbar('Erro de conexão', { variant: 'error' });
    } finally {
      setButtonLoading(false)
    }
  };

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };
  const handleToggleConfirmPassword = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  const isFormValid = () => {
    const values = getValues();
  
    return (
      Object.keys(errors).length === 0 &&
      gender &&
      isActive !== null &&
      values.email.trim() &&
      values.name.trim() &&
      values.password.trim() &&
      values.confirmPassword.trim()
    );
  };

  return (


    <div style={{ overflow: 'hidden'}}>
      <div className='hero-register'>
        <div className='background-image'>
          <Image src={hexagon} alt="" className='hexagon-image'/>
          <Image src={detail} alt="" className='detail-image'/>
          <div className='blur-image-2'></div>

        </div>
        <Image src={firefighter} alt="" className='firefighter-image'/>
        <div className='blur-image'></div>
      </div>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
        className='register-container'
      >
        <div>
          <div className='title-register'>
            <User color='red' height={40} width={40}/>
            <h1>Register</h1>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className='form-register'>
            <Stack spacing={2} sx={{ width: '100%'}}>
              <TextField
                required
                className='input-register'
                id="emailId"
                label="E-mail"
                type="text"
                placeholder="exemplo@gmail.com"
                {...register('email')}
                color="error"
              />
              {errors.email && <p>{(errors.email as FieldError).message}</p>}

              <TextField
                required
                className='input-register'
                id="nameId"
                label="Nome completo"
                type="text"
                {...register('name')}
                color="error"
              />
              {errors.name && <p>{(errors.name as FieldError).message}</p>}
              
              <FormLabel required component="legend">Selecione um gênero:</FormLabel>
              <div style={{ display: 'flex', flexDirection: 'row'}}>
                <div>
                  <FormControlLabel
                    control={
                      <Radio
                        color='error'
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
                        color='error'
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
              {errors.gender && <p>{(errors.gender as FieldError).message}</p>}
              <FormLabel required component="legend">O usuário é ativo?</FormLabel>
              <div style={{ display: 'flex', flexDirection: 'row'}}>
                <div>
                  <FormControlLabel
                    control={
                      <Radio
                        color='error'
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
                        color='error'
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
              {errors.isActive && <p>{(errors.isActive as FieldError).message}</p>}

              <TextField
                required
                className='input-register'
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
                        className='icon-button'
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              {errors.password && <p>{(errors.password as FieldError).message}</p>}


              <TextField
                required
                className='input-register'
                id="confirmaSenhaId"
                label="Confirmar Senha"
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="***********"
                {...register('confirmPassword')}
                sx={{
                  width: '100%',
                }}
                color="error"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleToggleConfirmPassword}
                        edge="end"
                        className='icon-button'
                      >
                        {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              {errors.confirmPassword && <p>{(errors.confirmPassword as FieldError).message}</p>}

              <Button 
                type='submit' 
                variant="contained" 
                color="error" 
                disabled={!isFormValid()}
                className='form-register-button'
              >
                {buttonLoading ? (
                  <CircularProgress sx={{ width: '20px', height: '20px' }} color="inherit"  />
                  ): (
                  <span>Avançar</span>
                )}
                
              </Button>
              <span className='alert-text'>(Todos os campos com * são obrigatórios)</span>
            </Stack>
          </form>
        </div>
        <Image src={logoPequena} alt="" className='logo' />
        <div className='blur-image-1'></div>
      </Stack>
    </div>

  )
}
