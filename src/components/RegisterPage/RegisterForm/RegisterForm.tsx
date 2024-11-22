'use client';

import RegularInput from '@/commonComponents/RegularInput/RegularInput';
import './RegisterForm.scss';
import { useState } from 'react';
import RegularButton from '@/commonComponents/RegularButton/RegularButton';
import customFetch from '@/utils/customFetch';

interface RegisterFormValues {
  email: string;
  password: string;
  passwordAgain: string;
}

interface CreateUserDto {
  email: string;
  password: string;
}

const RegisterForm = () => {
  const [formValues, setFormValues] = useState<RegisterFormValues>({
    email: '',
    password: '',
    passwordAgain: '',
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof RegisterFormValues, string>>
  >({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));

    // Убираем ошибку при изменении поля
    if (errors[name as keyof RegisterFormValues]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: undefined,
      }));
    }
  };

  const validateForm = (): boolean => {
    const { email, password, passwordAgain } = formValues;
    const newErrors: Partial<
      Record<keyof RegisterFormValues, string>
    > = {};

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Invalid email format';
    }

    if (password !== passwordAgain) {
      newErrors.passwordAgain = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const { email, password } = formValues;
    const url = `${process.env.NEXT_PUBLIC_API_URL}/auth/register`;
    const body: CreateUserDto = { email, password };

    try {
      const result = await customFetch({
        url,
        expectedStatusCode: 201,
        options: {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: body,
          credentials: 'include',
        },
      });

      if (result instanceof Error) {
        console.warn('Registration failed');
      } else {
        console.warn('Registration successful');
      }
    } catch (error) {
      console.error('Request error', error);
    }
  };

  const renderError = (field: keyof RegisterFormValues) =>
    errors[field] && (
      <span className="error-message">{errors[field]}</span>
    );

  return (
    <div className="register-form">
      <h2 className="register-form__header roboto-regular">
        Registration
      </h2>
      <form
        className="register-form__form-itself"
        onSubmit={handleSubmit}
        noValidate
      >
        <RegularInput
          name="email"
          placeholder="Email"
          type="email"
          value={formValues.email}
          onChange={handleChange}
          style={{
            border: errors.email ? '1px solid red' : '',
          }}
        />
        {renderError('email')}

        <RegularInput
          name="password"
          placeholder="Password"
          type="password"
          value={formValues.password}
          onChange={handleChange}
        />

        <RegularInput
          name="passwordAgain"
          placeholder="Confirm Password"
          type="password"
          value={formValues.passwordAgain}
          onChange={handleChange}
          style={{
            border: errors.passwordAgain ? '1px solid red' : '',
          }}
        />
        {renderError('passwordAgain')}

        <RegularButton
          colorVariant="success"
          type="submit"
        >
          Sign Up
        </RegularButton>
      </form>
    </div>
  );
};

export default RegisterForm;
