import React from 'react'
import { motion } from "framer-motion";
import { LampContainer } from "@/components/aceternity/lamp";
import { CardBody, CardContainer, CardItem } from "@/components/aceternity/3D-Card";
import { CheckIcon, X } from "lucide-react";
import { cn } from '@/lib/utils';


const Plans = () => {

    const plans = [
        {
            name: "Hobby",
            price: 0,
            description: "Experience the magic of AI-powered storytelling for free. Perfect for exploring the basics and creating quick stories.",
            features: [
                { text: "50 credits per month", available: true },
                { text: "2 Stories per day", available: true },
                { text: "Two-step Actions", available: false },
                { text: "Priority Support", available: false },
                { text: "Custom Stories", available: false },
                { text: "Special Dictionary Features", available: false },
            ],
            active: true
        },
        {
            name: "Pro Plan",
            price: 3,
            description: "Elevate your creativity with enhanced features, perfect for regular storytellers who want more control and flexibility.",
            features: [
                { text: "500 credits", available: true },
                { text: "10 Stories per day", available: true },
                { text: "Two-step Actions", available: true },
                { text: "Priority Support", available: true },
                { text: "Custom Stories", available: true },
                { text: "Special Dictionary Features", available: false },
            ],
            active: false
        },
        {
            name: "Unlimited",
            price: 15,
            description: "Unlock the full potential of FableFrame with unlimited access to all features. Ideal for avid creators and professionals.",
            features: [
                { text: "Unlimited credits", available: true },
                { text: "Unlimited Stories per day", available: true },
                { text: "Two-step Actions", available: true },
                { text: "Priority Support", available: true },
                { text: "Custom Stories", available: true },
                { text: "Special Dictionary Features", available: true },
            ],
            active: false
        }
    ];

    const getPlanAction = (planName: string, isActive: boolean, isPro: boolean) => {
        if (isActive && planName !== "Hobby") {
            return {
                label: "Manage your plan",
                classes: cn("bg-theme-gradient text-neutral"),
                wrapperClass: "justify-end",
            };
        }

        if (isActive && planName === "Hobby") {
            return {
                label: "Upgrade to pro",
                classes: cn("bg-theme-gradient text-neutral"),
                wrapperClass: "justify-end",
            };
        }

        if (!isActive && planName !== "Hobby") {
            return {
                label: "Get Started Now",
                classes: cn("bg-theme-gradient text-neutral"),
                wrapperClass: "justify-between",
                additionalAction: {
                    label: "Try now →",
                    classes: "px-4 py-2 rounded-xl text-xs font-normal",
                },
            };
        }

        return null;
    };

    const PlanAction = ({ planName, isActive, isPro }: { planName: string; isActive: boolean; isPro: boolean }) => {
        const action = getPlanAction(planName, isActive, isPro);

        if (!action) return null;

        return (
            <span className={`flex items-end gap-2 mt-8 ${action.wrapperClass}`}>
                {action.additionalAction && (
                    <CardItem translateZ={20} as="button" className={action.additionalAction.classes}>
                        {action.additionalAction.label}
                    </CardItem>
                )}
                <CardItem translateZ={20} as="button" className={`px-4 py-2 rounded-xl text-xs font-bold ${action.classes}`}>
                    {action.label}
                </CardItem>
            </span>
        );
    };



    return (
        <div className="h-fit relative w-full bg-background font-sans md:px-10 pb-72 flex flex-col items-center justify-center overflow-hidden rounded-md">

            <LampContainer>
                <motion.h1
                    initial={{ opacity: 0.5, y: 100 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{
                        delay: 0.3,
                        duration: 0.8,
                        ease: 'easeInOut',
                    }}
                    className="mt-20 text-surface-foreground py-4 text-center text-4xl font-medium tracking-tight md:text-7xl"
                >
                    Plans That
                    <br /> Fit You Best
                </motion.h1>
            </LampContainer>


            <div className="flex flex-wrap items-center justify-center flex-col md:flex-row gap-8 -mt-72">
                {
                    plans.map((plan, index) => {
                        const isPro = plan.name == "Pro Plan"
                        const isActive = plan.active
                        return (
                            <CardContainer key={index} className="inter-var ">
                                <CardBody className={cn(
                                    "bg-surface relative group/card  dark:hover:shadow-2xl w-full md:!w-[350px] h-auto rounded-xl p-6 border",
                                    isPro ? "border-primary" : "border-black/[0.1]"
                                )}>
                                    <CardItem
                                        translateZ="50"
                                        className="text-neutral-foreground w-full"
                                    >
                                        <span className='w-full flex justify-between items-center gap-1' >
                                            <span className='text-xl font-bold flex gap-1' >
                                                <span>{plan.name}</span>
                                                {isPro && <span className='border border-primary text-primary rounded-full px-1.5 py-0.5 text-xs flex justify-center items-center h-fit w-fit font-light' >Suggested</span>}
                                            </span>
                                            {isActive && <span className='bg-neutral-foreground text-neutral rounded-full px-1.5 py-0.5 text-xs flex justify-center items-center h-fit w-fit font-light' >Active</span>}
                                        </span>
                                        <h2 className="text-6xl ">${plan.price}</h2>
                                    </CardItem>
                                    <CardItem
                                        translateZ="60"
                                        className="text-surface-foreground text-sm max-w-sm mt-2"
                                    >
                                        {plan.description}
                                        <ul className="my-4 flex flex-col gap-2">
                                            {
                                                plan.features.map((feature, i) => (
                                                    <li key={i} className="flex items-center gap-2">
                                                        {feature.available ? <CheckIcon className='text-neutral-foreground' /> : <X className='text-destructive' />} {feature.text}
                                                    </li>
                                                ))
                                            }
                                        </ul>
                                    </CardItem>
                                    <PlanAction planName={plan.name} isActive={isActive} isPro={isPro} />
                                </CardBody>
                            </CardContainer>
                        )
                    })
                }
            </div>

        </div >
    )
}

export default Plans