import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop'
import Landing from './pages/landing'
import Register from './pages/register'
import Profile from './pages/profile'
import Admin from './pages/admin'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/profile/:slug" element={<Profile />} />
        <Route path="/admin" element={<Admin />} />
        {/* Candidacy registration is an admin-only action. */}
        <Route path="/admin/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
