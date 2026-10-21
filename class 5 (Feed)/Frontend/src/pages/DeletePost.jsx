import React, { useState } from 'react'
import axios from "axios"
import { useNavigate } from "react-router-dom"

const DeletePost = () => {
    const [id, setId] = useState('')
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await axios.delete(`http://localhost:3000/posts/${id}`)
            alert("Post deleted successfully")
            navigate("/feed")
        } catch (err) {
            console.log("Delete Error", err)
            alert("Error deleting post. Please check the ID.")
        }
    }

    return (
        <section className='create-post-section'>
            <h1>Delete Post</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Enter Post ID to delete"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                    required
                />
                <button type="submit" style={{ backgroundColor: '#e53935' }}>Delete</button>
            </form>
        </section>
    )
}

export default DeletePost
