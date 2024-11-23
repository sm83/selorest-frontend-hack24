import Image from "next/image";
import React from "react";

import "./CardForm.scss";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CardForm = ({
  title,
  image,
  className,
  mony,
  onClick
}: {
  title: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  image: any;
  className: string;
  mony: number;
  onClick: () => void; // Колбекк для клика по карточке
}) => {
  return (
    <div className={`CardForm ${className}`} onClick={onClick}>
      <h3>{title}</h3>
      <Image src={image} alt={title} height={48} width={48} />
      <span>{mony}₽</span>
    </div>
  );
};

export default CardForm;
