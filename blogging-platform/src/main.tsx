import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from './App.tsx'
import './styles/index.css'

import Login from './pages/Login.tsx';
import Register from './pages/Register.tsx';
import BlogPosts from './pages/Platform';
import CreatePost from "./pages/PostCreate.tsx";
import EditPost from "./pages/PostEdit.tsx"

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<App />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/platform' element={<BlogPosts />} />
      <Route path='/createpost' element={<CreatePost />} />
      <Route path='/editpost/:id' element={<EditPost />} />
    </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
