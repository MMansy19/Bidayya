import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { AdminCompetition } from '../../types';
import CompetitionCard from '../../atoms/dashboard/CompetitionCard';

const DeclinedCompetitions = () => {
  const [competitions, setCompetitions] = useState<AdminCompetition[]>([]);

  const fetchCompetitions = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/competitions/declined`,
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

  return (
    <>
      <h1 className="text-start text-2xl font-bold sm:text-4xl">
        Declined Competitions
      </h1>

      <div className="space-y-4">
        {competitions.map((competition) => (
          <CompetitionCard
            key={competition.id}
            competition={competition}
            onClick={() =>
              (window.location.href = `/dashboard/declined/${competition.id}`)
            }
          />
        ))}
      </div>
    </>
  );
};

export default DeclinedCompetitions;
