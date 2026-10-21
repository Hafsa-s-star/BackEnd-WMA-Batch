import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import CreatePost from './pages/CreatePost.jsx'
import Feed from './pages/Feed.jsx'
import EditPost from './pages/EditPost.jsx'
import DeletePost from './pages/DeletePost.jsx'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/create-post' element={<CreatePost />} />
        <Route path='/edit-post' element={<EditPost />} />
        <Route path='/delete-post' element={<DeletePost />} />
        <Route path='/feed' element={<Feed />} />
        <Route path='/' element={<Feed />} />
      </Routes>
    </Router>
  )
}

export default App