import React, { useState } from "react";
import Navbar from "./components/layout/Navbar";
import SocialBtn from "./components/SocialBtn";

const services = [
  "Website",
  "Mobile App",
  "Web App",
  "E-Commerce",
  "Visual Identity",
  "3D & Motion",
  "Digital Marketing",
  "Growth & Consulting",
  "Other",
];

function App() {
  const [selected, setSelected] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const toggleService = (service) => {
    setSelected((prev) =>
      prev.includes(service) ? prev.filter((s) => s !== service) : [...prev, service]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (sending) return;
    setSending(true);
    // Simulate async submission
    setTimeout(() => {
      setSending(false);
      setSent(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-neutral-950 p-3 sm:p-4 md:p-6 flex items-center justify-center font-sans antialiased relative overflow-hidden">
      {/* Video Background */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260602_150901_c45b90ec-18d7-42ff-90e2-b95d7109e330.mp4"
        autoPlay
        muted
        loop
        playsInline
      />
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/40 pointer-events-none z-0" />

      {/* Main Glass Card */}
      <div className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-white/5 backdrop-blur-xl min-h-[calc(100vh-24px)] sm:min-h-[calc(100vh-32px)] md:min-h-[calc(100vh-48px)] lg:h-[calc(100vh-48px)] p-4 sm:p-6 md:p-10 flex flex-col justify-between gap-6">
        {/* Navbar */}
        <Navbar />
        {/* Spacer */}
        <div className="flex-1 min-h-[2rem]" />
        {/* Hero & Form */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 lg:gap-12 w-full">
          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl xl:text-6xl font-medium text-white tracking-tight leading-[1.15] drop-shadow-md lg:max-w-lg xl:max-w-2xl shrink-0">
            We craft bold ideas<br />
            and ship them as <span style={{ fontFamily: "'Instrument Serif', serif", fontStyle: "italic", fontWeight: 400 }} className="text-white drop-shadow-lg">products</span>.
          </h1>
          {/* Contact Form Card */}
          <div className="w-full lg:w-[min(480px,45%)] shrink-0">
            {sent ? (
              <div className="py-8 px-4 flex flex-col items-center justify-center text-center gap-3 animate-fade-in">
                <div className="w-14 h-14 rounded-full bg-emerald-100 border border-emerald-200 flex items-center justify-center text-emerald-600 text-2xl shadow-sm mb-1">
                  ✔
                </div>
                <h2 className="text-xl font-bold text-gray-900">You're all set!</h2>
                <p className="text-sm text-gray-500 max-w-xs">Expect a reply within 24 hours.</p>
              </div>
            ) : (
              <div className="bg-white/95 backdrop-blur-2xl rounded-2xl sm:rounded-3xl shadow-2xl border border-white/60 p-5 sm:p-7 flex flex-col gap-5">
                <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Say hello! 👋</h2>
                {/* Email & Socials */}
                <div className="flex flex-row items-center justify-between gap-3 bg-gray-100/80 border border-gray-200/60 rounded-2xl px-4 py-3">
                  <div>
                    <label className="text-xs text-gray-500 font-medium block">Drop us a line</label>
                    <a href="mailto:hello@forma.co" className="text-blue-600 text-sm font-semibold hover:underline truncate">hello@forma.co</a>
                  </div>
                  <SocialBtn />
                </div>
                {/* OR Divider */}
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-px bg-gray-200" />
                  <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">or</span>
                  <div className="flex-1 h-px bg-gray-200" />
                </div>
                {/* Form */}
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <label className="text-xs font-semibold uppercase tracking-wider text-gray-700">Tell us about your vision</label>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <input
                      type="text"
                      placeholder="Your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="flex-1 min-w-0 text-sm px-3.5 py-2.5 rounded-xl border border-gray-200 bg-white/50 focus:bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all shadow-sm"
                      required
                    />
                    <input
                      type="email"
                      placeholder="Your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="flex-1 min-w-0 text-sm px-3.5 py-2.5 rounded-xl border border-gray-200 bg-white/50 focus:bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all shadow-sm"
                      required
                    />
                  </div>
                  <textarea
                    rows={4}
                    placeholder="What are you looking to build or improve..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="text-sm px-3.5 py-2.5 rounded-xl border border-gray-200 bg-white/50 focus:bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all shadow-sm resize-none"
                    required
                  />
                  {/* Service Tags */}
                  <div className="mt-1">
                    <span className="text-xs font-semibold uppercase tracking-wider text-gray-700">I need help with...</span>
                    <div className="flex flex-wrap gap-1.5 mt-1">
                      {services.map((svc) => (
                        <button
                          type="button"
                          key={svc}
                          onClick={() => toggleService(svc)}
                          className={`text-xs font-medium px-3 py-1.5 rounded-lg border transition-all active:scale-95 cursor-pointer ${selected.includes(svc) ? "bg-black text-white border-black shadow-sm" : "bg-gray-50/80 text-gray-600 border-gray-200 hover:border-gray-400 hover:bg-white"}`}
                        >
                          {svc}
                        </button>
                      ))}
                    </div>
                  </div>
                  <button
                    type="submit"
                    disabled={sending}
                    className="w-full bg-black text-white text-sm font-semibold py-3.5 rounded-xl hover:bg-neutral-800 active:scale-[0.99] transition-all shadow-md disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {sending ? "Sending..." : "Send my message"}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;