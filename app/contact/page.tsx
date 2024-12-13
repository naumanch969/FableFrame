// pages/contact.tsx

import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const Contact = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-start">
      {/* Header Section */}
      <div className="w-full py-12">
        <h1 className="text-4xl font-bold text-center text-primary ">Get in Touch with Us</h1>
        <p className="mt-2 text-xl text-center text-muted-foreground ">We'd love to hear from you. Reach out with any questions or inquiries!</p>
      </div>

      {/* Contact Form Section */}
      <div className="bg-white w-full max-w-5xl p-6 rounded-lg shadow-xl flex flex-col md:flex-row my-12 mb-24 ">
        {/* Left side: Image */}
        <div className="md:w-1/2 mb-6 md:mb-0">
          <img
            src="/login.png"  // Replace with your actual image path
            alt="Contact"
            className="w-full h-[500px] object-cover rounded-lg"
          />
        </div>

        {/* Right side: Contact Form */}
        <div className="md:w-1/2 pl-0 md:pl-6 flex flex-col gap-4 ">
          <h2 className="text-3xl font-semibold text-primary">Contact Us</h2>
          <p className="text-sm text-muted-foreground ">
            If you have any questions or need further information, please fill out the form below and we will get back to you as soon as possible.
          </p>
          <form action="#" method="POST" className="mt-4">
            <div className="mb-4">
              <Input
                type="text"
                placeholder="Your Name"
                name="name"
                className="w-full px-4 py-6 rounded-lg border border-muted-foreground focus:border-primary "
              />
            </div>
            <div className="mb-4">
              <Input
                type="email"
                placeholder="Your Email"
                name="email"
                className="w-full px-4 py-6 rounded-lg border border-muted-foreground focus:border-primary "
              />
            </div>
            <div className="mb-4">
              <Textarea
                placeholder="Your Message"
                name="message"
                rows={5}
                className="w-full px-4 py-6 rounded-lg border border-muted-foreground focus:border-primary "
              />
            </div>
            <Button type="submit" size="xl" className="w-full">
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
