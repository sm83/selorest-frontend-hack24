import Image from 'next/image';
import './ExampleHeader.scss';
import RegularButton from '@/commonComponents/RegularButton/RegularButton';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { useAuth } from '@/hooks';

const ExampleHeader = () => {
  const router = useRouter();

  const handlePush = useCallback(
    (path: string) => {
      router.push(path);
    },
    [router]
  );

  const { isAuth } = useAuth();

  return (
    <header className={'main-header'}>
      <div className={'main-header__website-name-area'}>
        <div className="main-header__website-logo">
          <Image
            src={'/staticImages/dog.png'}
            alt="logo"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{ objectFit: 'cover' }}
          />
        </div>
        <h1 className="main-header__website-name">Example website</h1>
      </div>
      <div className="header-content-area">
        <nav className="navigation">
          <RegularButton onClick={() => handlePush('/')}>
            Home
          </RegularButton>
          <RegularButton
            onClick={() => handlePush('/fullscreenLayoutExample')}
          >
            Fullscreen Layout
          </RegularButton>
          <RegularButton
            onClick={() => handlePush('/centeredLayoutExample')}
          >
            Centered Layout
          </RegularButton>
        </nav>
        <div className="profile-area">
          {isAuth ? (
            <span>fuck you</span>
          ) : (
            <>
              <RegularButton
                onClick={() => handlePush('/login')}
                colorVariant="default"
              >
                Sign in
              </RegularButton>
              <RegularButton
                onClick={() => handlePush('/register')}
                colorVariant="success"
              >
                Sign up
              </RegularButton>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default ExampleHeader;
