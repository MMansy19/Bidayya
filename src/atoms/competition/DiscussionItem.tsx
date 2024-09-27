import React, { useState } from 'react';
import { Avatar } from 'primereact/avatar';
import { Button } from 'primereact/button';
import ButtonIcon from '../common/ButtonIcon';
import { timeAgo } from '../../utils';
import { Topic } from '../../types';
import bronzeMedal from '../../assets/bronzeMedal.svg';
import silverMedal from '../../assets/silverMedal.svg';
import goldMedal from '../../assets/goldMedal.svg';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { useParams } from 'react-router-dom';

interface DiscussionItemProps {
  topic: Topic;
}

const DiscussionItem: React.FC<DiscussionItemProps> = ({ topic }) => {
  const { id } = useParams<{ id: string }>();
  const [upvoteCount, setUpvoteCount] = useState(topic._count.topicVotes);
  const [hasUpvoted, setHasUpvoted] = useState(topic.upvotedByMe);

  const goToUserProfile = () => {
    // Navigate to user profile
  };

  const toggleVote = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/topics/${topic.id}/toggle-upvote`,
        {
          method: 'PATCH',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.ok) {
        setHasUpvoted(!hasUpvoted);
        setUpvoteCount(hasUpvoted ? upvoteCount - 1 : upvoteCount + 1);
      } else {
        console.log('Error toggling vote');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="flex cursor-pointer items-center justify-between px-4 py-1 transition duration-200 ease-in-out hover:bg-gray-50">
        <div
          onClick={() =>
            (window.location.href = `/competitions/${id}/discussions/${topic.id}`)
          }
          className="flex items-center space-x-6"
        >
          <Button id="avatarButton" onClick={goToUserProfile}>
            <Avatar
              image={'authorPicture'}
              className="p-overlay-badge"
              size="large"
              shape="circle"
            />
          </Button>
          <div>
            <h3 className="text-md text-start font-semibold">{topic.name}</h3>
            <p className="text-xs text-gray-600">
              {topic.user.full_name} ·{" "}
              {topic.comments.length > 0 && (
                <span>
                  Last <span className="underline">comment</span>{' '}
                  {timeAgo(new Date(topic.comments[0].created_at))} by{' '}
                  {topic.comments[0].user.full_name}
                </span>
              )}
            </p>
          </div>
        </div>
        <div className="flex items-start justify-center gap-3">
          <div className="flex flex-col items-center justify-center gap-1">
            <ButtonIcon
              icon={hasUpvoted ? 'pi pi-sort-up-fill' : 'pi pi-sort-up'}
              className="rounded-full border border-primary-text px-2 py-1"
              label={`${upvoteCount}`}
              onClick={toggleVote}
            />
            <div className="flex items-center">
              <span className="text-xs text-gray-600">
                {topic._count.comments} comments
              </span>
              {/* <ButtonIcon /> */}
            </div>
          </div>
          <div>
            {topic.medal_type === 'GOLD' && (
              <img src={goldMedal} alt="Gold Medal" className="h-8 w-8" />
            )}
            {topic.medal_type === 'SILVER' && (
              <img src={silverMedal} alt="Silver Medal" className="h-8 w-8" />
            )}
            {topic.medal_type === 'BRONZE' && (
              <img src={bronzeMedal} alt="Bronze Medal" className="h-8 w-8" />
            )}
          </div>
        </div>
      </div>
      <hr />
    </>
  );
};

export default DiscussionItem;
