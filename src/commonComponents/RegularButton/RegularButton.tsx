import clsx from 'clsx';
import './RegularButton.scss';

type ColorVariant =
  | 'default'
  | 'success'
  | 'minor-danger'
  | 'major-danger'
  | 'none'
  | 'outlined'
  | 'in-use';

interface RegularButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  colorVariant?: ColorVariant;
}

const RegularButton: React.FC<RegularButtonProps> = ({
  children,
  colorVariant = 'default',
  className,
  type = 'button',
  ...rest
}) => {
  return (
    <button
      className={clsx(
        'regular-button',
        `regular-button_${colorVariant}`,
        className
      )}
      type={type}
      {...rest}
    >
      {children}
    </button>
  );
};

RegularButton.displayName = 'RegularButton';

export default RegularButton;
