'use client';

import { useState, useEffect } from 'react';
import { toggleLike, getLikeStatus } from '@/app/actions/blog-engagement';
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

  if (loading) return <div className="h-10 w-24 bg-white/5 rounded-full animate-pulse" />;

  if (!isSignedIn) {
      return (
        <SignInButton mode="modal">
            <button className="flex items-center gap-2 px-4 py-2 border border-white/10 rounded-full bg-white/5 hover:bg-white/10 transition-colors group">
                <FiHeart className="text-white/40 group-hover:text-red-500 transition-colors" />
                <span className="text-sm font-mono text-white/60">{likes}</span>
            </button>
        </SignInButton>
      )
  }

  return (
    <button
      onClick={handleLike}
      className={`flex items-center gap-2 px-4 py-2 border rounded-full transition-all duration-300 ${liked ? 'bg-red-500/10 border-red-500/50' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}
    >
      <FiHeart className={`transition-colors ${liked ? 'fill-red-500 text-red-500' : 'text-white/40'}`} />
      <span className={`text-sm font-mono ${liked ? 'text-red-400' : 'text-white/60'}`}>{likes}</span>
    </button>
  );
}
