import { Card } from '@/components/ui/card';
import React from 'react';

const LeftPane = () => {
    return (
        <Card style={{ padding: '3rem' }} className="w-full h-fit">
            <img src='/welcome.svg' alt='welcome'  />
        </Card>
    );
};

export default LeftPane;
