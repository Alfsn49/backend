import {useForm} from 'react-hook-form'
import { registerRequest } from '../api/auth'
import { useAuth } from '../context/AuthContext'
import { useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
function RegisterPage() {
    const {register, handleSubmit, formState:{errors}} = useForm()
    const {signup, isAuthenticated, errors:registerErrors}= useAuth()
    const navigate = useNavigate()


    useEffect(()=>{
        if(isAuthenticated){
            navigate('/tasks')
        }
    },[isAuthenticated])
    
    
    const onSubmit = handleSubmit(async (values)=>{
        signup(values)
    })

  return (
    <div className='flex h-[calc(100vh-100px)] items-center justify-center'>
        <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
        {
            registerErrors.map((error,i)=>(
                <div className='bg-red-500 p-2 text-white' key={i}>
                    {error} 
                </div>
            ))
        }
        <form onSubmit={onSubmit}> 
        <input type='text' {...register("username",{required:true})} className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2" placeholder='Username'/>
        {
            errors.username &&
                (<p className='text-red-500'>
                    Username requerido
                    </p>)
            
        }
        <input type='email' {...register("email",{required:true})} className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2" placeholder='email'/>
        {
            errors.email &&
                (<p className='text-red-500'>
                    Email requerido
                    </p>)
            
        }
        <input type='password' {...register("password",{required:true})} className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2" placeholder='password'/>
        {
            errors.password &&
                (<p className='text-red-500'>
                    Contraseña requerido
                    </p>)
            
        }
        <button type='submit'>
        Register
        </button>
        </form>
        <p className="flex gap-x-2 justify-between text-white">
          ¿Ya tienes cuenta?{" "}
          <Link to="/login" className="text-sky-500">
            Haz login
          </Link>
        </p>
        </div>
        
    </div>
  )
}

export default RegisterPage