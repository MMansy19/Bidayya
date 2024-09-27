import React, { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import binIcon from '../assets/binIcon.png';

interface FileUploadFieldProps {
  accept: { [key: string]: string[] };
  multiple?: boolean;
  files: File[];
  setFiles: any;
  maxSize?: number;
  icon?: string;
}

interface FileWithStatus {
  file: File | null;
  status: 'uploading' | 'uploaded';
}

const FileUploadField: React.FC<FileUploadFieldProps> = ({
  accept,
  multiple = false,
  files,
  setFiles,
  maxSize,
  icon,
}) => {
  const [fileStatuses, setFileStatuses] = useState<FileWithStatus[]>([]);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const newFiles = acceptedFiles.map((file) => ({
        file,
        status: 'uploading' as const, // Correctly typing status
      }));

      if (multiple) {
        setFiles((prevFiles: File[]) => [...prevFiles, ...acceptedFiles]);
        setFileStatuses((prevStatuses) => [...prevStatuses, ...newFiles]);
      } else {
        setFiles(acceptedFiles);
        setFileStatuses(newFiles);
      }

      // Simulate file upload and change status to "uploaded"
      newFiles.forEach((fileWithStatus) => {
        setTimeout(() => {
          setFileStatuses((prevStatuses) =>
            prevStatuses.map((status) =>
              status.file === fileWithStatus.file
                ? { ...status, status: 'uploaded' as const } // Correctly typing status
                : status
            )
          );
        }, 2000); // Simulate upload time
      });
    },
    [setFiles, multiple]
  );

  const { getRootProps, getInputProps, isDragActive, fileRejections } =
    useDropzone({
      onDrop,
      accept,
      multiple,
      maxSize,
    });

  const removeFile = (file: File) => {
    setFiles(files.filter((f) => f !== file));
    setFileStatuses(fileStatuses.filter((f) => f.file !== file));
  };

  const fileSizeInMB = (size: number) => (size / (1024 * 1024)).toFixed(2);

  useEffect(() => {
    if (multiple) {
      setFileStatuses(
        files.map((file) => ({
          file,
          status: 'uploaded' as const, // Correctly typing status
        }))
      );
    }
  }, [files]);

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
            Drag & drop files or{' '}
            <span className="text-bold text-regal-blue underline underline-offset-2">
              Browse
            </span>
          </p>
        )}
        <p className="text-xs text-gray-700">
          Supported formats: JPEG, PNG, GIF, MP4, PDF, PSD, AI, Word, PPT
        </p>
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
        <p className="mt-4 text-start font-bold text-gray-700">Uploading</p>
      )}

      <ul className="mt-2">
        {fileStatuses
          .filter((fileStatus) => fileStatus.status === 'uploading')
          .map(({ file }) => (
            <li
              key={file?.name}
              className="my-2 flex animate-pulse flex-row items-center justify-between rounded-md border border-dashed border-regal-blue bg-blue-100 px-3 py-2"
            >
              <span className="text-xs">
                {file?.name} - {fileSizeInMB(file?.size as number)} MB
              </span>
              <button
                type="button"
                onClick={() => removeFile(file as File)}
                className="rounded-full bg-red-50 p-1 hover:bg-red-200"
              >
                <img src={binIcon} alt="Bin Icon" width="10px" />
              </button>
            </li>
          ))}
      </ul>
      {fileStatuses.some(({ status }) => status === 'uploaded') && (
        <p className="mt-4 text-start font-bold text-gray-700">Uploaded</p>
      )}
      <ul className="mt-2">
        {fileStatuses
          .filter((fileStatus) => fileStatus.status === 'uploaded')
          .map(({ file }) => (
            <li
              key={file?.name}
              className="my-2 flex flex-row items-center justify-between rounded-md border border-regal-blue px-3 py-2"
            >
              <span className="text-xs">
                {file?.name} - {fileSizeInMB(file?.size as number)} MB
              </span>
              <button
                type="button"
                onClick={() => removeFile(file as File)}
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

export default FileUploadField;
