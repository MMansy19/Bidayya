import React from 'react';
import { AdminCompetition } from '../../types';

interface RulesProps {
  competition: AdminCompetition | undefined;
}

const Rules: React.FC<RulesProps> = ({ competition }) => {
  return (
    <div className="flex max-w-3xl flex-col gap-3">
      <h2 className="self-start text-2xl font-bold">Rules</h2>
      {competition?.rules ? (
        <div
          className="prose text-start"
          dangerouslySetInnerHTML={{ __html: competition?.rules }}
        ></div>
      ) : (
        <div className="text-start">
          <p className="self-start text-lg font-medium">
            One account per participant
          </p>
          <p className="self-start text-base">
            You cannot sign up to Bidayya from multiple accounts and therefore
            you cannot submit from multiple accounts.
          </p>
          <br />
          <p className="self-start text-lg font-medium">
            No private sharing outside teams
          </p>
          <p className="self-start text-base">
            Privately sharing data outside of teams is not permitted. It's okay
            to share code if made available to all participants on the forums.
          </p>
        </div>
      )}
    </div>
  );
};

export default Rules;
