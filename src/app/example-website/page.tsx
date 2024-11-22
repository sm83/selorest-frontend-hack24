'use client';

import { useAuth } from '@/hooks';
import './page.scss';

import ExampleHeader from '@/components/ExampleHeader/ExampleHeader';
import { useRouter } from 'next/navigation';
import customFetch from '@/utils/customFetch';

const HomePage = () => {
  const { setIsAuth } = useAuth();
  const router = useRouter();

  const test401 = async () => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/test/get401`;

    await customFetch({
      url,
      expectedStatusCode: 200,
      options: {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      },
      authSensitiveSwitcher: setIsAuth,
      unauthorizedAction: () => {
        router.push('/login');
      },
    });
  };

  return (
    <div className="wrapper">
      <ExampleHeader />
      <div className="content">
        <span>Hello! </span>
        <button
          onClick={() => {
            test401();
          }}
        >
          Get Unauthorized Exception 401
        </button>
      </div>
    </div>
  );
};

export default HomePage;
