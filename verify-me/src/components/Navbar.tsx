"use client";

import React, { useState } from 'react'
import Link from 'next/link';
import Image from 'next/image';
import Button from './ui/Button2';

const Navbar = () => {

    const [isActive, setIsActive] = useState(false);

    return (
        <>
            <div className="main-container">

                {/* branding  */}
                <div className="branding">

                    {/* company logo  */}
                    <Link href="/" className="main-logo">
                        <Image
                            src="/assets/images/logo.png"
                            alt="company_logo"
                            width={160}
                            height={72}
                        />
                    </Link>

                </div>
                {/* end of branding */}
                
                {/* icon for mobile menu toggle  */}
                {/* <div id="mobile-menu-icon" onClick={() => setIsActive(true)} >
                    <Image src="/assets/icons/menu-icon.png" alt="menu icon" width={24} height={24} />
                </div> */}


                {/* Navigation menu */}
                <nav>
                    {/* <button id="close-btn" onClick={() => setIsActive(false)}>
                        <Image src="/assets/icons/Close_round_light.svg" alt="close button" width={20} height={14} />
                    </button> */}
                    <ul>
                        <li>
                            <Link href='/auth/signup'>Login</Link>      
                        </li>    
                        <li>
                            <Button
                                type='button'
                                title='Jhon Doe'
                                icon='/assets/icons/user.png'
                                variant={['btn', 'user-icon']}/>
                        </li> 
                    </ul>
                </nav>
                {/* End of navigation menu */}


            </div>

        </>
    )
}

export default Navbar