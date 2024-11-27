import React, { lazy, Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthenticatedLayout from './components/AuthenticatedLayout';
import './styles/index.css';

import App from './App'
import Login from './pages/Login';
import Register from './pages/Register';
const BlogPosts = lazy(() => import('./pages/Platform'));
const CreatePost = lazy(() => import('./pages/PostCreate'));
const EditPost = lazy (() => import('./pages/PostEdit'));

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
        <Routes>
          <Route path='/' element={<App />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />

            <Route element={<AuthenticatedLayout />}>
              <Route path='/platform' element={
                <Suspense fallback={<div>Loading the platform...</div>}>
                <BlogPosts />
                </Suspense>
                } />
              <Route path='/createpost' element={
                <Suspense fallback={<div>Loading...</div>}>
                <CreatePost />          
                </Suspense>
                } />
              <Route path='/editpost/:id' element={
                <Suspense fallback={<div>Loading...</div>}>
                <EditPost />          
                </Suspense>
                } />
            </Route>
        </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
