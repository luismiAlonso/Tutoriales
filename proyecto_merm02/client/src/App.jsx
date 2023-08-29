import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/authContext'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import TaskPage from './pages/TaskPage'
import ProfilePage from './pages/ProfilePage'
import ProtectedRoute from './ProtectedRoute'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<h1>Home Page</h1>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/task" element={<TaskPage />} />
            <Route path="/add-tasl" element={<TaskPage />} />
            <Route path="/task/:id" element={<TaskPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
