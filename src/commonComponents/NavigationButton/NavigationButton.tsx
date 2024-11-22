import clsx from 'clsx';

interface NavigationButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const NavigationButton: React.FC<NavigationButtonProps> = ({
  children,
  className,
  type = 'button',
  ...rest
}) => {
  return (
    <button
      className={clsx('navigation-button', className)}
      type={type}
      {...rest}
    >
      {children}
    </button>
  );
};

NavigationButton.displayName = 'NavigationButton';

export default NavigationButton;
