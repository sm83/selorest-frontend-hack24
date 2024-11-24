import Image from "next/image";
import React from "react";

import "./CardForm.scss";
import { icons } from "@/constants/icon/icon.constant";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CardForm = ({
  selectedCard,
  onClick,
  className,
}: {
  className: string;
  selectedCard: {
    id: string;
    categoryName: string;
    categoryPriority: string;
    balance: number;
    deleted: boolean;
    currency: number;
    icon: number;
    userId: string;
    createdAt: string;
    updatedAt: string;
  } | null;
  onClick: () => void; // Колбекк для клика по карточке
}) => {
  if (selectedCard) {
    return (
      <div className={`CardForm ${className}`} onClick={onClick}>
        <h3>{selectedCard.categoryName}</h3>
        <Image
          src={icons.find((i) => i.id === selectedCard.icon)?.svg}
          alt={selectedCard?.categoryName}
          height={48}
          width={48}
        />
        <span>{selectedCard?.balance}₽</span>
      </div>
    );
  }
  return null;
};

export default CardForm;
