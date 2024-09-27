import React from 'react';
import { Button } from 'primereact/button';
import { Link } from 'react-router-dom';
import ImageComponent from '../../atoms/common/ImageComponent';
interface CompetitionCardProps {
  id: number;
  title: string;
  companyName: string;
  participants: number;
  description: string;
  price: number;
  dueInDays: string;
  coverImage: string;
}

const CompetitionCard: React.FC<CompetitionCardProps> = ({
  id,
  title,
  companyName,
  participants,
  description,
  price,
  dueInDays,
  coverImage,
}) => {
  return (
    <div className="hover:scale-102 mx-auto w-64 transform overflow-hidden rounded-3xl bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <Link to={`/competitions/${id}`}>
        <div className="object-cover object-center">
          {coverImage && (
            <ImageComponent
              src={coverImage}
              imageName="Competition cover image"
            />
          )}
        </div>
      </Link>

      <div className="rounded-b-3xl border border-x-secondary-text border-b-secondary-text">
        <div className="mb-1 ml-2 flex items-center justify-between">
          <h3 className="text-lg font-bold">{title}</h3>
          <Button
            icon="pi pi-bookmark"
            className="p-button-rounded p-button-text"
          />
        </div>
        <div className="mx-2 mb-1 text-xs font-semibold text-secondary-text">
          <span className="underline">{companyName}</span> • {participants}{' '}
          Participants
        </div>
        <p className="mx-1 mb-1 h-8 w-64 text-xs text-gray-700">
          {description.length > 70
            ? `${description.substring(0, 70)}...`
            : description}
        </p>
        <hr className="border-secondary-text" />
        <div className="flex items-center justify-between p-2">
          <span className="text-xl font-bold">${price}</span>
          <span className="text-xs text-secondary-text">
            Due in {dueInDays} days
          </span>
        </div>
      </div>
    </div>
  );
};

export default CompetitionCard;
