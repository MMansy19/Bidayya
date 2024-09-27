import React, { useEffect, useState } from 'react';
import ImageComponent from '../../atoms/common/ImageComponent';
import PDFs from '../../atoms/common/PDFs';
import Timeline from '../../atoms/common/Timeline';
import Prizes from '../../atoms/common/Prizes';
import { CompetitionDetails } from '../../types';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { useParams } from 'react-router-dom';

const Overview: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [competition, setCompetition] = useState<CompetitionDetails>();

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

  const imageFiles = competition?.files.filter(
    (file) => file.split('.').pop() !== 'pdf'
  );
  const pdfFiles = competition?.files.filter(
    (file) => file.split('.').pop() === 'pdf'
  );

  return (
    <div className="flex max-w-3xl flex-col justify-start gap-10 text-start">
      <h2 className="text-2xl font-bold">Overview</h2>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {imageFiles && imageFiles.length > 0 ? (
          imageFiles.map((file: any, index: number) => (
            <ImageComponent
              key={index}
              src={file}
              imageName={file || `Image ${index + 1}`}
              className="h-auto w-full"
            />
          ))
        ) : (
          <h3>No images available</h3>
        )}
      </div>

      {/* Display PDFs */}
      <div className="mt-4">
        {pdfFiles && pdfFiles.length > 0 ? (
          <PDFs PDFs={pdfFiles} />
        ) : (
          <h3>No PDF files available</h3>
        )}
      </div>
      <p>{competition?.description}</p>

      <hr className="border border-gray-400" />
      <Timeline
      // timeline={
      // competition.submission_deadline ||
      // }
      />
      <hr className="border border-gray-400" />
      <Prizes />
    </div>
  );
};

export default Overview;
