"use client";

import React, { useEffect, useState } from "react";
import "./BilModal.scss";

interface BilModalProps {
  onClose: () => void;
}

const BilModal: React.FC<BilModalProps> = ({ onClose }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [includeInTotal, setIncludeInTotal] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  useEffect(() => {
    setIsVisible(true);
    return () => setIsVisible(false);
  }, []);

  return (
    <div className="BilModal">
      <div className="overlay" onClick={onClose}></div>
      <form
        className={`BilModalContent ${isVisible ? "visible" : ""}`}
        onSubmit={handleSubmit}
      >
        {/* Заголовок */}
        <div className="BilModalContent__modal_header">
          <button
            type="button"
            onClick={onClose}
            className="BilModalContent__modal_btn"
          >
            Отменить
          </button>
          <h2 className="BilModalContent__modal_title mr-105">Счет</h2>
          <button type="submit" className="BilModalContent__modal_btn">
            Готово
          </button>
        </div>

        {/* Поля ввода */}
        <div className="BilModalContent__modal_inputs">
          <input
            className="BilModalContent__modal_input"
            type="text"
            placeholder="Название"
            required
          />
          <input
            className="BilModalContent__modal_input"
            type="text"
            placeholder="Описание"
            required
          />
          <select
            className="BilModalContent__modal_input"
            name="paymentType"
            defaultValue="card"
          >
            <option className="BilModalContent__modal_option" value="card">
              Карта
            </option>
            <option className="BilModalContent__modal_option" value="money">
              Наличка
            </option>
          </select>
        </div>

        {/* Баланс */}
        <h1 className="BilModalContent__modal_title pl-5">Баланс</h1>
        <div className="BilModalContent__modal_data-block">
          <div className="BilModalContent__modal_remainder BilModalContent__modal_input">
            <span className="BilModalContent__modal_remainder-text">
              Остаток на счёте
            </span>
            <span className="BilModalContent__modal_remainder-count">0₽</span>
          </div>
          <div className="BilModalContent__modal_input BilModalContent__modal_balance">
            <span className="BilModalContent__modal_remainder-text">
              Учитывать в общем балансе
            </span>
            <label
              htmlFor="checkbox-1"
              className="BilModalContent__modal_switch"
            >
              <input
                id="checkbox-1"
                type="checkbox"
                className="BilModalContent__modal_checkbox"
                checked={includeInTotal}
                onChange={(e) => setIncludeInTotal(e.target.checked)}
              />
              <span className="BilModalContent__modal_slider round"></span>
            </label>
          </div>
        </div>
      </form>
    </div>
  );
};

export default BilModal;
