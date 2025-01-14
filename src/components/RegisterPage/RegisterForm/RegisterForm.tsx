"use client";

import "./RegisterForm.scss";

import RegularInput from "@/commonComponents/RegularInput/RegularInput";

import { Dispatch, SetStateAction, useState } from "react";
import RegularButton from "@/commonComponents/RegularButton/RegularButton";
import customFetch from "@/utils/customFetch";

import * as yup from "yup";
import { useAppDispatch, useAuth } from "@/hooks";
import { fetchProfileById } from "@/store/slices";
import { useRouter } from "next/navigation";
import Spinner1 from "@/svgComponents/Spinner-1/Spinner-1";
import SuccessIconAnimated from "@/svgComponents/SuccessIconAnimated/SuccessIconAnimated";
import { ProcessStatus } from "@/interfaces/processStatus.interface";
import Link from "next/link";

interface RegisterFormDto {
	email: string;
	password: string;
	passwordAgain: string;
}

interface RegisterValidateErrors {
	email: string[];
	password: string[];
	passwordAgain: string[];
}

interface RegisterSuccessResult {
	token: string;
	id: string;
}

const registerValidationSchema = yup.object().shape({
	email: yup
		.string()
		.email("Неверный формат email")
		.required("Email обязателен"),
	password: yup.string().required("Пароль обязателен"),
	passwordAgain: yup.string().required("Пароль обязателен"),
});

const RegisterForm = ({
	status,
	setStatus,
}: {
	status: ProcessStatus;
	setStatus: Dispatch<SetStateAction<ProcessStatus>>;
}) => {
	const dispatch = useAppDispatch();
	const { setIsAuth, setToken, setUserId } = useAuth();
	const router = useRouter();

	const [formValues, setFormValues] = useState<RegisterFormDto>({
		email: "",
		password: "",
		passwordAgain: "",
	});

	const [validationErrors, setValidationErrors] =
		useState<RegisterValidateErrors>({
			email: [],
			password: [],
			passwordAgain: [],
		});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormValues((prevValues) => ({
			...prevValues,
			[name]: value,
		}));

		// Убираем ошибку при изменении поля
		setValidationErrors({ ...validationErrors, [name]: "" });
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		setValidationErrors({ email: [], password: [], passwordAgain: [] });

		const { email, password } = formValues;
		const url = `${process.env.NEXT_PUBLIC_API_URL}/auth/register`;
		const body: { email: string; password: string } = { email, password };

		try {
			setStatus({ success: false, pending: true, error: null });

			await registerValidationSchema.validate(formValues, {
				abortEarly: false,
			});

			const result = await customFetch({
				url,
				expectedStatusCode: 200,
				options: {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: body,
					// credentials: 'include',
				},
			});

			if (result instanceof Error) {
				setStatus({
					success: false,
					pending: false,
					error: result.message,
				});
			} else {
				const data = result.data as RegisterSuccessResult;

				localStorage.setItem("token", data.token);
				setToken(data.token);
				localStorage.setItem("user-id", data.id);
				setUserId(data.id);

				setStatus({
					success: true,
					pending: false,
					error: null,
				});

				// fetching profile data
				dispatch(
					fetchProfileById({
						id: data.id,
						authSensitiveSwitcher: setIsAuth,
						unauthorizedAction: () => {
							router.push("/login");
						},
					})
				);

				setIsAuth(true);

				router.push("/app/categories");
			}
		} catch (error) {
			setStatus({
				success: false,
				pending: false,
				error: null,
			});

			if (error instanceof yup.ValidationError) {
				const errors: RegisterValidateErrors = {
					email: [],
					password: [],
					passwordAgain: [],
				};

				// Сортируем ошибки по полям
				error.inner.forEach((err) => {
					if (err.path === "email") {
						errors.email.push(err.message);
					} else if (err.path === "password") {
						errors.password.push(err.message);
					} else if (err.path === "passwordAgain") {
						errors.password.push(err.message);
					}
				});

				setValidationErrors(errors);
			}
		}
	};

	const renderError = (field: keyof RegisterValidateErrors) =>
		Boolean(validationErrors[field].length) &&
		validationErrors[field].map((errorItem) => {
			return (
				<span className="error-message" key={errorItem}>
					{errorItem}
				</span>
			);
		});

	return (
		<div className="register-form">
			<h2 className="register-form__header">Регистрация</h2>
			<form
				className="register-form__form-itself"
				onSubmit={handleSubmit}
				noValidate
			>
				<RegularInput
					name="email"
					placeholder="Логин"
					type="email"
					value={formValues.email}
					onChange={handleChange}
					style={{
						border: validationErrors.email.length ? "1px solid red" : "",
					}}
				/>
				{renderError("email")}

				<RegularInput
					name="password"
					placeholder="Пароль"
					type="password"
					value={formValues.password}
					onChange={handleChange}
				/>

				<RegularInput
					name="passwordAgain"
					placeholder="Повторить пароль"
					type="password"
					value={formValues.passwordAgain}
					onChange={handleChange}
					style={{
						border: validationErrors.password.length ? "1px solid red" : "",
					}}
				/>
				{renderError("passwordAgain")}

				{status.success ? (
					<SuccessIconAnimated size={24} />
				) : (
					<RegularButton
						colorVariant={status.pending ? "in-use" : "success"}
						type="submit"
					>
						{status.pending ? (
							<Spinner1 color="white" size={18} />
						) : (
							"Зарегистрироваться"
						)}
					</RegularButton>
				)}
				<span className="register-form__span">
					Уже есть аккаунт? <Link href="/login">Войти</Link>
				</span>
			</form>
		</div>
	);
};

export default RegisterForm;
