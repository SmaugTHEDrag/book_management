import React, { useContext, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Spinner } from "flowbite-react";
import { AuthContext } from "../../contexts/AuthProvider";
import Chatbot from "../shared/ChatBot";
import { AiOutlineHeart, AiFillHeart, AiOutlineMessage, AiOutlineEdit, AiOutlineDelete, AiOutlinePlus } from "react-icons/ai";

const Comment = ({ comment, onReply, onDelete, onEdit, depth = 0, blogOwner, currentUser }) => {
  const { user } = useContext(AuthContext);
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(comment.content);

  // Determine if current user can delete this comment
  const canDeleteComment = useMemo(() => {
    if (!user?.login) return false;
    
    // Admin can delete any comment
    if (user.role === "ADMIN") return true;
    
    // Comment owner can delete their own comment
    if (user.login === comment.username) return true;
    
    // Blog owner can delete any comment on their blog
    if (user.login === blogOwner) return true;
    
    return false;
  }, [user, comment.username, blogOwner]);

  // Determine if current user can edit this comment
  const canEditComment = useMemo(() => {
    if (!user?.login) return false;
    
    // Only comment owner can edit their own comment
    if (user.login === comment.username) return true;
    
    // Admin can also edit any comment
    if (user.role === "ADMIN") return true;
    
    return false;
  }, [user, comment.username]);

  const handleReplySubmit = () => {
    if (replyContent.trim()) {
      onReply(comment.id, replyContent.trim());
      setReplyContent("");
      setShowReplyInput(false);
    }
  };

  const handleReplyCancel = () => {
    setReplyContent("");
    setShowReplyInput(false);
  };

  const handleEditSubmit = () => {
    if (editContent.trim() && editContent.trim() !== comment.content) {
      onEdit(comment.id, editContent.trim());
      setIsEditing(false);
    } else {
      setIsEditing(false);
    }
  };

  const handleEditCancel = () => {
    setEditContent(comment.content);
    setIsEditing(false);
  };

  return (
    <div className={`${depth > 0 ? 'ml-6 mt-3' : 'mt-4'} relative`}>
      {depth > 0 && (
        <div className="absolute -left-3 top-0 bottom-0 w-px bg-gradient-to-b from-blue-200 to-transparent"></div>
      )}
      <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 hover:border-gray-200 transition-colors">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 rounded-full bg-blue-700 flex items-center justify-center text-white text-xs font-medium">
                {comment.username?.charAt(0)?.toUpperCase()}
              </div>
              <span className="font-semibold text-gray-900 text-sm">{comment.username}</span>
              {comment.username === blogOwner && (
                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-medium">Author</span>
              )}
              <span className="text-xs text-gray-500">•</span>
              <span className="text-xs text-gray-500">just now</span>
            </div>
            
            {isEditing ? (
              <div className="space-y-3">
                <textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  className="w-full border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 px-3 py-2 rounded-lg min-h-[60px] transition-all resize-none text-sm"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
                      handleEditSubmit();
                    }
                    if (e.key === "Escape") {
                      handleEditCancel();
                    }
                  }}
                />
                <div className="flex items-center justify-between">
                  <p className="text-xs text-gray-500">Press Ctrl+Enter to save, Esc to cancel</p>
                  <div className="flex gap-2">
                    <button
                      onClick={handleEditCancel}
                      className="px-3 py-1.5 text-xs text-gray-600 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-colors font-medium"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleEditSubmit}
                      disabled={!editContent.trim()}
                      className="px-3 py-1.5 text-xs bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-md transition-colors font-medium"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-gray-700 text-sm leading-relaxed">{comment.content}</p>
            )}
          </div>
        </div>
        
        {!isEditing && (
          <div className="flex items-center gap-4 mt-3">
            {user?.login && (
              <button
                className="text-xs text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1 hover:bg-blue-50 px-2 py-1 rounded-md transition-colors"
                onClick={() => setShowReplyInput(!showReplyInput)}
              >
                <AiOutlineMessage className="w-3 h-3" />
                Reply
              </button>
            )}
            {canEditComment && (
              <button
                className="text-xs text-green-600 hover:text-green-700 font-medium flex items-center gap-1 hover:bg-green-50 px-2 py-1 rounded-md transition-colors"
                onClick={() => setIsEditing(true)}
                title="Edit your comment"
              >
                <AiOutlineEdit className="w-3 h-3" />
                Edit
              </button>
            )}
            {canDeleteComment && (
              <button
                className="text-xs text-red-600 hover:text-red-700 font-medium flex items-center gap-1 hover:bg-red-50 px-2 py-1 rounded-md transition-colors"
                onClick={() => {
                  const confirmMessage = user.login === comment.username 
                    ? "Delete your comment?" 
                    : user.login === blogOwner 
                      ? "Delete this comment from your blog?" 
                      : "Delete this comment?";
                  
                  if (confirm(confirmMessage)) {
                    onDelete(comment.id);
                  }
                }}
                title={
                  user.login === comment.username 
                    ? "Delete your comment" 
                    : user.login === blogOwner 
                      ? "Delete comment (as blog owner)" 
                      : "Delete comment"
                }
              >
                <AiOutlineDelete className="w-3 h-3" />
                Delete
              </button>
            )}
          </div>
        )}
      </div>
      
      {/* Reply Input */}
      {showReplyInput && !isEditing && (
        <div className="mt-3 bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-blue-100">
          <div className="space-y-3">
            <textarea
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              placeholder={`Reply to ${comment.username}...`}
              className="w-full border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 px-4 py-3 rounded-xl min-h-[80px] transition-all resize-none text-sm"
              onKeyDown={(e) => {
                if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
                  handleReplySubmit();
                }
              }}
            />
            <div className="flex items-center justify-between">
              <p className="text-xs text-gray-500">Press Ctrl+Enter to submit</p>
              <div className="flex gap-2">
                <button
                  onClick={handleReplyCancel}
                  className="px-4 py-2 text-sm text-gray-600 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleReplySubmit}
                  disabled={!replyContent.trim()}
                  className="px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg transition-colors font-medium"
                >
                  Reply
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {comment.replies?.map((reply) => (
        <Comment
          key={reply.id}
          comment={reply}
          onReply={onReply}
          onDelete={onDelete}
          onEdit={onEdit}
          depth={depth + 1}
          blogOwner={blogOwner}
          currentUser={currentUser}
        />
      ))}
    </div>
  );
};

const Blog = () => {
  const { user, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [loadingBlogs, setLoadingBlogs] = useState(true);
  const [expandedComments, setExpandedComments] = useState({});
  const [creating, setCreating] = useState({ title: "", content: "", image: "" });
  const [editingMap, setEditingMap] = useState({});

  const token = useMemo(() => localStorage.getItem("token"), []);
  const authHeaders = useMemo(
    () => (token ? { Authorization: `Bearer ${token}` } : {}),
    [token]
  );

  const isLoggedIn = Boolean(user?.login);
  const canModify = (post) => isLoggedIn && (post?.username === user?.login || user?.role === "ADMIN");

  const toggleComments = (blogId) => {
    setExpandedComments((prev) => ({ ...prev, [blogId]: !prev[blogId] }));
  };

  const handleCardClick = (postId, e) => {
    if (
      e.target.closest('button') || 
      e.target.closest('input') || 
      e.target.closest('textarea') ||
      e.target.tagName === 'A'
    ) {
      return;
    }
    navigate(`/blog/${postId}`);
  };

  const fetchBlogs = async () => {
    try {
      setLoadingBlogs(true);
      const res = await axios.get("https://book-management-backend-d481.onrender.com/api/blogs", {
        headers: authHeaders,
      });
      const data = await Promise.all(
        res.data.map(async (blog) => {
          let hasLiked = false;
          if (isLoggedIn) {
            try {
              const likeRes = await axios.get(
                `https://book-management-backend-d481.onrender.com/api/blogs/${blog.id}/likes/has`,
                { headers: authHeaders }
              );
              hasLiked = likeRes.data;
            } catch (e) {
              hasLiked = false;
            }
          }
          return { ...blog, hasLiked };
        })
      );
      setBlogs(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingBlogs(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, [user]);

  const toggleLike = async (blogId) => {
    const blog = blogs.find((b) => b.id === blogId);
    if (!isLoggedIn) return;
    try {
      if (blog.hasLiked) {
        await axios.delete(`https://book-management-backend-d481.onrender.com/api/blogs/${blogId}/likes`, {
          headers: authHeaders,
        });
      } else {
        await axios.post(
          `https://book-management-backend-d481.onrender.com/api/blogs/${blogId}/likes`,
          {},
          { headers: authHeaders }
        );
      }
      fetchBlogs();
    } catch (err) {
      console.error(err);
    }
  };

  const addComment = async (blogId, content, parentId = null) => {
    try {
      await axios.post(
        `https://book-management-backend-d481.onrender.com/api/blogs/${blogId}/comments`,
        {
          blogId,
          content,
          parentCommentId: parentId ?? undefined,
        },
        { headers: authHeaders }
      );
      fetchBlogs();
    } catch (err) {
      console.error(err);
    }
  };

  const editComment = async (commentId, content) => {
    try {
      await axios.put(
        `https://book-management-backend-d481.onrender.com/api/blogs/comments/${commentId}`,
        { content },
        { headers: authHeaders }
      );
      fetchBlogs();
    } catch (err) {
      console.error("Failed to edit comment:", err);
      alert("Failed to edit comment. Please try again.");
    }
  };

  const deleteComment = async (commentId) => {
    try {
      await axios.delete(`https://book-management-backend-d481.onrender.com/api/blogs/comments/${commentId}`, {
        headers: authHeaders,
      });
      fetchBlogs();
    } catch (err) {
      console.error("Failed to delete comment:", err);
      alert("Failed to delete comment. Please try again.");
    }
  };

  const handleCreate = async () => {
    if (!creating.title.trim() || !creating.content.trim()) return;
    try {
      await axios.post(
        "https://book-management-backend-d481.onrender.com/api/blogs",
        {
          title: creating.title.trim(),
          content: creating.content.trim(),
          image: creating.image.trim() || undefined,
        },
        { headers: authHeaders }
      );
      setCreating({ title: "", content: "", image: "" });
      fetchBlogs();
    } catch (err) {
      console.error(err);
    }
  };

  const startEdit = (post) => {
    setEditingMap((prev) => ({
      ...prev,
      [post.id]: {
        title: post.title || "",
        content: post.content || "",
        image: post.image || "",
      },
    }));
  };

  const cancelEdit = (postId) => {
    setEditingMap((prev) => {
      const next = { ...prev };
      delete next[postId];
      return next;
    });
  };

  const saveEdit = async (postId) => {
    const data = editingMap[postId];
    if (!data) return;
    try {
      await axios.put(
        `https://book-management-backend-d481.onrender.com/api/blogs/${postId}`,
        {
          title: data.title.trim(),
          content: data.content.trim(),
          image: (data.image || "").trim() || undefined,
        },
        { headers: authHeaders }
      );
      cancelEdit(postId);
      fetchBlogs();
    } catch (err) {
      console.error(err);
    }
  };

  const removeBlog = async (postId) => {
    try {
      await axios.delete(`https://book-management-backend-d481.onrender.com/api/blogs/${postId}`, {
        headers: authHeaders,
      });
      fetchBlogs();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading || loadingBlogs) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <Spinner className="w-16 h-16 text-blue-600" />
          <p className="mt-4 text-gray-600 font-medium">Loading blog post...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-blue-700">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 bg-blue-700/80"></div>
        <div className="relative mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-white mb-6">
              From the Blog
            </h1>
            <p className="text-xl md:text-2xl leading-8 text-blue-100 max-w-2xl mx-auto">
              Share your experiences and discoveries with our vibrant community of readers and writers.
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8 -mt-12 relative z-10">
        {/* Create Post Form */}
        {isLoggedIn && (
          <div className="mb-12">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-blue-700 rounded-xl">
                  <AiOutlinePlus className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Create a new post</h3>
              </div>
              
              <div className="grid gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Title</label>
                  <input
                    value={creating.title}
                    onChange={(e) => setCreating((p) => ({ ...p, title: e.target.value }))}
                    placeholder="What's your story about?"
                    className="w-full border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 px-4 py-3 rounded-xl transition-all text-lg"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Content</label>
                  <textarea
                    value={creating.content}
                    onChange={(e) => setCreating((p) => ({ ...p, content: e.target.value }))}
                    placeholder="Share your thoughts, experiences, or insights..."
                    className="w-full border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 px-4 py-3 rounded-xl min-h-[120px] transition-all resize-none"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Cover Image (Optional)</label>
                  <input
                    value={creating.image}
                    onChange={(e) => setCreating((p) => ({ ...p, image: e.target.value }))}
                    placeholder="https://example.com/image.jpg"
                    className="w-full border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 px-4 py-3 rounded-xl transition-all"
                  />
                </div>
                
                <div className="flex justify-end">
                  <button
                    onClick={handleCreate}
                    disabled={!creating.title.trim() || !creating.content.trim()}
                    className="bg-blue-700 hover:bg-blue-800 disabled:bg-gray-400 text-white px-8 py-3 rounded-xl font-semibold transition-all transform hover:scale-105 disabled:scale-100 shadow-lg disabled:shadow-none"
                  >
                    Publish Story
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-16">
          {blogs.map((post) => (
            <article 
              key={post.id} 
              className="group bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl border border-white/20 overflow-hidden transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
              onClick={(e) => handleCardClick(post.id, e)}
            >
              {post.image && (
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                </div>
              )}

              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-blue-700 flex items-center justify-center text-white text-sm font-bold">
                      {post.username?.charAt(0)?.toUpperCase()}
                    </div>
                    <div>
                      <span className="font-semibold text-gray-900 text-sm">{post.username}</span>
                      <p className="text-xs text-gray-500">{new Date(post.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>

                {editingMap[post.id] ? (
                  <div className="space-y-4 flex-1">
                    <input
                      value={editingMap[post.id].title}
                      onChange={(e) =>
                        setEditingMap((prev) => ({
                          ...prev,
                          [post.id]: { ...prev[post.id], title: e.target.value },
                        }))
                      }
                      className="w-full border-2 border-gray-200 focus:border-blue-500 px-3 py-2 rounded-lg"
                    />
                    <textarea
                      value={editingMap[post.id].content}
                      onChange={(e) =>
                        setEditingMap((prev) => ({
                          ...prev,
                          [post.id]: { ...prev[post.id], content: e.target.value },
                        }))
                      }
                      className="w-full border-2 border-gray-200 focus:border-blue-500 px-3 py-2 rounded-lg min-h-[100px] resize-none"
                    />
                    <input
                      value={editingMap[post.id].image}
                      onChange={(e) =>
                        setEditingMap((prev) => ({
                          ...prev,
                          [post.id]: { ...prev[post.id], image: e.target.value },
                        }))
                      }
                      placeholder="Image URL (optional)"
                      className="w-full border-2 border-gray-200 focus:border-blue-500 px-3 py-2 rounded-lg"
                    />
                  </div>
                ) : (
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed line-clamp-3 mb-6">{post.content}</p>
                  </div>
                )}

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <button
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all transform hover:scale-105 ${
                      post.hasLiked 
                        ? "bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-lg shadow-rose-500/25" 
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    } ${isLoggedIn ? "" : "opacity-60 cursor-not-allowed hover:scale-100"}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleLike(post.id);
                    }}
                    disabled={!isLoggedIn}
                  >
                    {post.hasLiked ? <AiFillHeart className="w-4 h-4" /> : <AiOutlineHeart className="w-4 h-4" />}
                    <span>{post.likeCount}</span>
                  </button>

                  <div className="flex items-center gap-2">
                    {canModify(post) && (
                      editingMap[post.id] ? (
                        <>
                          <button
                            className="px-3 py-1.5 text-sm text-green-600 hover:text-green-700 hover:bg-green-50 rounded-lg transition-colors font-medium"
                            onClick={(e) => {
                              e.stopPropagation();
                              saveEdit(post.id);
                            }}
                          >
                            Save
                          </button>
                          <button
                            className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-700 hover:bg-gray-50 rounded-lg transition-colors font-medium"
                            onClick={(e) => {
                              e.stopPropagation();
                              cancelEdit(post.id);
                            }}
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            className="p-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
                            onClick={(e) => {
                              e.stopPropagation();
                              startEdit(post);
                            }}
                            title="Edit post"
                          >
                            <AiOutlineEdit className="w-4 h-4" />
                          </button>
                          <button
                            className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                            onClick={(e) => {
                              e.stopPropagation();
                              if (confirm("Delete this post?")) removeBlog(post.id);
                            }}
                            title="Delete post"
                          >
                            <AiOutlineDelete className="w-4 h-4" />
                          </button>
                        </>
                      )
                    )}
                    <button
                      className="flex items-center gap-1 px-3 py-1.5 text-sm text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors font-medium"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleComments(post.id);
                      }}
                    >
                      <AiOutlineMessage className="w-4 h-4" />
                      {expandedComments[post.id] ? "Hide" : "Comments"}
                    </button>
                  </div>
                </div>

                {expandedComments[post.id] && (
                  <div className="mt-6 pt-6 border-t border-gray-100">
                    <div className="flex items-center gap-2 mb-4">
                      <AiOutlineMessage className="w-5 h-5 text-gray-600" />
                      <h4 className="font-bold text-gray-900">Comments</h4>
                      <span className="px-2 py-1 bg-gray-100 rounded-full text-xs text-gray-600">
                        {post.comments?.length || 0}
                      </span>
                    </div>
                    
                    {post.comments?.length ? (
                      <div className="space-y-1">
                        {post.comments.map((comment) => (
                          <Comment
                            key={comment.id}
                            comment={comment}
                            onReply={(parentId, content) => addComment(post.id, content, parentId)}
                            onDelete={deleteComment}
                            onEdit={editComment}
                            blogOwner={post.username}
                            currentUser={user}
                          />
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <AiOutlineMessage className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                        <p className="text-gray-500 text-sm">No comments yet. Be the first to share your thoughts!</p>
                      </div>
                    )}
                    
                    {isLoggedIn && (
                      <div className="mt-4">
                        <input
                          type="text"
                          placeholder="Add a thoughtful comment..."
                          className="w-full border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 px-4 py-3 rounded-xl transition-all"
                          onKeyDown={(e) => {
                            if (e.key === "Enter" && e.target.value.trim()) {
                              addComment(post.id, e.target.value.trim());
                              e.target.value = "";
                            }
                          }}
                        />
                        <p className="text-xs text-gray-500 mt-2">Press Enter to post your comment</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>

        {blogs.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-blue-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <AiOutlinePlus className="w-12 h-12 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No stories yet</h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">Be the first to share your experience with our community. Your story could inspire others!</p>
            {isLoggedIn && (
              <button className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-xl font-semibold transition-all transform hover:scale-105 shadow-lg">
                Write First Post
              </button>
            )}
          </div>
        )}
      </div>
    <div className="fixed bottom-6 right-6 z-50">
      <Chatbot />
    </div>
    </div>
  );
};

export default Blog;