"use client";

import "./page.scss";
import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";

const Initial = () => {
  const router = useRouter();

  return (
    <div className="initial">
      {/* <div className="initial__circle"></div> */}
      <Image src="" alt="" />
      <p className="initial__description">
        Ведите учет финансов, <br /> накапливайте на цели, планируйте траты и
        получайте аналитику
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
