import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { formVariantStyles } from '../../styles';
import { Link } from 'react-router-dom';

const FormField = ({
  label,
  type = 'text',
  id,
  value,
  onChange,
  onFocus,
  onBlur,
  placeholder = '',
  className = '',
  variant = 'auth',
  maxLength = Infinity,
  forgetPassword = false,
}: {
  label: string;
  type?: string;
  id: string;
  value: string | number;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  placeholder?: string;
  className?: string;
  variant?: 'primary' | 'auth';
  maxLength?: number;
  forgetPassword?: boolean;
}) => {
  const styles = `${className} ${formVariantStyles[variant]}`;

  return (
    <div className={`${variant === 'auth' ? 'mb-2' : ''}`}>
      <label
        htmlFor={id}
        className="mb-1 block text-start text-sm font-medium text-black"
      >
        {label}{' '}
        {variant === 'primary' && <span className="text-red-600">*</span>}
      </label>
      {type === 'textArea' ? (
        <InputTextarea
          id={id}
          value={value?.toString() || ''}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          placeholder={placeholder}
          className={`${styles} h-32`}
          maxLength={maxLength}
        />
      ) : (
        <InputText
          id={id}
          type={type}
          value={value?.toString() || ''}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          placeholder={placeholder}
          className={styles}
          maxLength={maxLength}
        />
      )}

      {/* Forgot Password Link */}
      {forgetPassword && (
        <div className="mt-2 flex justify-end">
          <Link to="/forgot-password">
            <span className="block text-xs font-medium text-red-600 hover:underline">
              Forgot password?
            </span>
          </Link>
        </div>
      )}
    </div>
  );
};

export default FormField;
