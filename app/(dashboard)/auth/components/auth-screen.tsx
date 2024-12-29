"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { SignInFlow } from "@/types";
import LoadingScreen from "@/components/LoadingScreen";

const SignInCard = dynamic(() => import("./sign-in-card"), {
    ssr: false, // Disable server-side rendering for these components
    loading: () => <LoadingScreen text="Launching Sign-in page" className="w-full" />,
});

const SignUpCard = dynamic(() => import("./sign-up-card"), {
    ssr: false,
    loading: () => <LoadingScreen text="Launching Sign-up page" className="w-full" />,
});

const AuthScreen = () => {
    const [state, setState] = useState<SignInFlow>("signIn");

    return (
        <div style={{ height: "calc(100vh - 8rem)" }} className=" ">
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
