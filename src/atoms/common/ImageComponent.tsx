import React, { useState } from 'react';
import { Dialog } from 'primereact/dialog';
import PropTypes from 'prop-types';

interface ImageComponentProps {
  imageName?: string;
  src: string;
  className?: string;
}

const ImageComponent: React.FC<ImageComponentProps> = ({
  src,
  className,
  imageName,
}) => {
  const [isImageOpen, setImageOpen] = useState(false);
  const openImageModal = () => setImageOpen(true);
  const closeImageModal = () => setImageOpen(false);

  const handleImageSrc = () => {
    if (src.startsWith('http://') || src.startsWith('https://')) {
      return src;
    } else if (src.startsWith('https:/') || src.startsWith('http:/')) {
      return src.replace(':/', '://');
    }
    return src;
  };

  return (
    <>
      <img
        alt={src.split('/').pop()!.split('.')[0] || imageName}
        className={`${className} cursor-pointer rounded-xl object-cover shadow-lg filter transition-all duration-300 hover:brightness-90 md:max-h-40 md:min-h-40 md:w-64`}
        src={handleImageSrc()}
        onClick={openImageModal}
      />
      <Dialog
        header="Competition Cover Image"
        visible={isImageOpen}
        style={{
          width: '95vw',
          maxHeight: '95vh',
        }}
        onHide={closeImageModal}
        draggable={false}
      >
        <img
          src={handleImageSrc()}
          alt={src.split('/').pop()!.split('.')[0] || imageName}
          className="w-full rounded-lg object-cover"
        />
      </Dialog>
    </>
  );
};

ImageComponent.propTypes = {
  imageName: PropTypes.string,
  src: PropTypes.string.isRequired,
  className: PropTypes.string,
};

ImageComponent.defaultProps = {
  src: 'https://picsum.photos/50',
  imageName: 'Image not found',
};

export default ImageComponent;
