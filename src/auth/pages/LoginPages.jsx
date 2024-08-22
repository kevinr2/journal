import {useDispatch, useSelector} from 'react-redux'

import {Link as RouterLink} from 'react-router-dom'
import {Alert, Button, Grid, Link, TextField, Typography} from '@mui/material'
import { Google} from '@mui/icons-material'
import { AuthLayout } from '../layout/AuthLayout'

import { useForm } from '../../hooks/useform'
import { startLoginWithEmailPassword, StartOnGoogleSingIn } from '../../store/auth/thunks'
import { useMemo } from 'react'

const formDate = {
  email:'',
  password: ''
}

export const LoginPages = () => {

    const {status, errorMessage} = useSelector(state => state.auth)

    const dispatch = useDispatch()

  const {email, password, onInputChange} = useForm(formDate)

  const isAuthenticating = useMemo( ()=> status === 'checking',[status])

  const onsubmit = (event)=>{
      event.preventDefault()

     
      dispatch( startLoginWithEmailPassword({ email, password }) );
  }
  const onGoogleSingIn = () =>{
    dispatch(StartOnGoogleSingIn())
  }


  return (
      <AuthLayout title="Login">
        <form onSubmit={onsubmit} className='animate__animated animate__fadeIn animate__faster'>
            <Grid container >
              <Grid item xs={12} sx={{mt:2}}>
                <TextField 
                  label="correo" 
                  type='email'
                  placeholder='correo@google.com'
                  fullWidth
                  name='email'
                  value={email}
                  onChange={onInputChange}
                  autoComplete='username'
                />
              </Grid>
              <Grid item xs={12} sx={{mt:2}}>
                <TextField 
                  label="Contraseña" 
                  type='password'
                  placeholder='Contraseña'
                  fullWidth
                  name='password'
                  value={password}
                  onChange={onInputChange}
                  autoComplete='current-password'
                />
                <Grid 
                  container
                  display={ !!errorMessage ? '': 'none' }
                  sx={{ mt: 1 }}>
                <Grid 
                  item 
                  xs={ 12 }
                >
                <Alert severity='error'>{ errorMessage }</Alert>
                </Grid>
               </Grid>
              </Grid>
              <Grid container spacing={2} sx={{mb:2, mt:1}}>
                <Grid item xs={12} sm={6}>
                  <Button disabled={isAuthenticating} type='submit' variant='contained' fullWidth >
                    Login
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button disabled={isAuthenticating} onClick={onGoogleSingIn} variant='contained' fullWidth >
                    <Google />
                    <Typography sx={{ml:1}}> Google</Typography>
                  </Button>
                </Grid>
              </Grid>
              <Grid container direction="row" justifyContent="end">
                <Link component={RouterLink} color='inherit' to="/auth/register">
                Crear una cuenta
                </Link>
                
              </Grid>
            </Grid>
        </form>
      </AuthLayout>


  )
}
