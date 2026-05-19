"use client";

import { useState, useEffect, useRef } from "react";
import { submitTestimonial, getApprovedTestimonials } from '@/actions/testimonials';
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
    <div className="min-h-screen bg-[var(--off-white)] text-[var(--pitch-black)] p-6 lg:p-12 relative overflow-hidden">
      {/* Brutalist Dot Pattern */}
      <div className="absolute inset-0 bg-dot-brutalist pointer-events-none opacity-20 z-0" />

      <div className="max-w-7xl mx-auto relative z-10 pt-20">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-8">
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--pure-white)] text-[var(--pitch-black)] font-space font-black text-xs uppercase tracking-wider border-[2px] border-[var(--pitch-black)] rounded-md shadow-[2px_2px_0px_var(--pitch-black)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_var(--pitch-black)] transition-all mb-6"
            >
              ← Back to Home
            </Link>
            <h1 className="text-6xl md:text-8xl font-black font-bebas tracking-tight mb-6 text-[var(--pitch-black)]">
              Working <span className="px-4 py-1.5 inline-block bg-[var(--neon-yellow)] border-[3px] border-[var(--pitch-black)] shadow-[4px_4px_0px_var(--pitch-black)] rotate-[-2deg]">With Me</span>
            </h1>
            <p className="text-[var(--pitch-black)] mt-4 max-w-xl text-lg font-space font-medium opacity-80">
              Insights and feedback from colleagues, clients, and collaborators
              I've had the pleasure of working with.
            </p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-8 py-4 bg-[var(--neon-yellow)] text-[var(--pitch-black)] font-black font-space text-xs uppercase tracking-widest border-[3px] border-[var(--pitch-black)] rounded-xl shadow-[5px_5px_0px_var(--pitch-black)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[3px_3px_0px_var(--pitch-black)] transition-all"
          >
            Write a Review
          </button>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md cursor-pointer"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            data-lenis-prevent
            className="bg-[var(--pure-white)] border-[3px] border-[var(--pitch-black)] rounded-2xl p-6 md:p-8 max-w-md w-full relative shadow-[8px_8px_0px_var(--pitch-black)] animate-fade-in-up max-h-[85vh] overflow-y-auto hide-scrollbar text-[var(--pitch-black)]"
          >
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-[var(--pitch-black)] bg-[var(--pure-white)] border-[2px] border-[var(--pitch-black)] p-2 rounded-md shadow-[2px_2px_0px_var(--pitch-black)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_var(--pitch-black)] transition-all z-20"
            >
              <FiX size={20} />
            </button>

            <h3 className="text-3xl font-black font-bebas mb-2 uppercase text-[var(--pitch-black)] mt-4">
              Share Experience
            </h3>
            <p className="text-[var(--pitch-black)] opacity-75 font-space font-medium text-xs mb-6">
              Your feedback helps me improve and grow.
            </p>

            {!isSignedIn ? (
              <div className="text-center py-8 bg-[var(--off-white)] border-[3px] border-[var(--pitch-black)] rounded-xl shadow-[4px_4px_0px_var(--pitch-black)]">
                <p className="text-[var(--pitch-black)] font-space font-medium mb-6 text-sm opacity-80">
                  Please identify yourself to leave a review.
                </p>
                <SignInButton
                  mode="modal"
                  forceRedirectUrl="/review?write_review=true"
                  signUpForceRedirectUrl="/review?write_review=true"
                >
                  <button className="px-8 py-4 bg-[var(--neon-yellow)] text-[var(--pitch-black)] border-[3px] border-[var(--pitch-black)] rounded-xl font-space font-black text-xs uppercase tracking-widest shadow-[4px_4px_0px_var(--pitch-black)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_var(--pitch-black)] transition-all">
                    Log In with Google
                  </button>
                </SignInButton>
              </div>
            ) : (
              <form action={handleSubmit} className="space-y-5">
                {/* Avatar Selection */}
                <div className="mb-4">
                  <label className="text-[10px] font-space font-black uppercase tracking-wider text-[var(--pitch-black)] opacity-80 mb-3 block">
                    Choose Avatar
                  </label>
                  <div
                    ref={scrollRef}
                    onMouseDown={handleMouseDown}
                    onMouseLeave={handleMouseLeave}
                    onMouseUp={handleMouseUp}
                    onMouseMove={handleMouseMove}
                    className="flex gap-3 overflow-x-auto px-2 scrollbar-hide py-2 cursor-grab active:cursor-grabbing select-none"
                  >
                    {avatarOptions.map(
                      (opt) =>
                        opt.url && (
                          <button
                            key={opt.id}
                            type="button"
                            onClick={() => setSelectedAvatar(opt.url)}
                            className={`relative w-12 h-12 rounded-full flex-shrink-0 transition-all duration-300 ${selectedAvatar === opt.url ? "border-[3px] border-[var(--electric-purple)] scale-110 opacity-100 bg-white shadow-[2px_2px_0px_var(--pitch-black)]" : "border-[2px] border-[var(--pitch-black)] opacity-60 hover:opacity-100 bg-[var(--pure-white)]"}`}
                            title={opt.label}
                          >
                            <img
                              src={opt.url}
                              alt={opt.label}
                              draggable="false"
                              className="w-full h-full rounded-full object-cover pointer-events-none"
                            />
                            {opt.id === "user" && (
                              <span className="absolute -bottom-1 -right-1 bg-[var(--electric-purple)] text-[8px] px-1.5 py-0.5 rounded-full text-white font-space font-black tracking-wider border-[2px] border-[var(--pitch-black)]">
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
                    <label className="text-[10px] font-space font-black uppercase tracking-wider text-[var(--pitch-black)] pl-1">
                      Role <span className="text-[var(--pitch-black)] opacity-50">(Optional)</span>
                    </label>
                    <input
                      name="role"
                      placeholder="Manager"
                      className="w-full bg-[var(--off-white)] border-[3px] border-[var(--pitch-black)] rounded-xl px-4 py-3 text-[var(--pitch-black)] font-space font-medium text-sm focus:border-[var(--electric-purple)] outline-none transition-all placeholder:text-[var(--pitch-black)]/30 shadow-[3px_3px_0px_var(--pitch-black)]"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-space font-black uppercase tracking-wider text-[var(--pitch-black)] pl-1">
                      Company <span className="text-[var(--pitch-black)] opacity-50">(Optional)</span>
                    </label>
                    <input
                      name="company"
                      placeholder="Acme Inc."
                      className="w-full bg-[var(--off-white)] border-[3px] border-[var(--pitch-black)] rounded-xl px-4 py-3 text-[var(--pitch-black)] font-space font-medium text-sm focus:border-[var(--electric-purple)] outline-none transition-all placeholder:text-[var(--pitch-black)]/30 shadow-[3px_3px_0px_var(--pitch-black)]"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-space font-black uppercase tracking-wider text-[var(--pitch-black)] pl-1">
                    Social <span className="text-[var(--pitch-black)] opacity-50">(Optional)</span>
                  </label>
                  <input
                    name="social_link"
                    placeholder="LinkedIn or Instagram profile URL"
                    className="w-full bg-[var(--off-white)] border-[3px] border-[var(--pitch-black)] rounded-xl px-4 py-3 text-[var(--pitch-black)] font-space font-medium text-sm focus:border-[var(--electric-purple)] outline-none transition-all placeholder:text-[var(--pitch-black)]/30 shadow-[3px_3px_0px_var(--pitch-black)]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-space font-black uppercase tracking-wider text-[var(--pitch-black)] pl-1">
                    Review
                  </label>
                  <textarea
                    name="content"
                    required
                    rows="4"
                    placeholder="How was your experience working together? (Your feedback really matters!)"
                    className="w-full bg-[var(--off-white)] border-[3px] border-[var(--pitch-black)] rounded-xl px-4 py-3 text-[var(--pitch-black)] font-space font-medium text-sm focus:border-[var(--electric-purple)] outline-none transition-all resize-none placeholder:text-[var(--pitch-black)]/30 leading-relaxed scrollbar-hide shadow-[3px_3px_0px_var(--pitch-black)]"
                  />
                </div>

                {message && (
                  <div
                    className={`text-xs p-3 rounded-xl text-center font-space font-black tracking-wide border-[3px] border-[var(--pitch-black)] ${message.success ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
                  >
                    {message.message}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[var(--neon-yellow)] text-[var(--pitch-black)] disabled:opacity-50 disabled:cursor-not-allowed font-space font-black uppercase tracking-widest py-4 border-[3px] border-[var(--pitch-black)] rounded-xl transition-all duration-300 flex items-center justify-center gap-2 mt-4 text-xs shadow-[4px_4px_0px_var(--pitch-black)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_var(--pitch-black)]"
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
      <HomeTestimonials
        theme="light"
        showHeading={false}
        className="py-0 md:py-0"
        mobilePadding={false}
      />
    </div>
  );
}
