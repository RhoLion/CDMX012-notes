import React from 'react'
import { useAuth } from '../context/UserProvider'
import { useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'

const SignIn = () => {

  const history = useHistory()
  const { signup } = useAuth()
  const { register, handleSubmit, formState: { errors }, setError } = useForm();

  const onSubmit = async ({ email, password }) => {
    try {
      await signup(email, password);
      history.push("/notes");
    } catch (error) {
      console.log(error.code);
      if (error.code === 'auth/invalid-email') {
        setError('email', {
          message: 'Por favor ingresa un correo válido'
        })
        if (error.code === 'auth/email-already-in-use') {
          setError('email', {
            message: 'Ya existe una cuenta con este correo, intenta con uno nuevo o Inicia Sesión'
          })
        }
      }
      if (error.code === 'auth/weak-password') {
        setError('password', {
          message: 'Tu contraseña debe contener al menos 6 carácteres.'
        })
      }
    }
  };


  return (
    <div className="container">
      <fieldset>
        <div className='titleHeader'>
          <h1>REGISTRATE</h1>
        </div>
        <form className='formContainer' onSubmit={handleSubmit(onSubmit)}>
          <div>
            <input type="text" name='name' id='name' placeholder='nombre' />
          </div>
          <div>
            <input type="email" name='email' className='email' placeholder='correo electrónico'
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
            <input type='password' name='password' className='pass' placeholder='contraseña'
              {...register("password", {
                required: true, minLength: {
                  value: 6,
                  message: 'Contraseña mínimo 6 caracteres',
                },
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
            <br />
            <button
              className="loginButton1" type='submit'  >
              Iniciar Sesión
            </button>
          </div>
        </form>
      </fieldset>
    </div>
  )
}

export default SignIn