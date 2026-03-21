"use client";

import { useState } from "react";
import { BreadcrumbDemo } from "@/components/breadcrumb";
import { toast } from "sonner";
import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "general",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        toast.success("Message sent! We'll get back to you soon.");
        setForm({ name: "", email: "", subject: "general", message: "" });
      } else {
        toast.error("Failed to send message. Please try again.");
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <div className="pl-5">
        <BreadcrumbDemo />
      </div>
      <div className="max-w-screen-lg mx-auto px-4 py-8">
        <h1 className="font-integralcf text-3xl md:text-4xl font-extrabold text-center mb-2">
          CONTACT US
        </h1>
        <p className="text-center text-black/60 mb-10">
          We&apos;d love to hear from you. Send us a message and we&apos;ll respond as soon as possible.
        </p>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Contact Info */}
          <div className="lg:w-1/3 space-y-6">
            <div className="bg-[#F0F0F0] rounded-[20px] p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
                  <FiMail className="text-white" />
                </div>
                <h3 className="font-bold">Email Us</h3>
              </div>
              <p className="text-sm text-black/60">support@shop.co</p>
            </div>

            <div className="bg-[#F0F0F0] rounded-[20px] p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
                  <FiPhone className="text-white" />
                </div>
                <h3 className="font-bold">Call Us</h3>
              </div>
              <p className="text-sm text-black/60">+1 (555) 123-4567</p>
            </div>

            <div className="bg-[#F0F0F0] rounded-[20px] p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
                  <FiMapPin className="text-white" />
                </div>
                <h3 className="font-bold">Visit Us</h3>
              </div>
              <p className="text-sm text-black/60">123 Fashion Street, New York, NY 10001</p>
            </div>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="lg:w-2/3 space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="text"
                placeholder="Your Name"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="flex-1 bg-[#F0F0F0] rounded-full px-5 py-3 outline-none focus:ring-2 focus:ring-black"
              />
              <input
                type="email"
                placeholder="Your Email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="flex-1 bg-[#F0F0F0] rounded-full px-5 py-3 outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            <select
              value={form.subject}
              onChange={(e) => setForm({ ...form, subject: e.target.value })}
              className="w-full bg-[#F0F0F0] rounded-full px-5 py-3 outline-none focus:ring-2 focus:ring-black text-black/60"
            >
              <option value="general">General Inquiry</option>
              <option value="order">Order Issue</option>
              <option value="returns">Returns & Refunds</option>
              <option value="product">Product Question</option>
              <option value="other">Other</option>
            </select>

            <textarea
              placeholder="Your Message"
              required
              rows={6}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full bg-[#F0F0F0] rounded-[20px] px-5 py-4 outline-none focus:ring-2 focus:ring-black resize-none"
            />

            <button
              type="submit"
              disabled={submitting}
              className="w-full sm:w-auto bg-black text-white px-10 py-3 rounded-full font-medium hover:bg-gray-900 transition-colors disabled:opacity-50"
            >
              {submitting ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
