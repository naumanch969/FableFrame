import React, { ReactNode } from "react";

interface Props {
    children: ReactNode,
    className?: string,
    gradient?: string,
    bg?: string
}

const GradientText = ({ children, className = "", gradient = "from-purple-400 via-pink-500 to-red-500", bg }: Props) => {
    return (
        bg
            ?
            <span className={`bg-[${bg}] inline-block px-2 py-1 rounded-full opacity-100 `}>
                <span className={`text-transparent bg-clip-text bg-gradient-to-r ${gradient} ${className}`}>
                    {children}
                </span>
            </span>
            :
            <span className={`text-transparent bg-clip-text bg-gradient-to-r ${gradient} ${className}`}>
                {children}
            </span>
    );
};

export default GradientText;
