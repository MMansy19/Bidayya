import React, { useEffect, useState } from 'react';
import DiscussionItem from '../../atoms/competition/DiscussionItem';
import DiscussionDetails from '../../atoms/competition/DiscussionDetails';
import SearchBar from '../header/SearchBar';
import Tabs from '../../atoms/common/Tabs';
import { timeAgo } from '../../utils';
import StyledButton from '../../atoms/common/StyledButton';
import { Dialog } from 'primereact/dialog';
import FormField from '../../atoms/auth/FormField';
import { useParams } from 'react-router-dom';
import ReactQuill from 'react-quill';

import { Topic } from '../../types';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

const Discussions: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('all');

  const [Topics, setTopics] = useState<Topic[]>([]);

  const { id } = useParams<{ id: string }>();

  const fetchTopics = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/competitions/${id}/topics`,
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
        setTopics(data);
      } else {
        console.log('Error fetching topics');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchOwnedTopics = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/competitions/${id}/topics/owned`,
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
        setTopics(data);
      } else {
        console.log('Error fetching topics');
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (activeTab === 'all') fetchTopics();
    else if (activeTab === 'owned') fetchOwnedTopics();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');

  const handleTabChange = (tab: { label: string; route: string }) => {
    setActiveTab(tab.label.toLowerCase());
  };

  const user = useSelector((state: RootState) => state.user.user);

  const handleAddDiscussion = async () => {
    if (!newTitle.trim() || !newContent.trim()) return;

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/competitions/${id}/topics`,
        {
          method: 'POST',
          credentials: 'include',

          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: newTitle,
            content: newContent,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        const newTopic = {
          ...data,
          user: {
            id: user.id,
            email: user.email,
            username: user.username,
            full_name: user.full_name,
            is_active: user.is_active,
          },
          comments: [],
          _count: {
            comments: 0,
            topicVotes: 0,
          },
          upvotedByMe: false,
          topicVotes: [],
        };
        setTopics([newTopic, ...Topics]);
        setIsDialogVisible(false);
        setNewTitle('');
        setNewContent('');
      } else {
        console.log('Error adding discussion');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancel = () => {
    setIsDialogVisible(false);
    setNewTitle('');
    setNewContent('');
  };

  return (
    <div className="flex flex-col justify-start gap-10 text-start">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Discussions</h2>
        <StyledButton
          variant="primarySmall"
          type="button"
          className="bg-blue-gradient-right text-xs font-bold"
          icon="addTopic"
          label="New topic"
          onClick={() => setIsDialogVisible(true)}
          aria-label="New Topic Button"
        />
      </div>

      {/* New Topic Dialog */}
      <Dialog
        header="Create New Discussion"
        visible={isDialogVisible}
        style={{
          width: '90vw',
          maxWidth: '600px',
          padding: '.2rem',
        }}
        onHide={handleCancel}
        draggable={false}
      >
        <div>
          <FormField
            id="title"
            label="Title"
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="Enter the topic title"
            className="mb-4 w-full rounded border p-2"
            variant="primary"
          />
          <FormField
            id="content"
            label="Content"
            type="textArea"
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
            placeholder="Enter the topic content"
            className="mb-4 w-full rounded border p-2"
            variant="primary"
          />

          <div className="mt-6 flex justify-end gap-4">
            <StyledButton
              label="Submit"
              variant="primary"
              onClick={handleAddDiscussion}
              disabled={!newTitle.trim() || !newContent.trim()}
            />
            <StyledButton
              label="Cancel"
              variant="secondaryOutline"
              onClick={handleCancel}
            />
          </div>
        </div>
      </Dialog>

      <SearchBar placeholder="Search Discussions" />

      {window.location.pathname.split('/').pop() === 'discussions' && (
        <>
          <Tabs
            tabs={[
              { label: 'All', route: 'all' },
              { label: 'Owned', route: 'owned' },
            ]}
            activeTab={activeTab}
            onTabChange={(tab) => handleTabChange(tab)}
          />
          <div className="flex flex-col gap-2">
            {Topics.map((topic, index) => (
              <DiscussionItem key={index} topic={topic} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Discussions;
