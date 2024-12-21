"use client";
import { BackgroundBeams } from "@/components/aceternity/background-beams";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import React, { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add form submission logic here (e.g., sending data to an API or email)
    console.log("Form Submitted:", formData);
  };

  return (
    <div className="w-full relative bg-background dark:bg-neutral-950 font-sans md:px-10 py-40 flex flex-col items-center">
     
      <div className="max-w-2xl mx-auto p-4">
        <h1 className="relative z-10 text-3xl md:text-5xl bg-clip-text text-neutral-700 text-center font-sans font-bold">
          Get in Touch
        </h1>
        <p className="text-neutral-500 max-w-lg mx-auto my-4 text-base md:text-lg text-center relative z-10">
          We would love to hear from you! Whether you have questions or feedback, feel free to reach out, and we'll get back to you as soon as possible.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6 mt-6 z-50 ">
          {/* Name Input */}
          <div>
            <label htmlFor="name" className="block text-neutral-700 dark:text-white text-lg font-medium">
              Your Name
            </label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter your name"
              className="mt-2"
            />
          </div>

          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-neutral-700 dark:text-white text-lg font-medium">
              Your Email
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter your email"
              className="mt-2"
            />
          </div>

          {/* Message Textarea */}
          <div>
            <label htmlFor="message" className="block text-neutral-700 dark:text-white text-lg font-medium">
              Your Message
            </label>
            <Textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              placeholder="Enter your message"
              className="mt-2"
            />
          </div>

          {/* Submit Button */}
          <Button type="submit" size="xl" className="mt-5 w-full bg-teal-500 text-white hover:bg-teal-600">
            Submit
          </Button>
        </form>
      </div>

      {/* <BackgroundBeams /> */}
    </div>
  );
};

export default Contact;
