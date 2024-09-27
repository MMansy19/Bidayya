import React, { useEffect, useState } from 'react';
import CompetitionCard from '../../atoms/dashboard/CompetitionCard';
import { AdminCompetition } from '../../types';

const UnderReview = () => {
  const [competitions, setCompetitions] = useState<AdminCompetition[]>([]);
  const fetchCompetitions = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/competitions/under-review`,
        {
          method: 'GET',
          credentials: 'include',

          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setCompetitions(data);
      } else {
        console.error('Error fetching competitions:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching competitions:', error);
    }
  };

  useEffect(() => {
    fetchCompetitions();
  }, []);

  // const selectedCompetition = competitions?.find(
  //   (competition) => competition.id.toString() === competitionIdClicked
  // );

  return (
    <>
      <h1 className="text-start text-2xl font-bold sm:text-4xl">
        Under Review
      </h1>

      <div className="space-y-4">
        {competitions.map((competition) => (
          <CompetitionCard
            key={competition.id}
            competition={competition}
            onClick={() =>
              (window.location.href = `/dashboard/under-review/${competition.id}`)
            }
          />
        ))}
      </div>
    </>
  );
};

export default UnderReview;
