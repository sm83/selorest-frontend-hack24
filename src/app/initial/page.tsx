"use client";

import "./page.scss";
import React from "react";
import { useRouter } from "next/navigation";

const Initial = () => {
  const router = useRouter();

  return (
    <div className="initial">
      {/* <div className="initial__circle"></div> */}
      <h1 className="initial__logo">kopeyka</h1>
      <p className="initial__description">
        Ведите учет финансов, <br /> накапливайте на цели, планируйте <br />{" "}
        траты и получайте аналитику
      </p>
      <button
        onClick={() => router.push("/register")}
        className="initial__btn_reg"
      >
        Зарегистрироваться
      </button>
      <button
        onClick={() => router.push("/login")}
        className="initial__btn_have"
      >
        У меня уже есть аккаунт
      </button>
    </div>
  );
};

export default Initial;
