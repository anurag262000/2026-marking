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
    <div className="mt-20 pt-10 border-t border-white/10">
      <h3 className="text-2xl font-bold font-helvetica mb-8 flex items-center gap-3">
        <FiMessageSquare className="text-blue-500" />
        Discussion <span className="text-white/40 text-lg font-normal">({comments.length})</span>
      </h3>

      {/* Comment Form */}
      <div className="mb-12 bg-white/5 border border-white/10 rounded-xl p-6">
        {!isSignedIn ? (
            <div className="text-center py-4">
                <p className="text-white/60 mb-4">Join the discussion by logging in.</p>
                <SignInButton mode="modal">
                    <button className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-bold transition-colors text-sm uppercase tracking-wider">
                        Log In to Comment
                    </button>
                </SignInButton>
            </div>
        ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="flex items-start gap-4">
                    <img src={user.imageUrl} alt={user.fullName} className="w-10 h-10 rounded-full border border-white/10" />
                    <div className="flex-1">
                        <textarea
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="What are your thoughts?"
                            rows={3}
                            className="w-full bg-black/30 border border-white/10 rounded-lg p-4 text-white focus:border-blue-500 outline-none transition-colors resize-none"
                            required
                        />
                    </div>
                </div>
                <div className="flex justify-end">
                    <button
                        type="submit"
                        disabled={isSubmitting || !newComment.trim()}
                        className="px-6 py-2 bg-blue-500 hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg font-bold transition-colors text-sm uppercase tracking-wider flex items-center gap-2"
                    >
                        {isSubmitting ? 'Posting...' : <><FiSend /> Post Comment</>}
                    </button>
                </div>
            </form>
        )}
      </div>

      {/* Comments List */}
      <div className="space-y-6">
        {comments.length === 0 ? (
            <p className="text-white/30 italic text-center py-8">No comments yet. Be the first to share your thoughts!</p>
        ) : (
            comments.map((comment) => (
                <div key={comment.id} className="flex gap-4 group">
                    {comment.user_image ? (
                        <img src={comment.user_image} alt={comment.user_name} className="w-10 h-10 rounded-full border border-white/10 object-cover" />
                    ) : (
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center font-bold text-xs">
                            {comment.user_name?.[0]}
                        </div>
                    )}

                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                            <span className="font-bold text-white text-sm">{comment.user_name}</span>
                            <span className="text-xs text-white/30 font-mono">
                                {new Date(comment.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                            </span>
                             {user?.id === comment.user_id && (
                                <button
                                    onClick={() => handleDelete(comment.id)}
                                    className="text-white/20 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                                >
                                    <FiTrash2 size={14} />
                                </button>
                            )}
                        </div>
                        <p className="text-white/70 text-sm leading-relaxed">{comment.content}</p>
                    </div>
                </div>
            ))
        )}
      </div>
    </div>
  );
}
