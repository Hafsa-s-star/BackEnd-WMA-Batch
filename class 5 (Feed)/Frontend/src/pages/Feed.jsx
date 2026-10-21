import React, { useState, useEffect } from 'react'
import axios from "axios"

const Feed = () => {
    const [posts, setPosts] = useState([])
    const [showEditForm, setShowEditForm] = useState(false)
    const [showDeleteForm, setShowDeleteForm] = useState(false)
    const [editId, setEditId] = useState('')
    const [editDesc, setEditDesc] = useState('')
    const [deleteId, setDeleteId] = useState('')

    const fetchPosts = () => {
        axios.get("http://localhost:3000/posts")
            .then(res => {
                if (res.data && res.data.post) {
                    setPosts(res.data.post)
                }
            })
            .catch(err => console.log("Fetch Error", err))
    }

    useEffect(() => {
        fetchPosts()
    }, [])

    const handleEditSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append("desc", editDesc)
        const fileInput = e.target.image
        if (fileInput && fileInput.files[0]) {
            formData.append("image", fileInput.files[0])
        }

        try {
            await axios.patch(`http://localhost:3000/posts/${editId}`, formData)
            alert("Post updated successfully")
            setShowEditForm(false)
            setEditId('')
            setEditDesc('')
            fetchPosts()
        } catch (err) {
            console.log("Edit Error", err)
            alert("Error updating post. Please check the ID.")
        }
    }

    const handleDeleteSubmit = async (e) => {
        e.preventDefault()
        try {
            await axios.delete(`http://localhost:3000/posts/${deleteId}`)
            alert("Post deleted successfully")
            setShowDeleteForm(false)
            setDeleteId('')
            fetchPosts()
        } catch (err) {
            console.log("Delete Error", err)
            alert("Error deleting post. Please check the ID.")
        }
    }

    return (
        <section className='feed-section'>
            <div style={{ display: 'flex', gap: '10px' }}>
                <button className='btn' onClick={() => {
                    window.location.href = '/create-post'
                }}>Create Post</button>
                <button className='btn' onClick={() => {
                    setShowEditForm(prev => !prev)
                    setShowDeleteForm(false)
                }}>Edit</button>
                <button className='btn' style={{ backgroundColor: '#e53935' }} onClick={() => {
                    setShowDeleteForm(prev => !prev)
                    setShowEditForm(false)
                }}>Delete</button>
            </div>

            <h1>My Feed</h1>

            {/* Short Form for Edit */}
            {showEditForm && (
                <form className='form-card' onSubmit={handleEditSubmit}>
                    <h3>Edit Post</h3>
                    <input
                        type="text"
                        name="id"
                        placeholder="Enter Post ID"
                        value={editId}
                        onChange={(e) => setEditId(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        name="desc"
                        placeholder="Enter updated text"
                        value={editDesc}
                        onChange={(e) => setEditDesc(e.target.value)}
                        required
                    />
                    <input
                        type="file"
                        name="image"
                        accept="image/*"
                    />
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <button type="submit" className='btn'>Update Post</button>
                        <button type="button" className='btn' style={{ backgroundColor: '#888' }} onClick={() => setShowEditForm(false)}>Cancel</button>
                    </div>
                </form>
            )}

            {/* Short Form for Delete */}
            {showDeleteForm && (
                <form className='form-card' onSubmit={handleDeleteSubmit}>
                    <h3>Delete Post</h3>
                    <input
                        type="text"
                        name="id"
                        placeholder="Enter Post ID to delete"
                        value={deleteId}
                        onChange={(e) => setDeleteId(e.target.value)}
                        required
                    />
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <button type="submit" className='btn' style={{ backgroundColor: '#e53935' }}>Delete</button>
                        <button type="button" className='btn' style={{ backgroundColor: '#888' }} onClick={() => setShowDeleteForm(false)}>Cancel</button>
                    </div>
                </form>
            )}

            {
                posts && posts.length > 0 ? (
                    posts.map((post) => (
                        <div key={post._id} className='post-card'>
                            <p style={{ fontSize: '13px', color: '#666', marginBottom: '8px' }}>
                                <strong>ID:</strong> {post._id}
                            </p>
                            <img src={post.image} alt={post.desc} />
                            <p style={{ marginTop: '10px' }}>{post.desc}</p>
                            <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
                                <button
                                    className='btn'
                                    style={{ padding: '6px 12px', fontSize: '13px' }}
                                    onClick={() => {
                                        setEditId(post._id)
                                        setEditDesc(post.desc || '')
                                        setShowEditForm(true)
                                        setShowDeleteForm(false)
                                        window.scrollTo({ top: 0, behavior: 'smooth' })
                                    }}
                                >
                                    Edit
                                </button>
                                <button
                                    className='btn'
                                    style={{ padding: '6px 12px', fontSize: '13px', backgroundColor: '#e53935' }}
                                    onClick={() => {
                                        setDeleteId(post._id)
                                        setShowDeleteForm(true)
                                        setShowEditForm(false)
                                        window.scrollTo({ top: 0, behavior: 'smooth' })
                                    }}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <h1>No posts available</h1>
                )
            }
        </section>
    )
}

export default Feed