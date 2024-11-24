"use client";

import Link from "next/link";
import wallet from "./assets/wallet-outline.svg";
import grid from "./assets/grid-outline.svg";
import news from "./assets/newspaper-outline.svg";
import server from "./assets/server-outline.svg";
import bar from "./assets/bar-chart-outline.svg";
import Image from "next/image";

import "./Footer.scss";
import { AppUrlConfig } from "@/utils/url.config";
import { useState } from "react";

interface IButton {
  image: any;
  text: string;
  url: string;
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const buttonsArray: IButton[] = [
  {
    image: wallet,
    text: "Счета",
    url: AppUrlConfig.APP_ACCOUNTS,
  },
  {
    image: grid,
    text: "Категории",
    url: AppUrlConfig.APP_CATEGORIES,
  },
  {
    image: news,
    text: "Операции",
    url: AppUrlConfig.APP_TRANSACTIONS,
  },
  {
    image: server,
    text: "Анализ",
    url: AppUrlConfig.APP_ANALIS,
  },
  {
    image: bar,
    text: "Обзор",
    url: AppUrlConfig.APP_REVIEWS,
  },
];

const Footer = () => {
  const [activeButton, setActiveButton] = useState<string>(
    AppUrlConfig.APP_CATEGORIES
  );

  return (
    <div className="Footer">
      {buttonsArray.map((buttonItem, index) => {
        const isActive = activeButton === buttonItem.url;

        return (
          <Link
            key={index}
            href={buttonItem.url}
            onClick={() => setActiveButton(buttonItem.url)}
            className={isActive ? "active" : ""}
          >
            <Image src={buttonItem.image} alt={buttonItem.text} />
            <span>{buttonItem.text}</span>
          </Link>
        );
      })}
    </div>
  );
};

export default Footer;
