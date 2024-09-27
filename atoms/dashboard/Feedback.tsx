import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { FeedbackMessage } from '../../types';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { parseDate } from './CompetitionDetails';

const Feedback = () => {
  const { id } = useParams<{ id: string }>();
  const [messages, setMessages] = useState<FeedbackMessage[]>([]);

  const fetchFeedbackMessages = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/competitions/${id}/feedbacks`,
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
        console.log(data);
        setMessages(data);
      } else {
        console.error('Error fetching feedback messages:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching feedback messages', error);
    }
  };

  useEffect(() => {
    fetchFeedbackMessages();
  }, []);

  return (
    <div>
      {messages.map((message, index) => (
        <div key={index} className="my-2 border-b text-start">
          <div className="flex items-center justify-start gap-3">
            <div className="h-[50px] w-[50px] rounded-full bg-light-blue"></div>
            <div>
              <p>{message.contact}</p>
              <p>{parseDate(message.createdAt)}</p>
            </div>
          </div>
          <div
            className="prose ml-10 text-start"
            dangerouslySetInnerHTML={{ __html: message.content }}
          ></div>
        </div>
      ))}
    </div>
  );
};

export default Feedback;
