"use client";

import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react'; // Import useSession from next-auth

// Function to fetch users
const getAbouts = async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/users');
    const data = await res.json();
    return data;
};

const Page = () => {
    const { data: session } = useSession(); // Get the current session to check if user is logged in
    const [postData, setPostData] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null); // For viewing individual user details

    // Fetch users once component mounts
    useEffect(() => {
        const fetchData = async () => {
            const data = await getAbouts();
            setPostData(data);
        };
        fetchData();
    }, []);

    // Delete a user by ID
    const handleDelete = (id) => {
        setPostData(prevData => prevData.filter(user => user.id !== id));
        alert(`User with ID ${id} deleted.`);
    };

    // Update user information (for simplicity, we’ll change the username here)
    const handleUpdate = (id) => {
        setPostData(prevData =>
            prevData.map(user =>
                user.id === id ? { ...user, username: user.username + " Updated" } : user
            )
        );
        alert(`User with ID ${id} updated.`);
    };

    // View user details
    const handleView = (user) => {
        setSelectedUser(user);
        alert(`Viewing details for ${user.username}`);
    };

    return (
        <div>
            <h2>All About</h2>
            <div className='grid grid-cols-2 gap-4'>
                {postData.map(({ id, username }) => (
                    <div key={id} className="bg-base-200 p-4 rounded-lg shadow-md">
                        <h1 className="text-2xl font-bold">User Name: {username}</h1>
                        <p className="py-2">
                            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                            quasi. In deleniti eaque aut repudiandae et a id nisi.
                        </p>
                        {/* Conditionally render action buttons based on session */}
                        {session ? (
                            <div className="flex space-x-2">
                                <button onClick={() => handleUpdate(id)} className="btn btn-primary">Update</button>
                                <button onClick={() => handleDelete(id)} className="btn btn-error">Delete</button>
                                <button onClick={() => handleView({ id, username })} className="btn btn-secondary">View</button>
                            </div>
                        ) : (
                            <p className="text-red-500">Please log in to perform actions.</p>
                        )}
                    </div>
                ))}
            </div>
            {selectedUser && (
                <div className="modal">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">User Details</h3>
                        <p>User Name: {selectedUser.username}</p>
                        <p>User ID: {selectedUser.id}</p>
                        <button onClick={() => setSelectedUser(null)} className="btn btn-sm btn-circle absolute right-2 top-2">✕</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Page;
