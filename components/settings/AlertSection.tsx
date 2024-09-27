import React from 'react';
import { InputSwitch } from 'primereact/inputswitch';
import { NotificationSetting } from '../../types';

interface AlertProps {
  title: string;
  value: NotificationSetting;
  onChange: any;
  disabled: boolean | undefined;
  k1?: string;
  k2?: string;
}

const AlertSection: React.FC<AlertProps> = ({
  title,
  value,
  onChange,
  disabled,
  k1,
  k2,
}) => {
  return (
    <div className="flex max-w-[700px] flex-row justify-between gap-4 lg:ml-12">
      <div className="flex flex-col items-start gap-2">
        <h2 className="max-w-96 text-start text-sm">{title}</h2>
      </div>
      <div className="flex flex-row gap-4">
        <input
          type="checkbox"
          checked={value.email}
          onChange={() => onChange(k1, k2, 'email')}
          disabled={disabled}
          className="mr-2 h-4 w-[30px] rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
        <input
          type="checkbox"
          checked={value.site}
          onChange={() => onChange(k1, k2, 'site')}
          disabled={disabled}
          className="mr-3 h-4 w-[30px] rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
      </div>
    </div>
  );
};

export default AlertSection;
