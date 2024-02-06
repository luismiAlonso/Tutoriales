import { Suspense, lazy } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import NavBar from "./components/NavBar"
import ProtectedRoute from "./components/ProtectedRoute"
// Importaciones lazy
const LoginPage = lazy(() => import("./pages/LoginPage"))
const MainTask = lazy(() => import("./pages/MainTask"))
const Produccion = lazy(() => import("./pages/Produccion"))
const ListarParteProduccion = lazy(
  () => import("./pages/ListarParteProduccion")
)
const OrdenProduccion = lazy(() => import("./pages/OrdenProduccion"))
const MainInventario = lazy(() => import("./pages/MainInventario"))
const EntradasInventarioConfiguracion = lazy(
  () => import("./pages/EntradasInventarioConfiguracion")
)
const EntradasInventarioPage = lazy(
  () => import("./pages/EntradasInventarioConfiguracion")
)
const ListadoInventario = lazy(() => import("./pages/ListadoInventario"))

// Repite para las demás páginas...

function App() {
  return (
    <BrowserRouter>
      <main className="container mx-auto px-10">
        <NavBar />
        <Suspense fallback={<div>Cargando...</div>}>
          <Routes>
            <Route path="/" element={<h1>Home Page</h1>} />
            <Route path="/login" element={<LoginPage />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/MainTask" element={<MainTask />} />
              <Route path="/MainTask" element={<MainTask />} />
              <Route path="/Produccion" element={<Produccion />} />
              <Route path="/Produccion/:idParte" element={<Produccion />} />
              <Route path="/ordenProduccion" element={<OrdenProduccion />} />
              <Route
                path="/ordenProduccion/:idParte"
                element={<OrdenProduccion />}
              />
              <Route
                path="/ordenProduccion/:idParte/productos/:indiceProducto"
                element={<OrdenProduccion />}
              />
              <Route
                path="/ListarParteProduccion"
                element={<ListarParteProduccion />}
              />
              <Route path="/MainInventario" element={<MainInventario />} />
              <Route
                path="/EntradasInventarioConfiguracion"
                element={<EntradasInventarioConfiguracion />}
              />
              <Route
                path="/EntradasInventarioPage/:seccion/:almacen"
                element={<EntradasInventarioPage />}
              />
              <Route
                path="/EntradasInventarioPage/:seccion/:almacen/:idProducto"
                element={<EntradasInventarioPage />}
              />
              <Route
                path="/ListadoInventario/"
                element={<ListadoInventario />}
              />
            </Route>
          </Routes>
        </Suspense>
      </main>
    </BrowserRouter>
  )
}

export default App
