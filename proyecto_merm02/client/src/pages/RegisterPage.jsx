import { useForm } from "react-hook-form"
import { useAuth } from "../context/authContext";
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom"

function RegisterPage() {

    const { register, handleSubmit, formState: { errors } } = useForm()
    const { singUp, isAuthenticated, errors: registerErrors } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        if (isAuthenticated) navigate('/task')
    }, [isAuthenticated])

    const onSubmit = handleSubmit(async (values) => {
        singUp(values)
    })

    return (
        <div className="flex h-[calc(100vh-100px)] items-center justify-center">
            {
                registerErrors.map((error, i) => (
                    <div className="bg-red-500 p-2 text-white" key={i}>
                        {error}
                    </div>
                ))
            }
            <form onSubmit={onSubmit} >
                <input type="text" name="username" {...register('username', { required: true })}
                    className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                    placeholder="Username" />
                {
                    errors.userName && (
                        <p className="text-red-500">Username is required</p>
                    )}
                <input type="email" name="email" {...register('email', { required: true })}
                    className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                    placeholder="Email" />
                {
                    errors.email && (
                        <p className="text-red-500">Email is required</p>
                    )}
                <input type="password" name="password" {...register('password', { required: true })}
                    className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                    placeholder="password" />
                {
                    errors.password && (
                        <p className="text-red-500">Password is required</p>
                    )}
                <button type="submit">Register</button>
            </form>
            <p className="flex gap-x-2 justify-between">
                Already have an account? <Link className="text-sky-500" to="/login">Sing Up</Link>
            </p>
        </div>
    );
}

export default RegisterPage;