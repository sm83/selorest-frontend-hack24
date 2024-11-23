import React, { useState } from "react";
import card from "./assets/card.svg";
import money from "./assets/money.svg";
import plus from "./assets/plus.svg";
import "./Bils.scss";
import Image from "next/image";
import BilModal from "./bil-modal/BilModal";

interface IBil {
  id: number;
  name: string;
  money: number;
  icon: string;
}

const bils: Array<IBil> = [
  { id: 0, name: "Карта", money: 2493826, icon: card },
  { id: 1, name: "Наличные", money: 0, icon: money },
];

const Bils = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="bils">
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
      <button onClick={openModal} className="bils__btn_add">
        <Image src={plus} className="bils__btn_svg" alt="Добавить" />
      </button>

      {isModalOpen && <BilModal onClose={closeModal} />}
    </div>
  );
};

export default Bils;
