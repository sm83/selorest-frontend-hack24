'use client';

import LoginForm from '@/components/LoginPage/LoginForm/LoginForm';
import './page.scss';

import LoginHeader from '@/components/LoginPage/LoginHeader/LoginHeader';
import SimpleTermsFooter from '@/components/SimpleTermsFooter/SimpleTermsFooter';
import { useEffect, useState } from 'react';
import { ProcessStatus } from '@/interfaces/processStatus.interface';
import Spinner1 from '@/svgComponents/Spinner-1/Spinner-1';
import clsx from 'clsx';

const LoginPage = () => {
  const [status, setStatus] = useState<ProcessStatus>({
    success: false,
    pending: false,
    error: null,
  });

  useEffect(() => {
    if (status.success) {
      const showLoaderTimer = setTimeout(() => {
        setShowLoader(true);
        clearTimeout(showLoaderTimer);
      }, 2000);
    }
  }, [status.success]);

  const [showLoader, setShowLoader] = useState<boolean>(false);

  return (
    <div className="login-page-wrapper">
      <div className="login-page-inner-wrapper login-page-inner-wrapper_maxwidth-1250">
        <LoginHeader />
        <div className="login-page-content">
          <div className="login-page-center-wrapper">
            <LoginForm
              setStatus={setStatus}
              status={status}
            />
            {status.error && (
              <span className="error-span">{status.error}</span>
            )}
            {status.success && (
              <div
                className={clsx(
                  'success-spinner-wrapper',
                  showLoader && 'success-spinner-wrapper_visible'
                )}
              >
                <Spinner1
                  color="var(--github-spinner-semitransparent)"
                  size={32}
                />
              </div>
            )}
          </div>
        </div>
        <SimpleTermsFooter />
      </div>
    </div>
  );
};

export default LoginPage;
