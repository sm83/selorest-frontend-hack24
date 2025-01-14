"use client";

import "./Footer.scss";
import FooterBtn from "./FooterBtn/FooterBtn";
import Wallet from "@/svgComponents/Wallet/Wallet";
import GridOutline from "@/svgComponents/GridOutline/GridOutline";
import NewspaperOutline from "@/svgComponents/NewspaperOutline/NewspaperOutline";
import ServerOutline from "@/svgComponents/ServerOutline/ServerOutline";
import BarChartOutline from "@/svgComponents/BarChartOutline/BarChartOutline";
import { useEffect, useState } from "react";

const Footer = () => {
  const [activeLink, setActiveLink] = useState<string>("");

  useEffect(() => {
    setActiveLink(window.location.pathname);
  }, []);

  return (
    <div className="footer">
      <FooterBtn
        href={"/app/wallets"}
        text={"Счета"}
        activeLink={activeLink}
        setActiveLink={setActiveLink}
      >
        <Wallet color={activeLink === "/app/wallets" ? "#2d9cdb" : "#DEDEDE"} />
      </FooterBtn>
      <FooterBtn
        href={"/app/categories"}
        text={"Категории"}
        activeLink={activeLink}
        setActiveLink={setActiveLink}
      >
        <GridOutline
          color={activeLink === "/app/categories" ? "#2d9cdb" : "#DEDEDE"}
        />
      </FooterBtn>
      <FooterBtn
        href={"/app/transactions"}
        text={"Операции"}
        activeLink={activeLink}
        setActiveLink={setActiveLink}
      >
        <NewspaperOutline
          color={activeLink === "/app/transactions" ? "#2d9cdb" : "#DEDEDE"}
        />
      </FooterBtn>
      <FooterBtn
        href={""}
        text={"Анализ"}
        activeLink={activeLink}
        setActiveLink={setActiveLink}
      >
        <ServerOutline
          color={activeLink === "/app/analysis" ? "#2d9cdb" : "#DEDEDE"}
        />
      </FooterBtn>
      <FooterBtn
        href={""}
        text={"Обзор"}
        activeLink={activeLink}
        setActiveLink={setActiveLink}
      >
        <BarChartOutline
          color={activeLink === "/app/survey" ? "#2d9cdb" : "#DEDEDE"}
        />
      </FooterBtn>
    </div>
  );
};

export default Footer;
