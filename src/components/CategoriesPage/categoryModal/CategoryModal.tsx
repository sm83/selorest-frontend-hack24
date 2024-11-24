import Image from "next/image";
import "./CategoryModal.scss";

import React, { ChangeEvent, useEffect, useState } from "react";
import { icons } from "@/constants/icon/icon.constant";
import customFetch from "@/utils/customFetch";

interface ModalFormProps {
  onClose: () => void;
}

interface FormData {
  userId: string | null;
  categoryName: string;
  currency: number;
  balance: number;
  icon: number;
  categoryPriority: string;
}

const CategoryModal: React.FC<ModalFormProps> = ({ onClose }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
    userId: null,
    categoryName: "",
    currency: 1,
    balance: 0,
    icon: 0,
    categoryPriority: "",
  });

  // Установка userId при загрузке компонента
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUserId = localStorage.getItem("userId");
      setFormData((prev) => ({
        ...prev,
        userId: storedUserId,
      }));
      setToken(localStorage.getItem("token"));
    }
    setIsVisible(true);

    return () => setIsVisible(false);
  }, []);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "icon" ? Number(value) : value,
    }));
  };

  const handleSubmit = async () => {
    console.log(token);

    if (formData.userId) {
      const {
        userId,
        categoryName,
        categoryPriority,
        currency,
        balance,
        icon,
      } = formData;
      const url = `${process.env.NEXT_PUBLIC_API_URL}/categories`;
      const body: Omit<FormData, "userId"> & { userId: string } = {
        userId,
        categoryName,
        currency,
        balance,
        icon,
        categoryPriority,
      };

      try {
        await customFetch({
          url,
          expectedStatusCode: 200,
          options: {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(body),
          },
        });
        onClose();
      } catch (error) {
        console.error("Ошибка при сохранении категории:", error);
      }
    } else {
      console.error("Пользователь не авторизован!");
    }
  };

  return (
    <div className="CategoryModal">
      <div className="overlay" onClick={onClose}></div>
      <div className={`CategoryModalContent ${isVisible ? "visible" : ""}`}>
        <div className="CategoryModalHeader">
          <button onClick={onClose}>Отменить</button>
          <span>Категория</span>
          <button onClick={handleSubmit}>Готово</button>
        </div>
        <div className="CategoryModalBody">
          <div className="img">
            {icons[formData.icon] ? (
              <Image
                src={icons[formData.icon].svg}
                alt={`Иконка категории: ${formData.categoryName}`}
                height={70}
                width={70}
              />
            ) : (
              <span>Нет иконки</span>
            )}
          </div>
          <button>Изменить</button>
          <div className="InputWrapper">
            <input
              name="categoryName"
              type="text"
              placeholder="Название"
              value={formData.categoryName}
              onChange={handleInputChange}
            />
            <input
              name="categoryPriority"
              type="text"
              placeholder="Приоритет"
              value={formData.categoryPriority}
              onChange={handleInputChange}
            />
            <input
              name="icon"
              type="number"
              placeholder="Иконка"
              value={formData.icon}
              onChange={handleInputChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryModal;
