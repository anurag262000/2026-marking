'use client';

import { useState, useEffect } from 'react';
import { toggleLike, getLikeStatus } from '@/actions/blogs';
import { FiHeart } from 'react-icons/fi';
import { useUser, SignInButton } from '@clerk/nextjs';

export default function LikeButton({ blogSlug }) {
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(true);
  const { isSignedIn } = useUser();

  useEffect(() => {
    async function fetchLikes() {
      const { count, isLiked } = await getLikeStatus(blogSlug);
      setLikes(count);
      setLiked(isLiked);
      setLoading(false);
    }
    fetchLikes();
  }, [blogSlug, isSignedIn]);

  async function handleLike() {
    if (!isSignedIn) return;

    // Optimistic update
    const newLiked = !liked;
    setLiked(newLiked);
    setLikes(prev => newLiked ? prev + 1 : prev - 1);

    const result = await toggleLike(blogSlug);
    if (!result.success) {
      // Revert if failed
      setLiked(!newLiked);
      setLikes(prev => newLiked ? prev - 1 : prev + 1);
    }
  }

  if (loading) return <div className="h-10 w-24 bg-[var(--pure-white)] border-[2px] border-[var(--pitch-black)] rounded-md animate-pulse" />;

  if (!isSignedIn) {
      return (
        <SignInButton mode="modal">
            <button className="flex items-center gap-2 px-4 py-2 bg-[var(--pure-white)] text-[var(--pitch-black)] font-space font-black text-xs uppercase tracking-wider border-[2px] border-[var(--pitch-black)] rounded-md shadow-[2px_2px_0px_var(--pitch-black)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_var(--pitch-black)] transition-all group">
                <FiHeart className="text-[var(--pitch-black)] group-hover:text-[var(--action-pink)] group-hover:fill-[var(--action-pink)] transition-colors" />
                <span className="text-xs font-mono font-bold text-[var(--pitch-black)]">{likes}</span>
            </button>
        </SignInButton>
      )
  }

  return (
    <button
      onClick={handleLike}
      className={`flex items-center gap-2 px-4 py-2 font-space font-black text-xs uppercase tracking-wider border-[2px] border-[var(--pitch-black)] rounded-md shadow-[2px_2px_0px_var(--pitch-black)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_var(--pitch-black)] transition-all ${liked ? 'bg-[var(--action-pink)] text-white' : 'bg-[var(--pure-white)] text-[var(--pitch-black)]'}`}
    >
      <FiHeart className={`transition-colors ${liked ? 'fill-white text-white' : 'text-[var(--pitch-black)]'}`} />
      <span className={`text-xs font-mono font-bold ${liked ? 'text-white' : 'text-[var(--pitch-black)]'}`}>{likes}</span>
    </button>
  );
}
