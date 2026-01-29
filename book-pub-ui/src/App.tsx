import { useContext } from "react"
import { Routes, Route, Navigate } from "react-router-dom"
import { AuthProvider, AuthContext } from "./context/AuthContext"
import Layout from "./components/Layout"
import BooksPage from "./pages/BooksPage"
import AuditsPage from "./pages/AuditsPage"
import Login from "./components/Login"

function Content() {
  const { user, loading } = useContext(AuthContext)

  if (loading) return <div className="p-6">Loading...</div>
  if (!user) return <Login />

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<BooksPage />} />
        {user.role === "admin" && (
          <Route path="/audits" element={<AuditsPage />} />
        )}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Layout>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <Content />
    </AuthProvider>
  )
}
