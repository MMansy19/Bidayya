import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import StyledButton from './StyledButton';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

interface ButtonIconProps {
  className?: string;
  icon?: string;
  label?: string;
  onClick?: () => void;
}

const ButtonIcon: React.FC<ButtonIconProps> = ({
  className,
  icon,
  label,
  onClick,
}) => {
  const [loading, setLoading] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false); // Dropdown state
  const [confirmRejection, setConfirmRejection] = useState(false);
  const openConfirmRejectionModal = () => setConfirmRejection(true);
  const closeConfirmRejectionModal = () => setConfirmRejection(false);

  const handleClick = () => {
    setLoading(true);

    setTimeout(() => setLoading(false), 1000);
    setDropdownOpen(!isDropdownOpen);
  };

  const handleRejectClick = () => {
    setDropdownOpen(false);
    openConfirmRejectionModal();
  };

  const { id } = useParams<{ id: string }>();

  const rejectCompetition = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/competitions/${id}/reject`,
        {
          method: 'PATCH',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if (response.ok) {
        window.location.reload();
      } else {
        console.error('Error rejecting competition:', response.statusText);
      }
    } catch (error) {
      console.error('Error rejecting competition:', error);
    }
  };

  return (
    <div className="relative inline-block">
      <Button
        icon={loading ? 'pi pi-spin pi-spinner' : icon}
        onClick={onClick || handleClick}
        className={className}
      >
        {label && (
          <div className="ml-1 border-l border-primary-text pl-2 text-sm font-semibold">
            {label}
          </div>
        )}
      </Button>
      {/* Dropdown */}
      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
          <div className="py-1">
            <button
              onClick={handleRejectClick}
              className="flex w-full flex-row items-center px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100"
            >
              <i className="pi pi-ban mr-2"></i>
              Reject
            </button>
          </div>
        </div>
      )}
      <Dialog
        header="Confirm Rejection"
        visible={confirmRejection}
        style={{
          width: '90vw',
          maxWidth: '800px',
          padding: '.2rem',
        }}
        onHide={closeConfirmRejectionModal}
        draggable={false}
      >
        <p>
          This competition is now rejected and an email will be sent to the user
          to inform him.
        </p>
        <div className="mt-6 flex justify-end gap-4">
          <StyledButton
            label="Confirm"
            variant="primary"
            onClick={rejectCompetition}
          />
          <StyledButton
            label="Cancel"
            variant="secondary"
            onClick={closeConfirmRejectionModal}
          />
        </div>
      </Dialog>
    </div>
  );
};

ButtonIcon.defaultProps = {
  className: 'rounded-full py-1 px-2 ',
  icon: 'pi pi-ellipsis-h',
  label: '',
  onClick: () => {},
};

export default ButtonIcon;
