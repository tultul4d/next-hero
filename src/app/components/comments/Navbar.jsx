"use client";

import { useSession, signIn, signOut } from 'next-auth/react';
import Link from 'next/link';
import React from 'react';

const Navbar = () => {
    const { data: session, status } = useSession();
    console.log(session);

    return (
        <div className="navbar bg-base-100">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16"
                            />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                    >
                        {/* Add dropdown items here if needed */}
                    </ul>
                </div>
                <h1 className="btn btn-ghost text-xl">Next Hero</h1>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    <li>
                        <Link href="about">
                            About
                        </Link>
                    </li>
                    <li>
                        <Link href="">
                            Home
                        </Link>
                    </li>
                </ul>
            </div>
            <div className="navbar-end">
                {status === "authenticated" ? (
                    <button onClick={() => signOut()} className="btn">
                        Logout
                    </button>
                ) : (
                    <button onClick={() => signIn()} className="btn">
                        Login
                    </button>
                )}
            </div>
        </div>
    );
};

export default Navbar;
