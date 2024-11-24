"use client";

import React, { FC, useState } from "react";
import "./page.scss";
import Image from "next/image";

export interface IconData {
  id: number;
  name: string;
  color: string;
  svg: string;
}

const icons: IconData[] = [
  {
    id: 0,
    name: "Подарки",
    color: "--color-pink",
    svg: "./assets/gift.svg",
  },
  {
    id: 1,
    name: "Транспорт",
    color: "--color-transport",
    svg: "./assets/transport",
  },
  {
    id: 2,
    name: "Продукты",
    color: "--color-receipt",
    svg: "./assets/receipt.svg",
  },
  {
    id: 3,
    name: "Семья",
    color: "--color-family",
    svg: "./assets/family.svg",
  },
  {
    id: 4,
    name: "Здоровье",
    color: "--color-heart",
    svg: "./assets/heart.svg",
  },
  {
    id: 5,
    name: "Кафе",
    color: "--color-food",
    svg: "./assets/food.svg",
  },
  {
    id: 6,
    name: "Досуг",
    color: "--color-puzzle",
    svg: "./assets/puzzle.svg",
  },
  {
    id: 7,
    name: "Покупки",
    color: "--color-purchase",
    svg: "./assets/purchase.svg",
  },
  {
    id: 8,
    name: "Питомцы",
    color: "--color-orange",
    svg: "./assets/paw.svg",
  },
];

interface IOperation {
  category: string;
  typeOfPayment: string;
  profit: boolean; // Если true, то значит зачисление на счёт, в противном случае снятие
  check: number;
}

interface ITransaction {
  day: string; // Формат: "YYYY-MM-DD"
  operations: IOperation[];
}

interface TransactionsProps {
  transactions: ITransaction[];
}
const Transactions: FC<TransactionsProps> = ({ transactions }) => {
  const [filter, setFilter] = useState("");
  const [transactionsData, setTransactionsData] = useState<ITransaction[]>([
    //на бэке сортировать по дате
    {
      day: "2024-11-24",
      operations: [
        { category: "Еда", typeOfPayment: "Карта", profit: false, check: 500 },
        {
          category: "Транспорт",
          typeOfPayment: "Карта",
          profit: false,
          check: 300,
        },
      ],
    },
    {
      day: "2024-11-19",
      operations: [
        {
          category: "Зарплата",
          typeOfPayment: "Банк",
          profit: true,
          check: 30000,
        },
        {
          category: "Подарок",
          typeOfPayment: "Карта",
          profit: true,
          check: 5000,
        },
      ],
    },
  ]);

  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  const formatDate = (dateStr: string): string => {
    const date = new Date(dateStr);

    if (date.toDateString() === today.toDateString()) {
      return "Сегодня";
    }

    if (date.toDateString() === yesterday.toDateString()) {
      return "Вчера";
    }

    // Форматируем как "день месяц"
    const options: Intl.DateTimeFormatOptions = {
      day: "2-digit",
      month: "long",
    };
    return date.toLocaleDateString("ru-RU", options);
  };

  const formatNumberComma = (num: number): string => {
    return num.toLocaleString("en-US");
  };

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(event.target.value);
  };

  const handleBlur = () => {
    setFilter("");
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(event.target.value);
  };

  const filteredTransactions = transactionsData
    .map((transaction) => ({
      ...transaction,
      operations: transaction.operations.filter((operation) => {
        if (filter === "income") return operation.profit; // Только доходы
        if (filter === "expenses") return !operation.profit; // Только расходы
        return true; // Все операции, если фильтр пуст
      }),
    }))
    .filter((transaction) => transaction.operations.length > 0); // Убираем дни без операций

  return (
    <div className="transactions">
      <header className="transactions__header">
        <h1 className="transactions__title">Операции</h1>
        <select
          name="filter"
          id="filter"
          className="transactions__select"
          value={filter}
          onClick={() => {
            console.log(filter);
          }}
          onChange={handleFilterChange}
          onBlur={handleBlur}
        >
          <option hidden value="">
            Фильтр
          </option>
          <option value="income" className="transactions__option">
            Доходы
          </option>
          <option value="expenses" className="transactions__option">
            Расходы
          </option>
        </select>
      </header>
      <main className="transactions__main">
        {filteredTransactions.map((transaction, dayIndex) => (
          <div key={dayIndex} className="transactions__day-block">
            <h2 className="transactions__day">{formatDate(transaction.day)}</h2>
            <div className="transactions__list">
              {transaction.operations.map((operation, opIndex) => (
                <div className="transactions__operation" key={opIndex}>
                  <div className="transactions__operation_block">
                    <Image
                      src=""
                      alt={operation.category}
                      className="transactions__operation_icon"
                    />
                    <div className="transactions__operation_description">
                      <span className="transactions__operation_category">
                        {operation.category}
                      </span>
                      <span className="transactions__operation_type">
                        {operation.typeOfPayment}
                      </span>
                    </div>
                  </div>
                  <div
                    className="transactions__operation_check"
                    style={{
                      color: operation.profit
                        ? "var(--color-accent)"
                        : "var(--color-expenses)",
                    }}
                  >
                    {operation.profit ? "+" : "-"}
                    {formatNumberComma(operation.check)}₽
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </main>
    </div>
  );
};

export default Transactions;
