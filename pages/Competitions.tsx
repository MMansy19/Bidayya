import React, { useState, useEffect } from 'react';
import MainLayout from '../components/MainLayout';
import useCheckAuthentication from '../hooks/useCheckAuthentication';
import ActiveCompetitionItem from '../components/competitions/ActiveCompetitionItem';
import CompetitionCard from '../components/competitions/CompetitionCard';
import SearchBar from '../components/header/SearchBar';
import StyledButton from '../atoms/common/StyledButton';
import ButtonGroup from '../atoms/common/ButtonGroup';
import { Link } from 'react-router-dom';
import { Tag, CompetitionDetails } from '../types';
import { timeAgo } from '../utils';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const Competitions: React.FC = () => {
  const user = useSelector((state: RootState) => state.user.user); // Get the current user from Redux
  const [tags, setTags] = useState<Tag[]>([]);
  const [competitions, setCompetitions] = useState<CompetitionDetails[]>([]);

  useCheckAuthentication();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/competitions`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setCompetitions(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/tags`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setTags(
          data.map((tag: Tag) => ({
            tag_id: tag.tag_id,
            tag_name: tag.tag_name,
            selected: false,
          }))
        );
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  // Filter active competitions based on the logged-in user's ID
  const userActiveCompetitions = competitions.filter(
    (competition) => competition.host_id === user?.id
  );

  return (
    <MainLayout>
      <div className="my-24 lg:mx-8 lg:my-10">
        <header className="mb-4 flex flex-col justify-between gap-3 lg:gap-4">
          <h1 className="text-left text-4xl font-bold">Competitions</h1>
          <p className="lg:text-md text-left text-xs text-secondary-text md:w-96">
            Grow your drawing skills by competing in our exciting competitions.
            Find help in the{' '}
            <a className="font-semi-bold underline" href="#">
              documentation
            </a>{' '}
            or learn about
            <a className="font-semi-bold underline" href="#">
              Community Competitions
            </a>
            .
          </p>
          <div className="flex items-center space-x-4">
            <Link to="/create-competition">
              <StyledButton
                type="button"
                className="bg-blue-gradient-right font-bold"
                variant="primary"
                label="Host a competition"
              />
            </Link>
            <StyledButton
              type="button"
              className="border border-primary-text font-bold text-primary-text"
              variant="secondary"
              label="Your work"
            />
          </div>
        </header>
        <div className="mb-4 ml-auto mr-4 md:flex">
          <SearchBar placeholder="Search Product..." />
        </div>
        <ButtonGroup buttons={tags} setButtons={setTags} />

        {/* Your Active Competitions Section */}
        <section className="my-4">
          <h2 className="mb-2 flex items-center justify-start text-2xl font-bold">
            <i className="pi pi-user mr-4"></i> Your active competitions
          </h2>
          {userActiveCompetitions.map((competition) => (
            <ActiveCompetitionItem
              id={competition.id}
              key={competition.id}
              title={competition.name}
              coverImage={competition.cover_image}
              submissionsLeft={timeAgo(
                new Date(competition.submission_deadline)
              )}
              timeAgo={timeAgo(new Date(competition.created_at))}
              rank={'0'}
              totalParticipants={0}
              is_active={competition.is_active}
            />
          ))}
        </section>

        {/* All Active Competitions Section */}
        <section>
          <div className="my-5 flex items-center justify-start gap-4 text-2xl font-bold">
            <i className="pi pi-user" style={{ fontSize: '1.2rem' }}></i>
            <h2 className="">Active competitions</h2>
          </div>
          <div className="mx-auto grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {competitions.map((competition) => (
              <CompetitionCard
                key={competition.id}
                id={competition.id}
                title={competition.name}
                companyName={competition.company.company_name}
                participants={0}
                description={competition.description}
                price={competition.price}
                dueInDays={timeAgo(new Date(competition.created_at))}
                coverImage={competition.cover_image}
              />
            ))}
          </div>
        </section>
      </div>
    </MainLayout>
  );
};

export default Competitions;
