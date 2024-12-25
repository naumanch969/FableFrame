"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SignInCard from "./sign-in-card";
import SignUpCard from "./sign-up-card";
import { SignInFlow } from "@/types";
import { LOGIN_1, LOGIN_2, LOGIN_3 } from "@/constants/images";

const AuthScreen = () => {
    const [state, setState] = useState<SignInFlow>("signIn");
    const [currentImage, setCurrentImage] = useState(0);

    const images = [LOGIN_1, LOGIN_2, LOGIN_3];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage((prev) => (prev + 1) % images.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [images.length]);

    return (
        <div style={{ height: "calc(100vh - 8rem)" }} className=" ">
            {/* Background Image with Transition */}
            <div className="absolute top-0 left-0 w-full h-full z-0 overflow-hidden">
                <AnimatePresence>
                    <motion.img
                        key={currentImage}
                        src={images[currentImage]}
                        alt=""
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 2 }} // Slower transition duration
                        className="absolute top-0 left-0 w-full h-full object-cover"
                    />
                </AnimatePresence>
                {/* Overlay Effect */}
                <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-60 z-10" />
            </div>

            {/* Content */}
            <div className="flex flex-col justify-center items-center gap-6 relative z-20 h-full">
                <div className="md:h-auto md:w-[420px]">
                    {state === "signIn" ? (
                        <SignInCard setState={setState} />
                    ) : (
                        <SignUpCard setState={setState} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default AuthScreen;
