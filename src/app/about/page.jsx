"use client";

import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

// Function to fetch posts
const getAbouts = async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts');
    const data = await res.json();
    return data;
};

const Page = () => {
    const { data: session } = useSession();
    const [postData, setPostData] = useState([]);
    const [selectedPost, setSelectedPost] = useState(null); // For viewing details
    const [editPost, setEditPost] = useState(null); // For editing post

    // Fetch posts once component mounts
    useEffect(() => {
        const fetchData = async () => {
            const data = await getAbouts();
            setPostData(data);
        };
        fetchData();
    }, []);

    // Delete a post by ID
    const handleDelete = (id) => {
        setPostData(prevData => prevData.filter(post => post.id !== id));
        alert(`Post with ID ${id} deleted.`);
    };

    // Open the edit modal with the selected post data
    const handleUpdate = (post) => {
        setEditPost(post);
    };

    // Save changes made in the edit modal
    const saveEdit = () => {
        setPostData(prevData =>
            prevData.map(post => post.id === editPost.id ? editPost : post)
        );
        setEditPost(null); // Close the edit modal
        alert(`Post with ID ${editPost.id} updated.`);
    };

    // View post details
    const handleView = (post) => {
        setSelectedPost(post);
        alert(`Viewing details for post titled "${post.title}"`);
    };

    return (
        <div>
            <h2 className='text-center mb-10 font-bold'>All Posts</h2>
            <div className='grid grid-cols-2 gap-4'>
                {postData.map(({ id, title, body }) => (
                    <div key={id} className="bg-base-200 p-4 rounded-lg shadow-md">
                        <p className="py-2 text-4xl font-semibold">{title}</p>
                        <h1>{body}</h1>
                        {session ? (
                            <div className="flex space-x-2">
                                <button onClick={() => handleUpdate({ id, title, body })} className="btn btn-primary"><Link href={`/about/update/${id}`}>Update</Link></button>
                                <button onClick={() => handleDelete(id)} className="btn btn-error">Delete</button>
                                <button onClick={() => handleView({ id, title, body })} className="btn btn-secondary">
                                    <Link href={`/about/${id}`}>View</Link>
                                </button>
                            </div>
                        ) : (
                            <p className="text-red-500">Please log in to perform actions.</p>
                        )}
                    </div>
                ))}
            </div>

            {/* View Modal */}
            {selectedPost && (
                <div className="modal">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">Post Details</h3>
                        <p>Title: {selectedPost.title}</p>
                        <p>Post ID: {selectedPost.id}</p>
                        <button onClick={() => setSelectedPost(null)} className="btn btn-sm btn-circle absolute right-2 top-2">✕</button>
                    </div>
                </div>
            )}

            {/* Edit Modal */}
            {editPost && (
                <div className="modal">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">Edit Post</h3>
                        <label className="block">Title:</label>
                        <input
                            type="text"
                            value={editPost.title}
                            onChange={(e) => setEditPost({ ...editPost, title: e.target.value })}
                            className="input input-bordered w-full mb-2"
                        />
                        <label className="block">Body:</label>
                        <textarea
                            value={editPost.body}
                            onChange={(e) => setEditPost({ ...editPost, body: e.target.value })}
                            className="textarea textarea-bordered w-full mb-4"
                        />
                        <div className="modal-action">
                            <button onClick={saveEdit} className="btn btn-primary">Save</button>
                            <button onClick={() => setEditPost(null)} className="btn">Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Page;
