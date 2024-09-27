import PDFs from '../../atoms/common/PDFs';
import ImageComponent from '../../atoms/common/ImageComponent';

const Resources = ({ files }: { files?: string[] }) => {
  const imageFiles = files?.filter(
    (file) =>
      file.endsWith('.png') ||
      file.endsWith('.jpg') ||
      file.endsWith('.jpeg') ||
      file.endsWith('.gif')
  );
  const pdfFiles = files?.filter((file) => file.endsWith('.pdf'));

  return (
    <div className="flex max-w-3xl flex-col justify-start gap-10 text-start">
      <h2 className="text-2xl font-bold">Resources</h2>
      {/* Display Images */}
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
    </div>
  );
};

export default Resources;
