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

	console.log("activeLink: ", activeLink);

	useEffect(() => {
		setActiveLink(window.location.pathname);
	}, []);

	return (
		<div className="footer-wrapper">
			<footer className="footer">
				<FooterBtn
					href={"/app/wallets"}
					text={"Счета"}
					activeLink={activeLink}
					setActiveLink={setActiveLink}
				>
					<Wallet
						color={activeLink === "/app/wallets" ? "#2d9cdb" : "#DEDEDE"}
					/>
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
					href={"/app/history"}
					text={"Операции"}
					activeLink={activeLink}
					setActiveLink={setActiveLink}
				>
					<NewspaperOutline
						color={activeLink === "/app/history" ? "#2d9cdb" : "#DEDEDE"}
					/>
				</FooterBtn>
				<FooterBtn
					href={"/app/analysis"}
					text={"Анализ"}
					activeLink={activeLink}
					setActiveLink={setActiveLink}
				>
					<ServerOutline
						color={activeLink === "/app/analysis" ? "#2d9cdb" : "#DEDEDE"}
					/>
				</FooterBtn>
				<FooterBtn
					href={"/app/survey"}
					text={"Обзор"}
					activeLink={activeLink}
					setActiveLink={setActiveLink}
				>
					<BarChartOutline
						color={activeLink === "/app/survey" ? "#2d9cdb" : "#DEDEDE"}
					/>
				</FooterBtn>
			</footer>
		</div>
	);
};

export default Footer;

// return (
//   <Link
//     key={buttonItem.url}
//     href={buttonItem.url}
//     onClick={() => {
//       router.push(buttonItem.url);
//     }}
//     className={isActive ? "active" : ""}
//   >

//   </Link>
// );
