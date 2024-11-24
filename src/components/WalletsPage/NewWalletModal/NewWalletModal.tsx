"use client";

import React, { Dispatch, SetStateAction } from "react";
import "./NewWalletModal.scss";
import clsx from "clsx";

const NewWalletModal = ({
	setIsModalOpen,
	isModalOpen,
}: {
	setIsModalOpen: Dispatch<SetStateAction<boolean>>;
	isModalOpen: boolean;
}) => {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const handleSubmit = (e: any) => {
		e.preventDefault();

		setIsModalOpen(false);
	};

	return (
		<div
			className={clsx(
				"new-wallet-modal-wrapper",
				isModalOpen && "new-wallet-modal-wrapper_up"
			)}
		>
			<form className="new-wallet-modal" onSubmit={handleSubmit} noValidate>
				<div className="new-wallet-header">
					<button
						type="button"
						onClick={() => {
							setIsModalOpen(false);
						}}
						className="new-wallet-header__button"
					>
						Отменить
					</button>
					<h2 className="new-wallet-header__h2">Счет</h2>
					<button type="submit" className="new-wallet-header__button">
						Готово
					</button>
				</div>

				<div className="input-block">
					<input
						className="input-block__input"
						type="text"
						placeholder="Название"
						required
					/>
					<input
						className="input-block__input"
						type="text"
						placeholder="Описание"
						required
					/>
					<select
						className="input-block__select"
						name="paymentType"
						defaultValue="card"
					>
						<option className="BilModalContent__modal_option" value="card">
							Карта
						</option>
						<option className="BilModalContent__modal_option" value="money">
							Наличка
						</option>
					</select>
				</div>

				<div className="balance-area">
					<h1 className="balance-area__header">Баланс</h1>
					<div className="balance-area__input-block">
						<span className="balance-area__input-left-span">
							Начальный баланс
						</span>
						<input className="balance-area__input-itself" />
					</div>
				</div>

				{/* <div className="BilModalContent__modal_data-block">
					<div className="BilModalContent__modal_remainder BilModalContent__modal_input">
						<span className="BilModalContent__modal_remainder-text">
							Остаток на счёте
						</span>
						<span className="BilModalContent__modal_remainder-count">0₽</span>
					</div>
					<div className="BilModalContent__modal_input BilModalContent__modal_balance">
						<span className="BilModalContent__modal_remainder-text">
							Учитывать в общем балансе
						</span>
						<label
							htmlFor="checkbox-1"
							className="BilModalContent__modal_switch"
						>
							<input
								id="checkbox-1"
								type="checkbox"
								className="BilModalContent__modal_checkbox"
								checked={includeInTotal}
								onChange={(e) => setIncludeInTotal(e.target.checked)}
							/>
							<span className="BilModalContent__modal_slider round"></span>
						</label>
					</div>
				</div> */}
			</form>
		</div>
	);
};

export default NewWalletModal;
