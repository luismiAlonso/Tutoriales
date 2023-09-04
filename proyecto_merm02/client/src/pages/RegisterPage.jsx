import { useForm } from 'react-hook-form'
<<<<<<< HEAD
import { useAuth } from '../context/AuthContext'
=======
import { useAuth } from '../context/authContext'
>>>>>>> b153964 (error cookies)
import { useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'

function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()
<<<<<<< HEAD
  const { signUp, isAuthenticated, errors: registerErrors } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated) navigate('/tasks')
  }, [isAuthenticated])

  const onSubmit = handleSubmit(async (values) => {
    signUp(values)
=======
  const { singUp, isAuthenticated, errors: registerErrors } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated) navigate('/task')
  }, [isAuthenticated])

  const onSubmit = handleSubmit(async (values) => {
    singUp(values)
>>>>>>> b153964 (error cookies)
  })

  return (
    <div className="flex h-[calc(100vh-100px)] items-center justify-center">
      <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
      {registerErrors.map((error, i) => (
        <div className="bg-red-500 p-2 text-white" key={i}>
          {error}
        </div>
      ))}
        <h1 className="text-2xl font-bold">Register</h1>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="username"
            {...register('username', { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Username"
          />
          {errors.userName && (
            <p className="text-red-500">Username is required</p>
          )}
          <input
            type="email"
            name="email"
            {...register('email', { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Email"
          />
          {errors.email && <p className="text-red-500">Email is required</p>}
          <input
            type="password"
            name="password"
            {...register('password', { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="password"
          />
          {errors.password && (
            <p className="text-red-500">Password is required</p>
          )}
<<<<<<< HEAD
          <button type="submit"
          className="bg-sky-500 text-white px-4 py-2 rounded-md my-2"
          >Register</button>
=======
          <button type="submit">Register</button>
>>>>>>> b153964 (error cookies)
        </form>
        <p className="flex gap-x-2 justify-between">
          Already have an account?{' '}
          <Link className="text-sky-500" to="/login">
            Sing Up
          </Link>
        </p>
      </div>
    </div>
  )
}

export default RegisterPage
