import React from 'react';
import { AdminCompetition } from '../../types';
import StyledButton from '../common/StyledButton';
import ButtonIcon from '../common/ButtonIcon';

interface CompetitionCardProps {
  competition: AdminCompetition;
  onClick: () => void;
}

const CompetitionCard: React.FC<CompetitionCardProps> = ({
  competition,
  onClick,
}) => {
  return (
    <div className="mb-1 rounded-lg bg-white shadow-sm transition-shadow duration-300 hover:shadow-lg">
      <div className="flex w-full items-center justify-between rounded-lg bg-white py-2 shadow-sm transition-shadow duration-300 hover:shadow-lg lg:px-4">
        <div className="flex items-center gap-2 md:space-x-4">
          <img
            src={competition.cover_image}
            alt={competition.name}
            className="h-10 max-w-10 rounded-full object-cover"
          />
          <div className="text-start">
            <h3 className="text-lg font-semibold">{competition.name}</h3>
            <p className="text-sm text-gray-600">
              <span className="underline">
                {competition.description.length > 100
                  ? `${competition.description.substring(0, 100)}...`
                  : competition.description}
              </span>{' '}
              · tracking number:{' '}
              <span className="underline">{competition.id}</span> ·{' '}
              {competition.company.company_name}
            </p>
          </div>
        </div>
        <div className="flex items-center justify-center gap-2">
          <StyledButton
            label="Show competition"
            variant="primarySmall"
            onClick={onClick}
          />
          {competition.is_accepted === null && (
            <ButtonIcon className="rotate-90" />
          )}
        </div>
      </div>
      <hr className="border-gray-600" />
    </div>
  );
};

export default CompetitionCard;
