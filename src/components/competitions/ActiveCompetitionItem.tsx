import React from 'react';
import ButtonIcon from '../../atoms/common/ButtonIcon';
import { Link } from 'react-router-dom';

interface ActiveCompetitionItemProps {
  id: number;
  title: string;
  submissionsLeft: string;
  timeAgo: string;
  rank: string;
  totalParticipants: number;
  is_active: boolean;
  coverImage: string;
}

const ActiveCompetitionItem: React.FC<ActiveCompetitionItemProps> = ({
  id,
  title,
  submissionsLeft,
  timeAgo,
  rank,
  totalParticipants,
  is_active,
  coverImage,
}) => {
  return (
    <div
      className={`mb-1 flex items-center justify-between rounded-lg py-2 shadow-sm transition-shadow duration-300 lg:px-4 ${
        is_active ? 'bg-white hover:shadow-lg' : 'bg-gray-100'
      }`}
    >
      <Link to={`/competitions/${id}`}>
        <div className="flex items-center gap-2 md:space-x-4">
          <img
            src={coverImage}
            alt={title}
            className="h-10 max-w-10 rounded-full object-cover"
          />
          <div className="text-start">
            <h3 className="text-left text-lg font-semibold">{title}</h3>
            <p className="text-xs text-secondary-text lg:text-sm">
              {submissionsLeft} submissions left today • {timeAgo}
            </p>
          </div>
        </div>
      </Link>

      <div className="flex flex-col items-center">
        <ButtonIcon />
        <p className="text-xs text-secondary-text lg:text-sm">
          {rank} / {totalParticipants}
        </p>
      </div>
    </div>
  );
};

export default ActiveCompetitionItem;
