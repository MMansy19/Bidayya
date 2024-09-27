import React, { useState, useEffect } from 'react';
import CompetitionForm from '../components/createCompetition/CompetitionForm';
import ConfirmCreation from '../components/createCompetition/ConfirmCreation';
import MainLayout from '../components/MainLayout';
import { CompetitionCreate } from '../types';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { Tag } from '../types';
import useCheckAuthentication from '../hooks/useCheckAuthentication';

const CreateCompetition: React.FC = () => {
  useCheckAuthentication();
  const [tags, setTags] = useState<Tag[]>([]);
  const [competitionId, setCompetitionId] = useState<string | null>(null);

  useEffect(() => {
    if (!isEditing)
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
            data.map((tag: Tag) => {
              return {
                tag_id: tag.tag_id,
                tag_name: tag.tag_name,
                selected: false,
              };
            })
          );
        })
        .catch((error) => {
          console.error('Error:', error);
        });
  }, []);

  const [formValues, setFormValues] = useState<CompetitionCreate>({
    competitionName: '',
    description: '',
    companyName: '',
    price: 0,
    rules: '',
    competitionUrl: '',
    submissionDeadline: new Date().toISOString(),
    isPrivate: false,
    accessType: 'ANYONE',
    files: [],
    coverImage: null,
    tags: tags,
    joinAvailability: 'anyone',
    termsAccepted: false,
    state: 'under review',
  });

  useEffect(() => {
    setFormValues((prev) => ({
      ...prev,
      tags: tags,
    }));
  }, [tags]);

  const [buttonClicked, setButtonClicked] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleSubmit = async () => {
    const formData = new FormData();
    formValues.files.forEach((file) => {
      formData.append('files', file);
    });
    formData.append('cover_image', formValues.coverImage as File);
    formData.append('competition_name', formValues.competitionName);
    formData.append('description', formValues.description);
    formData.append('company_name', formValues.companyName);
    formData.append('price', formValues.price.toString());
    formData.append('rules', formValues.rules ?? '');
    formData.append('competition_url', formValues.competitionUrl);
    formValues.tags
      .filter((tag) => tag.selected)
      .map((tag) => tag.tag_id)
      .forEach((tagId) => {
        formData.append('tags', tagId.toString());
      });
    formData.append('submission_deadline', formValues.submissionDeadline);
    formData.append('is_private', formValues.isPrivate.toString());
    formData.append('access_type', formValues.accessType);
    const url = isEditing
      ? `${process.env.REACT_APP_API_URL}/competitions/${competitionId}`
      : `${process.env.REACT_APP_API_URL}/competitions`;
    try {
      const response = await fetch(url, {
        method: isEditing ? 'PATCH' : 'POST',
        credentials: 'include',
        headers: {
          contentType: 'multipart/form-data',
        },
        body: formData,
      });
      const res = await response.json();
      if (!response.ok) {
        console.error('Error:', res);
      } else {
        setCompetitionId(res.id);
        setButtonClicked(true);
        setIsEditing(false);
      }
    } catch (error) {
      console.error('Error:', error);
    }

    // console.log('new Competition added');
  };

  const handleEditCompetition = () => {
    setButtonClicked(false);
    setIsEditing(true);
  };

  return (
    <MainLayout>
      {!buttonClicked ? (
        <CompetitionForm
          formValues={formValues}
          setFormValues={setFormValues}
          onSubmit={handleSubmit}
        />
      ) : (
        <ConfirmCreation
          onEditClick={handleEditCompetition}
          id={competitionId}
        />
      )}
    </MainLayout>
  );
};

export default CreateCompetition;
