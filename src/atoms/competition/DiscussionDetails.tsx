import React, { useEffect, useState } from 'react';
import { Avatar } from 'primereact/avatar';
import FeedbackInput from '../common/FeedbackInput';
import DiscussionItem from './DiscussionItem';
import { timeAgo } from '../../utils';
import commentsIcon from '../../assets/images/messages.png';
import replyIcon from '../../assets/images/reply.png';
import { Topic } from '../../types';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { Comment } from '../../types';
import { useParams } from 'react-router-dom';

const DiscussionDetails: React.FC = () => {
  const { discussionId } = useParams<{ discussionId: string }>();

  const [discussion, setDiscussion] = useState<Topic>();

  const fetchDiscussion = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/topics/${discussionId}`,
        {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setDiscussion(data);
      } else {
        console.log('Error fetching discussion');
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchDiscussion();
  }, []);

  useEffect(() => {
    if (discussion) setComments(discussion.comments);
  }, [discussion]);

  const [comments, setComments] = useState<Comment[]>([]);
  const [replyToCommentId, setReplyToCommentId] = useState<number | null>(null);

  const user = useSelector((state: RootState) => state.user.user);

  const handleAddComment = async (content: string) => {
    if (content.trim()) {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/comments/add-comment`,
          {
            method: 'POST',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              topicId: discussion?.id,
              content,
            }),
          }
        );

        if (!response.ok) {
          console.log('Error adding comment');
        }
        const data = await response.json();

        const newComment = {
          ...data,
          _count: {
            comments: 0,
            commentVotes: 0,
          },
          user: {
            id: user.id,
            email: user.email,
            full_name: user.full_name,
            username: user.username,
            is_active: user.is_active,
          },
          comments: [],
        };
        // console.log(newComment);
        setComments([newComment, ...comments]);

        // console.log(data);
      } catch (error) {
        console.error(error);
      }
      // setReplyToCommentId(null);
    }
  };

  // Handle adding a reply
  const handleAddReply = async (commentId: number, content: string) => {
    if (content.trim()) {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/comments/add-reply`,
          {
            method: 'POST',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              commentId: commentId,
              content,
            }),
          }
        );

        if (!response.ok) {
          console.log('Error adding reply');
        }
        const data = await response.json();
        const newReply = {
          ...data,
          _count: {
            comments: 0,
            commentVotes: 0,
          },
          user: {
            id: user.id,
            email: user.email,
            full_name: user.full_name,
            username: user.username,
            is_active: user.is_active,
          },
          comments: [],
        };

        setComments(
          comments.map((comment) => {
            if (comment.id === commentId) {
              return {
                ...comment,
                comments: [newReply, ...comment.comments],
              };
            }
            return comment;
          })
        );
        // console.log(data);
      } catch (error) {
        console.error(error);
      }
      // setReplyToCommentId(null);
    }
  };

  return (
    <div className="flex flex-col gap-4 text-start">
      {discussion && <DiscussionItem topic={discussion} />}

      <h2 className="text-2xl font-bold">{discussion?.name}</h2>
      <p className="text-gray-600">{discussion?.content}</p>
      <hr className="border-1 text-gray-600" />
      {/* Comment Section */}
      <div className="mb-4">
        <div className="mb-4 ml-2 flex items-center gap-2">
          <img src={commentsIcon} alt="Comments" className="w-[20px]" />
          <h3 className="text-xl font-semibold">
            {comments.length} Comment{comments.length > 1 ? 's' : ''}
          </h3>
        </div>
        {/* Add New Comment */}
        <div className="mt-2">
          <div className="flex items-start">
            {/* <Avatar
              image={discussion.authorPicture}
              size="large"
              shape="circle"
              className="mr-1 mt-4"
            /> */}
            <FeedbackInput
              onSubmit={handleAddComment}
              label="Post comment"
              placeholder="Comment here. Be patient, be friendly and focus on ideas. We’re all here to learn and improve!"
            />
          </div>
        </div>

        {comments.map((comment, index) => (
          <div key={index} className="mt-4">
            <div className="flex items-start">
              <Avatar
                image={comment.image_path || ''}
                size="large"
                shape="circle"
                className="mr-4"
              />
              <div>
                <p className="font-bold">{comment.user.full_name}</p>
                <p className="text-gray-700">
                  Posted {timeAgo(new Date(comment.created_at))}
                </p>
                <p
                  className="text-gray-700"
                  dangerouslySetInnerHTML={{ __html: comment.content }}
                />

                <button
                  className="mt-4 flex flex-row items-end justify-start gap-1 font-bold"
                  onClick={() => setReplyToCommentId(comment.id)}
                >
                  <img src={replyIcon} alt="Reply" className="w-[20px]" />
                  <span>Reply</span>
                </button>

                {comment.comments.length > 0 && (
                  <div className="mt-2 border-l pl-6">
                    {comment.comments.map((reply, replyIndex) => (
                      <div key={replyIndex} className="mt-2 flex items-start">
                        <Avatar
                          image={reply.image_path || ''}
                          size="normal"
                          shape="circle"
                          className="mr-2"
                        />
                        <div>
                          <p className="font-bold">{reply.user.full_name}</p>
                          <p className="text-gray-700">
                            Posted {timeAgo(new Date(reply.created_at))}
                          </p>
                          <p
                            className="text-gray-700"
                            dangerouslySetInnerHTML={{
                              __html: reply.content,
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <hr className="border-1 my-2 text-gray-600" />

            {replyToCommentId === comment.id && (
              <div className="ml-8 mt-2">
                <div className="flex items-start">
                  <Avatar
                    image={comment.image_path || ''}
                    size="large"
                    shape="circle"
                    className="mr-1 mt-4"
                  />
                  <FeedbackInput
                    onSubmit={(content) => handleAddReply(comment.id, content)}
                    label="Reply"
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DiscussionDetails;
