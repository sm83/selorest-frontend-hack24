'use client';

import { useEffect } from 'react';

const RootPage = () => {
  useEffect(() => {
    window.location.href = '/login';
  }, []);

  return <></>;
};

export default RootPage;
