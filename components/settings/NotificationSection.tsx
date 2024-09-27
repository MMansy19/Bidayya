import React from 'react';
import { InputSwitch } from 'primereact/inputswitch';

interface NotificationProps {
  title: string;
  description?: string;
  isChecked: boolean;
  onToggle: () => void;
  disabled: boolean|undefined;
}

const NotificationSection: React.FC<NotificationProps> = ({
  title,
  description,
  isChecked,
  onToggle,
  disabled,
}) => {
  return (
    <div className="flex max-w-[700px] flex-row justify-between gap-4">
      <div className="flex flex-col items-start gap-2">
        <h2 className="text-start text-lg font-semibold">{title}</h2>
        {description && <p className="text-start text-xs">{description}</p>}
      </div>
      <InputSwitch
        checked={isChecked}
        onChange={onToggle}
        disabled={disabled}
      />
    </div>
  );
};

export default NotificationSection;
