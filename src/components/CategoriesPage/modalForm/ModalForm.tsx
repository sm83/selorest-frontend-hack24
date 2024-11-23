"use client";

import React, { useEffect, useState } from "react";
import "./ModalForm.scss";

import Image from "next/image";
import RegularButton from "@/commonComponents/RegularButton/RegularButton";

import cart from "./assets/card-outline.svg";
import people from "./assets/people-outline.svg";

import clear from "./assets/Clear.svg";
import complete from "./assets/Complete.svg";

interface ModalFormProps {
  onClose: () => void;
  selectedCard: {
    title: string;
    image: string;
    el: number;
    mony: number;
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

const ModalForm: React.FC<ModalFormProps> = ({ onClose, selectedCard }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [inputValue, setInputValue] = useState<string>("");

  useEffect(() => {
    setIsVisible(true);
    return () => setIsVisible(false);
  }, []);

  const handleButtonClick = (value: number | string) => {
    if (typeof value === "number") {
      setInputValue((prev) => `${prev}${value}`);
    } else if (value === "clear") {
      setInputValue((prev) => prev.slice(0, -1));
    } else if (value === "complete") {
      console.log("Ввод завершен:", inputValue);
      setInputValue("");
      onClose();
    }
  };

  return (
    <div className="ModalForm">
      <div className="overlay" onClick={onClose}></div>
      <div className={`modalContent ${isVisible ? "visible" : ""}`}>
        <div className="item10">
          <div className="cart" style={{ backgroundColor: "#DEDEDE" }}>
            <div>
              <span>Со счета</span>
              <h1>Карта</h1>
            </div>
            <Image src={cart} alt="Cart" />
          </div>
          <div className="cart" style={{ backgroundColor: "#EDD100" }}>
            <div>
              <span>На категорию</span>
              <h1>{selectedCard?.title}</h1>
            </div>
            <Image src={people} alt="Family" />
          </div>
        </div>
        <div className="item11 item">{inputValue || "0"}</div>
        {buttonData.map((button) => (
          <RegularButton
            key={button.el}
            value={button.value}
            onClick={() => handleButtonClick(button.value)}
            className={`item${button.el} item`}
            style={{
              backgroundColor:
                typeof button.value === "number" ? "#131313" : "transparent",
              border: "none"
            }}
          >
            {typeof button.value === "number" ? (
              button.value
            ) : (
              <Image
                src={button.value === "clear" ? clear : complete}
                alt={button.value}
              />
            )}
          </RegularButton>
        ))}
      </div>
    </div>
  );
};

export default ModalForm;
