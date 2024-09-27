import { Button } from 'primereact/button';
import backIcon from '../../assets/back.png';
import { ButtonVariant } from '../../types';
import { buttonVariantStyles } from '../../styles';
import addIcon from '../../assets/images/add.png';

const StyledButton = ({
  type = 'button',
  onClick,
  label,
  variant = 'primary',
  className = '',
  disabled = false,
  icon = '',
}: {
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  label: string;
  variant?: ButtonVariant;
  className?: string;
  disabled?: boolean;
  icon?: string;
}) => {
  return (
    <Button
      type={type}
      onClick={onClick}
      className={`${buttonVariantStyles[variant]} ${className}`}
      disabled={disabled}
    >
      {variant === 'pdf' ? (
        <>
          <i className="pi pi-file-pdf mr-2 text-red-600"></i>
          {label}
        </>
      ) : icon === 'back' ? (
        <>
          <img
            src={backIcon}
            alt="Back"
            className="mr-2 inline-block h-4 w-4"
          />

          {label}
        </>
      ) : icon === 'addTopic' ? (
        <>
          <img
            src={addIcon}
            alt="Back"
            className="mr-2 inline-block w-[20px]"
          />

          {label}
        </>
      ) : (
        <div className="mx-auto">{label}</div>
      )}
    </Button>
  );
};

export default StyledButton;
