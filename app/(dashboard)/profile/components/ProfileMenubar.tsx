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
            className="hover:bg-theme-gradient hover:text-surface-foreground"
        >
            {label}
        </Button>
    );
};

const ProfileMenubar = ({ activeItem, setActiveItem, menuItems }: { activeItem: any, setActiveItem: any, menuItems: { key: string, label: string }[] }) => {


    const handleMenuClick = (key: string) => {
        setActiveItem(key);
        console.log(`Selected: ${key}`);
    };

    return (
        <div className="w-full flex justify-center">
            <div className="w-fit flex space-x-2 bg-background p-2 rounded-md shadow-md">
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
