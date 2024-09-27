import React from 'react';
import { InputText } from 'primereact/inputtext';

interface InputFieldProps {
  id: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  placeholder: string;
}

const InputField: React.FC<InputFieldProps> = ({
  id,
  type = 'text',
  value,
  onChange,
  onBlur,
  placeholder = '',
}) => (
  <InputText
    id={id}
    type={type}
    value={value?.toString() || ''}
    onChange={onChange}
    onBlur={onBlur}
    placeholder={placeholder}
    className="rounded border border-gray-300 bg-gray-50 px-3 py-2 text-sm placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 md:w-[400px]"
  />
);

export default InputField;
