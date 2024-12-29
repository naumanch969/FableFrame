"use client";
import React from "react";
import { motion } from "framer-motion";
import { LampContainer } from "@/components/aceternity/lamp";
import { CardBody, CardContainer, CardItem } from "@/components/aceternity/3D-Card";
import { CheckIcon } from "lucide-react";
import GradientText from "@/components/GradientText";

const Pricing = () => {
  return (
    <div className="h-fit relative w-full bg-background font-sans md:px-10 py-20 pb-72 flex flex-col items-center justify-center overflow-hidden rounded-md">

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
        <CardContainer className="inter-var ">
          <CardBody className="bg-surface relative group/card  dark:hover:shadow-2xl dark:hover:shadow-neutral-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-full md:!w-[350px] h-auto rounded-xl p-6 border">
            <CardItem
              translateZ="50"
              className="text-xl font-bold text-neutral-600 dark:text-surface-foreground "
            >
              Hobby
              <h2 className="text-6xl ">$0</h2>
            </CardItem>
            <CardItem
              translateZ="60"
              className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
            >
              Get a glimpse of what our software is capable of. Just a heads
              up {"you'll"} never leave us after this!
              <ul className="my-4 flex flex-col gap-2">
                <li className="flex items-center gap-2">
                  <CheckIcon />3 Free automations
                </li>
                <li className="flex items-center gap-2">
                  <CheckIcon />
                  100 tasks per month
                </li>
                <li className="flex items-center gap-2">
                  <CheckIcon />
                  Two-step Actions
                </li>
              </ul>
            </CardItem>
            <div className="flex justify-between items-center mt-8">
              <CardItem
                translateZ={20}
                as="button"
                className="px-4 py-2 rounded-xl text-xs font-normal dark:text-surface-foreground"
              >
                Try now →
              </CardItem>
              <CardItem
                translateZ={20}
                as="button"
                className="px-4 py-2 rounded-xl bg-black dark:bg-surface dark:text-black text-surface-foreground text-xs font-bold"
              >
                Get Started Now
              </CardItem>
            </div>
          </CardBody>
        </CardContainer>
        <CardContainer className="inter-var ">
          <CardBody className="bg-surface relative group/card  dark:hover:shadow-2xl dark:hover:shadow-neutral-500/[0.1] dark:bg-black dark:border-[#E2CBFF] border-black/[0.1] w-full md:!w-[350px] h-auto rounded-xl p-6 border">
            <CardItem
              translateZ="50"
              className="text-xl font-bold text-neutral-600 dark:text-surface-foreground "
            >
              Pro Plan
              <h2 className="text-6xl ">$29</h2>
            </CardItem>
            <CardItem
              translateZ="60"
              className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
            >
              Get a glimpse of what our software is capable of. Just a heads
              up {"you'll"} never leave us after this!
              <ul className="my-4 flex flex-col gap-2">
                <li className="flex items-center gap-2">
                  <CheckIcon />3 Free automations
                </li>
                <li className="flex items-center gap-2">
                  <CheckIcon />
                  100 tasks per month
                </li>
                <li className="flex items-center gap-2">
                  <CheckIcon />
                  Two-step Actions
                </li>
              </ul>
            </CardItem>
            <div className="flex justify-between items-center mt-8">
              <CardItem
                translateZ={20}
                as="button"
                className="px-4 py-2 rounded-xl text-xs font-normal dark:text-surface-foreground"
              >
                Try now →
              </CardItem>
              <CardItem
                translateZ={20}
                as="button"
                className="px-4 py-2 rounded-xl bg-black dark:bg-surface dark:text-black text-surface-foreground text-xs font-bold"
              >
                Get Started Now
              </CardItem>
            </div>
          </CardBody>
        </CardContainer>
        <CardContainer className="inter-var ">
          <CardBody className="bg-surface relative group/card  dark:hover:shadow-2xl dark:hover:shadow-neutral-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-full md:!w-[350px] h-auto rounded-xl p-6 border">
            <CardItem
              translateZ="50"
              className="text-xl font-bold text-neutral-600 dark:text-surface-foreground "
            >
              Unlimited
              <h2 className="text-6xl ">$99</h2>
            </CardItem>
            <CardItem
              translateZ="60"
              className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
            >
              Get a glimpse of what our software is capable of. Just a heads
              up {"you'll"} never leave us after this!
              <ul className="my-4 flex flex-col gap-2">
                <li className="flex items-center gap-2">
                  <CheckIcon />3 Free automations
                </li>
                <li className="flex items-center gap-2">
                  <CheckIcon />
                  100 tasks per month
                </li>
                <li className="flex items-center gap-2">
                  <CheckIcon />
                  Two-step Actions
                </li>
              </ul>
            </CardItem>
            <div className="flex justify-between items-center mt-8">
              <CardItem
                translateZ={20}
                as="button"
                className="px-4 py-2 rounded-xl text-xs font-normal dark:text-surface-foreground"
              >
                Try now →
              </CardItem>
              <CardItem
                translateZ={20}
                as="button"
                className="px-4 py-2 rounded-xl bg-black dark:bg-surface dark:text-black text-surface-foreground text-xs font-bold"
              >
                Get Started Now
              </CardItem>
            </div>
          </CardBody>
        </CardContainer>
      </div>

    </div>
  )
}

export default Pricing