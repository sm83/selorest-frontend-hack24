'use client'

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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const buttons: Array<{ image: any; text: string; url: string }> = [
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
  const [activeButton, setActiveButton] = useState<string>(AppUrlConfig.APP_CATEGORIES);

  return (
    <div className="Footer">
      {buttons.map((b, index) => {
        const isActive = activeButton === b.url;

        return (
          <Link
            key={index}
            href={b.url}
            onClick={() => setActiveButton(b.url)}
            className={isActive ? "active" : ""}
          >
            <Image src={b.image} alt={b.text} />
            <span>{b.text}</span>
          </Link>
        );
      })}
    </div>
  );
};

export default Footer;
