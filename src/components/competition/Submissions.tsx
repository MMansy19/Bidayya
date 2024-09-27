import React, { useEffect, useState } from 'react';
import SubmissionItem from '../../atoms/competition/SubmissionItem';
import SubmissionDetails from '../../atoms/competition/SubmissionDetails';
import SearchBar from '../header/SearchBar';
import Tabs from '../../atoms/common/Tabs';
import { CompetitionDetails } from '../../types';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { Submission } from '../../types';

interface SubmissionsProps {
  competition: CompetitionDetails;
}

const Submissions: React.FC<SubmissionsProps> = ({ competition }) => {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [activeTab, setActiveTab] = useState<string>('all');
  const [selectedSubmission, setSelectedSubmission] =
    useState<Submission | null>(null);

  const fetchSubmissions = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/competitions/${competition?.id}/submissions`,
        {
          method: 'GET',
          credentials: 'include',

          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if (!response.ok) {
        console.error('Failed to fetch submissions:', response.statusText);
        return;
      }
      const data = await response.json();
      console.log('Submissions:', data);
      setSubmissions(data);
    } catch (error) {
      console.error('Error fetching submissions:', error);
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const handleTabChange = (tab: { label: string; route: string }) => {
    setActiveTab(tab.label.toLowerCase());
    // navigate(tab.route);
  };

  // const submissions = [
  //   {
  //     competitionId: 1,

  //     userPicture:
  //       'https://primefaces.org/cdn/primereact/images/organization/walter.jpg',
  //     title: 'Submission 1',
  //     updated_at: '2021-08-01',
  //     score: 100,
  //     upvotes: 10,
  //     commentsCount: 5,
  //   },
  //   {
  //     competitionId: 2,
  //     userPicture:
  //       'https://primefaces.org/cdn/primereact/images/organization/walter.jpg',
  //     title: 'Submission 2',
  //     updated_at: '2021-08-02',
  //     score: 200,
  //     upvotes: 20,
  //     commentsCount: 10,
  //   },
  //   {
  //     competitionId: 3,
  //     userPicture:
  //       'https://primefaces.org/cdn/primereact/images/organization/walter.jpg',
  //     title: 'Submission 3',
  //     updated_at: '2021-08-03',
  //     score: 300,
  //     upvotes: 30,
  //     commentsCount: 15,
  //   },
  // ];

  return (
    <div className="flex flex-col justify-start gap-10 text-start">
      <h2 className="text-2xl font-bold">Submissions</h2>
      <div className="mx-auto w-full">
        <SearchBar placeholder="Search Submissions" />

        <Tabs
          tabs={[
            { label: 'All', route: 'all' },
            { label: 'Owned', route: 'owned' },
          ]}
          activeTab={activeTab}
          onTabChange={(tab) => handleTabChange(tab)}
        />

        {selectedSubmission ? (
          <SubmissionDetails
            submission={selectedSubmission}
            onBack={() => setSelectedSubmission(null)}
          />
        ) : (
          <div className="flex flex-col gap-2">
            {submissions.map((submission, index) => (
              <SubmissionItem
                key={index}
                userPicture={submission.user.full_name}
                title={submission.title}
                updated_at={submission.updated_at || ''}
                upvotes={submission._count.submissionVotes}
                commentsCount={submission._count.submissionVotes}
                competitionName={competition?.name}
                medalType={submission?.medal_type}
                onClick={() => setSelectedSubmission(submission)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Submissions;
