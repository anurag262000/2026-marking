"use client";

import { useState, useEffect, useRef } from "react";
import { submitTestimonial } from "@/app/actions/testimonials";
import { getApprovedTestimonials } from "@/app/admin/testimonials/actions";
import { useUser, SignInButton } from "@clerk/nextjs";
import { FiSend, FiX, FiPlus, FiLinkedin, FiInstagram } from "react-icons/fi";
import Link from "next/link";
import HomeTestimonials from "@/components/Sections/HomeTestimonials";

export default function ReviewPage() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [reviews, setReviews] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState(null);
  const [selectedAvatar, setSelectedAvatar] = useState(null);

  // Refs for drag-to-scroll
  const scrollRef = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const handleMouseDown = (e) => {
    isDragging.current = true;
    startX.current = e.pageX - scrollRef.current.offsetLeft;
    scrollLeft.current = scrollRef.current.scrollLeft;
  };

  const handleMouseLeave = () => {
    isDragging.current = false;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX.current) * 2; // Scroll speed
    scrollRef.current.scrollLeft = scrollLeft.current - walk;
  };

  // Pre-defined avatars (Notion style for clearer, more professional look)
  const avatarOptions = [
    { id: "user", url: user?.imageUrl, label: "You" },
    {
      id: "av1",
      url: "https://api.dicebear.com/9.x/notionists/svg?seed=Felix",
      label: "Felix",
    },
    {
      id: "av2",
      url: "https://api.dicebear.com/9.x/notionists/svg?seed=Aneka",
      label: "Aneka",
    },
    {
      id: "av3",
      url: "https://api.dicebear.com/9.x/notionists/svg?seed=Mila",
      label: "Mila",
    },
    {
      id: "av4",
      url: "https://api.dicebear.com/9.x/notionists/svg?seed=Sasha",
      label: "Sasha",
    },
    {
      id: "av5",
      url: "https://api.dicebear.com/9.x/notionists/svg?seed=Avery",
      label: "Avery",
    },
    {
      id: "av6",
      url: "https://api.dicebear.com/9.x/notionists/svg?seed=Jade",
      label: "Jade",
    },
    {
      id: "av7",
      url: "https://api.dicebear.com/9.x/notionists/svg?seed=Cloe",
      label: "Cloe",
    },
    {
      id: "av8",
      url: "https://api.dicebear.com/9.x/notionists/svg?seed=Luna",
      label: "Luna",
    },
    {
      id: "av9",
      url: "https://api.dicebear.com/9.x/notionists/svg?seed=Leo",
      label: "Leo",
    },
  ];

  useEffect(() => {
    async function fetchReviews() {
      const data = await getApprovedTestimonials();
      if (data) setReviews(data);
    }
    fetchReviews();

    // Check for redirect param to auto-open modal
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (params.get("write_review") === "true") {
        setIsModalOpen(true);
        // Clean up URL
        window.history.replaceState({}, "", "/review");
      }
    }
  }, []);

  useEffect(() => {
    if (user && !selectedAvatar) {
      setSelectedAvatar(user.imageUrl);
    }
  }, [user]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isModalOpen]);

  async function handleSubmit(formData) {
    setIsSubmitting(true);
    setMessage(null);

    // Append selected avatar if not using default
    if (selectedAvatar) {
      formData.append("avatar_url", selectedAvatar);
    }

    const result = await submitTestimonial(formData);

    setIsSubmitting(false);
    setMessage(result);

    if (result.success) {
      setTimeout(() => {
        setIsModalOpen(false);
        setMessage(null);
      }, 3000);
    }
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white p-6 md:p-12 relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 right-0 p-96 bg-blue-500/5 blur-[150px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/2 fixed" />
      <div className="absolute bottom-0 left-0 p-96 bg-purple-500/5 blur-[150px] rounded-full pointer-events-none translate-y-1/2 -translate-x-1/2 fixed" />

      <div className="max-w-7xl mx-auto relative z-10 pt-20">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-8">
          <div>
            <Link
              href="/"
              className="inline-block mb-4 text-white/40 hover:text-white transition-colors text-xs font-orbitron uppercase tracking-wider"
            >
              ← Back to Home
            </Link>
            <h1 className="text-4xl md:text-6xl font-black font-bitcount uppercase leading-tight">
              Working{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                With Me
              </span>
            </h1>
            <p className="text-white/60 mt-4 max-w-xl text-lg font-light">
              Insights and feedback from colleagues, clients, and collaborators
              I've had the pleasure of working with.
            </p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="group relative px-8 py-4 bg-white text-black font-bold font-orbitron uppercase tracking-wider rounded-full hover:bg-blue-500 hover:text-white transition-all duration-300 shadow-xl shadow-white/10 hover:shadow-blue-500/20"
          >
            Write a Review
            <div className="absolute inset-0 rounded-full ring-2 ring-white/20 group-hover:ring-blue-400 group-hover:scale-105 transition-all duration-300" />
          </button>
        </div>

      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md cursor-pointer"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            data-lenis-prevent
            className="bg-[#1a1a1a] border border-white/20 rounded-3xl p-6 md:p-8 max-w-md w-full relative shadow-2xl shadow-blue-500/10 animate-fade-in-up max-h-[85vh] overflow-y-auto hide-scrollbar"
          >
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors bg-white/10 p-2 rounded-full hover:bg-white/20"
            >
              <FiX size={20} />
            </button>

            <h3 className="text-xl font-bold font-bitcount mb-2 uppercase text-white">
              Share Experience
            </h3>
            <p className="text-white/70 text-xs mb-6">
              Your feedback helps me improve and grow.
            </p>

            {!isSignedIn ? (
              <div className="text-center py-8 bg-white/5 rounded-2xl border border-white/10 border-dashed">
                <p className="text-white/80 mb-6 text-sm">
                  Please identify yourself to leave a review.
                </p>
                <SignInButton
                  mode="modal"
                  forceRedirectUrl="/review?write_review=true"
                  signUpForceRedirectUrl="/review?write_review=true"
                >
                  <button className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-full font-bold font-orbitron text-xs uppercase tracking-wider transition-colors shadow-lg shadow-blue-600/20">
                    Log In with Google
                  </button>
                </SignInButton>
              </div>
            ) : (
              <form action={handleSubmit} className="space-y-5">
                {/* Avatar Selection */}
                <div className="mb-4">
                  <label className="text-[10px] font-orbitron uppercase tracking-wider text-white/70 mb-3 block">
                    Choose Avatar
                  </label>
                  <div
                    ref={scrollRef}
                    onMouseDown={handleMouseDown}
                    onMouseLeave={handleMouseLeave}
                    onMouseUp={handleMouseUp}
                    onMouseMove={handleMouseMove}
                    className="flex gap-3 overflow-x-auto px-2 scrollbar-hide py-2 cursor-grab active:cursor-grabbing"
                  >
                    {avatarOptions.map(
                      (opt) =>
                        opt.url && (
                          <button
                            key={opt.id}
                            type="button"
                            onClick={() => setSelectedAvatar(opt.url)}
                            className={`relative w-12 h-12 rounded-full flex-shrink-0 transition-all duration-300 ${selectedAvatar === opt.url ? "ring-2 ring-blue-500 scale-110 opacity-100 bg-white" : "ring-1 ring-white/20 opacity-50 hover:opacity-100 hover:scale-105 bg-white/5"}`}
                            title={opt.label}
                          >
                            <img
                              src={opt.url}
                              alt={opt.label}
                              className="w-full h-full rounded-full object-cover"
                            />
                            {opt.id === "user" && (
                              <span className="absolute -bottom-1 -right-1 bg-blue-600 text-[8px] px-1.5 py-0.5 rounded-full text-white font-bold tracking-tighter border border-[#1a1a1a]">
                                YOU
                              </span>
                            )}
                          </button>
                        ),
                    )}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-orbitron uppercase tracking-wider text-white/70 pl-1">
                      Role <span className="text-white/40">(Optional)</span>
                    </label>
                    <input
                      name="role"
                      placeholder="Manager"
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white text-sm focus:border-blue-500 focus:bg-white/15 outline-none transition-all placeholder:text-white/30"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-orbitron uppercase tracking-wider text-white/70 pl-1">
                      Company <span className="text-white/40">(Optional)</span>
                    </label>
                    <input
                      name="company"
                      placeholder="Acme Inc."
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white text-sm focus:border-blue-500 focus:bg-white/15 outline-none transition-all placeholder:text-white/30"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-orbitron uppercase tracking-wider text-white/70 pl-1">
                    Social <span className="text-white/40">(Optional)</span>
                  </label>
                  <input
                    name="social_link"
                    placeholder="LinkedIn or Instagram profile URL"
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white text-sm focus:border-blue-500 focus:bg-white/15 outline-none transition-all placeholder:text-white/30"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-orbitron uppercase tracking-wider text-white/70 pl-1">
                    Review
                  </label>
                  <textarea
                    name="content"
                    required
                    rows="4"
                    placeholder="How was your experience working together? (Your feedback really matters!)"
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white text-sm focus:border-blue-500 focus:bg-white/15 outline-none transition-all resize-none placeholder:text-white/30 leading-relaxed scrollbar-hide"
                  />
                </div>

                {message && (
                  <div
                    className={`text-xs p-3 rounded-lg text-center font-bold tracking-wide ${message.success ? "bg-green-500/20 text-green-400 border border-green-500/30" : "bg-red-500/20 text-red-400 border border-red-500/30"}`}
                  >
                    {message.message}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-white text-black hover:bg-blue-500 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed font-orbitron uppercase tracking-wider py-4 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-2 mt-4 text-xs shadow-lg shadow-white/5"
                >
                  {isSubmitting ? (
                    "Submitting..."
                  ) : (
                    <>
                      <FiSend /> Submit Review
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
      {/* Dynamic Testimonial Section */}
      <HomeTestimonials theme="dark" showHeading={false} className="py-0 md:py-0" />
    </div>
  );
}
