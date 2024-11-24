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

{
	/* <div className="wallets-page">
<div className="wallets__list">
	<WalletBox id="0" name="Карта" moneyAmount={1488}>
		<Card />
	</WalletBox>
	<WalletBox id="1" name="Наличные" moneyAmount={1488}>
		<Money />
	</WalletBox> */
}
{
	/* {bils.map((bil) => (
		<div className="bils__item" key={bil.id}>
			<div className="bils__item_icon">
				<Image
					src={bil.icon}
					className="bils__item_svg"
					alt={bil.name}
				/>
			</div>
			<div className="bils__item_data">
				<div className="bils__item_name">{bil.name}</div>
				<div className="bils__item_money">{bil.money} ₽</div>
			</div>
		</div>
	))} */
}
{
	/* </div> */
}
{
	/* <button onClick={openModal} className="bils__btn_add">
	<Image src={plus} className="bils__btn_svg" alt="Добавить" />
</button>

{isModalOpen && <BilModal onClose={closeModal} />} */
}
{
	/* </div> */
}
