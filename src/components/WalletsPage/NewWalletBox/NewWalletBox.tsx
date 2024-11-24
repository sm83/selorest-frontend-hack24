import { Dispatch, SetStateAction } from "react";
import "./NewWalletBox.scss";

const NewWalletBox = ({
	children,
	setIsModalOpen,
}: {
	children: React.ReactNode;
	setIsModalOpen: Dispatch<SetStateAction<boolean>>;
}) => {
	return (
		<div className="new-wallet-box">
			<div
				className="new-wallet-box__icon"
				onClick={() => {
					setIsModalOpen(true);
				}}
			>
				{children}
			</div>
		</div>
	);
};

export default NewWalletBox;
