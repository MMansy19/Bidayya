import React from 'react';
const initialTimeline = {
  startDate: 'October 31, 2023 - Start Date.',
  entryDeadline:
    'January 15, 2024 - Entry Deadline. You must accept the competition rules before this date in order to compete.',
  teamMergerDeadline:
    'January 15, 2024 - Team Merger Deadline. This is the last day participants may join or merge teams.',
  finalSubmissionDeadline: 'January 22, 2024 - Final Submission Deadline.',
};

const Timeline: React.FC = () => {
  return (
    <div className="text-start">
      <h3 className="text-xl font-bold">Timeline</h3>
      <ul className="mt-2 list-disc pl-5">
        <li>{initialTimeline.startDate}</li>
        <li>{initialTimeline.entryDeadline}</li>
        <li>{initialTimeline.teamMergerDeadline}</li>
        <li>{initialTimeline.finalSubmissionDeadline}</li>
      </ul>
      <p className="mt-2">
        All deadlines are at 11:59 PM UTC on the corresponding day unless
        otherwise noted. The competition organizers reserve the right to update
        the contest timeline if they deem it necessary.
      </p>
    </div>
  );
};

export default Timeline;
