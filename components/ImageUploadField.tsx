import React, { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import binIcon from '../assets/binIcon.png';

interface ImageUploadFieldProps {
  accept: { [key: string]: string[] };
  image: File | null;
  setImage: any;
  maxSize?: number;
  icon?: string;
}

interface FileWithStatus {
  file: File;
  status: 'uploading' | 'uploaded';
}

const ImageUploadField: React.FC<ImageUploadFieldProps> = ({
  accept,
  image,
  setImage,
  maxSize,
  icon,
}) => {
  const [fileStatuses, setFileStatuses] = useState<FileWithStatus[]>([]);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const newFile = acceptedFiles[0]; // Single file
      const newFileStatus = {
        file: newFile,
        status: 'uploading' as const,
      };

      setImage(newFile); // Set the cover image
      setFileStatuses([newFileStatus]);

      // Simulate file upload and change status to "uploaded"
      setTimeout(() => {
        setFileStatuses([{ ...newFileStatus, status: 'uploaded' }]);
      }, 2000);
    },
    [setImage]
  );

  const { getRootProps, getInputProps, isDragActive, fileRejections } =
    useDropzone({
      onDrop,
      accept,
      maxSize,
      multiple: false, // Single image
    });

  const removeFile = () => {
    setImage(null); // Remove image
    setFileStatuses([]);
  };

  const fileSizeInMB = (size: number) => (size / (1024 * 1024)).toFixed(2);

  useEffect(() => {
    if (image) {
      setFileStatuses([{ file: image, status: 'uploaded' }]);
    }
  }, [image]);

  return (
    <div className="mb-4 max-w-[450px]">
      <div
        {...getRootProps()}
        className={`flex flex-col items-center justify-center gap-4 rounded-md border-2 border-dashed p-6 ${
          isDragActive ? 'animate-pulse border-regal-blue' : 'border-gray-300'
        }`}
      >
        <input {...getInputProps()} />
        {icon && <img src={icon} alt="upload icon" className="mx-auto w-2" />}
        {isDragActive ? (
          <p className="text-regal-blue">Drop the files here ...</p>
        ) : (
          <p className="font-semibold text-gray-700">
            Drag & drop an image or{' '}
            <span className="text-bold text-regal-blue underline underline-offset-2">
              Browse
            </span>
          </p>
        )}
        <p className="text-xs text-gray-700">Supported formats: JPEG, PNG</p>
      </div>
      {fileRejections.length > 0 && (
        <div className="mt-2 text-sm text-red-500">
          {fileRejections.map(({ file, errors }) => (
            <div key={file.name}>
              {errors.map((e) => (
                <p key={e.code}>{e.message}</p>
              ))}
            </div>
          ))}
        </div>
      )}

      {fileStatuses.some(({ status }) => status === 'uploading') && (
        <p className="mt-4 text-start font-bold text-gray-700">Uploading...</p>
      )}

      <ul className="mt-2">
        {fileStatuses.map(({ file, status }) => (
          <li
            key={file.name}
            className={`my-2 flex flex-row items-center justify-between rounded-md px-3 py-2 ${
              status === 'uploading'
                ? 'animate-pulse border border-dashed border-regal-blue bg-blue-100'
                : 'border border-regal-blue'
            }`}
          >
            <span className="text-xs">
              {file.name} - {fileSizeInMB(file.size)} MB
            </span>
            <button
              type="button"
              onClick={removeFile}
              className="rounded-full bg-red-50 p-1 hover:bg-red-200"
            >
              <img src={binIcon} alt="Bin Icon" width="10px" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ImageUploadField;
