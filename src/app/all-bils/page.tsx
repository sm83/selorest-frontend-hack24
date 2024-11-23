"use client";

import Bils from "@/components/bils/Bils";
import React, { useState } from "react";
import "./page.scss";
import human from "./assets/human.svg";
import Image from "next/image";

const AllBils = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };
  return (
    <div className="all-bils">
      <header className={`all-bils__header ${isModalOpen ? "blurred" : ""}`}>
        <button className="all-bils__header_btn">
          <Image src={human} className="all-bils__header_svg" alt="" />
        </button>
        <h1 className="all-bils__title">Все счета</h1>
        <span className="all-bils__count">2 493 826 ₽ </span>
      </header>
      {isModalOpen && (
        <>
          <div className="all-bils__modal-overlay" onClick={toggleModal}></div>
          <form className="all-bils__modal">
            <div className="all-bils__modal_header">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  toggleModal();
                }}
                className="all-bils__modal_btn"
              >
                Отменить
              </button>
              <h2 className="all-bils__modal_title mr-105">Счет</h2>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  console.log("отправить пост");
                }}
                className="all-bils__modal_btn"
              >
                Готово
              </button>
            </div>
            <div className="all-bils__modal_inputs">
              <input
                className="all-bils__modal_input"
                type="text"
                placeholder="Название"
              />
              <input
                className="all-bils__modal_input"
                type="text"
                placeholder="Описание"
              />
              <select className="all-bils__modal_input" name="" id="">
                <option className="all-bils__modal_option" value="card">
                  Карта
                </option>
                <option className="all-bils__modal_option" value="money">
                  Наличка
                </option>
              </select>
            </div>
            <h1 className="all-bils__modal_title pl-5">Баланс</h1>
            <div className="all-bils__modal_data-block">
              <div className="all-bils__modal_remainder all-bils__modal_input">
                <span className="all-bils__modal_remainder-text">
                  Остаток на счёте
                </span>
                <span className="all-bils__modal_remainder-count">0₽</span>
              </div>
              <div className="all-bils__modal_input all-bils__modal_balance">
                <span className="all-bils__modal_remainder-text">
                  Учитывать в общем балансе
                </span>
                <label htmlFor="checkbox-1" className="all-bils__modal_switch">
                  <input
                    id="checkbox-1"
                    type="checkbox"
                    className="all-bils__modal_checkbox"
                  />
                  <span className="all-bils__modal_slider round"></span>
                </label>
              </div>
            </div>
          </form>
        </>
      )}
      <Bils onAddClick={toggleModal} />
    </div>
  );
};

export default AllBils;
