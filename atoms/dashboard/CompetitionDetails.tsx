import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  Suspense,
  memo,
} from 'react';
import Tabs from '../common/Tabs';

import Overview from './Overview';
import Resources from './Resources';
import Rules from './Rules';
import Feedback from './Feedback';
import ImageComponent from '../common/ImageComponent';

import { CompetitionDetails } from '../../types';
import StyledButton from '../common/StyledButton';
import ButtonIcon from '../common/ButtonIcon';
import FeedbackInput from '../common/FeedbackInput';
import { useParams } from 'react-router-dom';

export const parseDate = (text: string) => {
  const date = new Date(text);
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };
  return date.toLocaleDateString('en-GB', options);
};
const CompetitionDetailsComp: React.FC = () => {
  const [competition, setCompetition] = useState<CompetitionDetails>();
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

  const acceptCompetition = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/competitions/${id}/accept`,
        {
          method: 'PATCH',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if (response.ok) {
        window.location.reload();
      } else {
        console.error('Error accepting competition:', response.statusText);
      }
    } catch (error) {
      console.error('Error accepting competition:', error);
    }
  };

  const [isFeedbackOpen, setFeedbackOpen] = useState(false);

  const openFeedbackModal = () => setFeedbackOpen(true);
  const closeFeedbackModal = () => setFeedbackOpen(false);

  const handleFeedbackSubmit = async (
    content: string,
    files: FileList | null
  ) => {
    const formData = new FormData();
    formData.append('content', content);
    files &&
      Array.from(files).forEach((file) => {
        formData.append('files', file);
      });
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/competitions/${id}/send-feedback`,
        {
          method: 'POST',
          credentials: 'include',
          headers: {
            contentType: 'multipart/form-data',
          },
          body: formData,
        }
      );

      if (response.ok) {
        closeFeedbackModal();
        window.location.reload();
      } else {
        const data = await response.json();
        console.error('Error sending feedback:', data.message);
      }
    } catch (error) {
      console.error('Error sending feedback:', error);
    }
  };

  const [activeTab, setActiveTab] = useState<string>('overview');

  const handleTabChange = (tab: { label: string; route: string }) => {
    setActiveTab(tab.label.toLowerCase());
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <Suspense fallback={<div>Loading...</div>}>
            <Overview competition={competition!} />
          </Suspense>
        );
      case 'rules':
        return (
          <Suspense fallback={<div>Loading...</div>}>
            <Rules competition={competition!} />
          </Suspense>
        );
      case 'resources':
        return (
          <Suspense fallback={<div>Loading...</div>}>
            <Resources files={competition?.files} />
          </Suspense>
        );
      case 'feedback':
        return (
          <Suspense fallback={<div>Loading...</div>}>
            <Feedback />
          </Suspense>
        );
      default:
        return (
          <Suspense fallback={<div>Loading...</div>}>
            <Overview competition={competition!} />
          </Suspense>
        );
    }
  };

  if (!competition) {
    return <div className="m-10 text-2xl">Competition not found</div>;
  }

  return (
    <div>
      <header className="flex flex-col-reverse items-center justify-between gap-4 lg:flex-row">
        <div className="flex flex-col items-start gap-1 lg:gap-2">
          <h1 className="text-start text-2xl font-bold sm:text-4xl">
            {competition.name}
          </h1>
          <p className="text-xs font-normal text-gray-600 md:text-base">
            <span className="underline">{competition.description}</span> ·
            <span className="underline">
              {competition.company.company_name}
            </span>
          </p>
          <p className="text-xs font-normal text-gray-600 md:text-base">
            {parseDate(competition.submission_deadline)}
          </p>
          <p className="text-xs font-semibold text-gray-600 md:text-base">
            tracking number: <span className="underline">{competition.id}</span>
          </p>
          {competition.is_accepted === null && (
            <div className="flex items-center justify-center md:flex-row md:gap-2">
              <StyledButton
                label="Confirm competition"
                variant="primary"
                onClick={acceptCompetition}
              />
              <StyledButton
                label="Send feedback"
                variant="secondary"
                onClick={openFeedbackModal}
              />

              <ButtonIcon className="rotate-90" />
            </div>
          )}
          {competition.is_accepted === false && (
            <div className="rounded-full px-3 py-1 text-2xl font-bold text-red-700">
              Rejected
            </div>
          )}
          {competition.is_accepted === true && (
            <div className="rounded-full px-3 py-1 text-2xl font-bold text-green-700">
              Accepted
            </div>
          )}
        </div>

        {competition?.cover_image && (
          <ImageComponent
            src={competition.cover_image}
            imageName={competition.name}
          />
        )}
      </header>
      {isFeedbackOpen && (
        <div className="mt-4 flex flex-col xl:w-[900px]">
          <h2 className="mb-2 text-start text-lg font-bold">Send Feedback</h2>
          <FeedbackInput
            onSubmit={handleFeedbackSubmit}
            setFeedbackOpen={setFeedbackOpen}
          />
        </div>
      )}
      {/* Tabs Component */}
      <Tabs
        activeTab={activeTab}
        onTabChange={handleTabChange}
        tabs={[
          { label: 'Overview', route: 'overview' },
          { label: 'Rules', route: 'rules' },
          { label: 'Resources', route: 'resources' },
          { label: 'Feedback', route: 'feedback' },
        ]}
      />

      {/* <hr className="border-black" /> */}
      <div className="min-h-screen py-6">{renderContent()}</div>
    </div>
  );
};

export default memo(CompetitionDetailsComp);
