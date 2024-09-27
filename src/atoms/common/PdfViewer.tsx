import React, { useState, FC } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import { IoIosCloseCircle } from 'react-icons/io';

// Ensure the path to the worker is correct based on your environment
pdfjs.GlobalWorkerOptions.workerSrc = `${process.env.PUBLIC_URL}/pdf.worker.mjs`;

interface PdfViewerProps {
  fileUrl: string;
  setCurrentFile: React.Dispatch<React.SetStateAction<string | null>>;
}

const PdfViewer: FC<PdfViewerProps> = ({ fileUrl, setCurrentFile }) => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState<number>(1);

  // Improved file URL handler with logging for debugging
  const getFileURL = (file: string) => {
    if (!file) {
      console.error('Invalid file URL:', file);
      return ''; // Handle undefined or invalid URLs
    }
    // if (file.startsWith('http://') || file.startsWith('https://')) {
    //   return file;
    // } else if (file.startsWith('https:/') || file.startsWith('http:/')) {
    //   return file.replace(':/', '://');
    // }
    return file;
  };

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  return (
    <div className="relative w-full">
      <IoIosCloseCircle
        className="mb-1 ml-auto cursor-pointer text-4xl text-red-700"
        onClick={() => setCurrentFile(null)}
      />
      <Document
        file={getFileURL(fileUrl)}
        onLoadSuccess={onDocumentLoadSuccess}
        loading="Loading PDF..."
        className="border"
      >
        <Page pageNumber={pageNumber} />
      </Document>
      <div>
        <p>
          Page {pageNumber} of {numPages}
        </p>
        <div className="flex items-center justify-center gap-3">
          <button
            disabled={pageNumber <= 1}
            onClick={() => setPageNumber(pageNumber - 1)}
          >
            Previous
          </button>
          <button
            disabled={pageNumber >= numPages!}
            onClick={() => setPageNumber(pageNumber + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default PdfViewer;
