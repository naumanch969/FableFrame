import React from 'react'
import { motion } from "framer-motion";
import { LampContainer } from "@/components/aceternity/lamp";
import { CardBody, CardContainer, CardItem } from "@/components/aceternity/3D-Card";
import { CheckIcon, X } from "lucide-react";
import { cn } from '@/lib/utils';
import { useGetProfile } from '@/features/profile/api/useGetProfile'
import { useCreateStripeCheckout } from '@/features/subscriptions/api/useCreateStripeUrl'
import { useGetMySubscription } from '@/features/subscriptions/api/useGetMySubscription'
import { toast } from 'sonner';
import { PLANS } from '@/constants';
import GradientText from '@/components/GradientText';


const Plans = () => {

    /////////////////////////////////////////////////////////// VARIABLES /////////////////////////////////////////////////////////////////////
    const { data: profile } = useGetProfile()
    const { data: subscription } = useGetMySubscription()
    const { mutate, isPending, error } = useCreateStripeCheckout()

    const plans = [
        {
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
            active: !subscription
        },
        {
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
            active: subscription?.plan === "pro"
        },
        {
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
            active: subscription?.plan === "unlimited"
        }
    ].map((plan, index) => {
        return {
            ...plan,
            name: PLANS[index].label,
            key: PLANS[index].key,
        }
    })


    /////////////////////////////////////////////////////////// FUNCTIONS /////////////////////////////////////////////////////////////////////
    const getPlanAction = (plan: any) => {

        const planName = plan.name
        const isActive = plan.active

        if (isActive && planName !== "Hobby") { // Pro or Unlimited plan but active
            return {
                label: "Manage your plan",
                classes: cn("bg-theme-gradient text-neutral"),
                wrapperClass: "justify-end",
                onClick: () => onUpgrade({ plan: plan.key, plan_description: plan.description, plan_price: plan.price })
            };
        }

        if (isActive && planName === "Hobby") { // Hobby plan and active
            return {
                label: "Upgrade to pro",
                classes: cn("bg-theme-gradient text-neutral"),
                wrapperClass: "justify-end",
                onClick: () => onUpgrade({ plan: plans[1]?.key as "pro", plan_description: plans[1]?.description, plan_price: plans[1]?.price })
            };
        }

        if (!isActive && planName !== "Hobby") {    // Pro or Unlimited plan but not active
            return {
                label: "Get Started Now",
                classes: cn("bg-theme-gradient text-neutral"),
                wrapperClass: "justify-between",
                additionalAction: {
                    label: "Try now →",
                    classes: "px-4 py-2 rounded-xl text-xs font-normal",
                },
                onClick: () => onUpgrade({ plan: plan.name, plan_description: plan.description, plan_price: plan.price })
            };
        }

        return null;
    };

    const onUpgrade = ({
        plan,
        plan_description,
        plan_price,
    }: { plan: "pro" | "unlimited", plan_description: string, plan_price: number }) => {
        console.log("Upgrade to premium")
        mutate({
            profile_id: profile?._id!,
            email: profile?.email!,
            plan,
            plan_description,
            plan_price,
        }, {
            onSuccess: (payload: { checkoutUrl: string }) => {
                if (payload) {
                    window.location.href = payload.checkoutUrl
                }
            },
            onError: (error: Error) => {
                toast.error("Error upgrading to premium")
                console.error("Error upgrading to premium", error)
            }
        })
    }

    /////////////////////////////////////////////////////////// COMPONENTS /////////////////////////////////////////////////////////////////////

    const PlanAction = ({ plan }: { plan: any }) => {
        const action = getPlanAction(plan);

        if (!action) return null;

        return (
            <span className={`flex items-end gap-2 mt-8 ${action.wrapperClass}`}>
                {action.additionalAction && (
                    <CardItem
                        disabled={!profile || isPending}
                        translateZ={40}
                        as="button"
                        className={action.additionalAction.classes}
                        onClick={() => action.onClick()}
                    >
                        {action.additionalAction.label}
                    </CardItem>
                )}
                <CardItem
                    disabled={!profile || isPending}
                    translateZ={40}
                    as="button"
                    className={`px-4 py-2 rounded-xl text-xs font-bold disabled:cursor-not-allowed disabled:bg-opacity-80 ${action.classes}`}
                    onClick={() => action.onClick()}
                >
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
                    <GradientText>
                        Plans That
                        <br /> Fit You Best
                    </GradientText>
                </motion.h1>
            </LampContainer>


            <div className="flex flex-wrap items-center justify-center flex-col md:flex-row gap-8 -mt-72">
                {
                    plans.map((plan, index) => {
                        const isPro = plan.name == "Pro Plan"
                        const isActive = plan.active
                        return (
                            <CardContainer key={index} className="inter-var h-full ">
                                <CardBody className={cn(
                                    "bg-surface relative group/card  dark:hover:shadow-2xl w-full md:!w-[350px] h-auto rounded-xl p-6 border",
                                    isPro ? "border-primary" : "border-black/[0.1]"
                                )}>
                                    <CardItem
                                        translateZ="70"
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
                                        translateZ="100"
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
                                    <PlanAction plan={plan} />
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