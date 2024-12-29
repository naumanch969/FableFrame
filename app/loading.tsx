import dynamic from 'next/dynamic';
import React from 'react'

const LoadingScreen = dynamic(() => import("@/components/LoadingScreen"));

const Loading = () => {
    return (
        <LoadingScreen />
    )
}

export default Loading
