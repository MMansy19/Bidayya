import React, { useState, useEffect } from 'react';
import { useParams, Outlet, useNavigate } from 'react-router-dom';
import Tabs from '../atoms/common/Tabs';
import StyledButton from '../atoms/common/StyledButton';
import ButtonIcon from '../atoms/common/ButtonIcon';
import { CompetitionDetails } from '../types';
import { useExpandHover } from '../hooks/ExpandHoverContext';
import ImageComponent from '../atoms/common/ImageComponent';
import { Dialog } from 'primereact/dialog';
import useCheckAuthentication from '../hooks/useCheckAuthentication';

const CompetitionPage: React.FC = () => {
  useCheckAuthentication();
  const { expanded } = useExpandHover();
  const navigate = useNavigate();
  const [competition, setCompetition] = useState<CompetitionDetails>();
  const [activeTab, setActiveTab] = useState<string>(
    window.location.pathname.split('/')[3]
  );

  const [joinClicked, setJoinClicked] = useState<boolean>(false);

  const { id } = useParams<{ id: string }>();

  const fetchCompetition = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/competitions/${id}`,
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
        setCompetition(data);
      } else {
        console.error('Error fetching competition:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching competition:', error);
    }
  };

  useEffect(() => {
    fetchCompetition();
  }, []);

  if (!competition) {
    return (
      <div className="mx-auto mt-20 text-2xl md:my-10">
        Competition not found
      </div>
    );
  }

  const handleTabChange = (tab: { label: string; route: string }) => {
    setActiveTab(tab.label.toLowerCase());
    navigate(tab.route);
  };

  const joinCompetition = async () => {};

  return (
    <div
      className={`my-24 transition-all duration-300 lg:mx-8 ${
        expanded ? 'mx-0' : 'mx-1'
      }`}
    >
      <header className="mt-8 flex flex-col items-start justify-between gap-3 lg:flex-row">
        <div className="flex flex-col gap-3 lg:gap-4">
          <h1 className="text-start text-2xl font-bold sm:text-4xl">
            {competition.name}
          </h1>
          <p className="lg:text-md max-w-96 text-xs text-secondary-text">
            {competition.description}
          </p>
        </div>
        <div className="flex flex-col gap-3 lg:gap-4">
          <div className="flex items-center space-x-4">
            <StyledButton
              type="button"
              className="bg-blue-gradient-right text-xs font-bold"
              variant="primary"
              label="Join competition"
              onClick={() => setJoinClicked(true)}
            />
          </div>
          <Dialog
            header="Terms and Conditions"
            visible={joinClicked}
            draggable={false}
            style={{
              width: '90vw',
              maxWidth: '600px',
              padding: '.2rem',
            }}
            onHide={() => setJoinClicked(false)}
          >
            <div>
              <h2 className="font-semibold">Your Agreement</h2>
              <div className="scrollbar mt-2 max-h-[350px] overflow-y-scroll border border-light-blue p-2 text-start">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis
                dicta deleniti explicabo tenetur aspernatur nemo dolorum
                pariatur tempore mollitia ea. Qui dignissimos animi ab fugiat
                fugit totam possimus ipsa nostrum! Lorem ipsum dolor sit amet
                consectetur adipisicing elit. Eligendi est doloribus repellendus
                placeat ea rerum sequi perferendis ipsam ullam. Doloremque unde
                eos quaerat sint est beatae architecto facilis vitae saepe?
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Debitis doloribus nihil itaque molestiae, inventore vel. Aliquam
                animi voluptas deleniti cupiditate officiis perferendis porro.
                Officia ut illo amet molestias repellendus. Consequuntur! Lorem
                ipsum dolor sit amet consectetur adipisicing elit. Tempore
                provident officia quod doloribus, sequi unde assumenda quae
                magni aspernatur minus quis iure odio itaque nisi, similique
                optio illo eum autem. Lorem ipsum dolor sit, amet consectetur
                adipisicing elit. Corrupti numquam libero velit ipsum itaque
                praesentium, officia quod! Quaerat earum eius, quasi ipsum hic
                corrupti recusandae. Nisi laboriosam aut hic iure.
              </div>
              <div className="mt-3 flex w-full items-center justify-end gap-3">
                <StyledButton
                  type="button"
                  className="text-xs font-bold"
                  variant="secondary"
                  label="Cancel"
                  onClick={() => setJoinClicked(false)}
                />
                <StyledButton
                  type="button"
                  className="bg-blue-gradient-right text-xs font-bold"
                  variant="primary"
                  label="I agree"
                  onClick={joinCompetition}
                />
              </div>
            </div>
          </Dialog>
          {competition?.cover_image && (
            <ImageComponent
              src={competition.cover_image}
              imageName="Competition cover image"
            />
          )}
        </div>
      </header>
      <Tabs
        activeTab={activeTab}
        onTabChange={handleTabChange}
        tabs={[
          { label: 'Overview', route: 'overview' },
          { label: 'Submissions', route: 'submissions' },
          { label: 'Discussions', route: 'discussions' },
          { label: 'Leaderboard', route: 'leaderboard' },
          { label: 'Rules', route: 'rules' },
        ]}
      />
      <div className="mt-3">
        <Outlet />
      </div>
    </div>
  );
};

export default CompetitionPage;
