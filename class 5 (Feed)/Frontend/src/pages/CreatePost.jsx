import React from 'react'
import axios from "axios"
import { useNavigate } from "react-router-dom"

const CreatePost = () => {
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        try {
            await axios.post("http://localhost:3000/posts", formData)
            alert("Post submitted")
            navigate("/feed")
        } catch (err) {
            console.log("Post Error", err)
            alert("Error creating post")
        }
    }

    return (
        <section className='create-post-section'>
            <h1>Create post</h1>

            <form onSubmit={handleSubmit}>
                <input type="file" name="image" accept="image/*" />
                <input type="text" name='desc' placeholder='Enter description' required />
                <button type='submit'>Submit</button>
            </form>
        </section>
    )
}

export default CreatePost