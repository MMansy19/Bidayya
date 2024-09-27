import React, { useState, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles
import StyledButton from './StyledButton';

interface FeedbackInputProps {
  onSubmit: (content: string, files: FileList | null) => void; // Callback for submitting feedback with files
  setFeedbackOpen?: React.Dispatch<React.SetStateAction<boolean>>; // Optional callback for closing feedback input
  label?: string;
  placeholder?: string;
}

const FeedbackInput: React.FC<FeedbackInputProps> = ({
  onSubmit,
  setFeedbackOpen,
  label,
  placeholder,
}) => {
  const [feedback, setFeedback] = useState('');
  const [attachedFile, setAttachedFile] = useState<FileList | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFeedbackChange = (value: string) => {
    setFeedback(value);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAttachedFile(event.target.files);
  };

  const handleSubmit = () => {
    onSubmit(feedback, attachedFile);
    // Reset file input after submitting
    if (fileInputRef.current) fileInputRef.current.value = '';
    setAttachedFile(null);
    setFeedback('');
    if (setFeedbackOpen) setFeedbackOpen(false);
  };

  return (
    <div className="w-full rounded-[50px] border border-gray-600 p-4">
      <ReactQuill
        value={feedback}
        onChange={handleFeedbackChange}
        placeholder={placeholder || 'Write your feedback here...'}
        theme="snow"
        className="rounded-xl bg-gray-50"
        modules={{
          toolbar: [
            [{ undo: 'undo', redo: 'redo' }], // Undo / Redo
            [{ header: [1, 2, false] }],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['bold', 'italic', 'underline', 'strike'], // Bold, italic, underline
            [{ align: [] }],
            ['link', 'image', 'blockquote', 'code-block'], // Link, image, blockquote, code
            ['clean'], // Remove formatting
          ],
        }}
        formats={[
          'header',
          'bold',
          'italic',
          'underline',
          'strike',
          'blockquote',
          'list',
          'bullet',
          'link',
          'image',
          'code-block',
          'align',
        ]}
      />
      <div className="mt-4 flex flex-col items-center justify-between gap-4 md:flex-row">
        <input
          ref={fileInputRef}
          type="file"
          onChange={handleFileChange}
          accept="image/*, application/pdf, .docx, .txt"
          className="hidden md:block"
        />

        <StyledButton
          onClick={handleSubmit}
          className="w-full md:w-auto"
          variant="primary"
          label={label || 'Send'}
          disabled={!feedback}
        />
      </div>

      {attachedFile && (
        <div className="mt-2 text-sm text-gray-500">
          <p>Attached file: {attachedFile[0]?.name}</p>
        </div>
      )}
    </div>
  );
};

export default FeedbackInput;
