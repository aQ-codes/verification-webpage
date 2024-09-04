import Image from "next/image";
import React from "react";

type ButtonProps = {
    type: 'button' | 'submit';
    title: string;
    icon?: string; // ? means optional
    variant: string[];
    onClick?: () => void; // Adding onClick prop as optional
};

const Button = ({ type, title, icon, variant, onClick }: ButtonProps) => {
    return (
        <button
            className={`${variant.join(' ')}`}
            type={type}
            onClick={onClick} // Adding onClick handler
        >
            {icon && <Image src={icon} alt={title} width={24} height={24} />}
            <label>{title}</label>
        </button>
    );
};

export default Button;
