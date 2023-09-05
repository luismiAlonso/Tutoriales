import { BrowserRouter, Routes, Route } from "react-router-dom"
import { AuthProvider } from "./context/AuthContext"
import { TaskProvider } from "./context/TaskContext"
import { TransactionProvider } from "./context/TransactionContext"
import RegisterPage from "./pages/RegisterPage"
import LoginPage from "./pages/LoginPage"
import TaskPage from "./pages/TasksPage"
import TaskFormPage from "./pages/TaskFormPage"
import ProfilePage from "./pages/ProfilePage"
import ProtectedRoute from "./ProtectedRoute"
import NavBar from "./components/NavBar"
import TransactionPage from "./pages/TransactionPage"

function App() {
  
  return (
    <AuthProvider>
      <TaskProvider>
        <TransactionProvider>
          <BrowserRouter>
            <main className="container mx-auto px-10">
              <NavBar />
              <Routes>
                <Route path="/" element={<h1>Home Page</h1>} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />

                <Route element={<ProtectedRoute />}>
                  <Route path="/tasks" element={<TaskPage />} />
                  <Route path="/add-task" element={<TaskFormPage />} />
                  <Route path="/tasks/:id" element={<TaskFormPage />} />
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="/transactions" element={<TransactionPage />} />
                </Route>
              </Routes>
            </main>
          </BrowserRouter>
        </TransactionProvider>
      </TaskProvider>
    </AuthProvider>
  )
}

export default App
