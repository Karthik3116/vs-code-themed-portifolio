import React, { useState, useRef } from "react";
import emailjs from "@emailjs/browser";

// Toast helper
const showToast = (message, type = "success") => {
  const toast = document.getElementById("toast");
  if (toast) {
    const div = document.createElement("div");
    div.className = `alert ${type === "success" ? "alert-success" : "alert-error"} shadow-lg`;
    div.innerHTML = `<span>${message}</span>`;
    toast.appendChild(div);
    setTimeout(() => toast.removeChild(div), 4000); // auto-remove after 4 seconds
  }
};

const Contact = () => {
  const formRef = useRef();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    title: "",
    message: "",
  });

  const [sending, setSending] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSending(true);

    emailjs
      .sendForm(
        "service_9ehoned",
        "template_88ame3d",
        formRef.current,
        "loBVJC7wVRQhW1YcQ"
      )
      .then(
        () => {
          setSending(false);
          setFormData({ name: "", email: "", title: "", message: "" });
          showToast("✅ Message sent successfully!", "success");
        },
        (error) => {
          console.error(error);
          setSending(false);
          showToast("❌ Failed to send message. Please try again.", "error");
        }
      );
  };

  return (
    <div
      className="bg-base-100 text-base-content flex items-center justify-center flex-col"
      style={{ minHeight: "calc(100vh - 8rem)" }}
    >
      {/* Toast container (add one in your root layout too for global use) */}
      <div id="toast" className="toast toast-top toast-end z-50"></div>

      <div className="w-full max-w-2xl bg-base-300 p-8 rounded-2xl shadow-2xl mb-8">
        <h2 className="text-3xl font-bold text-center mb-8 text-primary">
          📬 Contact Me
        </h2>

        <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
          <div className="form-control">
            <label className="label">
              <span className="label-text text-base-content">Name</span>
            </label>
            <input
              type="text"
              name="name"
              className="input input-bordered w-full"
              placeholder="John Doe"
              required
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text text-base-content">Email</span>
            </label>
            <input
              type="email"
              name="email"
              className="input input-bordered w-full"
              placeholder="john@example.com"
              required
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text text-base-content">Subject</span>
            </label>
            <input
              type="text"
              name="title"
              className="input input-bordered w-full"
              placeholder="Subject of your message"
              required
              value={formData.title}
              onChange={handleChange}
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text text-base-content">Message</span>
            </label>
            <textarea
              name="message"
              className="textarea textarea-bordered w-full h-32"
              placeholder="Your message here..."
              required
              value={formData.message}
              onChange={handleChange}
            />
          </div>

          <div className="text-center">
            <button
              type="submit"
              disabled={sending}
              className={`btn btn-primary px-8 text-lg transition-transform ${
                sending ? "opacity-70 cursor-not-allowed" : "hover:scale-105"
              }`}
            >
              {sending ? "Sending..." : "Send ✉️"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;
