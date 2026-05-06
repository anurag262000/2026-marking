'use client';

import { useState } from 'react';
import { deleteBlog } from '@/actions/blogs';

export default function DeleteBlogButton({ blogId }) {
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this blog? This action cannot be undone.')) {
            setIsDeleting(true);
            try {
                const result = await deleteBlog(blogId);
                if (!result.success) {
                    alert('Error: ' + result.message);
                }
            } catch (error) {
                alert('An unexpected error occurred: ' + error.message);
            } finally {
                setIsDeleting(false);
            }
        }
    };

    return (
        <button 
            onClick={handleDelete}
            disabled={isDeleting}
            className={`text-red-400 hover:text-red-300 text-sm font-orbitron uppercase ${isDeleting ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
            {isDeleting ? 'Deleting...' : 'Delete'}
        </button>
    );
}
