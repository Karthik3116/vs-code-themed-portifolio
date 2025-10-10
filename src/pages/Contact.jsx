
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Rocket } from "lucide-react";
import emailjs from "@emailjs/browser";

/* -------------------
   CONFIGURATION
------------------- */
const SUBMISSION_LIMIT = 5; // max submissions per time window
const TIME_WINDOW_MS = 60 * 60 * 1000; // 1 hour
const MAX_LINKS = 2;
const MIN_MESSAGE_LENGTH = 15;

/* -------------------
   TOAST SYSTEM
------------------- */
const showToast = (message, type = "success") => {
  const toastContainer = document.getElementById("toast");
  if (toastContainer) {
    const div = document.createElement("div");
    div.className = `alert ${
      type === "success" ? "alert-success" : "alert-error"
    } shadow-lg`;
    div.innerHTML = `<span>${message}</span>`;
    toastContainer.appendChild(div);
    setTimeout(() => toastContainer.removeChild(div), 4000);
  }
};

/* -------------------
   RATE LIMITER
------------------- */
const isRateLimited = () => {
  const submissions = JSON.parse(localStorage.getItem("formSubmissions") || "[]");
  const now = Date.now();
  const recent = submissions.filter((t) => now - t < TIME_WINDOW_MS);
  return recent.length >= SUBMISSION_LIMIT;
};
const recordSubmission = () => {
  const submissions = JSON.parse(localStorage.getItem("formSubmissions") || "[]");
  submissions.push(Date.now());
  localStorage.setItem("formSubmissions", JSON.stringify(submissions));
};

/* -------------------
   FORM STEPS
------------------- */
const steps = [
  { id: "name", label: "What's your name?", type: "text", placeholder: "John Doe" },
  { id: "email", label: "Your email address?", type: "email", placeholder: "john@example.com" },
  { id: "title", label: "Subject of your message?", type: "text", placeholder: "Project Inquiry" },
  { id: "message", label: "What would you like to say?", type: "textarea", placeholder: "Type your message..." },
];

/* -------------------
   CONTACT COMPONENT
------------------- */
const Contact = () => {
  const [step, setStep] = useState(0);
  const [sending, setSending] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    title: "",
    message: "",
    honeypot: "", // Spam trap
  });
  const [submitted, setSubmitted] = useState(false);
  const formRef = useRef();

  const handleChange = (e) =>
    setFormData({ ...formData, [steps[step].id]: e.target.value });

  const handleNext = (e) => {
    e.preventDefault();

    if (formData.honeypot) {
      showToast("✅ Message sent successfully!", "success");
      return;
    }

    if (step === steps.length - 1) {
      handleSubmit();
    } else {
      setStep((prev) => prev + 1);
    }
  };

  const handleSubmit = () => {
    // Content validation
    const linkCount = (formData.message.match(/https?:\/\//g) || []).length;
    if (linkCount > MAX_LINKS) {
      showToast("❌ Too many links in your message.", "error");
      return;
    }
    if (formData.message.length < MIN_MESSAGE_LENGTH) {
      showToast(`❌ Message must be at least ${MIN_MESSAGE_LENGTH} characters.`, "error");
      return;
    }
    if (isRateLimited()) {
      showToast("❌ Too many messages. Try again later.", "error");
      return;
    }

    setSending(true);

    emailjs
      .send(
        "service_i4pqb8m",
        "template_88ame3d",
        formData,
        "loBVJC7wVRQhW1YcQ"
      )
      .then(
        () => {
          setSending(false);
          setSubmitted(true);
          recordSubmission();
          showToast("✅ Message sent successfully!", "success");
          setFormData({ name: "", email: "", title: "", message: "", honeypot: "" });
        },
        (error) => {
          console.error("EMAILJS FAILED...", error);
          setSending(false);
          showToast("❌ Failed to send message. Try again.", "error");
        }
      );
  };

  return (
    <div className="min-h-full flex flex-col justify-center items-center p-4 bg-base-100 text-base-content overflow-hidden">
      {/* Toast container */}
      <div id="toast" className="toast toast-top toast-end z-50"></div>

      {/* Form steps or success message */}
      {!submitted ? (
        <motion.div
          key="form-container"
          initial={{ y: 200, opacity: 0, rotate: -15 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="flex flex-col items-center text-center"
        >
          <Rocket
            className="mb-8 text-primary animate-bounce drop-shadow-lg"
            size={48}
          />

          <AnimatePresence mode="wait">
            <motion.form
              key={steps[step].id}
              onSubmit={handleNext}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.5 }}
              ref={formRef}
              className="p-6 rounded-2xl bg-base-200/50 backdrop-blur-lg w-80 shadow-lg border border-base-content/10"
            >
              <h1 className="text-xl font-semibold mb-4 text-base-content">
                {steps[step].label}
              </h1>

              {steps[step].type === "textarea" ? (
                <textarea
                  name={steps[step].id}
                  placeholder={steps[step].placeholder}
                  value={formData[steps[step].id]}
                  onChange={handleChange}
                  className="textarea textarea-bordered w-full h-28"
                  required
                />
              ) : (
                <input
                  type={steps[step].type}
                  name={steps[step].id}
                  placeholder={steps[step].placeholder}
                  value={formData[steps[step].id]}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  required
                />
              )}

              <div className="mt-6">
                <motion.button
                  type="submit"
                  disabled={sending}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`btn btn-primary w-full ${sending ? "btn-disabled" : ""}`}
                >
                  {step === steps.length - 1
                    ? sending
                      ? "Sending..."
                      : "Send ✉️"
                    : "Next 🚀"}
                </motion.button>
              </div>
            </motion.form>
          </AnimatePresence>

          {/* Progress bar */}
          <div className="mt-10 w-64 h-2 bg-base-content/20 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-primary"
              initial={{ width: 0 }}
              animate={{ width: `${((step + 1) / steps.length) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </motion.div>
      ) : (
        <motion.div
          key="success-message"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <Rocket className="text-success mx-auto mb-6 animate-pulse" size={64} />
          <h1 className="text-3xl font-bold mb-4">Message Sent! 🚀</h1>
          <p className="text-base-content/80">Thank you for reaching out. I’ll get back to you soon!</p>
        </motion.div>
      )}
    </div>
  );
};

export default Contact;

