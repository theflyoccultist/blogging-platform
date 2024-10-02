import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from './App.tsx'
import './styles/index.css'

import Login from './pages/Login.tsx';
import BlogPosts from './pages/Platform';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<App />} />
      <Route path='/login' element={<Login />} />
      <Route path='/platform' element={<BlogPosts />} />
    </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
