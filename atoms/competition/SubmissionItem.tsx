import React, { useState } from 'react';
import { Avatar } from 'primereact/avatar';
import { Button } from 'primereact/button';
import ButtonIcon from '../common/ButtonIcon';
import goldMedal from '../../assets/goldMedal.svg';
import silverMedal from '../../assets/silverMedal.svg';
import bronzeMedal from '../../assets/bronzeMedal.svg';

interface SubmissionItemProps {
  userPicture: string;
  title: string;
  updated_at: string;
  upvotes: number;
  commentsCount: number;
  competitionName: string | undefined;
  medalType: 'GOLD' | 'SILVER' | 'BRONZE' | null;
  onClick: () => void;
}

const SubmissionItem: React.FC<SubmissionItemProps> = ({
  userPicture,
  title,
  updated_at,
  upvotes,
  commentsCount,
  competitionName,
  onClick,
  medalType,
}) => {
  const [upvoteCount, setUpvoteCount] = useState(upvotes);
  const [hasUpvoted, setHasUpvoted] = useState(false);

  const updatedDate = () => {
    const currentDate = new Date();
    const submissionDate = new Date(updated_at);
    const timeDiff = currentDate.getTime() - submissionDate.getTime();
    const seconds = Math.floor(timeDiff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    if (seconds < 60) {
      return `${seconds} seconds ago`;
    } else if (minutes < 60) {
      return `${minutes} minutes ago`;
    } else if (hours < 24) {
      return `${hours} hours ago`;
    } else if (days < 7) {
      return `${days} days ago`;
    } else if (weeks < 4) {
      return `${weeks} weeks ago`;
    } else if (months < 12) {
      return `${months} months ago`;
    } else {
      return `${years} years ago`;
    }
  };

  const goToUserProfile = () => {
    // window.location.href = "/user-profile";
  };

  const toggleVote = () => {
    if (hasUpvoted) {
      setUpvoteCount(upvoteCount - 1);
    } else {
      setUpvoteCount(upvoteCount + 1);
    }
    setHasUpvoted(!hasUpvoted);
  };

  return (
    <>
      <div className="flex cursor-pointer items-center justify-between px-4 py-1 transition duration-200 ease-in-out hover:bg-gray-50">
        <div onClick={onClick} className="flex items-center space-x-6">
          <Button id="avatarButton" onClick={goToUserProfile}>
            <Avatar
              image={userPicture}
              className="p-overlay-badge"
              size="large"
              shape="circle"
            />
          </Button>
          <div>
            <h3 className="text-md font-semibold">{title}</h3>
            <p className="text-xs text-gray-600">Updated {updatedDate()}</p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center gap-1">
          <ButtonIcon
            icon={hasUpvoted ? 'pi pi-sort-up-fill' : 'pi pi-sort-up'}
            className={'rounded-full border border-primary-text px-2 py-1'}
            label={`${upvoteCount}`}
            onClick={toggleVote}
          />
          <div className="flex items-center justify-center">
            {medalType && (
              <div>
                {medalType === 'GOLD' && (
                  <img src={goldMedal} className="h-8 w-8" alt="Gold Medal" />
                )}
                {medalType === 'SILVER' && (
                  <img
                    src={silverMedal}
                    className="h-8 w-8"
                    alt="Silver Medal"
                  />
                )}
                {medalType === 'BRONZE' && (
                  <img
                    src={bronzeMedal}
                    className="h-8 w-8"
                    alt="Bronze Medal"
                  />
                )}
              </div>
            )}
            <ButtonIcon />
          </div>
        </div>
      </div>
      <hr />
    </>
  );
};

export default SubmissionItem;
