"use client";

import "./CategoriesPage.scss";

import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

import dosug from "./assets/Dosug.svg";
import kafe from "./assets/Kafe.svg";
import podarki from "./assets/Podarki.svg";
import pokupki from "./assets/Pokupki.svg";
import semia from "./assets/Semia.svg";
import transport from "./assets/Transport.svg";
import zdorovie from "./assets/Zdorovie.svg";
import produkt from "./assets/Produkt.svg";
import dohodIcon from "./assets/DohodIcon.svg";

import dohod from "./assets/Dohod.svg";
import rashod from "./assets/Rashod.svg";

import plus from "./assets/newPlus.svg";

import CardForm from "./CardForm/CardForm";
import RegularButton from "@/commonComponents/RegularButton/RegularButton";
import Image from "next/image";

import { useState } from "react";

import ModalForm from "./modalForm/ModalForm";
import CategoryModal from "./categoryModal/CategoryModal";

ChartJS.register(ArcElement, Tooltip, Legend);

type ExpenseDataItem = {
  title: string;
  image: string;
  el: number;
  mony: number;
};

const expenseData: ExpenseDataItem[] = [
  { title: "Продукты", image: produkt, el: 1, mony: 1000 },
  { title: "Кафе", image: kafe, el: 2, mony: 1500 },
  { title: "Досуг", image: dosug, el: 3, mony: 1200 },
  { title: "Транспорт", image: transport, el: 4, mony: 800 },
  { title: "Здоровье", image: zdorovie, el: 5, mony: 900 },
  { title: "Подарки", image: podarki, el: 6, mony: 700 },
  { title: "Семья", image: semia, el: 7, mony: 1300 },
  { title: "Покупки", image: pokupki, el: 8, mony: 1100 },
];

const incomeData: ExpenseDataItem[] = [
  { title: "Зарплата", image: dohodIcon, el: 1, mony: 1000 },
];

const CategoriesPage = () => {
  const [walletParam, setWalletParam] = useState<"dohod" | "rashod">("rashod");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState<ExpenseDataItem | null>(
    null
  );

  const isExpense = walletParam === "rashod";
  const currentData = isExpense ? expenseData : incomeData;
  const totalAmount = currentData.reduce(
    (sum, item) => sum + (item.mony || 0),
    0
  );

  const openModal = (card: ExpenseDataItem) => {
    setSelectedCard(card);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCard(null);
  };

  const createChartData = (data: ExpenseDataItem[], colors: string[]) => ({
    datasets: [
      {
        label: isExpense ? "Расходы по категориям" : "Доходы по категориям",
        data: data.map((item) => item.mony),
        backgroundColor: colors,
        cutout: "85%",
        borderWidth: 0,
      },
    ],
  });

  const centerTextPlugin = {
    id: "centerText",
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    beforeDraw: (chart: any) => {
      const { width, height, ctx } = chart;
      if (!ctx) return; // Добавлена проверка

      ctx.save();
      ctx.font = "bold 16px Arial";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = "#FFFFFF";
      ctx.fillText(
        isExpense ? "Расходы" : "Доходы",
        width / 2,
        height / 2 - 10
      );
      ctx.font = "bold 14px Arial";
      ctx.fillStyle = "#D34D85";
      ctx.fillText(`${totalAmount}₽`, width / 2, height / 2 + 10);
      ctx.restore();
    },
  };

  const chartColors = isExpense
    ? [
        "#02B1D0",
        "#A49AD5",
        "#AFF219",
        "#428BF9",
        "#339C92",
        "#ED8C8B",
        "#EDD103",
        "#4FCAE8",
      ]
    : ["#DEDEDE", "#B0B0B0"]; // Добавлен массив цветов для доходов

  return (
    <div className="CategoriesPage">
      <div className="CategoriesBody">
        <div className="MainCategories">
          <div className="CategoriesChart">
            <Pie
              data={createChartData(currentData, chartColors)}
              plugins={[centerTextPlugin]}
            />
          </div>
          <div className="Categories">
            <div>
              <span className="name">План</span>
              <span>Сумма</span>
            </div>
            <div>
              <span className="name">Цель</span>
              <span>Сумма</span>
            </div>
          </div>
        </div>
        <div className="UserCategories">
          {currentData.map((category) => (
            <CardForm
              className="UserCategoryItem"
              key={category.el}
              onClick={() => openModal(category)}
              title={category.title}
              image={category.image}
              mony={category.mony}
            />
          ))}
          <div
            className="UserCategoryItem addButton"
            onClick={() => setIsModalOpen(true)} // Обработчик обновлен
          >
            <Image src={plus} alt="Добавить категорию" height={48} width={48} />
          </div>
        </div>
      </div>

      <div className="param">
        <RegularButton
          className="buttonParam"
          style={{ backgroundColor: "black", opacity: isExpense ? 0.5 : 1 }}
          onClick={() => setWalletParam("dohod")}
        >
          <div className="paramDohod">
            <Image src={dohod} alt="Доходы" />
          </div>
          <span>Доходы</span>
        </RegularButton>
        <RegularButton
          className="buttonParam"
          style={{ backgroundColor: "black", opacity: isExpense ? 1 : 0.5 }}
          onClick={() => setWalletParam("rashod")}
        >
          <div className="paramRashod">
            <Image src={rashod} alt="Расходы" />
          </div>
          <span>Расходы</span>
        </RegularButton>
      </div>

      {isModalOpen && (
        <ModalForm onClose={closeModal} selectedCard={selectedCard || null} />
        // <CategoryModal onClose={closeModal} selectedCard={selectedCard || null} />
      )}
    </div>
  );
};

export default CategoriesPage;
