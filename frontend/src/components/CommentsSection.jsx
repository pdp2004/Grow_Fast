import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CommentsSection.css';

const CommentsSection = ({ tutorialId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyContent, setReplyContent] = useState('');

  useEffect(() => {
    fetchComments();
  }, [tutorialId]);

  const fetchComments = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/api/comments/tutorial/${tutorialId}`);
      setComments(response.data.comments);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      const response = await axios.post('/api/comments', {
        tutorialId,
        content: newComment
      });

      setComments([response.data.comment, ...comments]);
      setNewComment('');
    } catch (error) {
      console.error('Error posting comment:', error);
    }
  };

  const handleSubmitReply = async (parentCommentId) => {
    if (!replyContent.trim()) return;

    try {
      const response = await axios.post('/api/comments', {
        tutorialId,
        content: replyContent,
        parentCommentId
      });

      // Update comments with the new reply
      const updatedComments = comments.map(comment => {
        if (comment._id === parentCommentId) {
          return {
            ...comment,
            replies: [response.data.comment, ...comment.replies]
          };
        }
        return comment;
      });

      setComments(updatedComments);
      setReplyContent('');
      setReplyingTo(null);
    } catch (error) {
      console.error('Error posting reply:', error);
    }
  };

  const handleLike = async (commentId) => {
    try {
      const response = await axios.post(`/api/comments/${commentId}/like`);
      // Update likes in UI
      const updatedComments = comments.map(comment => {
        if (comment._id === commentId) {
          return {
            ...comment,
            likes: response.data.likes,
          };
        }
        return comment;
      });

      setComments(updatedComments);
    } catch (error) {
      console.error('Error liking comment:', error);
    }
  };

  return (
    <div className="comments-section">
      <h3>Discussion ({comments.length})</h3>

      {/* Add Comment Form */}
      <form onSubmit={handleSubmitComment} className="comment-form">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
          rows="3"
          required
        />
        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            Post Comment
          </button>
        </div>
      </form>

      {/* Comments List */}
      <div className="comments-list">
        {comments.map(comment => (
          <div key={comment._id} className="comment">
            <div className="comment-header">
              <div className="user-info">
                <div className="avatar">
                  {comment.user.profile?.name?.[0] || comment.user.username[0]}
                </div>
                <div>
                  <div className="username">
                    {comment.user.profile?.name || comment.user.username}
                  </div>
                  <div className="timestamp">
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </div>

            <div className="comment-content">
              {comment.content}
            </div>

            <div className="comment-actions">
              <button 
                className="like-btn"
                onClick={() => handleLike(comment._id)}
              >
                👍 {comment.likes.length}
              </button>
              <button 
                className="reply-btn"
                onClick={() => setReplyingTo(replyingTo === comment._id ? null : comment._id)}
              >
                Reply
              </button>
            </div>

            {/* Reply Form */}
            {replyingTo === comment._id && (
              <div className="reply-form">
                <textarea
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  placeholder="Write a reply..."
                  rows="2"
                />
                <div className="form-actions">
                  <button 
                    type="button"
                    className="btn btn-outline"
                    onClick={() => setReplyingTo(null)}
                  >
                    Cancel
                  </button>
                  <button 
                    type="button"
                    className="btn btn-primary"
                    onClick={() => handleSubmitReply(comment._id)}
                  >
                    Post Reply
                  </button>
                </div>
              </div>
            )}

            {/* Replies */}
            {comment.replies && comment.replies.length > 0 && (
              <div className="replies">
                {comment.replies.map(reply => (
                  <div key={reply._id} className="comment reply">
                    <div className="comment-header">
                      <div className="user-info">
                        <div className="avatar small">
                          {reply.user.profile?.name?.[0] || reply.user.username[0]}
                        </div>
                        <div>
                          <div className="username">
                            {reply.user.profile?.name || reply.user.username}
                          </div>
                          <div className="timestamp">
                            {new Date(reply.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="comment-content">
                      {reply.content}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentsSection;
