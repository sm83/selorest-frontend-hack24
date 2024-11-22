import Image from "next/image";
import "./RegisterHeader.scss";
import AlreadyHaveLogin from "./AlreadyHaveLogin/AlreadyHaveLogin";

const RegisterHeader = () => {
  return (
    <header className={"register-header"}>
      <div className="register-header__website-logo-wrapper">
        <div className="register-header__website-logo">
          <Image
            src={"/staticImages/dog.png"}
            alt="logo"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{ objectFit: "cover" }}
          />
        </div>
      </div>
      <AlreadyHaveLogin />
    </header>
  );
};

export default RegisterHeader;
