import React, { useEffect, useState } from 'react';
import FormField from '../../atoms/auth/FormField';
import StyledButton from '../../atoms/common/StyledButton';
import ImageUploadField from '../ImageUploadField';
import FileUploadField from '../FileUploadField';
import ButtonGroup from '../../atoms/common/ButtonGroup';
import Checkbox from './Checkbox';
import uploadIcon from '../../assets/uploadIcon.png';
import { CompetitionCreate, Tag } from '../../types';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface CompetitionFormProps {
  formValues: Omit<CompetitionCreate, 'id'>;
  setFormValues: React.Dispatch<
    React.SetStateAction<Omit<CompetitionCreate, 'id'>>
  >;
  onSubmit: () => void;
}

const CompetitionForm: React.FC<CompetitionFormProps> = ({
  formValues,
  setFormValues,
  onSubmit,
}) => {
  const [files, setFiles] = useState<File[]>([]);
  const [buttonClicked, setButtonClicked] = useState(false);

  const [coverImage, setCoverImage] = useState<File | null>(
    formValues.coverImage
  );

  useEffect(() => {
    setCoverImage(formValues.coverImage);
  }, [formValues.coverImage]);

  useEffect(() => {
    setFiles(formValues.files);
  }, [formValues.files]);

  const handleChange = (
    key: keyof Omit<CompetitionCreate, 'id'>,
    value: any
  ) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [key]: value,
    }));
  };

  const handleCoverImageChange: React.Dispatch<
    React.SetStateAction<File | null>
  > = (newImage) => {
    newImage
      ? setFormValues((prevValues) => ({
          ...prevValues,
          coverImage:
            typeof newImage === 'function'
              ? newImage(prevValues.coverImage)
              : newImage,
        }))
      : setFormValues((prevValues) => ({
          ...prevValues,
          coverImage: null,
        }));
  };

  const handleFilesChange: React.Dispatch<React.SetStateAction<File[]>> = (
    newFiles
  ) => {
    newFiles
      ? setFormValues((prevValues) => ({
          ...prevValues,
          files:
            typeof newFiles === 'function'
              ? newFiles(prevValues.files)
              : newFiles,
        }))
      : setFormValues((prevValues) => ({
          ...prevValues,
          files: [],
        }));
  };
  const handleSubmit = () => {
    setButtonClicked(true);
    onSubmit();
  };

  return (
    <div className="mt-24 flex flex-col gap-3 transition-all duration-300 lg:w-1/2 lg:gap-4 xl:mx-8">
      <h1 className="text-start text-2xl font-bold sm:text-4xl">
        Create Competition
      </h1>
      <h1 className="my-2 text-start text-lg font-bold sm:text-xl">
        Basic Setup
      </h1>
      <CompetitionFormField
        id="title"
        label="Title"
        value={formValues.competitionName}
        onChange={(value) => handleChange('competitionName', value)}
        placeholder="Enter a descriptive title"
        maxLength={50}
      />
      <CompetitionFormField
        id="companyName"
        label="Company Name"
        value={formValues.companyName}
        onChange={(value) => handleChange('companyName', value)}
        placeholder="Enter company name"
        maxLength={50}
      />
      <CompetitionFormField
        id="price"
        label="Price"
        type="number"
        value={formValues.price.toString()}
        onChange={(value) => handleChange('price', parseFloat(value))}
        placeholder="Enter price"
      />
      <CompetitionFormField
        id="deadline"
        label="Deadline"
        type="date"
        value={formValues.submissionDeadline}
        onChange={(value) => handleChange('submissionDeadline', value)}
      />
      <CompetitionFormField
        id="description"
        label="Description"
        type="textArea"
        value={formValues.description}
        onChange={(value) => handleChange('description', value)}
        placeholder="Enter a description explaining what competitors will do."
        maxLength={225}
      />

      <div className="text-editor">
        <div className="text-start font-semibold">Rules</div>
        <ReactQuill
          theme="snow"
          value={formValues.rules}
          className="bg-gray-100"
          onChange={(value) => handleChange('rules', value)}
          modules={{
            toolbar: [
              [{ header: '1' }, { header: '2' }, { font: [] }],
              [{ list: 'ordered' }, { list: 'bullet' }],
              ['bold', 'italic', 'underline', 'strike', 'blockquote'],
              [
                {
                  align: [false, 'center', 'right', 'justify'],
                },
              ],
              [{ color: [] }, { background: [] }],
              ['link', 'image', 'code-block'],
              ['clean'],
            ],
          }}
          formats={[
            'header',
            'font',
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
            'color',
            'background',
            'align',
          ]}
          placeholder="Start typing here..."
        />
      </div>
      <CompetitionFormField
        id="url"
        label="URL"
        value={formValues.competitionUrl}
        onChange={(value) => handleChange('competitionUrl', value)}
        placeholder="bidayya.com/competitions/"
      />

      <TagSelection
        tags={formValues.tags}
        setTags={(tags) => handleChange('tags', tags)}
      />

      <PrivacyAndAccess
        visibility={
          formValues.joinAvailability === 'anyone' ? 'public' : 'private'
        }
        setVisibility={(value) => handleChange('joinAvailability', value)}
        joinAvailability={formValues.joinAvailability}
        setJoinAvailability={(value) => handleChange('joinAvailability', value)}
      />
      {/* Upload Cover Image Field */}
      <h1 className="my-2 text-start text-lg font-bold sm:text-xl">
        Upload Cover Image
      </h1>
      <ImageUploadField
        accept={{ 'image/*': ['.jpeg', '.png'] }}
        image={formValues.coverImage}
        setImage={handleCoverImageChange} // Set cover image
        maxSize={5 * 1024 * 1024} // 5 MB
        icon={uploadIcon}
      />

      {/* Upload Additional Files */}
      <h1 className="my-2 text-start text-lg font-bold sm:text-xl">
        Upload Additional Files
      </h1>
      <FileUploadField
        accept={{
          'image/*': ['.jpeg', '.png', '.gif'],
          'application/pdf': ['.pdf'],
        }}
        multiple
        files={formValues.files}
        setFiles={handleFilesChange}
        maxSize={5 * 1024 * 1024} // 5 MB per file
        icon={uploadIcon}
      />

      {/* Terms & Conditions */}
      <TermsAndConditions
        termsAccepted={formValues.termsAccepted || false}
        setTermsAccepted={(accepted) => handleChange('termsAccepted', accepted)}
      />

      {/* Submit Button */}
      <div className="my-6 max-w-[450px] text-start">
        <StyledButton
          label={buttonClicked ? 'Creating...' : 'Create Competition'}
          onClick={handleSubmit}
          className={` ${buttonClicked ? 'animate-pulse bg-gray-400' : ''}`}
          disabled={
            !formValues.competitionName ||
            !formValues.companyName ||
            !formValues.price ||
            !coverImage ||
            !formValues.description ||
            !formValues.rules ||
            !formValues.competitionUrl ||
            !formValues.submissionDeadline ||
            !formValues.tags.length ||
            !formValues.joinAvailability ||
            !formValues.termsAccepted ||
            buttonClicked
          }
        />
        {buttonClicked && (
          <div className="mt-2 animate-pulse text-center text-sm text-gray-600">
            Please wait while we create your competition.
          </div>
        )}
      </div>
    </div>
  );
};

// Helper Components
const CompetitionFormField: React.FC<{
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  maxLength?: number;
}> = ({
  id,
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
  maxLength,
}) => (
  <div>
    <FormField
      id={id}
      label={label}
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      maxLength={maxLength}
      variant="primary"
    />
    {maxLength && (
      <div className="text-right text-gray-600">
        {value.length}/{maxLength}
      </div>
    )}
  </div>
);

const TagSelection: React.FC<{
  tags: Tag[];
  setTags: React.Dispatch<React.SetStateAction<Tag[]>>;
}> = ({ tags, setTags }) => (
  <>
    <h1 className="mb-1 block text-start text-sm font-medium text-black">
      Tag <span className="text-red-600">*</span>
    </h1>
    <ButtonGroup buttons={tags} setButtons={setTags} />
    <div className="my-1 text-start text-xs text-gray-600">
      Choose up to 10 tags.
    </div>
  </>
);

const PrivacyAndAccess: React.FC<{
  visibility: 'public' | 'private';
  setVisibility: React.Dispatch<React.SetStateAction<'public' | 'private'>>;
  joinAvailability: string;
  setJoinAvailability: React.Dispatch<React.SetStateAction<string>>;
}> = ({ visibility, setVisibility, joinAvailability, setJoinAvailability }) => (
  <>
    <h1 className="my-2 text-start text-lg font-bold sm:text-xl">
      Privacy, Access & Resources
    </h1>
    <h1 className="my-2 block text-start text-sm font-medium text-black">
      Visibility <span className="text-red-600">*</span>
    </h1>
    <div className="flex flex-row justify-between">
      <CheckboxWithLabel
        checked={visibility === 'public'}
        onChange={() => {
          setJoinAvailability('anyone');
          // setVisibility('public');
        }}
        label="Public"
        description="Competition will be visible on Bidayya."
      />
      <CheckboxWithLabel
        checked={visibility === 'private'}
        onChange={() => setVisibility('private')}
        label="Private"
        description="Competition will not be visible on Bidayya."
      />
    </div>

    <h1 className="my-2 block text-start text-sm font-medium text-black">
      Who can join <span className="text-red-600">*</span>
    </h1>
    <div className="flex flex-col gap-4">
      <CheckboxWithLabel
        checked={joinAvailability === 'anyone'}
        onChange={() => setJoinAvailability('anyone')}
        label="Anyone"
        description="Anyone will be able to join via Bidayya or the competition URL."
      />
      <CheckboxWithLabel
        checked={joinAvailability === 'with-link'}
        onChange={() => setJoinAvailability('with-link')}
        label="Only people with a link"
        description="An invitation link will be available after you create this competition."
      />
      <CheckboxWithLabel
        checked={joinAvailability === 'restricted'}
        onChange={() => setJoinAvailability('restricted')}
        label="Restricted email list"
        description="You'll be able to manage the email list after creating the competition."
      />
    </div>
  </>
);

const CheckboxWithLabel: React.FC<{
  checked: boolean;
  onChange: () => void;
  label: string;
  description: string;
}> = ({ checked, onChange, label, description }) => (
  <div className="flex flex-col items-start">
    <Checkbox
      accepted={checked}
      setAccepted={onChange}
      label={label}
      className={checked ? 'text-gray-700' : 'text-gray-400'}
    />
    <div className="mt-2 text-start text-xs text-gray-400">{description}</div>
  </div>
);

const TermsAndConditions: React.FC<{
  termsAccepted: boolean;
  setTermsAccepted: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ termsAccepted, setTermsAccepted }) => (
  <div className="mt-4 flex max-w-[450px] flex-col items-start">
    <div className="my-2 text-start text-xs text-gray-700">
      Terms and agreement
    </div>
    <Checkbox
      accepted={termsAccepted}
      setAccepted={setTermsAccepted}
      label="I confirm that this competition agrees with Bidayya's site terms and will not offer cash prizes without prior approval by the Bidayya Team."
      className="ml-4 text-gray-700"
    />
  </div>
);

export default CompetitionForm;
