"use client"

import { Button } from "@/components/ui/button";
import React, { useState } from "react";

interface MenuItemProps {
    label: string;
    isActive?: boolean;
    onClick: () => void;
}

const MenuItem: React.FC<MenuItemProps> = ({ label, isActive, onClick }) => {
    return (
        <Button
            variant={isActive ? "default" : "secondary"}
            onClick={onClick}
            className="hover:bg-primary hover:text-white"
        >
            {label}
        </Button>
    );
};

const ProfileMenubar: React.FC = () => {
    const [activeItem, setActiveItem] = useState("your");

    const menuItems = [
        { label: "Your Stories", key: "your" },
        { label: "AI Stories", key: "ai" },
        { label: "Draft Stories", key: "draft" },
        { label: "Shared Stories", key: "shared" },
        { label: "Liked Stories", key: "liked" },
    ];

    const handleMenuClick = (key: string) => {
        setActiveItem(key);
        console.log(`Selected: ${key}`);
    };

    return (
        <div className="w-full flex justify-center">
            <div className="w-fit flex space-x-2 bg-white p-2 rounded-md shadow-md">
                {menuItems.map((item) => (
                    <MenuItem
                        key={item.key}
                        label={item.label}
                        isActive={activeItem === item.key}
                        onClick={() => handleMenuClick(item.key)}
                    />
                ))}
            </div>
        </div>
    );
};

export default ProfileMenubar;
