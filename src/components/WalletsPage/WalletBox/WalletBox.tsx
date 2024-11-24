import "./WalletBox.scss";

const WalletBox = ({
	name,
	moneyAmount,
	children,
}: {
	name: string;
	moneyAmount: number;
	children: React.ReactNode;
}) => {
	return (
		<div className="wallet-box">
			<div className="wallet-box__icon">{children}</div>
			<div className="wallet-box__data">
				<div className="wallet-box__name">{name}</div>
				<div className="wallet-box__balance">{moneyAmount} ₽</div>
			</div>
		</div>
	);
};

export default WalletBox;
