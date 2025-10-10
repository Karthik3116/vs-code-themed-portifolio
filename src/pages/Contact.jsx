// import React, { useState, useRef } from "react";
// import emailjs from "@emailjs/browser";

// // Toast helper
// const showToast = (message, type = "success") => {
//   const toast = document.getElementById("toast");
//   if (toast) {
//     const div = document.createElement("div");
//     div.className = `alert ${type === "success" ? "alert-success" : "alert-error"} shadow-lg`;
//     div.innerHTML = `<span>${message}</span>`;
//     toast.appendChild(div);
//     setTimeout(() => toast.removeChild(div), 4000); // auto-remove after 4 seconds
//   }
// };

// const Contact = () => {
//   const formRef = useRef();
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     title: "",
//     message: "",
//   });

//   const [sending, setSending] = useState(false);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setSending(true);

//     emailjs
//       .sendForm(
//         "service_9ehoned",
//         "template_88ame3d",
//         formRef.current,
//         "loBVJC7wVRQhW1YcQ"
//       )
//       .then(
//         () => {
//           setSending(false);
//           setFormData({ name: "", email: "", title: "", message: "" });
//           showToast("✅ Message sent successfully!", "success");
//         },
//         (error) => {
//           console.error(error);
//           setSending(false);
//           showToast("❌ Failed to send message. Please try again.", "error");
//         }
//       );
//   };

//   return (
//     <div
//       className="bg-base-100 text-base-content flex items-center justify-center flex-col"
//       style={{ minHeight: "calc(100vh - 8rem)" }}
//     >
//       {/* Toast container (add one in your root layout too for global use) */}
//       <div id="toast" className="toast toast-top toast-end z-50"></div>

//       <div className="w-full max-w-2xl bg-base-300 p-8 rounded-2xl shadow-2xl mb-8">
//         <h2 className="text-3xl font-bold text-center mb-8 text-primary">
//           📬 Contact Me
//         </h2>

//         <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
//           <div className="form-control">
//             <label className="label">
//               <span className="label-text text-base-content">Name</span>
//             </label>
//             <input
//               type="text"
//               name="name"
//               className="input input-bordered w-full"
//               placeholder="John Doe"
//               required
//               value={formData.name}
//               onChange={handleChange}
//             />
//           </div>

//           <div className="form-control">
//             <label className="label">
//               <span className="label-text text-base-content">Email</span>
//             </label>
//             <input
//               type="email"
//               name="email"
//               className="input input-bordered w-full"
//               placeholder="john@example.com"
//               required
//               value={formData.email}
//               onChange={handleChange}
//             />
//           </div>

//           <div className="form-control">
//             <label className="label">
//               <span className="label-text text-base-content">Subject</span>
//             </label>
//             <input
//               type="text"
//               name="title"
//               className="input input-bordered w-full"
//               placeholder="Subject of your message"
//               required
//               value={formData.title}
//               onChange={handleChange}
//             />
//           </div>

//           <div className="form-control">
//             <label className="label">
//               <span className="label-text text-base-content">Message</span>
//             </label>
//             <textarea
//               name="message"
//               className="textarea textarea-bordered w-full h-32"
//               placeholder="Your message here..."
//               required
//               value={formData.message}
//               onChange={handleChange}
//             />
//           </div>

//           <div className="text-center">
//             <button
//               type="submit"
//               disabled={sending}
//               className={`btn btn-primary px-8 text-lg transition-transform ${
//                 sending ? "opacity-70 cursor-not-allowed" : "hover:scale-105"
//               }`}
//             >
//               {sending ? "Sending..." : "Send ✉️"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Contact;

import React, { useState, useRef } from "react";
import emailjs from "@emailjs/browser";

// --- CONFIGURATION CONSTANTS ---
const SUBMISSION_LIMIT = 3; // Max submissions allowed
const TIME_WINDOW_MS = 60 * 60 * 1000; // 1 hour in milliseconds
const MAX_LINKS = 2; // Max number of http links allowed in the message
const MIN_MESSAGE_LENGTH = 15; // Minimum characters required for the message

// --- HELPER FUNCTIONS ---

/**
 * Displays a toast notification.
 * @param {string} message - The message to show.
 * @param {'success' | 'error'} type - The type of toast.
 */
const showToast = (message, type = "success") => {
  const toastContainer = document.getElementById("toast");
  if (toastContainer) {
    const div = document.createElement("div");
    div.className = `alert ${type === "success" ? "alert-success" : "alert-error"} shadow-lg`;
    div.innerHTML = `<span>${message}</span>`;
    toastContainer.appendChild(div);
    setTimeout(() => toastContainer.removeChild(div), 4000);
  }
};

/**
 * Checks if the user has exceeded the submission rate limit.
 * @returns {boolean} - True if the user is rate-limited, false otherwise.
 */
const isRateLimited = () => {
  try {
    const submissions = JSON.parse(localStorage.getItem("formSubmissions") || "[]");
    const now = Date.now();
    
    // Filter out submissions that are older than the time window
    const recentSubmissions = submissions.filter(
      (timestamp) => now - timestamp < TIME_WINDOW_MS
    );
    
    if (recentSubmissions.length >= SUBMISSION_LIMIT) {
      console.warn("Rate limit exceeded.");
      return true;
    }
    
    return false;
  } catch (error) {
    console.error("Could not check rate limit:", error);
    return false; // Fail open if localStorage is inaccessible
  }
};

/**
 * Records a new successful submission timestamp.
 */
const recordSubmission = () => {
  try {
    const submissions = JSON.parse(localStorage.getItem("formSubmissions") || "[]");
    const now = Date.now();
    const updatedSubmissions = [...submissions, now];
    localStorage.setItem("formSubmissions", JSON.stringify(updatedSubmissions));
  } catch (error) {
    console.error("Could not record submission:", error);
  }
};

// --- COMPONENT ---

const Contact = () => {
  const formRef = useRef();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    title: "",
    message: "",
    honeypot: "", // Hidden field for spam detection
  });

  const [sending, setSending] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 1. Honeypot Spam Check: If this field is filled, it's a bot.
    if (formData.honeypot) {
      console.warn("Honeypot field filled. Likely a bot.");
      // Deceptively show a success message to the bot
      showToast("✅ Message sent successfully!", "success");
      return; 
    }
    
    // 2. Content Spam Check
    const linkCount = (formData.message.match(/https?:\/\//g) || []).length;
    if (linkCount > MAX_LINKS) {
      showToast("❌ Your message contains too many links.", "error");
      return;
    }
    if (formData.message.length < MIN_MESSAGE_LENGTH) {
      showToast(`❌ Message must be at least ${MIN_MESSAGE_LENGTH} characters.`, "error");
      return;
    }

    // 3. Rate Limiter Check
    if (isRateLimited()) {
      showToast("❌ You are sending messages too quickly. Please try again later.", "error");
      return;
    }

    setSending(true);

    emailjs
      .sendForm(
        "service_9ehoned",      // Your EmailJS Service ID
        "template_88ame3d",     // Your EmailJS Template ID
        formRef.current,
        "loBVJC7wVRQhW1YcQ"       // Your EmailJS Public Key
      )
      .then(
        () => {
          setSending(false);
          setFormData({ name: "", email: "", title: "", message: "", honeypot: "" });
          showToast("✅ Message sent successfully!", "success");
          recordSubmission(); // Record the timestamp of successful submission
        },
        (error) => {
          console.error("EMAILJS FAILED...", error);
          setSending(false);
          showToast("❌ Failed to send message. Please try again.", "error");
        }
      );
  };

  return (
    <div
      className="bg-base-100 text-base-content flex items-center justify-center flex-col p-4"
      style={{ minHeight: "calc(100vh - 8rem)" }}
    >
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

          {/* --- HONEYPOT FIELD (SPAM TRAP) --- */}
          <div className="form-control" aria-hidden="true" style={{ position: 'absolute', left: '-5000px' }}>
             <label className="label"><span className="label-text">Ignore this field</span></label>
             <input 
                type="text" 
                name="honeypot" 
                tabIndex="-1" 
                autoComplete="off"
                value={formData.honeypot}
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
              minLength={MIN_MESSAGE_LENGTH}
              value={formData.message}
              onChange={handleChange}
            />
          </div>

          <div className="text-center">
            <button
              type="submit"
              disabled={sending}
              className={`btn btn-primary px-8 text-lg transition-transform ${
                sending ? "loading cursor-not-allowed" : "hover:scale-105"
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