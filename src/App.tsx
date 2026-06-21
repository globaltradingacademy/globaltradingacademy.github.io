import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Layout, { AdminLayout } from './components/Layout'
import HomePage from './pages/HomePage'
import ContactPage from './pages/ContactPage'
import AdminLeadsPage from './pages/AdminLeadsPage'

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Route>
          <Route element={<AdminLayout />}>
            <Route path="/admin/leads" element={<AdminLeadsPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
