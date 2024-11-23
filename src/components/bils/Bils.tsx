import React, { FC, useEffect, useState } from "react";
import card from "./assets/card.svg";
import money from "./assets/money.svg";
import plus from "./assets/plus.svg";
import "./Bils.scss";
import Image from "next/image";

interface IBil {
  id: number;
  name: string;
  money: number;
  icon: string;
}

interface BilsProps {
  bils?: IBil[];
  onAddClick: () => void;
}

const Bils: FC<BilsProps> = ({ bils: propBils = [], onAddClick }) => {
  const [sumBils, setSumBils] = useState(0);
  const [bils, setBils] = useState<IBil[]>(
    propBils.length > 0
      ? propBils
      : [
          { id: 0, name: "Карта", money: 2493826, icon: card },
          { id: 1, name: "Наличные", money: 0, icon: money },
        ]
  );

  useEffect(() => {
    const total = bils.reduce((acc, item) => acc + item.money, 0);
    setSumBils(total);
  }, [bils]);

  return (
    <div className="bils">
      <header className="bils__header">
        <h1 className="bils__title bils__header_text">Счета</h1>
        <span className="bils__money bils__header_text">{sumBils} ₽</span>
      </header>
      <div className="bils__list">
        {bils.map((bil) => (
          <div className="bils__item" key={bil.id}>
            <div className="bils__item_icon">
              <Image src={bil.icon} className="bils__item_svg" alt={bil.name} />
            </div>
            <div className="bils__item_data">
              <div className="bils__item_name">{bil.name}</div>
              <div className="bils__item_money">{bil.money} ₽</div>
            </div>
          </div>
        ))}
      </div>
      <button onClick={onAddClick} className="bils__btn_add">
        <Image src={plus} className="bils__btn_svg" alt="Добавить" />
      </button>
    </div>
  );
};


export default Bils;
