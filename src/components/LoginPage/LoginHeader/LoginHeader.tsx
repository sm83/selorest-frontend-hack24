import "./LoginHeader.scss";
import DontHaveAccount from "./DontHaveAccount/DontHaveAccount";

const LoginHeader = () => {
  return (
    <header className="login-header">
      <DontHaveAccount />
    </header>
  );
};

export default LoginHeader;
