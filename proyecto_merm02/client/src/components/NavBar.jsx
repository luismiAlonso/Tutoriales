import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function NavBar() {
  const { isAuthenticated, logout, user } = useAuth()
  return (
    <nav className="bg-zinc-700 my-3 flex justify-between py-5 px-10 rounded-lg">
      <Link to="/tasks">
        <h1 className="text-2xl font-bold">Task Manager</h1>
      </Link>
      <ul className="flex gap-x-2">
        {isAuthenticated ? (
          <>
            <li>
              <Link to="/tasks">
                <h2>Wellcome {user.username}</h2>
              </Link>
            </li>
            <li>
              <Link
                className="bg-indigo-500 px-4 py-1 rounded-sm"
                to="/add-task"
              >
                Add Task
              </Link>
            </li>
            <li>
              <Link
                to="/"
                onClick={() => {
                  logout()
                }}
              >
                Logout
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link className="bg-indigo-500 px-4 py-1 rounded-sm" to="/login">
                Login
              </Link>
            </li>
            <li>
              <Link
                className="bg-indigo-500 px-4 py-1 rounded-sm"
                to="/register"
              >
                Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  )
}

export default NavBar
