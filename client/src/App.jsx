import { Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

import './App.css'
import HomePage from './pages/home/HomePage'
import ArticleDetailPage from './pages/articleDetail/ArticleDetailPage'
import RegisterPage from './pages/register/RegisterPage'
import LoginPage from './pages/login/LoginPage'
import ProfilePage from './pages/profile/ProfilePage'


function App() {

  return (
    <div className="App font-opensans">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/blog/:id" element={<ArticleDetailPage />} />
      </Routes>
      <Toaster />
    </div>
  )
}

export default App
