import React, { useState } from 'react'
import axios from "axios"
import { useNavigate } from "react-router-dom"

const EditPost = () => {
    const [id, setId] = useState('')
    const [desc, setDesc] = useState('')
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append("desc", desc)
        const fileInput = e.target.image
        if (fileInput && fileInput.files[0]) {
            formData.append("image", fileInput.files[0])
        }

        try {
            await axios.patch(`http://localhost:3000/posts/${id}`, formData)
            alert("Post updated successfully")
            navigate("/feed")
        } catch (err) {
            console.log("Edit Error", err)
            alert("Error updating post. Please check the ID.")
        }
    }

    return (
        <section className='create-post-section'>
            <h1>Edit Post</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Enter Post ID"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Enter updated text"
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                    required
                />
                <input type="file" name="image" accept="image/*" />
                <button type="submit">Update Post</button>
            </form>
        </section>
    )
}

export default EditPost
