"use client";

import { useRouter } from "next/navigation";
import "./AlreadyHaveLogin.scss";

const AlreadyHaveLogin = () => {
  const router = useRouter();

  return (
    <div className="already-have-login-wrapper">
      <span className="already-have-span roboto-light">
        Already have an account?
      </span>
      <button
        className="sign-in-btn"
        onClick={() => {
          router.push("/login");
        }}
      >
        <span className="roboto-regular">Sign in</span>
        <span className="arrow-symbol roboto-regular"> →</span>
      </button>
    </div>
  );
};

export default AlreadyHaveLogin;
