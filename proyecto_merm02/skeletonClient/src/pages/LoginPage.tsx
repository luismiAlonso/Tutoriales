import { useForm } from 'react-hook-form'
import { useAuthStore } from '../contextStore/useAuthStore'
import {User} from '../interfaces/User'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<User>()

  const { signIn, errors: loginErrors, isAuthenticated } = useAuthStore()
  const navigate = useNavigate()

  const onSubmit = handleSubmit((data:User) => {
    signIn(data)
  })

  useEffect(() => {
    if(isAuthenticated){
         if (isAuthenticated) navigate('/MainTask')
    }
  }, [isAuthenticated])

  return (
    <div className="flex h-[calc(100vh-100px)] items-center justify-center">
      <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
        {loginErrors.map((error, i) => (
          <div className="bg-red-500 p-2 text-white my-2" key={i}>
            {error.message}
          </div>
        ))}
        <h1 className="text-2xl font-bold">Login</h1>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            {...register('username', { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="UserName"
          />
          {errors.password && <p className="text-red-500">Email is required</p>}
          <input
            type="password"
            {...register('password', { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="password"
          />
          {errors.password && (
            <p className="text-red-500">Password is required</p>
          )}
          <button
            type="submit"
            className="bg-sky-500 text-white px-4 py-2 rounded-md my-2"
          >
            Login
          </button>
        </form>
        <p className="flex gap-x-2 justify-between">
          Don't have an account?{' '}
         
        </p>
      </div>
    </div>
  )
}


export default LoginPage