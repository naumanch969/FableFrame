"use client"
import { useState } from "react";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/aceternity/input";
import { Textarea } from "@/components/ui/textarea";
import { useCreateContact } from "@/features/contact/api/useCreateContact";
import { toast } from "sonner";
import { CONTACT_IMAGE } from "@/constants/images";

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
    <div className="min-h-screen flex flex-col items-center justify-start">
      {/* Header Section */}
      <div className="w-full py-12">
        <h1 className="text-4xl font-bold text-center text-foreground">Get in Touch with Us</h1>
        <p className="mt-2 text-xl text-center text-muted-foreground">
          We'd love to hear from you. Reach out with any questions or inquiries!
        </p>
      </div>

      {/* Contact Form Section */}
      <div className="bg-background w-full max-w-5xl p-6 rounded-lg shadow-xl flex flex-col md:flex-row my-12 mb-24">
        {/* Left side: Image */}
        <div className="md:w-1/2 mb-6 md:mb-0">
          <img
            src={CONTACT_IMAGE}
            alt="Contact"
            className="w-full h-[500px] object-cover rounded-lg"
          />
        </div>

        {/* Right side: Contact Form */}
        <div className="md:w-1/2 pl-0 md:pl-6 flex flex-col gap-4">

          <h2 className="text-3xl font-semibold text-foreground">Contact Us</h2>
          <p className="text-sm text-muted-foreground">
            If you have any questions or need further information, please fill out the form below and we will get back to you as soon as possible.
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
      </div>

      <Footer />
    </div>
  );
};

export default Contact;
