"use client";

import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import "./NewWalletModal.scss";
import clsx from "clsx";
import customFetch from "@/utils/customFetch";

const NewWalletModal = ({
  setIsModalOpen,
  isModalOpen,
}: {
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  isModalOpen: boolean;
}) => {
  // Интерфейс для данных нового кошелька
  interface INewWalletData {
    userId: string | null;
    currency: number;
    walletType: "cash" | "card";
    walletName: string;
    balance: number;
  }

  // Состояние для данных формы
  const [data, setData] = useState<INewWalletData>({
    userId: "user-id-placeholder", // Замените на реальное значение userId
    currency: 1, // ID валюты по умолчанию
    walletType: "card", // Тип кошелька по умолчанию
    walletName: "",
    balance: 0,
  });

  const [userId, setUserId] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const user_id = localStorage.getItem("user-id");
    const token = localStorage.getItem("token");

    setData({ ...data, userId: user_id });

    setUserId(user_id);
    setToken(token);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Обработчик изменения полей
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setData((prevData) => ({
      ...prevData,
      [name]: name === "balance" ? parseFloat(value) || 0 : value, // Если поле — баланс, преобразуем значение в число
    }));
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const url = `${process.env.NEXT_PUBLIC_API_URL}/wallets/`; // Укажите правильный URL

    try {
      const response = await customFetch({
        url,
        expectedStatusCode: 201,
        options: {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: data,
        },
      });

      if (response instanceof Error) {
        console.error("response is error");

        throw response as Error;
      } else {
        setIsModalOpen(false);
      }
    } catch (error) {
      console.error("Ошибка при отправке данных:", error);
    }
  };

  return (
    <div
      className={clsx(
        "new-wallet-modal-wrapper",
        isModalOpen && "new-wallet-modal-wrapper_up"
      )}
    >
      <form className="new-wallet-modal" onSubmit={handleSubmit} noValidate>
        <div className="new-wallet-header">
          <button
            type="button"
            onClick={() => {
              setIsModalOpen(false);
            }}
            className="new-wallet-header__button"
          >
            Отменить
          </button>
          <h2 className="new-wallet-header__h2">Счет</h2>
          <button
            onClick={handleSubmit}
            type="submit"
            className="new-wallet-header__button"
          >
            Готово
          </button>
        </div>

        <div className="input-block">
          <input
            className="input-block__input"
            type="text"
            name="walletName" // Связь с состоянием
            placeholder="Название"
            value={data.walletName}
            onChange={handleChange} // Обработчик изменения
            required
          />
          <input
            className="input-block__input"
            type="text"
            name="description" // Добавьте это поле в ваш интерфейс, если нужно
            placeholder="Описание"
            required
          />
          <select
            className="input-block__select"
            name="walletType"
            value={data.walletType}
            onChange={handleChange} // Обработчик изменения
          >
            <option value="card">Карта</option>
            <option value="cash">Наличка</option>
          </select>
        </div>

        <div className="balance-area">
          <h1 className="balance-area__header">Баланс</h1>
          <div className="balance-area__input-block">
            <span className="balance-area__input-left-span">
              Начальный баланс
            </span>
            <input
              className="balance-area__input-itself"
              type="number"
              name="balance" // Связь с состоянием
              value={data.balance}
              onChange={handleChange} // Обработчик изменения
              required
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default NewWalletModal;
