import React from 'react';
import ImageComponent from '../common/ImageComponent';
import PDFs from '../common/PDFs';

import { Submission } from '../../types';

interface SubmissionDetailsProps {
  submission?: Submission;
  onBack: () => void;
}

const SubmissionDetails: React.FC<SubmissionDetailsProps> = ({
  submission,
  onBack,
}) => {
  return (
    <div>
      <header className="mb-4 mt-8 flex flex-col items-start justify-between gap-3 lg:flex-row">
        <div className="flex flex-col gap-3 lg:gap-4">
          <h1 className="text-2xl font-bold">Submission Details</h1>
          <h2 className="text-xl font-bold sm:text-4xl">{submission?.title}</h2>
          <p className="lg:text-md max-w-96 text-xs text-secondary-text">
            {submission?.description}
          </p>
        </div>
        <div className="flex flex-col gap-3 lg:gap-4">
          <button onClick={onBack} className="text-blue-500">
            Back to Submissions
          </button>
          <ImageComponent
            className="h-40 w-64"
            src={submission?.cover_image || ''}
          />
        </div>
      </header>
      <hr />
      <div className="mt-8 flex max-w-4xl flex-col gap-10">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {submission?.files
            .filter((f) => f.split('.').pop() !== 'pdf')
            .map((url, index) => (
              <ImageComponent
                key={index}
                src={url}
                className="h-auto max-w-full rounded-lg"
              />
            ))}
        </div>
        <PDFs
          PDFs={submission?.files.filter((f) => f.split('.').pop() === 'pdf')}
        />
      </div>
    </div>
  );
};

export default SubmissionDetails;
