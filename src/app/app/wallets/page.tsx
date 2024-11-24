"use client";

import NewWalletBox from "@/components/WalletsPage/NewWalletBox/NewWalletBox";
import "./page.scss";
import WalletBox from "@/components/WalletsPage/WalletBox/WalletBox";
import Card from "@/svgComponents/Card/Card";
import Money from "@/svgComponents/Money/Money";
import Plus from "@/svgComponents/Plus/Plus";
import { useState } from "react";
import NewWalletModal from "@/components/WalletsPage/NewWalletModal/NewWalletModal";

const WalletsPage = () => {
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

	return (
		<div className="wrapper-page-wrapper">
			<div className="wallets-page">
				<div className="wallets-page__summary">
					<span className="wallets-page__summary-span">Счета</span>
					<span className="wallets-page__summary-span">2493826</span>
				</div>
				<div className="wallets-page__list">
					<WalletBox name="Карта" moneyAmount={1488}>
						<Card />
					</WalletBox>
					<WalletBox name="Наличные" moneyAmount={1488}>
						<Money />
					</WalletBox>
					<NewWalletBox setIsModalOpen={setIsModalOpen}>
						<Plus />
					</NewWalletBox>
				</div>
			</div>
			<NewWalletModal
				setIsModalOpen={setIsModalOpen}
				isModalOpen={isModalOpen}
			/>
		</div>
	);
};

export default WalletsPage;
