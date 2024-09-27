import React, { useState } from 'react';
import { Dialog } from 'primereact/dialog';
import StyledButton from './StyledButton';

interface PDFsProps {
  PDFs: string[] | undefined;
}

const PDFs: React.FC<PDFsProps> = ({ PDFs }) => {
  const [dialogVisible, setDialogVisible] = useState(false);
  const [selectedPDF, setSelectedPDF] = useState<string | null>(null);

  const openPDF = (url: string) => {
    if (url.startsWith('http://') || url.startsWith('https://')) {
      setSelectedPDF(url);
    } else if (url.startsWith('https:/') || url.startsWith('http:/')) {
      setSelectedPDF(url.replace(':/', '://'));
    }

    setDialogVisible(true);
  };

  const closeDialog = () => {
    setDialogVisible(false);
    setSelectedPDF(null);
  };

  return (
    <div className="flex flex-col items-start justify-start gap-2">
      {PDFs?.map((PDF, index) => (
        <StyledButton
          type="button"
          variant="pdf"
          label={PDF.split('/').pop()!}
          key={index}
          onClick={() => openPDF(PDF)}
        />
      ))}
      <Dialog
        header="PDF Viewer"
        visible={dialogVisible}
        style={{
          width: '95vw',
          height: '100vh',
        }}
        onHide={closeDialog}
      >
        {selectedPDF && (
          <embed
            src={selectedPDF}
            type="application/pdf"
            width="100%"
            height="100%"
          />
        )}
      </Dialog>
    </div>
  );
};

export default PDFs;
