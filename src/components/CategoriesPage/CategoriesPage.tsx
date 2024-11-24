"use client";

import "./CategoriesPage.scss";

import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// import dosug from "./assets/Dosug.svg";
// import kafe from "./assets/Kafe.svg";
// import podarki from "./assets/Podarki.svg";
// import pokupki from "./assets/Pokupki.svg";
// import semia from "./assets/Semia.svg";
// import transport from "./assets/Transport.svg";
// import zdorovie from "./assets/Zdorovie.svg";
// import produkt from "./assets/Produkt.svg";
// import dohodIcon from "./assets/DohodIcon.svg";

import dohod from "./assets/Dohod.svg";
import rashod from "./assets/Rashod.svg";

import plus from "./assets/newPlus.svg";

import CardForm from "./CardForm/CardForm";
import RegularButton from "@/commonComponents/RegularButton/RegularButton";
import Image from "next/image";

import { useEffect, useState } from "react";

import ModalForm from "./modalForm/ModalForm";
import { useAppDispatch, useAppSelector, useAuth } from "@/hooks";
import { fetchCategoriesByUserId } from "@/store/slices/categoriesSlice";
import { useRouter } from "next/navigation";
// import CategoryModal from "./categoryModal/CategoryModal";

ChartJS.register(ArcElement, Tooltip, Legend);

interface ExpenseDataItem {
  id: string;
  categoryName: string;
  categoryPriority: string;
  balance: number;
  deleted: boolean;
  currency: number;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

const incomeData: ExpenseDataItem[] = [
  {
    id: "0",
    categoryName: "Зарплата",
    categoryPriority: "",
    balance: 1000,
    deleted: false,
    currency: 0,
    userId:
      typeof window !== "undefined"
        ? localStorage.getItem("user-id") || ""
        : "",
    createdAt: "",
    updatedAt: "",
  },
];

const CategoriesPage = () => {
  const dispatch = useAppDispatch();
  const userId =
    typeof window !== "undefined" ? localStorage.getItem("user-id") : null;
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const { setIsAuth } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (userId && token) {
      dispatch(
        fetchCategoriesByUserId({
          id: userId,
          token: token,
          authSensitiveSwitcher: setIsAuth,
          unauthorizedAction: () => {
            router.push("/login");
          },
        })
      );
    }
  }, [dispatch, router, setIsAuth, userId, token]);

  const categories = useAppSelector((state) => state.categories.categoriesData);

  const [walletParam, setWalletParam] = useState<"dohod" | "rashod">("rashod");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState<ExpenseDataItem | null>(
    null
  );

  const isExpense = walletParam === "rashod";
  const currentData = isExpense ? categories : incomeData;
  const totalAmount = categories?.reduce(
    (sum, item) => sum + (item.balance || 0),
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

  const createChartData = (colors: string[]) => ({
    datasets: [
      {
        label: isExpense ? "Расходы по категориям" : "Доходы по категориям",
        data: categories ? categories[0].balance + categories[1].balance : 0,
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

  if (categories) {
    return (
      <div className="CategoriesPage">
        <div className="CategoriesBody">
          <div className="MainCategories">
            <div className="CategoriesChart">
              <Pie
                data={createChartData(chartColors)}
                plugins={[centerTextPlugin]}
              />
            </div>
            <div className="Categories">
              <div>
                <span className="name">План</span>
                <span>Сумма {categories[0].balance}</span>
              </div>
              <div>
                <span className="name">Цель</span>
                <span>Сумма {categories[1].balance}</span>
              </div>
            </div>
          </div>
          <div className="UserCategories">
            {currentData
              ?.filter((el) => el.categoryPriority !== "primary")
              .map((category) => (
                <CardForm
                  className="UserCategoryItem"
                  key={category.id}
                  onClick={() => openModal(category)}
                  selectedCard={category}
                />
              ))}
            <div
              className="UserCategoryItem addButton"
              onClick={() => setIsModalOpen(true)} // Обработчик обновлен
            >
              <Image
                src={plus}
                alt="Добавить категорию"
                height={48}
                width={48}
              />
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
  }

  return null; // Возвращаем null, если данные не загружены
};

export default CategoriesPage;
