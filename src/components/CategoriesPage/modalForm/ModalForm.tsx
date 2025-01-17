"use client";

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchWalletByUserId } from "@/store/slices/walletSlice";
import { fetchCategoriesByUserId } from "@/store/slices/categoriesSlice";
import customFetch from "@/utils/customFetch";

import { RootState } from "@/store/store";
import "./ModalForm.scss";

import Image from "next/image";
import RegularButton from "@/commonComponents/RegularButton/RegularButton";

import cart from "./assets/card-outline.svg";

import clear from "./assets/Clear.svg";
import complete from "./assets/Complete.svg";
import { useAppDispatch, useAppSelector } from "@/hooks";

interface ModalFormProps {
  onClose: () => void;
  selectedCard: {
    id: string;
    categoryName: string;
    categoryPriority: string;
    balance: number;
    deleted: boolean;
    currency: number;
    userId: string;
    createdAt: string;
    updatedAt: string;
  } | null;
}

type ButtonDataItem = {
  value: number | string;
  el: number;
};

const buttonData: ButtonDataItem[] = [
  { value: 1, el: 1 },
  { value: 2, el: 2 },
  { value: 3, el: 3 },
  { value: 4, el: 4 },
  { value: 5, el: 5 },
  { value: 6, el: 6 },
  { value: 7, el: 7 },
  { value: 8, el: 8 },
  { value: 9, el: 9 },
  { value: 0, el: 0 },
  { value: "clear", el: 12 },
  { value: "complete", el: 13 },
];

interface PostBody {
  categoryName: string;
  categoryPriority: string;
  balance: number;
}

interface IFormData {
  categoryName: string;
  categoryPriority: string;
  balance: number;
  categoryId: string;
}

const ModalForm: React.FC<ModalFormProps> = ({ onClose, selectedCard }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [inputValue, setInputValue] = useState<string>("0");

  const dispatch = useAppDispatch();
  const wallet = useAppSelector((state: RootState) => state.wallet.walletData);

  const categories = useSelector(
    (state: RootState) => state.categories.categoriesData
  );

  const [formData, setFormData] = useState<IFormData>({
    categoryId: selectedCard?.id || "",
    categoryName: selectedCard?.categoryName || "",
    categoryPriority: selectedCard?.categoryPriority || "",
    balance: selectedCard?.balance || 0,
  });

  // Обновляем formData при изменении selectedCard
  useEffect(() => {
    if (selectedCard) {
      setFormData({
        categoryId: selectedCard.id,
        categoryName: selectedCard.categoryName,
        categoryPriority: selectedCard.categoryPriority,
        balance: selectedCard.balance,
      });
      setInputValue(selectedCard.balance.toString());
    }
  }, [selectedCard]);

  useEffect(() => {
    setIsVisible(true);

    const userId = localStorage.getItem("user-id");
    const token = localStorage.getItem("token");

    if (userId && token) {
      dispatch(
        fetchWalletByUserId({
          id: userId,
          token,
          authSensitiveSwitcher: () => {},
          unauthorizedAction: () => {},
        })
      );
      dispatch(
        fetchCategoriesByUserId({
          id: userId,
          token,
          authSensitiveSwitcher: () => {},
          unauthorizedAction: () => {},
        })
      );
    }

    return () => setIsVisible(false);
  }, [dispatch]);

  const handleSubmit = async () => {
    const { categoryId, categoryName, categoryPriority } = formData;
    const url = `${process.env.NEXT_PUBLIC_API_URL}/categories/id/${categoryId}`;
    const body: PostBody = {
      categoryName: categoryName,
      balance: Number(inputValue),
      categoryPriority: categoryPriority,
    };

    try {
      await customFetch({
        url,
        expectedStatusCode: 200,
        options: {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: body,
        },
      }).then(() => {
        const userId = localStorage.getItem("user-id");
        const token = localStorage.getItem("token");

        if (userId && token) {
          dispatch(
            fetchWalletByUserId({
              id: userId,
              token,
              authSensitiveSwitcher: () => {},
              unauthorizedAction: () => {},
            })
          );
          dispatch(
            fetchCategoriesByUserId({
              id: userId,
              token,
              authSensitiveSwitcher: () => {},
              unauthorizedAction: () => {},
            })
          );
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  function handleButtonClick(value: string | number): void {
    if (typeof value === "number") {
      setInputValue((prev) => (prev === "0" ? `${value}` : `${prev}${value}`));
    } else if (value === "clear") {
      setInputValue("0");
    } else if (value === "complete") {
      const amount = parseFloat(inputValue);
      setFormData((prevData) => ({
        ...prevData,
        balance: amount,
      }));
      handleSubmit();
      setInputValue("0");
      onClose();
    }
  }

  return (
    <div className="ModalForm">
      <div className="overlay" onClick={onClose}></div>
      <div className={`modalContent ${isVisible ? "visible" : ""}`}>
        <div className="item10">
          <label
            htmlFor="select"
            className="cart"
            style={{ backgroundColor: "#DEDEDE" }}
          >
            <div className="card__text">
              <span className="card__span"></span>
              <select id="select" className="card__select">
                {wallet &&
                  wallet.map((wall) => (
                    <option key={wall.id} className="card__option">
                      {wall.walletName}
                    </option>
                  ))}
              </select>
            </div>
            <Image src={cart} alt="Cart" />
          </label>
          <label
            htmlFor="select"
            className="cart"
            style={{ backgroundColor: "var(--color-family )" }}
          >
            <div className="card__text">
              <span className="card__span">Со счета</span>
              <select id="select" className="card__select">
                {categories &&
                  categories.map((cat) => (
                    <option key={cat.id} className="card__option">
                      {cat.categoryName}
                    </option>
                  ))}
              </select>
            </div>
            <Image src={cart} alt="Cart" />
          </label>
        </div>
        <div className="item11 item">{inputValue}</div>
        {buttonData.map((button) => (
          <RegularButton
            key={`button-${button.el}`}
            value={button.value}
            onClick={() => handleButtonClick(button.value)}
            className={`item${button.el} item`}
            style={{
              backgroundColor:
                typeof button.value === "number" ? "#131313" : "transparent",
              border: "none",
            }}
          >
            {typeof button.value === "number" ? (
              button.value
            ) : (
              <Image
                src={button.value === "clear" ? clear : complete}
                alt={button.value.toString()}
              />
            )}
          </RegularButton>
        ))}
      </div>
    </div>
  );
};

export default ModalForm;
