"use client";

import "./LoginForm.scss";

import RegularLoginInput from "@/commonComponents/RegularInput/RegularInput";

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

interface LoginFormDto {
  email: string;
  password: string;
}

interface LoginValidateErrors {
  email: string[];
  password: string[];
}

interface LoginSuccessResult {
  authToken: boolean;
  id: string;
}

const loginValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Неверный формат email")
    .required("Email обязателен"),
  password: yup.string().required("Пароль обязателен"),
});

const LoginForm = ({
  status,
  setStatus,
}: {
  status: ProcessStatus;
  setStatus: Dispatch<SetStateAction<ProcessStatus>>;
}) => {
  const dispatch = useAppDispatch();
  const { setIsAuth } = useAuth();
  const router = useRouter();

  const [formValues, setFormValues] = useState<LoginFormDto>({
    email: "",
    password: "",
  });

  const [validationErrors, setValidationErrors] = useState<LoginValidateErrors>(
    { email: [], password: [] }
  );

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

    setValidationErrors({ email: [], password: [] });

    const { email, password } = formValues;
    const url = `${process.env.NEXT_PUBLIC_API_URL}/auth/login`;
    const body: LoginFormDto = { email, password };

    try {
      setStatus({ success: false, pending: true, error: null });

      await loginValidationSchema.validate(formValues, {
        abortEarly: false,
      });

      const result = await customFetch({
        url,
        expectedStatusCode: 200,
        options: {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: body,
          credentials: "include",
        },
      });

      if (result instanceof Error) {
        setStatus({
          success: false,
          pending: false,
          error: result.message,
        });
      } else {
        const data = result.data as LoginSuccessResult;

        console.log("dasd");

        setStatus({
          success: true,
          pending: false,
          error: null,
        });

        console.log("dfskajfbsdkb");

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

        router.push("/app/accounts");
      }
    } catch (error) {
      setStatus({
        success: false,
        pending: false,
        error: null,
      });

      if (error instanceof yup.ValidationError) {
        const errors: LoginValidateErrors = {
          email: [],
          password: [],
        };

        // Сортируем ошибки по полям
        error.inner.forEach((err) => {
          if (err.path === "email") {
            errors.email.push(err.message);
          } else if (err.path === "password") {
            errors.password.push(err.message);
          }
        });

        setValidationErrors(errors);
      }
    }
  };

  const renderError = (field: keyof LoginValidateErrors) =>
    Boolean(validationErrors[field].length) &&
    validationErrors[field].map((errorItem) => {
      return (
        <span className="error-message" key={errorItem}>
          {errorItem}
        </span>
      );
    });

  return (
    <>
      <div className="login-form">
        <h2 className="login-form__header roboto-regular">Log In</h2>
        <form
          className="login-form__form-itself"
          onSubmit={handleSubmit}
          noValidate
        >
          <RegularLoginInput
            name="email"
            placeholder="Email"
            type="email"
            value={formValues.email}
            onChange={handleChange}
            style={{
              border: validationErrors.email.length ? "1px solid red" : "",
            }}
          />
          {renderError("email")}

          <RegularLoginInput
            name="password"
            placeholder="Password"
            type="password"
            value={formValues.password}
            onChange={handleChange}
            style={{
              border: validationErrors.password.length ? "1px solid red" : "",
            }}
          />
          {renderError("password")}

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
                "Sign In"
              )}
            </RegularButton>
          )}
        </form>
      </div>
    </>
  );
};

export default LoginForm;
