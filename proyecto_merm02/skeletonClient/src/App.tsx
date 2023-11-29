import { BrowserRouter, Routes, Route,useNavigate} from "react-router-dom"
import LoginPage from "./pages/LoginPage"
import MainTask from "./pages/MainTask"
import NavBar from "./components/NavBar"
import ProtectedRoute from "./components/ProtectedRoute"
import Produccion from "./pages/Produccion"
import OrdenProducionPage from "./pages/OrdenProducionPage"
import MainInventario from "./pages/MainInventario"
import EntradasInventarioPage from "./pages/EntradasInventarioPage"
import EntradasInventarioConfiguracion from "./pages/EntradasInventarioConfiguracion"
import ListarParteProduccion from "./pages/ListarParteProduccion"

/*
import RegisterPage from "./pages/RegisterPage"
import TaskPage from "./pages/TasksPage"
import ProfilePage from "./pages/ProfilePage"
import ProtectedRoute from "./ProtectedRoute"
import TransactionPage from "./pages/TransactionPage"*/

function App() {

  return (
    <BrowserRouter>
      <main className="container mx-auto px-10">
        <NavBar />
        <Routes>
          <Route path="/" element={<h1>Home Page</h1>} />
          <Route path="/login" element={<LoginPage />} />
          <Route element={<ProtectedRoute />} >
            <Route path="/MainTask" element={<MainTask />} /> 
            <Route path="/Produccion" element={<Produccion />} />
            <Route path="/OrdenProducionPage" element={<OrdenProducionPage />} />
            <Route path="/ListarParteProduccion" element={<ListarParteProduccion />} />
            <Route path="/MainInventario" element={<MainInventario />} />
            <Route path="/EntradasINventario" element={<MainInventario />} />
            <Route path="/EntradasInventarioPage" element={<EntradasInventarioPage />} />
            <Route path="/EntradasInventarioConfiguracion" element={<EntradasInventarioConfiguracion />} />
          </Route> 
          {/*<Route path="/register" element={<RegisterPage />} />
                <Route element={<ProtectedRoute />}>
                  <Route path="/tasks" element={<TaskPage />} />
                  <Route path="/add-task" element={<TaskFormPage />} />
                  <Route path="/tasks/:id" element={<TaskFormPage />} />
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="/transactions" element={<TransactionPage />} />
              </Route>*/}
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App
