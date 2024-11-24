"use client";

import NewWalletBox from "@/components/WalletsPage/NewWalletBox/NewWalletBox";
import "./page.scss";
import WalletBox from "@/components/WalletsPage/WalletBox/WalletBox";
import Card from "@/svgComponents/Card/Card";
import Money from "@/svgComponents/Money/Money";
import Plus from "@/svgComponents/Plus/Plus";
import { useEffect, useState } from "react";
import NewWalletModal from "@/components/WalletsPage/NewWalletModal/NewWalletModal";
import { useAppDispatch, useAppSelector, useAuth } from "@/hooks";
import { RootState } from "@/store/store";
import { fetchWalletByUserId } from "@/store/slices/walletSlice";
import { useRouter } from "next/navigation";

const WalletsPage = () => {
  const dispatch = useAppDispatch();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { setIsAuth } = useAuth();
  const router = useRouter();

  const { token, userId } = useAuth();

  const wallet = useAppSelector((state: RootState) => state.wallet.walletData);
  console.log(wallet);

  useEffect(() => {
    dispatch(
      fetchWalletByUserId({
        id: userId,
        token: token,
        authSensitiveSwitcher: setIsAuth,
        unauthorizedAction: () => {
          localStorage.removeItem("user-id");
          localStorage.removeItem("token");
          router.push("/login");
        },
      })
    );
  }, [dispatch, userId, token, setIsAuth, router]);

  const totalBalance = wallet?.reduce(
    (acc, walletItem) => acc + walletItem.balance,
    0
  );

  const formatNumber = (num: number, locale: string = "ru-RU", options?: Intl.NumberFormatOptions): string => {
    return new Intl.NumberFormat(locale, options).format(num);
  };

  return (
    <div className="wrapper-page-wrapper">
      <div className="wallets-page">
        <div className="wallets-page__summary">
          <span className="wallets-page__summary-span">Счета</span>
          <span className="wallets-page__summary-span">
            {(totalBalance && `${formatNumber(totalBalance, "ru-RU")}₽`) || "0₽"}
          </span>
        </div>
        <div className="wallets-page__list">
          {wallet?.map((walletItem) => (
            <WalletBox
              key={walletItem.id}
              name={walletItem.walletName}
              moneyAmount={Number(formatNumber(walletItem.balance, "ru-RU"))}
            >
              {walletItem.walletType === "cash" ? <Money /> : <Card />}
            </WalletBox>
          ))}
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
