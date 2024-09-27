import React from 'react';
import { AdminCompetition } from '../../types';
import { parseDate } from './CompetitionDetails';
import Timeline from '../common/Timeline';
import Prizes from '../common/Prizes';
interface OverviewProps {
  competition: AdminCompetition | undefined;
}

const Overview: React.FC<OverviewProps> = ({ competition }) => {
  return (
    <div className="flex max-w-3xl flex-col gap-6">
      <h2 className="self-start text-2xl font-bold">Overview</h2>
      <div className="flex">{competition?.description}</div>
      <hr className="border text-gray-600" />
      <h2 className="self-start text-xl font-bold">Timeline</h2>
      <div className="flex">
        Deadline: {parseDate(competition?.submission_deadline || '')}
      </div>
      <Timeline />

      <hr className="border text-gray-600" />
      <h2 className="self-start text-xl font-bold">Prizes</h2>
      <div className="flex">{competition?.price}$</div>
      <Prizes />
      <hr className="border text-gray-600" />
    </div>
  );
};

export default Overview;
