'use client';

import RegisterHeader from '@/components/RegisterPage/RegisterHeader/RegisterHeader';
import './page.scss';
import SimpleTermsFooter from '@/components/SimpleTermsFooter/SimpleTermsFooter';
import RegisterForm from '@/components/RegisterPage/RegisterForm/RegisterForm';

const RegisterPage = () => {
  return (
    <div className="register-page-wrapper">
      <div className="register-page-inner-wrapper register-page-inner-wrapper_maxwidth-1250">
        <RegisterHeader />
        <div className="register-page-content">
          <RegisterForm />
        </div>
        <SimpleTermsFooter />
      </div>
    </div>
  );
};

export default RegisterPage;
