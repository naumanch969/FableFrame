"use client"

import React, { ReactNode } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'

interface Props {
    title: string,
    description: string,
    children: ReactNode,
    open: boolean,
    onClose: () => void,
}

export const Modal = ({ title, description, children, open, onClose }: Props) => {


    return (
        <Dialog open={open} onOpenChange={onClose} >
            <DialogContent>
                {
                    <DialogHeader>
                        <DialogTitle>{title}</DialogTitle>
                    </DialogHeader>
                }
                {
                 
                    <DialogDescription>{description}</DialogDescription>
                }
                {children}
            </DialogContent>
        </Dialog >
    )
}