"use client";

import NewWalletBox from "@/components/WalletsPage/NewWalletBox/NewWalletBox";
import "./page.scss";
import WalletBox from "@/components/WalletsPage/WalletBox/WalletBox";
import Card from "@/svgComponents/Card/Card";
import Money from "@/svgComponents/Money/Money";
import Plus from "@/svgComponents/Plus/Plus";
import { use, useEffect, useState } from "react";
import NewWalletModal from "@/components/WalletsPage/NewWalletModal/NewWalletModal";
import { useAppDispatch, useAppSelector, useAuth } from "@/hooks";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { fetchWalletByUserId } from "@/store/slices/walletSlice";
import { useRouter } from "next/navigation";
import { formatNumber } from "chart.js/helpers";

const WalletsPage = () => {
  const dispatch = useAppDispatch();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { setIsAuth } = useAuth();
  const router = useRouter();

  const wallet = useAppSelector((state: RootState) => state.wallet.walletData);
  console.log(wallet);

  useEffect(() => {
    const user_id = localStorage.getItem("user-id");
    const lstoken = localStorage.getItem("token");

    dispatch(
      fetchWalletByUserId({
        id: user_id,
        token: lstoken,
        authSensitiveSwitcher: setIsAuth,
        unauthorizedAction: () => {
          localStorage.removeItem("user-id");
          localStorage.removeItem("token");
          router.push("/login");
        },
      })
    );
  }, []);

  const totalBalance = wallet?.reduce(
    (acc, walletItem) => acc + walletItem.balance,
    0
  );

  return (
    <div className="wrapper-page-wrapper">
      <div className="wallets-page">
        <div className="wallets-page__summary">
          <span className="wallets-page__summary-span">Счета</span>
          <span className="wallets-page__summary-span">
            {(totalBalance && `${formatNumber(totalBalance)}₽`) || "0₽"}
          </span>
        </div>
        <div className="wallets-page__list">
          {wallet?.map((walletItem) => (
            <WalletBox
              key={walletItem.id}
              name={walletItem.walletName}
              moneyAmount={formatNumber(walletItem.balance)}
            >
              {walletItem.walletType === "cash" ? <Money /> : <Card />}
              {/* <Card />  */}
            </WalletBox>
          ))}
          {/* <WalletBox name="Карта" moneyAmount={1488}>
            <Card />
          </WalletBox>
          <WalletBox name="Наличные" moneyAmount={1488}>
            <Money />
          </WalletBox> */}
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
