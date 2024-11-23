import Image from "next/image";
import "./CategoryModal.scss";

import podarok from "./assets/Podarok.svg";
import React, { ChangeEvent, useEffect, useState } from "react";
import RegularButton from "@/commonComponents/RegularButton/RegularButton";

interface ModalFormProps {
  onClose: () => void;
  selectedCard: {
    title: string;
    image: string;
    el: number;
    mony: number;
  } | null;
}

const CategoryModal: React.FC<ModalFormProps> = ({ onClose, selectedCard }) => {
  const [isVisible, setIsVisible] = useState(false);

  // Состояние для данных из input
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    type: "",
  });

  // Функция для изменения данных
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    setIsVisible(true);
    return () => setIsVisible(false);
  }, []);

  return (
    <div className="CategoryModal">
      <div className="overlay" onClick={onClose}></div>
      <div className={`CategoryModalContent ${isVisible ? "visible" : ""}`}>
        <div className="CategoryModalHeader">
          <button onClick={onClose}>Отменить</button>
          <span>Категория</span>
          <button>Готово</button>
        </div>
        <div className="CategoryModalBody">
          <div className="img">
            <Image src={podarok} alt="podarok" height={48} width={48} />
          </div>
          <span>Изменить</span>
          <div className="InputWrapper">
            <input
              name="name"
              type="text"
              placeholder="Название"
              value={formData.name}
              onChange={handleInputChange}
            />
            <input
              name="description"
              type="text"
              placeholder="Описание"
              value={formData.description}
              onChange={handleInputChange}
            />
            <input
              name="type"
              type="text"
              placeholder="Тип"
              value={formData.type}
              onChange={handleInputChange}
            />
          </div>
          <div className="Podcategorii">
            <h1>Подкатегории</h1>
            <RegularButton>Добавить подкатегорию</RegularButton>
            <RegularButton>Архивная подкатегория</RegularButton>
          </div>
        </div>
        <div className="CategoryModalFooter">
          <RegularButton className="color">
            Переместить в категорию
          </RegularButton>
          <RegularButton className="color">
            Объединить с категорией
          </RegularButton>
          <RegularButton className="color remove">
            Удалить категорию
          </RegularButton>
        </div>
      </div>
    </div>
  );
};

export default CategoryModal;
