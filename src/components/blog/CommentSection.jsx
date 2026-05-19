'use client';

import { useState, useEffect } from 'react';
import { submitComment, getComments, deleteComment } from '@/actions/blogs';
import { useUser, SignInButton } from '@clerk/nextjs';
import { FiMessageSquare, FiTrash2, FiSend } from 'react-icons/fi';

export default function CommentSection({ blogSlug }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user, isSignedIn } = useUser();

  useEffect(() => {
    async function fetchComments() {
      const data = await getComments(blogSlug);
      setComments(data);
    }
    fetchComments();
  }, [blogSlug]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!newComment.trim()) return;

    setIsSubmitting(true);

    // Optimistic UI update
    const tempId = Date.now();
    const optimisticComment = {
        id: tempId,
        content: newComment,
        user_name: user.fullName || user.username || 'You',
        user_image: user.imageUrl,
        created_at: new Date().toISOString(),
        user_id: user.id
    };

    setComments([optimisticComment, ...comments]);
    setNewComment('');

    const result = await submitComment(blogSlug, optimisticComment.content);

    if (!result.success) {
        // Revert on failure
        setComments(prev => prev.filter(c => c.id !== tempId));
        alert('Failed to post comment');
    } else {
        // Refresh real data to get ID
        const data = await getComments(blogSlug);
        setComments(data);
    }

    setIsSubmitting(false);
  }

  async function handleDelete(id) {
      if (!confirm('Are you sure you want to delete this comment?')) return;

      const result = await deleteComment(id, blogSlug);
      if (result.success) {
          setComments(prev => prev.filter(c => c.id !== id));
      } else {
          alert('Failed to delete comment');
      }
  }

  return (
    <div className="mt-20 pt-10 border-t-[3px] border-[var(--pitch-black)]">
      <h3 className="text-3xl font-black font-bebas uppercase tracking-wider mb-8 flex items-center gap-3 text-[var(--pitch-black)]">
        <FiMessageSquare className="text-[var(--electric-purple)] text-2xl" />
        Discussion <span className="text-[var(--pitch-black)] opacity-60 text-lg font-space font-bold">({comments.length})</span>
      </h3>

      {/* Comment Form */}
      <div className="mb-12 bg-[var(--pure-white)] border-[3px] border-[var(--pitch-black)] rounded-xl p-6 shadow-[5px_5px_0px_var(--pitch-black)]">
        {!isSignedIn ? (
            <div className="text-center py-4">
                <p className="text-[var(--pitch-black)] font-space font-medium opacity-85 mb-6">Join the discussion by logging in.</p>
                <SignInButton mode="modal">
                    <button className="px-6 py-3 bg-[var(--neon-yellow)] text-[var(--pitch-black)] border-[3px] border-[var(--pitch-black)] rounded-xl font-space font-black transition-all text-xs uppercase tracking-widest shadow-[4px_4px_0px_var(--pitch-black)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_var(--pitch-black)]">
                        Log In to Comment
                    </button>
                </SignInButton>
            </div>
        ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="flex items-start gap-4">
                    <img src={user.imageUrl} alt={user.fullName} className="w-10 h-10 rounded-full border-[2px] border-[var(--pitch-black)]" />
                    <div className="flex-1">
                        <textarea
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="What are your thoughts?"
                            rows={3}
                            className="w-full bg-[var(--off-white)] border-[3px] border-[var(--pitch-black)] rounded-xl p-4 text-[var(--pitch-black)] font-space font-medium focus:border-[var(--electric-purple)] outline-none transition-colors resize-none shadow-[3px_3px_0px_var(--pitch-black)]"
                            required
                        />
                    </div>
                </div>
                <div className="flex justify-end">
                    <button
                        type="submit"
                        disabled={isSubmitting || !newComment.trim()}
                        className="px-6 py-3 bg-[var(--neon-yellow)] text-[var(--pitch-black)] border-[3px] border-[var(--pitch-black)] rounded-xl font-space font-black transition-all text-xs uppercase tracking-widest flex items-center gap-2 shadow-[4px_4px_0px_var(--pitch-black)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_var(--pitch-black)] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? 'Posting...' : <><FiSend /> Post Comment</>}
                    </button>
                </div>
            </form>
        )}
      </div>

      {/* Comments List */}
      <div className="space-y-8">
        {comments.length === 0 ? (
            <p className="text-[var(--pitch-black)] opacity-60 italic text-center py-8 font-space font-medium">No comments yet. Be the first to share your thoughts!</p>
        ) : (
            comments.map((comment) => (
                <div key={comment.id} className="flex gap-4 group items-start">
                    {comment.user_image ? (
                        <img src={comment.user_image} alt={comment.user_name} className="w-10 h-10 rounded-full border-[2px] border-[var(--pitch-black)] object-cover shadow-[2px_2px_0px_var(--pitch-black)]" />
                    ) : (
                        <div className="w-10 h-10 rounded-full bg-[var(--neon-yellow)] text-[var(--pitch-black)] flex items-center justify-center font-space font-black text-sm border-[2px] border-[var(--pitch-black)] shadow-[2px_2px_0px_var(--pitch-black)]">
                            {comment.user_name?.[0]}
                        </div>
                    )}

                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                            <span className="font-space font-black text-[var(--pitch-black)] text-sm">{comment.user_name}</span>
                            <span className="text-xs text-[var(--pitch-black)] opacity-60 font-space font-bold">
                                {new Date(comment.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                            </span>
                             {user?.id === comment.user_id && (
                                <button
                                    onClick={() => handleDelete(comment.id)}
                                    className="text-[var(--pitch-black)] opacity-40 hover:opacity-100 hover:text-[var(--action-pink)] transition-all ml-2"
                                >
                                    <FiTrash2 size={14} />
                                </button>
                            )}
                        </div>
                        <p className="text-[var(--pitch-black)] opacity-95 text-sm leading-relaxed font-space font-medium bg-[var(--pure-white)] border-[2px] border-[var(--pitch-black)] rounded-xl p-4 mt-2 shadow-[2px_2px_0px_var(--pitch-black)]">
                          {comment.content}
                        </p>
                    </div>
                </div>
            ))
        )}
      </div>
    </div>
  );
}
