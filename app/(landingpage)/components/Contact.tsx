"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/aceternity/input";
import { Textarea } from "@/components/ui/textarea";
import React, { useState } from "react";
import { useCreateContact } from "@/features/contact/api/useCreateContact";
import { toast } from "sonner";

const Contact = () => {

  const initialState = { name: "", email: "", message: "", created_at: new Date().toISOString() }
  const { mutate, isPending } = useCreateContact();

  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({ name: "", email: "", message: "", });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (errors[name as keyof typeof errors]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors = {
      name: "",
      email: "",
      message: "",
    };

    if (!formData.name.trim()) {
      newErrors.name = "Name is required.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format.";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required.";
    }

    setErrors(newErrors);

    return !Object.values(newErrors).some((error) => error);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    mutate({ formData }, {
      onSuccess: () => {
        toast.success("Form submitted successfully.", { position: 'top-right' });
        setFormData(initialState);
      },
      onError: (error) => {
        console.error("Error sending message:", error);
        toast.error("Failed to send the message. Please try again later.", { position: 'top-right' });
      },
    });
  };

  return (
    <div className="w-full relative bg-background dark:bg-neutral-950 font-sans md:px-10 py-40 flex flex-col items-center">

      <div className="max-w-2xl mx-auto p-4">
        <h1 className="relative z-10 text-3xl md:text-5xl bg-clip-text text-surface-foreground text-center font-sans font-bold">
          Get in Touch
        </h1>
        <p className="text-neutral-500 max-w-lg mx-auto my-4 text-base md:text-lg text-center relative z-10">
          We would love to hear from you! Whether you have questions or feedback, feel free to reach out, and we'll get back to you as soon as possible.
        </p>

        <form onSubmit={handleSubmit} className="mt-4">

          <div className="mb-4">
            <Input
              type="text"
              placeholder="Your Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-4 py-6 rounded-lg border ${errors.name ? "border-red-500" : "border-muted-foreground"
                } focus:border-primary`}
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          <div className="mb-4">
            <Input
              type="email"
              placeholder="Your Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-6 rounded-lg border ${errors.email ? "border-red-500" : "border-muted-foreground"
                } focus:border-primary`}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          <div className="mb-4">
            <Textarea
              placeholder="Your Message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={5}
              className={`w-full px-4 py-6 bg-surface text-surface-foreground rounded-lg border ${errors.message ? "border-red-500" : "border-muted-foreground"
                } focus:border-primary`}
            />
            {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
          </div>

          <Button disabled={isPending} type="submit" size="xl" className="w-full">
            Send Message
          </Button>

        </form>

      </div>

      {/* <BackgroundBeams /> */}
    </div>
  );
};

export default Contact;
