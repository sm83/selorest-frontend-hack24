'use client';

import { useRouter } from 'next/navigation';
import './DontHaveAccount.scss';

const DontHaveAccount = () => {
  const router = useRouter();

  return (
    <div className="dont-have-account-wrapper">
      <span className="already-have-span roboto-light">
        {`Don't have an account?`}
      </span>
      <button
        className="sign-in-btn"
        onClick={() => {
          router.push('/register');
        }}
      >
        <span className="roboto-regular">Sign up</span>
        <span className="arrow-symbol roboto-regular"> →</span>
      </button>
    </div>
  );
};

export default DontHaveAccount;
