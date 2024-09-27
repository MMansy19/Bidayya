import React from 'react';
import StyledButton from '../../atoms/common/StyledButton';

interface ConfirmCreationProps {
  onEditClick: () => void;
  id: string | null;
}

const ConfirmCreation: React.FC<ConfirmCreationProps> = ({
  onEditClick,
  id,
}) => {
  return (
    <div className="mt-24 flex flex-col gap-3 transition-all duration-300 lg:w-1/2 lg:gap-4 xl:mx-8">
      <h1 className="text-start text-2xl font-bold sm:text-4xl">
        Create competition
      </h1>
      <h1 className="my-2 text-start text-sm font-semibold sm:text-base">
        Thank you for creating your competition!
      </h1>
      <h1 className="my-2 text-start text-sm font-semibold sm:text-base">
        This is your tracking number: <span className="underline">{id}</span>
      </h1>
      <h1 className="my-2 text-start text-sm font-semibold sm:text-base">
        We will come back to you soon, once we review the application.
      </h1>
      <StyledButton
        label="Edit"
        onClick={onEditClick}
        variant="secondary"
        className="self-start border-2 border-regal-blue text-regal-blue"
      />
    </div>
  );
};

export default ConfirmCreation;
