import clsx from 'clsx';
import './RegularInput.scss';

interface RegularInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  type: React.HTMLInputTypeAttribute;
  placeholder: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

const RegularInput = ({
  name,
  type,
  placeholder,
  value,
  onChange,
  ...props
}: RegularInputProps) => {
  const labelClassName = clsx(
    'regular-input__label',
    value
      ? 'regular-input__label_visible'
      : 'regular-input__label_transparent'
  );

  return (
    <div className="regular-input">
      <label
        className={labelClassName}
        htmlFor={name}
      >
        {placeholder}
      </label>
      <input
        className="regular-input__input"
        id={name}
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        autoComplete="off"
        {...props}
      />
    </div>
  );
};

RegularInput.displayName = 'RegularInput';

export default RegularInput;
