import React, { FC, use, useEffect, useState } from "react";

import "./Bils.scss";

interface IBil {
  id: number;
  name: string;
  money: number;
  icon: string;
}

interface ISaving {
  id: number;
  name: string;
  money: number;
  icon: string;
}

interface BilsProps {
  bils: IBil[];
  saving: ISaving[];
}

const Bils: FC<BilsProps> = ({ bils: propBils, saving: propSaving }) => {
  const [sumBils, setSumBils] = useState(0);
  const [sumSaving, setSumSaving] = useState(0);
  const [bils, setBils] = useState<IBil[]>(
    [
      { id: "0", name: "Карта", money: 2493826, icon: "public/svg/card.svg" },
      { id: "1", name: "Наличные", money: 0, icon: "public/svg/money.svg" },
    ]
    // propBils
  );
  const [saving, setSaving] = useState<ISaving[]>(propSaving);

  function calculateSumBils() {
    const total = bils.reduce((acc, item) => acc + item.money, 0);
    setSumBils(total);
  }

  useEffect(() => {
    calculateSumBils();
  });

  return (
    <div className="bils">
      <header className="bils__header">
        <h1 className="bils__title bils__header_text">Cчета</h1>
        <span className="bils__money bils__header_text">{sumBils} ₽</span>
      </header>
      <div className="bils__list">
        {bils.map((bil) => (
          <div className="bils__item" key={bil.id}>
            <div className="bils__item_icon">
              <img src="public/svg/card.svg" className="bils__item_svg"></img>
            </div>
            <div className="bils__item_data">
              <div className="bils__item_name">{bil.name}</div>
              <div className="bils__item_money">{bil.money} ₽</div>
            </div>
          </div>
        ))}

        {/* <div className="bils__item">
          <div className="bils__item_icon">
            <img src="public/svg/card.svg" className="bils__item_svg"></img>
          </div>
          <div className="bils__item_data">
            <div className="bils__item_name">Наличные</div>
            <div className="bils__item_money">0 ₽</div>
          </div>
        </div> */}
      </div>
      <header className="bils__header">
        <h1 className="bils__title bils__header_text">Сбережения</h1>
        <span className="bils__money bils__header_text">0 ₽</span>
      </header>
      <div className="bils__list">
        <div className="bils__item">
          <div className="bils__item_icon">
            <img src="public/svg/card.svg" className="bils__item_svg"></img>
          </div>
          <div className="bils__item_data">
            <div className="bils__item_name">Наличные</div>
            <div className="bils__item_money">0 ₽</div>
          </div>
        </div>
      </div>
      <button className="bils__btn_add">
        <img src="public/svg/card.svg" className="bils__btn_svg"></img>
      </button>
    </div>
  );
};

export default Bils;
