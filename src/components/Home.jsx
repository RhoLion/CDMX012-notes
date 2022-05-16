import React from 'react'
import { useAuth } from '../context/UserProvider'
import { useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import ggle from '../img/ggle.png'

const Home = () => {

  const { login, googleSignIn } = useAuth()
  const history = useHistory();
  const { register, handleSubmit, formState: { errors }, setError } = useForm();

  const onSubmitHome = async ({ email, password }) => {
    try {
      await login(email, password)
      history.push('/notes')

    } catch (error) {
      console.log(error.code, 'estoy en el error');
      if (error.code === 'auth/user-not-found') {
        setError('email', {
          message: 'Email no registrado'
        })
      }
      if (error.code === 'auth/wrong-password') {
        setError('password', {
          message: 'Contraseña inválida'
        })
      }

    }
  }

  const handleGoogleSignIn = async (e) => {
    e.preventDefault()
    try {
      await googleSignIn()
      history.push('/notes')
    } catch (error) {
      alert(error.code)
    }
  }

  return (

    <div className="container">
      <fieldset>
        <div className='titleHeader'>
          <h1>MIS NOTAS FAVORITAS</h1>
        </div>
        <form className='formContainer' onSubmit={handleSubmit(onSubmitHome)}>
          <div>
            <input type="email" className='email' placeholder='correo electrónico'
              {...register("email", {
                required: {
                  value: true,
                  message: 'Campo obligatorio'
                },
                pattern: {
                  value: /[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,5}/,
                  message: 'Formato de email inválido'
                }
              })}
            />
            {errors.email && errors.email.message}
          </div>
          <div>
            <input type='password' className='pass' placeholder='contraseña'
              {...register("password", {
                required: true,
                message: 'Contraseña mínimo 6 caracteres',
                validate: {
                  trim: (v) => {
                    if (!v.trim()) {
                      return 'no se aceptan espacios vacíos';
                    }
                    return true;
                  }
                },
              })}
            />
            {errors.password && errors.password.message}
          </div>
          <div>
            <button
              className="loginButton" type='submit'
            >
              Iniciar Sesión
            </button>
          </div>
        </form>
        <br />
        <div className='loginGoogleContainer'>
          <img className='googlelogo' alt='backgroundimg' src={ggle}></img>
          <button
            className="loginGoogle" type='submit'
            onClick={handleGoogleSignIn}
          >
            Continuar con Google
          </button>
        </div>
        <br />
        <div className="createAcc">
          <button className='createAcc1' onClick={() => history.push('/signin')}
            type='submit' >
            Crear cuenta
          </button>
        </div>
      </fieldset>
    </div>
  )
}

export default Home