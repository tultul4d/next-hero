"use client"; // Make the component a client component

import { useEffect, useState } from "react";

const getDetailsAbout = async (id) => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
    const data = await res.json();
    return data;
};

const AboutDetailsPage = ({ params }) => {
    const [post, setPost] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const { id } = await params; // Await params to access its properties
            const postData = await getDetailsAbout(id);
            setPost(postData);
        };

        fetchData();
    }, [params]);

    if (!post) return <div>Loading...</div>;

    return (
        <div className="card bg-base-100 w-96 shadow-xl text-center ml-96 mt-5 mb-5">
            <div className="card-body">
                <h2 className="font-semibold text-center">{post.title}</h2>
                <p className=" text-sm font-normal">{post.body}</p>
                <div className="card-actions justify-end">
                    <button className="btn btn-primary">See More.....</button>
                </div>
            </div>
        </div>
    );
};

export default AboutDetailsPage;
