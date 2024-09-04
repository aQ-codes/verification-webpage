"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Button from './ui/Button2';
import { useRouter } from 'next/navigation';

const Navbar = () => {
    const [user, setUser] = useState<{ _id?: string } | null>(null);
    const router = useRouter();

    useEffect(() => {
        // Function to check session storage for user
        const checkUserInSessionStorage = () => {
            const storedUser = sessionStorage.getItem('user');
            if (storedUser) {
                setUser(JSON.parse(storedUser));
            } else {
                setUser(null);
            }
        };

        // Initial check when the component mounts
        checkUserInSessionStorage();

        // Event listener for changes in session storage
        const handleStorageChange = () => {
            checkUserInSessionStorage();
        };

        window.addEventListener('storage', handleStorageChange);

        // Cleanup listener on unmount
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    const handleLogout = () => {
        // Remove user from session storage and update state
        sessionStorage.removeItem('user');
        setUser(null);
        router.push('/'); // Redirect to home page
    };

    // Determine the URL for the Verify link
    const verifyLink = user?._id ? `/profile/${user._id}` : '/verify/phone';

    return (
        <div className="main-container">
            {/* Branding */}
            <div className="branding">
                {/* Company logo */}
                <Link href="/" className="main-logo">
                    <Image
                        src="/assets/images/logo.png"
                        alt="company_logo"
                        width={160}
                        height={72}
                    />
                </Link>
            </div>

            <nav>
                <ul>
                    {user?._id ? (
                        <>
                            <li>
                                <Link href='/verify/pincode'>Location</Link>
                            </li>
                            <li>
                                <Link href={verifyLink}>Verify</Link>
                            </li>
                            <li>
                                <Button
                                    type='button'
                                    title='Log Out'
                                    icon='/assets/icons/user.png'
                                    variant={['btn', 'user-icon']}
                                    onClick={handleLogout}
                                />
                            </li>
                        </>
                    ) : (
                        <li>
                            <Link href='/auth/signup'>Sign In</Link>
                        </li>
                    )}
                </ul>
            </nav>
            {/* End of navigation menu */}
        </div>
    );
};

export default Navbar;
