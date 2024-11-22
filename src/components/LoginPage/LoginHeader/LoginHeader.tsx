import Image from 'next/image';
import './LoginHeader.scss';
import DontHaveAccount from './DontHaveAccount/DontHaveAccount';

const LoginHeader = () => {
  return (
    <header className="login-header">
      <div className="login-header__website-logo-wrapper">
        <div className="login-header__website-logo">
          <Image
            src={'/staticImages/dog.png'}
            alt="logo"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{ objectFit: 'cover' }}
          />
        </div>
      </div>
      <DontHaveAccount />
    </header>
  );
};

export default LoginHeader;
