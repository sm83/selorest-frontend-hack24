"use client";

import "./page.scss";
import RegisterHeader from "@/components/RegisterPage/RegisterHeader/RegisterHeader";
import SimpleTermsFooter from "@/components/SimpleTermsFooter/SimpleTermsFooter";
import { useEffect, useState } from "react";
import { ProcessStatus } from "@/interfaces/processStatus.interface";
import Spinner1 from "@/svgComponents/Spinner-1/Spinner-1";
import clsx from "clsx";
import RegisterForm from "@/components/RegisterPage/RegisterForm/RegisterForm";

const RegisterPage = () => {
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
    <div className="register-page-wrapper">
      <div className="register-page-inner-wrapper register-page-inner-wrapper_maxwidth-1250">
        <RegisterHeader />
        <div className="register-page-content">
          <div className="register-page-center-wrapper">
            <RegisterForm setStatus={setStatus} status={status} />
            {status.error && <span className="error-span">{status.error}</span>}
            {status.success && (
              <div
                className={clsx(
                  "success-spinner-wrapper",
                  showLoader && "success-spinner-wrapper_visible"
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

export default RegisterPage;
